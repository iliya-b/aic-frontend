'use strict';

// Vendor
import Reflux from 'reflux';
const debug = require('debug')('AiC:Stores:Live');

// APP
import AppUtils from 'app/components/shared/app-utils';
import LiveActions from 'app/actions/live';
import APKActions from 'app/actions/apk';
import CameraActions from 'app/actions/camera';
import AppActions from 'app/actions/app';
import PollingActions from 'app/actions/polling';

// Store
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

	// Set project
	onSetProjectId(projectId) {
		this.state.projectId = projectId;

		this.changeBoxes('load', 'enabled', false);
		this.changeBoxes('create', 'enabled', true);

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

	// Load info
	onLoadInfo() {
		if (this.state.live.status === 'LIVE_STATUS_INITIALIZED') {
			this.state.live.status = 'LIVE_STATUS_CHECKING';
			this.updateState();
		}
		// this.updateState();
	},

	onLoadInfoCompleted(avmInfo) {
		// avmInfo.avm_novnc_host
		// window.GobyAppGlobals.config.backend.host
		debug('avmInfo', avmInfo);
		this.state.liveInfo = avmInfo;
		if (this.state.live.status === 'LIVE_STATUS_CHECKING') {
			this.state.live.status = 'LIVE_STATUS_CHECK_FOUND';
			this.updateBoxes();
			this.state.live.status = 'LIVE_STATUS_STARTING';
			this.updateBoxes();
		}
		if (!this.state.live.liveIsConnect &&
			avmInfo.avm_status === 'READY') {
			this.state.live.liveIsConnect = true;
			// Load properties each x seconds
			// TODO: should be changed once notification is done?
			this.onClearTimeouts();
			// After ready the docker needs to boot up
			// TODO: change to state
			// window.intervalTimeout = setInterval(LiveActions.properties, 1000, {avmId: this.state.liveInfo.avm_id}, {showError500Dialog: false});
			// LiveActions.properties({avmId: this.state.liveInfo.avm_id}, {showError500Dialog: false});
			PollingActions.start('liveProperties', {avmId: this.state.liveInfo.avm_id}, {showError500Dialog: false});
		}
		this.updateState();
	},

	onLoadInfoFailed(errorMessage) {
		debug('errorMessage', errorMessage);
		this.state.live.message = errorMessage;
		// this.state.live.status = 'LIVE_STATUS_INITIAL_FAILED';
		this.state.live.status = 'LIVE_STATUS_CHECK_FAILED';
		this.onClearTimeouts();
		// this.updateState();
		debug('not found avm', this);
		AppActions.notFound();
	},

	onClearTimeouts() {
		// clearInterval(window.intervalTimeoutLoad);
		// clearInterval(window.intervalTimeout);
		PollingActions.stop('liveLoadInfo');
		PollingActions.stop('liveProperties');
	},

	// Load State
	onLoadState() {
		this.updateState();
	},

	onSetState(newState) {
		this.state = newState;
		this.updateState();
	},

	onLiveReset() {
		this.resetLive();
		this.state.live.status = 'LIVE_STATUS_RESET';
		this.updateState();
	},

	// Live list
	onStart() {
		this.state.live.status = 'LIVE_STATUS_VMSTARTING';
		this.updateState();
	},

	onStartCompleted(avm) {
		this.state.live.avm = avm;
		this.state.live.status = 'LIVE_STATUS_VMSTARTED';
		this.updateState();
	},

	onStartFailed(errorMessage) {
		this.state.live.status = 'LIVE_STATUS_VMSTART_FAILED';
		this.state.live.message = errorMessage;
		this.updateState();
	},

	// // Live check
	// onLiveCheck() {
	// 	this.addLogMessage('Searching session.');
	// 	this.state.live.status = 'LIVE_STATUS_CHECKING';
	// 	this.updateState();
	// },

	// onLiveCheckCompleted(sessionFound) {
	// 	this.state.live.sessionFound = sessionFound;
	// 	this.state.live.status = sessionFound ? 'LIVE_STATUS_CHECK_FOUND' : 'LIVE_STATUS_CHECK_NOTFOUND';
	// 	this.changeBoxes('load', 'enabled', sessionFound);
	// 	this.changeBoxes('create', 'enabled', !sessionFound);
	// 	this.updateState();
	// },

	// onLiveCheckFailed(errorMessage) {
	// 	this.state.live.status = 'LIVE_STATUS_CHECK_FAILED';
	// 	this.state.live.message = errorMessage;
	// 	this.updateState();
	// },

	// // Live start
	// onLiveStart() {
	// 	this.state.live.status = 'LIVE_STATUS_STARTING';
	// 	this.updateState();
	// },

	// onLiveStartCompleted(screenIP, screenPort) {
	// 	this.state.live.screen.ip = screenIP;
	// 	this.state.live.screen.port = screenPort;
	// 	this.state.live.screen.rotation = 'horizontal';
	// 	this.state.live.delayedRotation = 'horizontal';
	// 	this.state.live.status = 'LIVE_STATUS_STARTED';
	// 	this.updateState();
	// },

	// onLiveStartFailed(errorMessage) {
	// 	this.state.live.status = 'LIVE_STATUS_START_FAILED';
	// 	this.state.live.message = errorMessage;
	// 	this.updateState();
	// },

	// Live connect
	// onLiveConnect(vmhost, vmport) {
	onLiveConnect() {
		debug('onLiveConnect');
		debug(arguments);
		this.state.live.status = 'LIVE_STATUS_CONNECTING';
		this.updateState();
		LiveActions.liveConnectAudio(this.state.liveInfo.avm_id);
		// TODO: should be enabled again one day
		// audioEnabled === false
		// LiveActions.tryAudioConnection(vmhost, vmport + 10000, () => {});
	},

	onLiveConnectCompleted() {
		debug('onLiveConnectCompleted');
		debug(arguments);
		this.state.live.status = 'LIVE_STATUS_CONNECTED';
		this.updateState();
	},

	onLiveConnectFailed(errorMessage) {
		debug('onLiveConnectFailed');
		debug(errorMessage);
		debug(arguments);
		this.state.live.status = 'LIVE_STATUS_CONNECT_FAILED';
		this.state.live.message = errorMessage;
		this.updateState();
	},

	// // Live stop
	// onLiveStop() {
	// 	this.state.live.status = 'LIVE_STATUS_STOPPING';
	// 	this.updateState();
	// },

	// onLiveStopCompleted() {
	// 	this.resetMachine();
	// 	this.state.live.status = 'LIVE_STATUS_STOPPED';
	// 	this.updateState();
	// },

	// onLiveStopFailed(errorMessage) {
	// 	this.state.live.status = 'LIVE_STATUS_STOP_FAILED';
	// 	this.state.live.message = errorMessage;
	// 	this.updateState();
	// },

	// Live stop v2
	onStop(request) {
		debug('onStop', request);
		if (request.avmId !== this.state.liveInfo.avm_id) {
			debug('onStop', 'request for another vm');
			return;
		}
		this.onClearTimeouts();
		this.state.live.status = 'LIVE_STATUS_STOPPING';
		this.updateState();
	},

	onStopCompleted(response) {
		// this.resetMachine();
		if (response.request.avmId !== this.state.liveInfo.avm_id) {
			debug('onStopCompleted', 'request for another vm');
			return;
		}
		this.state.live.status = 'LIVE_STATUS_STOPPED';
		this.updateState();
	},

	onStopFailed(response) {
		if (response.request.avmId !== this.state.liveInfo.avm_id) {
			debug('onStopCompleted', 'request for another vm');
			return;
		}
		this.state.live.status = 'LIVE_STATUS_STOP_FAILED';
		this.state.live.message = response.error;
		this.updateState();
	},

	// Live sensors

	onSetSensor(avmId, sensor, payload) {
		this.state.live.sensors[sensor] = payload;
		if (sensor === 'accelerometer') {
			this.state.live.delayedRotation = this.isRotation(payload, 'horizontal') ? 'horizontal' : 'vertical';
		}
		this.updateState();
	},

	// onSetSensorBattery(projectId, value) {
	// 	this.state.live.battery = value;
	// },

	// onSetSensorAccelerometer(projectId, x, y, z, newRotationName) {
	// 	this.state.live.screen.rotation = newRotationName;
	// 	this.updateState();
	// },

	// onSetDelayedRotation() {
	// 	this.state.live.delayedRotation = this.state.live.screen.rotation;
	// 	this.updateState();
	// },

	// onRecordStart() {
	// 	this.state.live.recording = true;
	// 	this.updateState();
	// },

	// onRecordStartCompleted(filename) {
	// 	this.state.live.recording = true;
	// 	this.state.live.recordingFileName = filename;
	// 	this.updateState();
	// },

	// onRecordStop() {
	// 	this.state.live.recording = false;
	// 	this.updateState();
	// },

	// // Socket Message
	// onSocketMessage(message) {
	// 	const messageParsed = JSON.parse(message.data);
	// 	debug('onSocketMessage', messageParsed);
	// 	if (messageParsed.hasOwnProperty('message')) {
	// 		this.addLogMessage(messageParsed.message);
	// 		switch (messageParsed.message) {
	// 			case 'Stack retrieval or creation finished':
	// 				LiveActions.liveCheck.completed(false);
	// 				LiveActions.liveStart();
	// 				break;
	// 			case 'Docker created and ready.':
	// 				debug('docker created');
	// 				LiveActions.liveStart.completed(messageParsed.data.vncip, messageParsed.data.vncport);
	// 				LiveActions.liveConnect(messageParsed.data.vncip, messageParsed.data.vncport);
	// 				break;
	// 			default:
	// 				// TODO: error
	// 				break;
	// 		}
	// 	} else if (messageParsed.hasOwnProperty('error')) {
	// 		switch (this.state.live.status) {
	// 			case 'LIVE_STATUS_CHECKING':
	// 				LiveActions.liveCheck.failed(messageParsed.error);
	// 				break;
	// 			case 'LIVE_STATUS_STARTING':
	// 				LiveActions.liveStart.failed(messageParsed.error);
	// 				break;
	// 			default:
	// 				// TODO: error
	// 				break;
	// 		}
	// 	}
	// },

	onLogMessage(message) {
		this.addLogMessage(message);
	},

	// List Packages
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
		this.state.live.status = 'LIVE_STATUS_LISTPACKAGES_FAILED';
		this.updateState();
	},

	// install APK
	onInstallAPK(request) {
		debug('onInstallAPK');
		const {apkId, refId} = request;
		this.state.live.installedAPKs = this.state.live.installedAPKs || [];
		this.state.live.installedAPKs.push({
			refId,
			apkId,
			status: 'INSTALLING',
			startTime: Date.now()
		});
		this.updateState();
	},

	onInstallAPKCompleted(response) {
		debug('onInstallAPKCompleted');
		const refId = response.request.refId;
		LiveActions.listPackages({avmId: this.state.liveInfo.avm_id});
		const index = this.state.live.installedAPKs.reduce((found, apk, index) => {
			return apk.refId === refId ? index : found;
		}, -1);
		if (index !== -1) {
			this.state.live.installedAPKs[index].endTime = Date.now();
			this.state.live.installedAPKs[index].status = 'SUCCESS';
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
			this.state.live.installedAPKs[index].endTime = Date.now();
			this.state.live.installedAPKs[index].status = 'ERROR';
		}
		this.state.live.message = response.error;
		this.state.live.status = 'LIVE_STATUS_INSTALLAPK_FAILED';
		this.updateState();
	},

	// Monkey Runner
	onMonkeyRunner(request) {
		const {packages, eventCount, throttle, refId} = request;
		debug('onMoneyRunner');
		this.state.live.monkeyCalls = this.state.live.monkeyCalls || [];
		this.state.live.monkeyCalls.push({
			id: refId,
			status: 'LOADING',
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
			this.state.live.monkeyCalls[index].endTime = Date.now();
			this.state.live.monkeyCalls[index].status = 'SUCCESS';
		}
		this.updateState();
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
		}
		this.state.live.message = response.error;
		this.state.live.status = 'LIVE_STATUS_MONKEYRUNNER_FAILED';
		this.updateState();
	},

	// Properties
	onProperties() {
		debug('onProperties');
	},

	onPropertiesCompleted(properties) {
		debug('onPropertiesCompleted', properties);

		debug('onPropertiesCompleted value', properties["dev.bootcomplete"] === "1");
		debug('onPropertiesCompleted value', !this.state.live.listPackages && properties["dev.bootcomplete"] === "1");
		debug('onPropertiesCompleted value', !this.state.live.bootInit && (properties["init.svc.bootanim"] === "1" || properties["dev.bootcomplete"] === "1"));

		// TODO: should be changed to machine state
		// boot completed
		if (!this.state.live.listPackages &&
			properties["dev.bootcomplete"] === "1") {
			debug('onPropertiesCompleted listPackages');
			LiveActions.listPackages({avmId: this.state.liveInfo.avm_id});
			// Only clearTimeouts when debugging to not have span on logs
			// this.onClearTimeouts();
		}

		// docker finished (not available) boot initiate
		if (!this.state.live.bootInit &&
			(properties["init.svc.bootanim"] === "running" || properties["dev.bootcomplete"] === "1")) {
		// if (!this.state.live.bootInit) {
			this.state.live.status = 'LIVE_STATUS_STARTED';
			this.updateBoxes();
			debug('onPropertiesCompleted boot initiate');
			this.state.live.bootInit = true;
			LiveActions.liveConnect(this.state.liveInfo.avm_id);
			APKActions.list({projectId: this.state.projectId});
			CameraActions.list({projectId: this.state.projectId});
		}

		this.state.live.properties = properties;
		this.updateState();
		PollingActions.stop('liveProperties');
	},

	onPropertiesFailed(errorMessage) {
		// this.onPropertiesCompleted({'dev.bootcomplete': '0'});
		// debug('onPropertiesFailure', errorMessage);
		// this.state.live.message = errorMessage;
		// this.state.live.status = 'LIVE_STATUS_PROPERTIES_FAILED';
		// this.updateState();
		this.state.live.propertiesFailureCount = this.state.live.propertiesFailureCount || 0;
		this.state.live.propertiesFailureCount += 1;
		debug('onPropertiesFailure', errorMessage, this.state.live.propertiesFailureCount);
		if (this.state.live.propertiesFailureCount >= 30) {
			// TODO: errorMessage should contain message
			this.state.live.message = 'It was not possible to reach the Android machine.';
			// this.state.live.status = 'LIVE_STATUS_LISTPACKAGES_FAILED';
			this.state.live.status = 'LIVE_STATUS_START_FAILED';
			this.updateState();
			PollingActions.stop('liveProperties');
		}
	},

	// Live list
	onList() {
		debug('onList');
		this.state.live.status = 'LIVE_STATUS_LISTING';
		this.updateState();
	},

	onListCompleted(avms) {
		debug('onListCompleted', avms);
		this.state.live.avms = avms;
		this.state.live.status = 'LIVE_STATUS_LISTED';
		this.updateState();
	},

	onListFailed(errorMessage) {
		debug('onListFailed');
		this.state.live.status = 'LIVE_STATUS_LIST_FAILED';
		this.state.live.message = errorMessage;
		this.updateState();
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
		this.state.live.sensors.accelerometer = {x: 0, y: 5.9, z: 0};
		this.state.live.sensors.battery = {level_percent: 100, ac_online: 1}; // eslint-disable-line camelcase
	},

	resetLive() {
		this.state.live = {};
		this.state.live.logBox = [];
		this.state.live.screen = {};
		this.resetMachine();
		this.state.live.recording = false;
		this.state.live.rotationSets = {
			horizontal: {x: 0, y: 5.9, z: 0, next: 'vertical'},
			vertical: {x: 5.9, y: 0, z: 0, next: 'horizontal'}
		};
		this.state.live.recordingFileName = '';
		this.resetBoxes();
	},

	resetBoxes() {
		this.state.live.boxes = [
			{typeName: 'search', status: 'disable', enabled: true, isFirst: true},
			{typeName: 'create', status: 'disable', enabled: false},
			{typeName: 'load', status: 'disable', enabled: true},
			{typeName: 'connect', status: 'disable', enabled: true},
			{typeName: 'close', status: 'disable', enabled: true, isLast: true}
		];
	},

	changeBoxes(typeName, field, newValue) {
		// debug(this.state);
		// debug(arguments);
		const replacement = {};
		replacement[field] = newValue;
		this.state.live.boxes = this.state.live.boxes.map(
			item => {
				return item.typeName === typeName ? AppUtils.extend(item, replacement) : item;
			}
		);
	},

	addLogMessage(message) {
		this.state.live.logBox.unshift({time: AppUtils.getDate(), message});
	},

	// TODO: change this to a state machine
	// http://stackoverflow.com/questions/13262392/javascript-event-state-machine
	// https://github.com/jakesgordon/javascript-state-machine
	// http://machina-js.org/
	statusUpdating: {
		LIVE_STATUS_INITIATING: {typeName: '', newStatus: ''},
		LIVE_STATUS_INITIALIZED: {typeName: '', newStatus: ''},
		LIVE_STATUS_INITIAL_FAILED: {typeName: '', newStatus: ''},

		LIVE_STATUS_LISTING: {typeName: 'list', newStatus: 'doing'},
		LIVE_STATUS_LISTED: {typeName: 'list', newStatus: 'success'},
		LIVE_STATUS_LIST_FAILED: {typeName: 'list', newStatus: 'fail'},

		LIVE_STATUS_VMSTARTING: {typeName: 'vmstart', newStatus: 'doing'},
		LIVE_STATUS_VMSTARTED: {typeName: 'vmstart', newStatus: 'success'},
		LIVE_STATUS_VMSTART_FAILED: {typeName: 'vmstart', newStatus: 'fail'},

		LIVE_STATUS_CHECKING: {typeName: 'search', newStatus: 'doing'},
		LIVE_STATUS_CHECK_FOUND: {typeName: 'search', newStatus: 'success'},
		LIVE_STATUS_CHECK_NOTFOUND: {typeName: 'search', newStatus: 'not-found'},
		LIVE_STATUS_CHECK_FAILED: {typeName: 'search', newStatus: 'fail'},

		LIVE_STATUS_LOADING: {typeName: 'load', newStatus: 'doing'},
		LIVE_STATUS_LOADED: {typeName: 'load', newStatus: 'success'},
		LIVE_STATUS_LOAD_FAILED: {typeName: 'load', newStatus: 'fail'},

		LIVE_STATUS_STARTING: {typeName: 'create', newStatus: 'doing'},
		LIVE_STATUS_STARTED: {typeName: 'create', newStatus: 'success'},
		LIVE_STATUS_START_FAILED: {typeName: 'create', newStatus: 'fail'},

		LIVE_STATUS_CONNECTING: {typeName: 'connect', newStatus: 'doing'},
		LIVE_STATUS_CONNECTED: {typeName: 'connect', newStatus: 'success'},
		LIVE_STATUS_CONNECT_FAILED: {typeName: 'connect', newStatus: 'fail'},

		LIVE_STATUS_STOPPING: {typeName: 'close', newStatus: 'doing'},
		LIVE_STATUS_STOPPED: {typeName: 'close', newStatus: 'success'},
		LIVE_STATUS_STOP_FAILED: {typeName: 'close', newStatus: 'fail'},

		LIVE_STATUS_RESET: {typeName: '', newStatus: ''}
	},

	isRotation(set, rotation) {
		return set.x === this.state.live.rotationSets[rotation].x && set.y === this.state.live.rotationSets[rotation].y && set.z === this.state.live.rotationSets[rotation].z;
	},

	updateBoxes() {
		const actualStatus = this.statusUpdating[this.state.live.status];
		this.changeBoxes(actualStatus.typeName, 'status', actualStatus.newStatus);
	},

	// State update

	updateState() {
		this.updateBoxes();
		this.trigger(this.state);
	}

});

module.exports = LiveStore;
