'use strict';

// Vendor
import React from 'react';
const debug = require('debug')('AiC:Components:Project:Live:LiveToolbox');

// APP

// Android toolbar
const TOOLBAR_ANDROID = 'android';
const TOOLBAR_SENSORS = 'sensors';
const TOOLBAR_CAMERA = 'camera';
const TOOLBAR_GSM = 'gsm';
const TOOLBAR_APKS = 'apks';
const TOOLBAR_MONKEYURUNNER = 'monkeyRunner';
const TOOLBAR_MAIN_ORDER = [TOOLBAR_SENSORS, TOOLBAR_CAMERA, TOOLBAR_GSM, TOOLBAR_APKS, TOOLBAR_MONKEYURUNNER, TOOLBAR_ANDROID];

// Sensors toolbar
const TOOLBAR_GPS = 'gps';
const TOOLBAR_BATTERY = 'battery';
const TOOLBAR_ACCELEROMETER = 'accelerometer';
const TOOLBAR_LIGHT = 'light';
const TOOLBAR_GRAVITY = 'gravity';
const TOOLBAR_GYROSCOPE = 'gyroscope';
const TOOLBAR_LINEARACC = 'linear_acc';
const TOOLBAR_MAGNETOMETER = 'magnetometer';
const TOOLBAR_ORIENTATION = 'orientation';
const TOOLBAR_PRESSURE = 'pressure';
const TOOLBAR_PROXIMITY = 'proximity';
const TOOLBAR_HUMIDITY = 'relative_humidity';
const TOOLBAR_TEMPERATURE = 'temperature';
const TOOLBAR_SENSORS_ORDER = [TOOLBAR_GPS, TOOLBAR_BATTERY, TOOLBAR_ACCELEROMETER, TOOLBAR_LIGHT, TOOLBAR_GRAVITY, TOOLBAR_GYROSCOPE, TOOLBAR_LINEARACC, TOOLBAR_MAGNETOMETER, TOOLBAR_ORIENTATION, TOOLBAR_PRESSURE, TOOLBAR_PROXIMITY, TOOLBAR_HUMIDITY, TOOLBAR_TEMPERATURE];

// APKs panels
const PANEL_APKS_UPLOAD = 'apkUpload';
const PANEL_APKS_INSTALL = 'apkInstall';
const PANEL_APKS_UNINSTALL = 'apkUninstall';
const PANEL_APKS_ORDER = [PANEL_APKS_UPLOAD, PANEL_APKS_INSTALL, PANEL_APKS_UNINSTALL];

// GSM panels
const PANEL_GSM_CALL = 'gsmCall';
const PANEL_GSM_ACCEPTCALL = 'gsmAcceptCall';
const PANEL_GSM_HOLDCALL = 'gsmHoldCall';
const PANEL_GSM_CANCELCALL = 'gsmCancelCall';
const PANEL_GSM_SMS = 'gsmSMS';
const PANEL_GSM_SIGNAL = 'gsmSignal';
const PANEL_GSM_NETWORK = 'gsmNetwork';
const PANEL_GSM_ROAMING = 'gsmRoaming';
const PANEL_GSM_ORDER = [PANEL_GSM_CALL, PANEL_GSM_ACCEPTCALL, PANEL_GSM_HOLDCALL, PANEL_GSM_CANCELCALL, PANEL_GSM_SMS, PANEL_GSM_SIGNAL, PANEL_GSM_NETWORK, PANEL_GSM_ROAMING];

// Components
// NOFIX: can not put in a map because browserify will then not resolve the requires
const toolbars = {};

// Main bar
toolbars.android = require('app/components/toolbar/toolbar-android');

// Secondary bars
toolbars.sensors = require('app/components/toolbar/toolbar-sensors');
toolbars.camera = require('app/components/toolbar/toolbar-camera');
toolbars.gsm = require('app/components/toolbar/toolbar-gsm');
toolbars.apks = require('app/components/toolbar/toolbar-apks');
toolbars.error = require('app/components/toolbar/toolbar-error');

