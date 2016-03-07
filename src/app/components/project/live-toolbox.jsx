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
import ToolbarGPS from 'app/components/toolbar/toolbar-gps';
import ToolbarBattery from 'app/components/toolbar/toolbar-battery';
import ToolbarAccelerometer from 'app/components/toolbar/toolbar-accelerometer';
import ToolbarLight from 'app/components/toolbar/toolbar-light';
import ToolbarGravity from 'app/components/toolbar/toolbar-gravity';
import ToolbarGyroscope from 'app/components/toolbar/toolbar-gyroscope';
import ToolbarLinearAcc from 'app/components/toolbar/toolbar-linearacc';
import ToolbarMagnetometer from 'app/components/toolbar/toolbar-magnetometer';
import ToolbarOrientation from 'app/components/toolbar/toolbar-orientation';
import ToolbarPressure from 'app/components/toolbar/toolbar-pressure';
import ToolbarProximity from 'app/components/toolbar/toolbar-proximity';
import ToolbarHumidity from 'app/components/toolbar/toolbar-humidity';
import ToolbarTemperature from 'app/components/toolbar/toolbar-temperature';

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

		let currentSecondBar = <ToolbarError/>;

		switch (this.state.activeSecondBar) {
			case TOOLBAR_NONE:
				currentSecondBar = null;
				break;
			case TOOLBAR_GPS:
				currentSecondBar = (
					<ToolbarGPS
						style={styles.secondToolbar}
						onClickGPS={this.props.onClickGPS}
						onInputFocus={this.props.onInputFocus}
						onInputBlur={this.props.onInputBlur}
						/>
				);
				break;
			case TOOLBAR_BATTERY:
				currentSecondBar = (
					<ToolbarBattery
						style={styles.secondToolbar}
						batteryValue={this.props.batteryValue}
						onChangeBattery={this.props.onChangeBattery}
						/>
				);
				break;
			case TOOLBAR_ACCELEROMETER:
				currentSecondBar = (
					<ToolbarAccelerometer
						style={styles.secondToolbar}
						rotation={this.props.rotation}
						onChangeRotation={this.props.onChangeRotation}
						/>
				);
				break;
			case TOOLBAR_LIGHT: currentSecondBar = <ToolbarLight style={styles.secondToolbar}/>; break;
			case TOOLBAR_GRAVITY: currentSecondBar = <ToolbarGravity style={styles.secondToolbar}/>; break;
			case TOOLBAR_GYROSCOPE: currentSecondBar = <ToolbarGyroscope style={styles.secondToolbar}/>; break;
			case TOOLBAR_LINEARACC: currentSecondBar = <ToolbarLinearAcc style={styles.secondToolbar}/>; break;
			case TOOLBAR_MAGNETOMETER: currentSecondBar = <ToolbarMagnetometer style={styles.secondToolbar}/>; break;
			case TOOLBAR_ORIENTATION: currentSecondBar = <ToolbarOrientation style={styles.secondToolbar}/>; break;
			case TOOLBAR_PRESSURE: currentSecondBar = <ToolbarPressure style={styles.secondToolbar}/>; break;
			case TOOLBAR_PROXIMITY: currentSecondBar = <ToolbarProximity style={styles.secondToolbar}/>; break;
			case TOOLBAR_HUMIDITY: currentSecondBar = <ToolbarHumidity style={styles.secondToolbar}/>; break;
			case TOOLBAR_TEMPERATURE: currentSecondBar = <ToolbarTemperature style={styles.secondToolbar}/>; break;
			default:
				debug('could not find second toolbar', this.state.activeSecondBar);
				break;
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

module.exports = LiveToolbox;
