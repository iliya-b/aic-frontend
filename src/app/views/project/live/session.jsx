'use strict';

// Vendors
import React from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import Spacing from 'material-ui/styles/spacing';
const debug = require('debug')('AiC:Views:Project:Live:Session');

// APP
import AreaStatus from 'app/components/project/area-status';
import PanelSessionScreen from 'app/components/panel/panel-session-screen';
import LiveToolbox from 'app/components/project/live-toolbox';
import LiveStore from 'app/stores/live';
import APKStore from 'app/stores/apk';
import CameraStore from 'app/stores/camera';
import LiveActions from 'app/actions/live';
import PollingActions from 'app/actions/polling';
import NoVNCAdapter from 'app/libs/novnc-adapter';

let avmId;
let projectId;

const LiveSession = class extends React.Component {

	constructor(props) {
		super(props);
		this._onStateChange = this._onStateChange.bind(this);
		this.handleStopVM = this.handleStopVM.bind(this);
		// this.handleBatteryChange = this.handleBatteryChange.bind(this);
		// this.handleClickGPS = this.handleClickGPS.bind(this);
		// this.handleChangeRotation = this.handleChangeRotation.bind(this);
		this.handleChangeSensor = (sensor, e, payload) => {
			debug('handleChangeSensor', arguments);
			debug('handleChangeSensor', e, sensor, payload);
			LiveActions.setSensor({avmId, sensor, payload});
		};
		this.handleAPKs = (e, apkId) => {
			const refId = `${projectId}-${avmId}-${apkId}-${Date.now()}`;
			LiveActions.installAPK({projectId, avmId, apkId, refId}, {includeRequest: true});
		};
		this.handleMonkeyRunner = (e, packages, eventCount, throttle) => {
			const refId = `${avmId}-${packages.join('-')}-${eventCount}-${throttle}-${Date.now()}`;
			LiveActions.monkeyRunner({avmId, packages, eventCount, throttle, refId}, {includeRequest: true});
		};
	}

	render() {
		debug('render');
		const style = {
			paperCenter: {
				textAlign: 'center',
				padding: Spacing.desktopGutter
			},
			paperLive: {
				padding: Spacing.desktopGutter
			},
			error: {
				icon: {
					color: this.context.muiTheme.palette.errorColor,
					fontSize: '50px',
					float: 'left'
				},
				message: {
					color: this.context.muiTheme.palette.errorColor
				},
				status: {
					display: 'none'
				}
			},
			infoArea: {
				width: 547,
				margin: '0 auto',
				paddingBottom: `${Spacing.desktopGutter}px`
			}
		};

		return (
			<div>

				<div style={style.infoArea}>
					<AreaStatus typeName="live"/>
				</div>

				{this.state && this.state.live.status.substr(-6) === 'FAILED' ? (
					<Paper style={style.paperCenter}>

						<span style={style.error.icon} className="mdi mdi-android"/>
						<p style={style.error.status}>{this.state.live.status}</p>
						<p style={style.error.message}>{this.state.live.message}</p>

					</Paper>
				) : null}

				{this.state && (this.state.live.status === 'LIVE_STATUS_CONNECTING' || this.state.live.status === 'LIVE_STATUS_CONNECTED') ? (
					<Paper style={style.paperLive}>

						{this.state.live.status === 'LIVE_STATUS_CONNECTING' ? (
							<div style={style.paperCenter}>
								<CircularProgress mode="indeterminate" size={2}/>
							</div>
						) : null}

						<PanelSessionScreen rotation={this.state.live.properties ? this.state.live.properties['aicd.screen_rotation'] : "0"}/>

						{this.state.live.status === 'LIVE_STATUS_CONNECTED' ? (
							<div>
								<LiveToolbox
									onInputFocus={this.handleOnInputFocus}
									onInputBlur={this.handleOnInputBlur}
									avmId={this.state.liveInfo.avm_id}
									// Terminate //
									onClickTerminate={this.handleStopVM}
									// Sensors //
									onChangeSensor={this.handleChangeSensor}
									sensorsValues={this.state.live.sensors}
									// APKs
									onInstallAPK={this.handleAPKs}
									apkList={this.state.apk ? this.state.apk.apks : []}
									apkInstalled={this.state.live.installedAPKs ? this.state.live.installedAPKs : []}
									// Monkey Runner
									onMonkeyRunner={this.handleMonkeyRunner}
									packageList={this.state.live.packages}
									monkeyCalls={this.state.live.monkeyCalls ? this.state.live.monkeyCalls : []}
									// Camera
									cameraList={this.state.camera ? this.state.camera.files : []}
									// Details
									properties={this.state.live.properties}
									avmInfo={this.state.liveInfo}
									/>
							</div>
						) : null}

					</Paper>
				) : null}

				{this.state && (this.state.live.status === 'LIVE_STATUS_STOPPED') ? (
					<Paper style={style.paperCenter}>

						<p>Your live session was sucessfully stopped.</p>

					</Paper>
				) : null}

			</div>
		);
	}

	_onStateChange(state) {
		this.setState(state);
	}

	shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.rotation !== this.props.rotation;
		debug('shouldComponentUpdate', nextProps, nextState, (nextState && nextState.live && this.state && this.state.live) ? nextState.live.status !== this.state.live.status : true);
		// return (nextState && nextState.live && this.state && this.state.live) ? nextState.live.status !== this.state.live.status : true;
		return true;
	}

	// handleOnLiveAction(actionName) {
	// 	// debug(arguments);
	// 	switch (actionName) {
	// 		case 'test':
	// 			debug(arguments);
	// 			break;
	// 		case 'check':
	// 			LiveActions.liveCheck();
	// 			break;
	// 		case 'start':
	// 			LiveActions.liveStart();
	// 			break;
	// 		case 'restart':
	// 			LiveActions.liveReset();
	// 			LiveActions.liveCheck();
	// 			break;
	// 		case 'connect':
	// 			LiveActions.liveConnect(this.state.live.screen.ip, this.state.live.screen.port);
	// 			break;
	// 		case 'close':
	// 			LiveActions.liveStop(this.state.live.screen.port);
	// 			break;
	// 		case 'setState': {
	// 			if (!this.context.appConfig.debug) {
	// 				return;
	// 			}
	// 			const newState = this.state;
	// 			newState.live.status = 'LIVE_STATUS_CONNECTING';
	// 			newState.live.screen.ip = '10.2.0.156';
	// 			newState.live.screen.port = '5909';
	// 			newState.live.audio = {};
	// 			newState.live.audio.ip = '10.2.0.156';
	// 			newState.live.audio.port = '6909';
	// 			newState.live.screen.rotation = 'horizontal';
	// 			newState.live.delayedRotation = 'horizontal';
	// 			LiveActions.setState(newState);
	// 			break;
	// 		}
	// 		default:
	// 			break;
	// 	}
	// }

	handleOnInputFocus() {
		NoVNCAdapter.focus();
	}

	handleOnInputBlur() {
		NoVNCAdapter.blur();
	}

	// handleBatteryChange(e, value) {
	// 	e.preventDefault();
	// 	LiveActions.setSensorBattery(avmId, value);
	// }

	// handleChangeRotation(e) {
	// 	e.preventDefault();
	// 	const newRotationName = this.state.live.rotationSets[this.state.live.screen.rotation].next;
	// 	const newRotationValue = this.state.live.rotationSets[newRotationName];
	// 	LiveActions.setSensorAccelerometer(avmId, newRotationValue.x, newRotationValue.y, newRotationValue.z, newRotationName);

	// 	setTimeout(() => {
	// 		LiveActions.setDelayedRotation();
	// 	}, 1500);
	// }

	// handleClickGPS(e, lat, lon) {
	// 	// e.preventDefault();
	// 	// const lat = parseFloat(this.lat.getValue());
	// 	// const lon = parseFloat(this.lon.getValue());
	// 	LiveActions.setSensorLocation(avmId, lat, lon);
	// }

	handleStopVM() {
		this.handleOnInputFocus();
		LiveActions.disconnectScreen();
		LiveActions.disconnectAudio();
		LiveActions.stop({avmId}, {includeRequest: true});
	}

	componentDidMount() {
		debug('componentDidMount');
		debug('this.props.params', this.props.params);
		projectId = this.props.params.projectId;
		avmId = this.props.params.androId;
		this.unsubscribe = [];
		this.unsubscribe.push(LiveStore.listen(this._onStateChange));
		this.unsubscribe.push(APKStore.listen(this._onStateChange));
		this.unsubscribe.push(CameraStore.listen(this._onStateChange));
		LiveActions.liveReset();
		LiveActions.setProjectId(projectId);
		// LiveActions.loadInfo(avmId);
		// window.intervalTimeoutLoad = setInterval(LiveActions.loadInfo, 1000, avmId);
		PollingActions.start('liveLoadInfo', {avmId});
	}

	componentWillUnmount() {
		debug('componentWillUnmount');
		LiveActions.clearTimeouts();
		this.handleOnInputFocus();
		LiveActions.disconnectScreen();
		LiveActions.disconnectAudio();
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe.map(v => v());
	}

};

LiveSession.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object,
	appConfig: React.PropTypes.object
};

LiveSession.propTypes = {
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
	params: React.PropTypes.object
};

module.exports = LiveSession;
