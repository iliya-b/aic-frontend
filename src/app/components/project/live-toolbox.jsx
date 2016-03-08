'use strict';

// Vendor
import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const debug = require('debug')('AiC:Components:Project:Live:LiveToolbox');

// APP
import ToolbarAndroid from 'app/components/toolbar/toolbar-android';
import ToolbarSensors from 'app/components/toolbar/toolbar-sensors';
import ToolbarCamera from 'app/components/toolbar/toolbar-camera';
import ToolbarGSM from 'app/components/toolbar/toolbar-gsm';
import ToolbarAPKs from 'app/components/toolbar/toolbar-apks';
import ToolbarError from 'app/components/toolbar/toolbar-error';

// Android toolbar
const TOOLBAR_ANDROID = 'android';
const TOOLBAR_SENSORS = 'sensors';
const TOOLBAR_CAMERA = 'camera';
const TOOLBAR_GSM = 'gsm';
const TOOLBAR_APKS = 'apks';
const TOOLBAR_NONE = null;

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

// NOFIX: can not put in a map because browserify will then not resolve the requires
const toolbars = {};
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

const LiveToolbox = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeBar: TOOLBAR_ANDROID,
			activeSecondBar: TOOLBAR_NONE
		};
		this.handleClickBack = this.changeActiveToolbar.bind(this, TOOLBAR_ANDROID);
		this.handleClickSensor = this.changeActiveToolbar.bind(this, TOOLBAR_SENSORS);
		this.handleClickCamera = this.changeActiveToolbar.bind(this, TOOLBAR_CAMERA);
		this.handleClickGSM = this.changeActiveToolbar.bind(this, TOOLBAR_GSM);
		this.handleClickAPKs = this.changeActiveToolbar.bind(this, TOOLBAR_APKS);

		this.handleClickGPS = this.changeActiveSecondToolbar.bind(this, TOOLBAR_GPS);
		this.handleClickBattery = this.changeActiveSecondToolbar.bind(this, TOOLBAR_BATTERY);
		this.handleClickAccelerometer = this.changeActiveSecondToolbar.bind(this, TOOLBAR_ACCELEROMETER);
		this.handleClickLight = this.changeActiveSecondToolbar.bind(this, TOOLBAR_LIGHT);
		this.handleClickGravity = this.changeActiveSecondToolbar.bind(this, TOOLBAR_GRAVITY);
		this.handleClickGyroscope = this.changeActiveSecondToolbar.bind(this, TOOLBAR_GYROSCOPE);
		this.handleClickLinearAcc = this.changeActiveSecondToolbar.bind(this, TOOLBAR_LINEARACC);
		this.handleClickMagnetometer = this.changeActiveSecondToolbar.bind(this, TOOLBAR_MAGNETOMETER);
		this.handleClickOrientation = this.changeActiveSecondToolbar.bind(this, TOOLBAR_ORIENTATION);
		this.handleClickPressure = this.changeActiveSecondToolbar.bind(this, TOOLBAR_PRESSURE);
		this.handleClickProximity = this.changeActiveSecondToolbar.bind(this, TOOLBAR_PROXIMITY);
		this.handleClickHumidity = this.changeActiveSecondToolbar.bind(this, TOOLBAR_HUMIDITY);
		this.handleClickTemperature = this.changeActiveSecondToolbar.bind(this, TOOLBAR_TEMPERATURE);
	}

	changeActiveToolbar(toolbar) {
		this.setState({activeBar: toolbar, activeSecondBar: TOOLBAR_NONE});
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
			toolbar: {
				// position: 'absolute',
				// top: 0
			},
			secondToolbar: {
				// top: 56,
				// position: 'relative',
				marginLeft: 0,
				marginRight: 0
			},
			wrapper: {
				// position: 'relative'
			}
		};

		// Build the main toolbar
		let currentBar = <ToolbarError/>;

		switch (this.state.activeBar) {
			case TOOLBAR_ANDROID:
				currentBar = (
					<ToolbarAndroid
						key={1}
						style={styles.toolbar}
						onClickSensor={this.handleClickSensor}
						onClickCamera={this.handleClickCamera}
						onClickGSM={this.handleClickGSM}
						onClickAPKs={this.handleClickAPKs}
						onClickTerminate={this.props.onClickTerminate}
						/>
				);
				break;
			case TOOLBAR_SENSORS:
				currentBar = (
					<ToolbarSensors
						key={2}
						selectedIndex={TOOLBAR_SENSORS_ORDER.indexOf(this.state.activeSecondBar)}
						style={styles.toolbar}
						onClickBack={this.handleClickBack}
						onClickGPS={this.handleClickGPS}
						onClickBattery={this.handleClickBattery}
						onClickAccelerometer={this.handleClickAccelerometer}
						onClickLight={this.handleClickLight}
						onClickGravity={this.handleClickGravity}
						onClickGyroscope={this.handleClickGyroscope}
						onClickLinearAcc={this.handleClickLinearAcc}
						onClickMagnetometer={this.handleClickMagnetometer}
						onClickOrientation={this.handleClickOrientation}
						onClickPressure={this.handleClickPressure}
						onClickProximity={this.handleClickProximity}
						onClickHumidity={this.handleClickHumidity}
						onClickTemperature={this.handleClickTemperature}
						/>
				);
				break;
			case TOOLBAR_CAMERA:
				currentBar = <ToolbarCamera key={3} style={styles.toolbar} onClickBack={this.handleClickBack}/>;
				break;
			case TOOLBAR_GSM:
				currentBar = <ToolbarGSM key={4} style={styles.toolbar} onClickBack={this.handleClickBack}/>;
				break;
			case TOOLBAR_APKS:
				currentBar = <ToolbarAPKs key={5} style={styles.toolbar} onClickBack={this.handleClickBack}/>;
				break;
			default:
				debug('could not find toolbar', this.state.activeBar);
				break;
		}

		// Build second toolbar (when clicking on the sensors for example)
		let currentSecondBar;

		if (this.state.activeSecondBar === TOOLBAR_NONE) {
			currentSecondBar = null;
		} else if (TOOLBAR_SENSORS_ORDER.indexOf(this.state.activeSecondBar) === -1) {
			currentSecondBar = <ToolbarError/>;
			debug('could not find second toolbar', this.state.activeSecondBar);
		} else {
			const onChangeSensorBinded = this.handleChangeSensors.bind(this, this.state.activeSecondBar);
			const props = {
				style: styles.secondToolbar,
				onInputFocus: this.props.onInputFocus,
				onInputBlur: this.props.onInputBlur,
				onChange: onChangeSensorBinded
			};
			props[this.state.activeSecondBar] = this.props.sensorsValues[this.state.activeSecondBar];
			currentSecondBar = React.createElement(toolbars[this.state.activeSecondBar], props);
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
	sensorsValues: React.PropTypes.object
};

module.exports = LiveToolbox;
