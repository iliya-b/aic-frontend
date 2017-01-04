'use strict';

import Reflux from 'reflux';
import LiveActions from 'app/actions/live';
import APKActions from 'app/actions/apk';
import CameraActions from 'app/actions/camera';
import AppActions from 'app/actions/app';
import {calcScreenScale} from 'app/libs/scale';
import NoVNCAdapter from 'app/libs/novnc-adapter';
import Notify from 'app/libs/notify';

const debug = require('debug')('AiC:Stores:Live');

const LiveStore = Reflux.createStore({

	// Base Store //

	listenables: LiveActions,

	init() {
		this.state = {};
		this.state.projectId = false;
		this.resetLive();
		this.state.live.status = 'LIVE_STATUS_INITIATING';
		this.updateState();
	},

	// Actions //

	onSetProjectId(projectId) {
		this.state.projectId = projectId;
		this.updateState();
	},

	onSetProjectIdCompleted() {
		this.state.live.status = 'LIVE_STATUS_INITIALIZED';
		this.updateState();
	},

	onSetProjectIdFailed(errorMessage) {
		this.state.live.message = errorMessage;
		this.state.live.status = 'LIVE_STATUS_INITIAL_FAILED';
		this.updateState();
	},

	onNotifyLiveRead(actionInfo, avmInfo) {
		debug('onNotifyLiveRead', actionInfo, avmInfo);
		if (this.state.live.status === 'LIVE_STATUS_INITIALIZED') {
			this.state.live.status = 'LIVE_STATUS_CHECKING';
			this.updateState();
		}
		this.state.liveInfo = avmInfo;
		if (this.state.live.status === 'LIVE_STATUS_CHECKING') {
			this.state.live.status = 'LIVE_STATUS_CHECK_FOUND';
			this.state.live.status = 'LIVE_STATUS_STARTING';
		}
		if (!this.state.live.liveIsConnect &&
			avmInfo.avm_status === 'READY') {
			this.state.live.liveIsConnect = true;
			Notify.startLiveProperties({avmId: this.state.liveInfo.avm_id}, {showError500Dialog: false});
		}
		this.updateState();
	},

	// TODO: when vm not found
	// onLoadInfoFailed(errorMessage) {
	// 	debug('errorMessage', errorMessage);
	// 	this.state.live.message = errorMessage;
	// 	// this.state.live.status = 'LIVE_STATUS_INITIAL_FAILED';
	// 	this.state.live.status = 'LIVE_STATUS_CHECK_FAILED';
	// 	// this.updateState();
	// 	debug('not found avm', this);
	// 	AppActions.notFound();
	// },

	onLiveReset() {
		this.resetLive();
		this.state.live.status = 'LIVE_STATUS_RESET';
		this.updateState();
	},

	onStart() {
		this.state.live.status = 'LIVE_STATUS_VMSTARTING';
		this.updateState();
	},

	onStartCompleted(avm) {
		this.state.live.avm = avm;
		this.state.live.status = 'LIVE_STATUS_VMSTARTED';
		this.updateState();
		this.updateList();
	},

	onStartFailed(errorMessage) {
		debug('onStartFailed', errorMessage, errorMessage.response);

		if (errorMessage.err && errorMessage.request && errorMessage.err.response) {
			errorMessage.err.response.text().then(message => {
				debug('text', message);
				AppActions.displaySnackBar(message);
			});
		} else {
			const message = typeof errorMessage === 'object' ? errorMessage.message : errorMessage;
			AppActions.displaySnackBar(message);
		}
	},

	onStop(request) {
		debug('onStop', request);
		if (this.state.liveInfo && request.avmId !== this.state.liveInfo.avm_id) {
			debug('onStop', 'request for another vm');
			return;
		}
		this.state.live.status = 'LIVE_STATUS_STOPPING';
		this.updateState();
		this.updateList();
	},

	onStopCompleted(response) {
		// this.resetMachine();
		if (this.state.liveInfo && response.request.avmId !== this.state.liveInfo.avm_id) {
			debug('onStopCompleted', 'request for another vm');
			return;
		}
		this.state.live.status = 'LIVE_STATUS_STOPPED';
		this.updateState();
	},

	onStopFailed(response) {
		if (this.state.liveInfo && response.request.avmId !== this.state.liveInfo.avm_id) {
			debug('onStopCompleted', 'request for another vm');
			return;
		}
		this.state.live.status = 'LIVE_STATUS_STOP_FAILED';
		this.state.live.message = response.error;
		this.updateState();
	},

	onLiveConnect() {
		debug('onLiveConnect');
		debug(arguments);
		this.state.live.status = 'LIVE_STATUS_CONNECTING';
		this.updateState();
		LiveActions.liveConnectAudio(this.state.liveInfo.avm_id);
	},

	onLiveConnectCompleted() {
		debug('onLiveConnectCompleted', arguments);
		this.state.live.status = 'LIVE_STATUS_CONNECTED';
		LiveActions.initiateScaleScreen();
		this.updateState();
		// LiveActions.enterScaledscreen();
		debug('onLiveConnectCompleted 2');
	},

	onLiveConnectFailed(errorMessage) {
		debug('onLiveConnectFailed');
		debug(errorMessage);
		debug(arguments);
		this.state.live.status = 'LIVE_STATUS_CONNECT_FAILED';
		this.state.live.message = typeof errorMessage === 'object' ? errorMessage.message : errorMessage;
		this.updateState();
	},

	onSetSensor(params) {
		const {sensor, payload} = params;
		debug('onSetSensor');
		debug('arguments', arguments);
		this.state.live.sensors[sensor] = payload;
		this.updateState();
	},

	onListPackages() {
		debug('onListPackages');
		this.state.live.listPackages = true;
	},

	onListPackagesCompleted(packages) {
		debug('onListPackagesCompleted', packages);
		this.state.live.packages = packages;
		this.updateState();
	},

	onListPackagesFailed(errorMessage) {
		this.state.live.message = errorMessage;
		// this.state.live.status = 'LIVE_STATUS_LISTPACKAGES_FAILED';
		this.updateState();
	},

	onInstallAPK(request) {
		debug('onInstallAPK');
		const {apkId, refId} = request;
		this.state.live.installedAPKs = this.state.live.installedAPKs || [];
		this.state.live.installedAPKs.push({
			refId,
			apkId,
			status: 'REQUESTED',
			startTime: Date.now()
		});
		this.updateState();
	},

	onInstallAPKCompleted(response) {
		debug('onInstallAPKCompleted', response);
		const refId = response.request.refId;
		// LiveActions.listPackages({avmId: this.state.liveInfo.avm_id});
		const index = this.state.live.installedAPKs.reduce((found, apk, index) => {
			return apk.refId === refId ? index : found;
		}, -1);
		if (index !== -1) {
			this.state.live.installedAPKs[index].updateTime = Date.now();
			this.state.live.installedAPKs[index].commandId = response.response.commandId;
			Notify.startLiveInstallAPK({avmId: this.state.liveInfo.avm_id, commandId: this.state.live.installedAPKs[index].commandId});
		}
		this.updateState();
	},

	onInstallAPKFailed(response) {
		debug('onInstallAPKFailure', response);
		const refId = response.request.refId;
		const index = this.state.live.installedAPKs.reduce((found, apk, index) => {
			return apk.refId === refId ? index : found;
		}, -1);
		if (index !== -1) {
			this.state.live.installedAPKs[index].updateTime = Date.now();
			this.state.live.installedAPKs[index].status = 'ERROR';
		}
		this.state.live.message = response.error;
		// this.state.live.status = 'LIVE_STATUS_INSTALLAPK_FAILED';
		this.updateState();
	},

	onNotifyLiveInstallAPK(commandInfo, commandDetails) {
		debug('onNotifyLiveInstallAPK', commandInfo, commandDetails);
		const commandId = commandInfo.commandId;
		const commandIndex = this.state.live.installedAPKs.reduce((p, c, i) => !p && c.commandId === commandId ? i : p, false);
		if (this.state.live.installedAPKs[commandIndex].status !== commandDetails.status) {
			this.state.live.installedAPKs[commandIndex].status = commandDetails.status;
			this.updateState();
			if (commandDetails.status === 'READY') {
				LiveActions.listPackages({avmId: this.state.liveInfo.avm_id});
			}
		}
	},

	onMonkeyRunner(request) {
		const {packages, eventCount, throttle, refId} = request;
		debug('onMoneyRunner');
		this.state.live.monkeyCalls = this.state.live.monkeyCalls || [];
		this.state.live.monkeyCalls.push({
			id: refId,
			status: 'REQUESTED',
			startTime: Date.now(),
			label: `${packages.join(' ')} (${eventCount}x-${throttle}ms)`
		});
		this.updateState();
	},

	onMonkeyRunnerCompleted(response) {
		debug('onMoneyRunnerCompleted', response);
		const refId = response.request.refId;
		const index = this.state.live.monkeyCalls.reduce((found, mcall, index) => {
			return mcall.id === refId ? index : found;
		}, -1);
		if (index !== -1) {
			// this.state.live.monkeyCalls[index].endTime = Date.now();
			// this.state.live.monkeyCalls[index].status = 'SUCCESS';
			this.state.live.monkeyCalls[index].updateTime = Date.now();
			this.state.live.monkeyCalls[index].commandId = response.response.commandId;
			Notify.startLiveMonkeyRunner({avmId: this.state.liveInfo.avm_id, commandId: this.state.live.monkeyCalls[index].commandId});
			this.updateState();
		}
	},

	onMonkeyRunnerFailed(response) {
		debug('onMoneyRunnerFailure', response.error);
		const refId = response.request.refId;
		const index = this.state.live.monkeyCalls.reduce((found, mcall, index) => {
			return mcall.id === refId ? index : found;
		}, -1);
		if (index !== -1) {
			this.state.live.monkeyCalls[index].endTime = Date.now();
			this.state.live.monkeyCalls[index].status = 'ERROR';
			this.updateState();
		}
		// this.state.live.message = response.error;
		// this.state.live.status = 'LIVE_STATUS_MONKEYRUNNER_FAILED';
	},

	onNotifyLiveMonkeyRunner(commandInfo, commandDetails) {
		debug('onNotifyLiveMonkeyRunner', commandInfo, commandDetails);
		const commandId = commandInfo.commandId;
		const commandIndex = this.state.live.monkeyCalls.reduce((p, c, i) => !p && c.commandId === commandId ? i : p, false);
		if (this.state.live.monkeyCalls[commandIndex].status !== commandDetails.status) {
			this.state.live.monkeyCalls[commandIndex].status = commandDetails.status;
			this.updateState();
		}
	},

	onNotifyLiveProperties(actionInfo, properties) {
		debug('onNotifyLiveProperties', properties);

		// TODO: should be changed to machine state
		// boot completed
		if (!this.state.live.listPackages &&
			properties['dev.bootcomplete'] === '1') {
			// properties["aicVM.inited"] === "1") {
			debug('onPropertiesCompleted listPackages');
			LiveActions.listPackages({avmId: this.state.liveInfo.avm_id});
		}

		// docker finished (not available) boot initiate
		if (!this.state.live.bootInit &&
			(properties['init.svc.bootanim'] === 'running' || properties['dev.bootcomplete'] === '1')) {
		// if (!this.state.live.bootInit) {
			// properties["aicVM.inited"] === "1") {
			this.state.live.status = 'LIVE_STATUS_STARTED';
			debug('onPropertiesCompleted boot initiate');
			this.state.live.bootInit = true;
			LiveActions.liveConnect(this.state.liveInfo.avm_id);
			APKActions.list({projectId: this.state.projectId});
			CameraActions.list({projectId: this.state.projectId});
		}

		// If rotation changes need to recalculate scale
		let shouldCalculateScale = false;
		if ((this.state && this.state.live && this.state.live.isScaledscreen) &&
			properties['aicd.screen_rotation'] !== this.state.live.properties['aicd.screen_rotation']) {
			shouldCalculateScale = true;
		}

		this.state.live.properties = properties;

		if (shouldCalculateScale) {
			this.calculateScale();
		}

		this.updateSensors();
		this.updateState();
	},

	// TODO properties failure
	// onPropertiesFailed(errorMessage) {
	// 	// this.onPropertiesCompleted({'dev.bootcomplete': '0'});
	// 	// debug('onPropertiesFailure', errorMessage);
	// 	// this.state.live.message = errorMessage;
	// 	// this.state.live.status = 'LIVE_STATUS_PROPERTIES_FAILED';
	// 	// this.updateState();
	// 	this.state.live.propertiesFailureCount = this.state.live.propertiesFailureCount || 0;
	// 	this.state.live.propertiesFailureCount += 1;
	// 	debug('onPropertiesFailure', errorMessage, this.state.live.propertiesFailureCount);
	// 	if (this.state.live.propertiesFailureCount >= 30) {
	// 		// TODO: errorMessage should contain message
	// 		this.state.live.message = 'It was not possible to reach the Android machine.';
	// 		// this.state.live.status = 'LIVE_STATUS_LISTPACKAGES_FAILED';
	// 		this.state.live.status = 'LIVE_STATUS_START_FAILED';
	// 		this.updateState();
	// 		// TODO: should stop after x errors
	// 	}
	// },

	onEnterFullscreen() {
		debug('onEnterFullscreen');
		this.state.live.isFullscreen = true;
		this.updateState();
	},

	onExitFullscreen() {
		debug('onExitFullscreen');
		this.state.live.isFullscreen = false;
		this.updateState();
	},

	onEnterScaledscreen() {
		debug('onEnterScaledscreen');
		this.calculateScale();
		this.state.live.isScaledscreen = true;
		this.updateState();
	},

	onExitScaledscreen() {
		debug('onExitScaledscreen');
		this.setScale(1);
		this.state.live.isScaledscreen = false;
		this.updateState();
	},

	onRecalculeScale() {
		debug('onRecalculeScale');
		this.calculateScale();
		this.updateState();
	},

	onRecalculeScaleIfConnected() {
		debug('onRecalculeScaleIfConnected', this.state.live.status);
		if (this.state.live.status === 'LIVE_STATUS_CONNECTED' && this.state.live.isScaledscreen) {
			LiveActions.recalculeScale();
		}
	},

	onListTests(data) {
		debug('onListTests', data);
		this.state.live.tests.packages = [];
		this.updateState();
	},

	onListTestsCompleted(data) {
		debug('onListTestsCompleted', data);
		const packages = Object.keys(data.response.packages);
		this.state.live.tests.packages = packages;
		this.updateState();
	},

	onRunTest(request) {
		const {refId} = request;
		debug('onRunTest');
		this.state.live.tests.runs.push({
			id: refId,
			status: 'REQUESTED',
			startTime: Date.now(),
			label: request.package
		});
		this.updateState();
	},

	onRunTestCompleted(response) {
		debug('onRunTestCompleted', response);
		const refId = response.request.refId;
		const index = this.state.live.tests.runs.reduce((found, mcall, index) => {
			return mcall.id === refId ? index : found;
		}, -1);
		if (index !== -1) {
			const commandId = response.response.commandId;
			this.state.live.tests.runs[index].updateTime = Date.now();
			this.state.live.tests.runs[index].commandId = commandId;
			Notify.startLiveRunTest({avmId: this.state.liveInfo.avm_id, commandId});
			this.updateState();
		}
	},

	onRunTestFailed(response) {
		debug('onRunTestFailed', response.error);
		const refId = response.request.refId;
		const index = this.state.live.tests.runs.reduce((found, mcall, index) => {
			return mcall.id === refId ? index : found;
		}, -1);
		if (index !== -1) {
			this.state.live.tests.runs[index].endTime = Date.now();
			this.state.live.tests.runs[index].status = 'ERROR';
			this.updateState();
		}
	},

	onNotifyLiveRunTest(commandInfo, commandDetails) {
		debug('onNotifyLiveRunTest', commandInfo, commandDetails);
		const commandId = commandInfo.commandId;
		const commandIndex = this.state.live.tests.runs.reduce((p, c, i) => !p && c.commandId === commandId ? i : p, false);
		if (commandIndex !== false && this.state.live.tests.runs[commandIndex].status !== commandDetails.status) {
			this.state.live.tests.runs[commandIndex].status = commandDetails.status;
			this.state.live.tests.runs[commandIndex].stdout = commandDetails.stdout;
			this.updateState();
		}
	},

	onInitiateScaleScreen() {
		debug('onInitiateScaleScreen');
		const possibleScale = this.getPossibleScale();
		debug('onInitiateScaleScreen', {possibleScale});
		if (possibleScale < 1.0 || this.state.live.isFullscreen) {
			LiveActions.enterScaledscreen();
		} else {
			LiveActions.exitScaledscreen();
		}
	},

	onVncDisconnect() {
		debug('onVncDisconnect');
		LiveActions.liveConnect(this.state.liveInfo.avm_id);
	},

	// Methods //

	// Status Box

	resetMachine() {
		this.state.live.screen.ip = null;
		this.state.live.screen.port = null;
		this.state.live.screen.rotation = 'horizontal';
		this.state.live.delayedRotation = 'horizontal';
		this.state.live.battery = 100;
		// TODO: initial state of sensors should come from live status
		this.state.live.sensors = {};
		// this.state.live.sensors.accelerometer = {x: 0, y: 5.9, z: 0};
		// this.state.live.sensors.battery = {level_percent: 100, ac_online: 1}; // eslint-disable-line camelcase
	},

	resetLive() {
		this.state.live = {};
		this.state.live.isFullscreen = false;
		this.state.live.isScaledscreen = false;
		this.state.live.scale = 1;
		this.state.live.logBox = [];
		this.state.live.screen = {};
		this.resetMachine();
		this.state.live.recording = false;
		this.state.live.rotationSets = {
			horizontal: {x: 0, y: 5.9, z: 0, next: 'vertical'},
			vertical: {x: 5.9, y: 0, z: 0, next: 'horizontal'}
		};
		this.state.live.recordingFileName = '';
		this.state.live.tests = {};
		this.state.live.tests.packages = [];
		this.state.live.tests.runs = [];
	},

	calculateScale() {
		this.setScale(this.getPossibleScale());
	},

	getPossibleScale() {
		debug('getPossibleScale1');
		const width = this.state.liveInfo.hwconfig.width;
		const height = this.state.liveInfo.hwconfig.height;
		const rotation = this.state.live.properties ? this.state.live.properties['aicd.screen_rotation'] : '0';
		const possibleScale = calcScreenScale(width, height, rotation, this.state.live.isFullscreen);
		debug('getPossibleScale2', {possibleScale});
		return possibleScale;
	},

	setScale(value) {
		this.state.live.scale = value;
		NoVNCAdapter.resizeByScale(value);
	},

	updateList() {
		if (this.state.projectId) {
			Notify.startListSessions({projectId: this.state.projectId});
			Notify.startUserQuota({projectId: this.state.projectId});
		}
	},

	updateSensors() {
		// "aicd.ac.online": "1",
  //   "aicd.accelerometer.x": "0.000000",
  //   "aicd.accelerometer.y": "-5.900000",
  //   "aicd.accelerometer.z": "0.000000",
  //   "aicd.barometer.pressure": "999.000000",
  //   "aicd.battery.full": "50000000",
  //   "aicd.battery.level": "22500000",
  //   "aicd.battery.mode": "manual",
  //   "aicd.battery.status": "Charging",
  //   "aicd.device.id": "00000000000000",
  //   "aicd.gps.altitude": "0",
  //   "aicd.gps.bearing": "0",
  //   "aicd.gps.latitude": "0",
  //   "aicd.gps.longitude": "0",
  //   "aicd.gravity.x": "0.000000",
  //   "aicd.gravity.y": "9.776219",
  //   "aicd.gravity.z": "0.813417",
  //   "aicd.gyroscope.azimuth": "0.000000",
  //   "aicd.gyroscope.pitch": "0.000000",
  //   "aicd.gyroscope.roll": "0.000000",
  //   "aicd.hygrometer.humidity": "88.000000",
  //   "aicd.linearacc.x": "0.000000",
  //   "aicd.linearacc.y": "0.000000",
  //   "aicd.linearacc.z": "0.000000",
  //   "aicd.luxmeter.light": "88.000000",
  //   "aicd.magnetometer.x": "7.000000",
  //   "aicd.magnetometer.y": "8.000000",
  //   "aicd.magnetometer.z": "9.000000",
  //   "aicd.orientation.azimuth": "0.000000",
  //   "aicd.orientation.pitch": "0.000000",
  //   "aicd.orientation.roll": "0.000000",
  //   "aicd.screen_rotation": "270",
  //   "aicd.telemeter.distance": "8.000000",
  //   "aicd.thermometer.temperature": "9.000000",
		this.state.live.sensors.accelerometer = {
			x: this.state.live.properties['aicd.accelerometer.x'],
			y: this.state.live.properties['aicd.accelerometer.y'],
			z: this.state.live.properties['aicd.accelerometer.z']
		};
		this.state.live.sensors.battery = {
			level_percent: parseInt(this.state.live.properties['aicd.battery.level'], 10) / parseInt(this.state.live.properties['aicd.battery.full'], 10), // eslint-disable-line camelcase
			ac_online: this.state.live.properties['aicd.ac.online'] // eslint-disable-line camelcase
		};
		this.state.live.sensors.pressure = {
			pressure: this.state.live.properties['aicd.barometer.pressure']
		};
		this.state.live.sensors.gps = {
			latitude: this.state.live.properties['aicd.gps.latitude'],
			longitude: this.state.live.properties['aicd.gps.longitude'],
			altitude: this.state.live.properties['aicd.gps.altitude'],
			bearing: this.state.live.properties['aicd.gps.bearing']
		};
		this.state.live.sensors.gravity = {
			x: this.state.live.properties['aicd.gravity.x'],
			y: this.state.live.properties['aicd.gravity.y'],
			z: this.state.live.properties['aicd.gravity.z']
		};
	},

	// State update

	updateState() {
		debug('updateState', 'new state', this.state);
		// If the machine goes to any failed state we should stop all polling
		if (this.state.live.status.substr(-6) === 'FAILED') {
			// TODO: should it stop polling?
		}
		this.trigger(this.state);
	}

});

module.exports = LiveStore;
