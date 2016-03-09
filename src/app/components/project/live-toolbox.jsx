'use strict';

// Vendor
import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const debug = require('debug')('AiC:Components:Project:Live:LiveToolbox');

// APP

// Android toolbar
const TOOLBAR_ANDROID = 'android';
const TOOLBAR_SENSORS = 'sensors';
const TOOLBAR_CAMERA = 'camera';
const TOOLBAR_GSM = 'gsm';
const TOOLBAR_APKS = 'apks';
const TOOLBAR_MAIN_ORDER = [TOOLBAR_SENSORS, TOOLBAR_CAMERA, TOOLBAR_GSM, TOOLBAR_APKS, TOOLBAR_ANDROID];

// Sensors toolbar
const TOOLBAR_GPS = 'gps';
const TOOLBAR_BATTERY = 'battery';
const TOOLBAR_ACCELEROMETER = 'accelerometer';
const TOOLBAR_LIGHT = 'light';
const TOOLBAR_GRAVITY = 'gravity';
const TOOLBAR_GYROSCOPE = 'gyroscope';
const TOOLBAR_LINEARACC = 'linearacc';
const TOOLBAR_MAGNETOMETER = 'magnetometer';
const TOOLBAR_ORIENTATION = 'orientation';
const TOOLBAR_PRESSURE = 'pressure';
const TOOLBAR_PROXIMITY = 'proximity';
const TOOLBAR_HUMIDITY = 'humidity';
const TOOLBAR_TEMPERATURE = 'temperature';
const TOOLBAR_SENSORS_ORDER = [TOOLBAR_GPS, TOOLBAR_BATTERY, TOOLBAR_ACCELEROMETER, TOOLBAR_LIGHT, TOOLBAR_GRAVITY, TOOLBAR_GYROSCOPE, TOOLBAR_LINEARACC, TOOLBAR_MAGNETOMETER, TOOLBAR_ORIENTATION, TOOLBAR_PRESSURE, TOOLBAR_PROXIMITY, TOOLBAR_HUMIDITY, TOOLBAR_TEMPERATURE];

// APKs panels
const PANEL_APKS_UPLOAD = 'apkUpload';
const PANEL_APKS_INSTALL = 'apkInstall';
const PANEL_APKS_UNINSTALL = 'apkUninstall';
const PANEL_APKS_ORDER = [PANEL_APKS_UPLOAD, PANEL_APKS_INSTALL, PANEL_APKS_UNINSTALL];

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
toolbars.linearacc = require('app/components/toolbar/toolbar-linearacc');
toolbars.magnetometer = require('app/components/toolbar/toolbar-magnetometer');
toolbars.orientation = require('app/components/toolbar/toolbar-orientation');
toolbars.pressure = require('app/components/toolbar/toolbar-pressure');
toolbars.proximity = require('app/components/toolbar/toolbar-proximity');
toolbars.humidity = require('app/components/toolbar/toolbar-humidity');
toolbars.temperature = require('app/components/toolbar/toolbar-temperature');

// APKs panels
toolbars.apkUpload = require('app/components/toolbar/toolbar-apks-upload');
toolbars.apkInstall = require('app/components/toolbar/toolbar-apks-install');
toolbars.apkUninstall = require('app/components/toolbar/toolbar-apks-uninstall');