// Sensors panels
toolbars.gps = require('app/components/toolbar/toolbar-gps');
toolbars.battery = require('app/components/toolbar/toolbar-battery');
toolbars.accelerometer = require('app/components/toolbar/toolbar-accelerometer');
toolbars.light = require('app/components/toolbar/toolbar-light');
toolbars.gravity = require('app/components/toolbar/toolbar-gravity');
toolbars.gyroscope = require('app/components/toolbar/toolbar-gyroscope');
toolbars.linear_acc = require('app/components/toolbar/toolbar-linearacc'); // eslint-disable-line camelcase
toolbars.magnetometer = require('app/components/toolbar/toolbar-magnetometer');
toolbars.orientation = require('app/components/toolbar/toolbar-orientation');
toolbars.pressure = require('app/components/toolbar/toolbar-pressure');
toolbars.proximity = require('app/components/toolbar/toolbar-proximity');
toolbars.relative_humidity = require('app/components/toolbar/toolbar-humidity'); // eslint-disable-line camelcase
toolbars.temperature = require('app/components/toolbar/toolbar-temperature');

// APKs panels
toolbars.apkUpload = require('app/components/toolbar/toolbar-apks-upload');
toolbars.apkInstall = require('app/components/toolbar/toolbar-apks-install');
toolbars.apkUninstall = require('app/components/toolbar/toolbar-apks-uninstall');

// GSM panels
toolbars.gsmCall = require('app/components/toolbar/toolbar-gsm-call');
toolbars.gsmSMS = require('app/components/toolbar/toolbar-gsm-sms');
toolbars.gsmSignal = require('app/components/toolbar/toolbar-gsm-signal');
toolbars.gsmNetwork = require('app/components/toolbar/toolbar-gsm-network');
toolbars.gsmRoaming = require('app/components/toolbar/toolbar-gsm-roaming');

// Monkey Runner
// http://developer.android.com/intl/es/tools/help/monkey.html
// adb shell pm list packages -f
// adb shell pm list packages -f | grep data
// adb shell monkey -p com.vonglasow.michael.satstat --throttle 500 -v 10