const LiveToolbox = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeBar: TOOLBAR_ANDROID,
			activeSecondBar: null
		};

		// Secondary toolbars
		this.handleClickFirstBar = {};
		TOOLBAR_MAIN_ORDER.map(v => {
			this.handleClickFirstBar[v] = this.changeActiveToolbar.bind(this, v);
		});

		this.handleClickFirstBar.terminate = () => {
			this.props.onClickTerminate();
		};

		// Third toolbars - Panels
		this.handleClickSecondBar = {};
		this.handleClickSecondBar.android = this.changeActiveToolbar.bind(this, TOOLBAR_ANDROID);
		TOOLBAR_SENSORS_ORDER.map(v => {
			this.handleClickFirstBar[v] = this.changeActiveSecondToolbar.bind(this, v);
		});
		PANEL_APKS_ORDER.map(v => {
			this.handleClickFirstBar[v] = this.changeActiveSecondToolbar.bind(this, v);
		});

		this.handleAPKs = (e, apkId) => this.props.onInstallAPK(e, apkId);
	}

	changeActiveToolbar(toolbar) {
		this.setState({activeBar: toolbar, activeSecondBar: null});
	}

	changeActiveSecondToolbar(toolbar) {
		this.setState({activeSecondBar: toolbar});
	}

	handleChangeSensors(sensorType, e, payload) {
		console.warn(arguments);
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

		// switch (this.state.activeBar) {
		// 	case TOOLBAR_ANDROID:
		// 		currentBar = (
		// 			<ToolbarAndroid
		// 				key={1}
		// 				style={styles.toolbar}
		// 				onClickSensor={this.handleClickSensor}
		// 				onClickCamera={this.handleClickCamera}
		// 				onClickGSM={this.handleClickGSM}
		// 				onClickAPKs={this.handleClickAPKs}
		// 				onClickTerminate={this.props.onClickTerminate}
		// 				/>
		// 		);
		// 		break;
		// 	case TOOLBAR_SENSORS:
		// 		currentBar = (
		// 			<ToolbarSensors
		// 				key={2}
		// 				selectedIndex={TOOLBAR_SENSORS_ORDER.indexOf(this.state.activeSecondBar)}
		// 				style={styles.toolbar}
		// 				onClickBack={this.handleClickBack}
		// 				onClickGPS={this.handleClickGPS}
		// 				onClickBattery={this.handleClickBattery}
		// 				onClickAccelerometer={this.handleClickAccelerometer}
		// 				onClickLight={this.handleClickLight}
		// 				onClickGravity={this.handleClickGravity}
		// 				onClickGyroscope={this.handleClickGyroscope}
		// 				onClickLinearAcc={this.handleClickLinearAcc}
		// 				onClickMagnetometer={this.handleClickMagnetometer}
		// 				onClickOrientation={this.handleClickOrientation}
		// 				onClickPressure={this.handleClickPressure}
		// 				onClickProximity={this.handleClickProximity}
		// 				onClickHumidity={this.handleClickHumidity}
		// 				onClickTemperature={this.handleClickTemperature}
		// 				/>
		// 		);
		// 		break;
		// 	case TOOLBAR_CAMERA:
		// 		currentBar = <ToolbarCamera key={3} style={styles.toolbar} onClickBack={this.handleClickBack}/>;
		// 		break;
		// 	case TOOLBAR_GSM:
		// 		currentBar = <ToolbarGSM key={4} style={styles.toolbar} onClickBack={this.handleClickBack}/>;
		// 		break;
		// 	case TOOLBAR_APKS:
		// 		currentBar = <ToolbarAPKs key={5} style={styles.toolbar} onClickBack={this.handleClickBack}/>;
		// 		break;
		// 	default:
		// 		debug('could not find toolbar', this.state.activeBar);
		// 		break;
		// }

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
			currentSecondBar = React.createElement(toolbars[this.state.activeSecondBar], props);
		} else if (PANEL_APKS_ORDER.indexOf(this.state.activeSecondBar) !== -1) {
			// const onChangeSensorBinded = this.handleChangeSensors.bind(this, this.state.activeSecondBar);
			// const props = {
			// 	style: styles.secondToolbar,
			// 	onInputFocus: this.props.onInputFocus,
			// 	onInputBlur: this.props.onInputBlur,
			// 	onChange: onChangeSensorBinded
			// };
			// props[this.state.activeSecondBar] = this.props.sensorsValues[this.state.activeSecondBar];
			const props = {
				apkList: this.props.apkList,
				onClick: this.handleAPKs
			};
			currentSecondBar = React.createElement(toolbars[this.state.activeSecondBar], props);
		} else {
			currentSecondBar = React.createElement(toolbars.error);
			debug('could not find second toolbar', this.state.activeSecondBar);
		}

		// <ReactCSSTransitionGroup transitionName="hideToBottom" transitionEnterTimeout={1200} transitionLeaveTimeout={1200}>
		// </ReactCSSTransitionGroup>

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
	onClickTerminate: React.PropTypes.func
};

module.exports = LiveToolbox;