const LiveToolbox = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeBar: TOOLBAR_ANDROID,
			activeSecondBar: null
		};

		// Secondary toolbars
		this.handleClickFirstBar = {};
		TOOLBAR_MAIN_ORDER.forEach(v => {
			this.handleClickFirstBar[v] = this.changeActiveToolbar.bind(this, v);
		});

		this.handleClickFirstBar.monkeyRunner = e => {
			this.props.onChangeSensor('system', e, {
				uid: '123',
				command: 'shell',
				// params: 'pm list packages -f'
				params: 'monkey --throttle 500 -v 10'
			});
		};

		this.handleClickFirstBar.terminate = () => {
			this.props.onClickTerminate();
		};

		// Third toolbars - Panels
		this.handleClickSecondBar = {};
		this.handleClickSecondBar.android = this.changeActiveToolbar.bind(this, TOOLBAR_ANDROID);
		TOOLBAR_SENSORS_ORDER.forEach(v => {
			this.handleClickFirstBar[v] = this.changeActiveSecondToolbar.bind(this, v);
		});
		PANEL_APKS_ORDER.forEach(v => {
			this.handleClickFirstBar[v] = this.changeActiveSecondToolbar.bind(this, v);
		});
		PANEL_GSM_ORDER.forEach(v => {
			// TODO: fix phone_number
			if (v === 'gsmAcceptCall') {
				this.handleClickFirstBar[v] = e => this.handleGSM(e, 'call', {action: 'accept', phone_number: this.props.sensorsValues['gsm/call'].phone_number}); // eslint-disable-line camelcase
			} else if (v === 'gsmHoldCall') {
				this.handleClickFirstBar[v] = e => this.handleGSM(e, 'call', {action: 'hold', phone_number: this.props.sensorsValues['gsm/call'].phone_number}); // eslint-disable-line camelcase
			} else if (v === 'gsmCancelCall') {
				this.handleClickFirstBar[v] = e => this.handleGSM(e, 'call', {action: 'cancel', phone_number: this.props.sensorsValues['gsm/call'].phone_number}); // eslint-disable-line camelcase
			} else {
				this.handleClickFirstBar[v] = this.changeActiveSecondToolbar.bind(this, v);
			}
		});

		this.handleAPKs = (e, apkId) => this.props.onInstallAPK(e, apkId);
		this.handleGSM = (e, action, payload) => this.props.onChangeSensor(`gsm/${action}`, e, payload);
	}

	changeActiveToolbar(toolbar) {
		this.setState({activeBar: toolbar, activeSecondBar: null});
	}

	changeActiveSecondToolbar(toolbar) {
		this.setState({activeSecondBar: toolbar});
	}

	handleChangeSensors(sensorType, e, payload) {
		this.props.onChangeSensor(sensorType, e, payload);
	}

	render() {
		const styles = {
			secondToolbar: {
				marginLeft: 0,
				marginRight: 0
			}
		};

		// Build the main toolbar
		let currentBar;

		if (this.state.activeBar === null) {
			currentBar = null;
		} else if (TOOLBAR_MAIN_ORDER.indexOf(this.state.activeBar) === -1) {
			currentBar = React.createElement(toolbars.error);
			debug('could not find main toolbar', this.state.activeBar);
		} else {
			const props = {
				onClick: this.handleClickFirstBar
			};
			currentBar = React.createElement(toolbars[this.state.activeBar], props);
		}

		// Build second toolbar (when clicking on the sensors for example)
		let currentSecondBar;

		if (this.state.activeSecondBar === null) {
			currentSecondBar = null;
		} else if (TOOLBAR_SENSORS_ORDER.indexOf(this.state.activeSecondBar) !== -1) {
			const onChangeSensorBinded = this.handleChangeSensors.bind(this, this.state.activeSecondBar);
			const props = {
				style: styles.secondToolbar,
				onInputFocus: this.props.onInputFocus,
				onInputBlur: this.props.onInputBlur,
				onChange: onChangeSensorBinded
			};
			props[this.state.activeSecondBar] = this.props.sensorsValues[this.state.activeSecondBar];
			debug('currentSecondBar props', props);
			currentSecondBar = React.createElement(toolbars[this.state.activeSecondBar], props);
		} else if (PANEL_APKS_ORDER.indexOf(this.state.activeSecondBar) !== -1) { // eslint-disable-line no-negated-condition
			const props = {
				apkList: this.props.apkList,
				onClick: this.handleAPKs
			};
			currentSecondBar = React.createElement(toolbars[this.state.activeSecondBar], props);
		} else if (PANEL_GSM_ORDER.indexOf(this.state.activeSecondBar) !== -1) { // eslint-disable-line no-negated-condition
			const props = {
				onChange: this.handleGSM,
				onInputFocus: this.props.onInputFocus,
				onInputBlur: this.props.onInputBlur
			};
			currentSecondBar = React.createElement(toolbars[this.state.activeSecondBar], props);
		} else {
			currentSecondBar = React.createElement(toolbars.error);
			debug('could not find second toolbar', this.state.activeSecondBar);
		}

		return (
			<div style={styles.wrapper}>
				{currentBar}
				{currentSecondBar}
			</div>
		);
	}
};

LiveToolbox.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

LiveToolbox.propTypes = {
	onChangeSensor: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
	sensorsValues: React.PropTypes.object,
	onClickTerminate: React.PropTypes.func,
	onInstallAPK: React.PropTypes.func,
	apkList: React.PropTypes.array
};

module.exports = LiveToolbox;
