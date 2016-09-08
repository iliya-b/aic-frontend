/* global document */
'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import Spacing from 'material-ui/styles/spacing';
import AreaStatus from 'app/components/project/area-status';
import PanelSessionScreen from 'app/components/panel/panel-session-screen';
import LiveToolbox from 'app/components/project/live-toolbox';
import LiveStore from 'app/stores/live';
import APKStore from 'app/stores/apk';
import CameraStore from 'app/stores/camera';
import LiveActions from 'app/actions/live';
import PollingActions from 'app/actions/polling';
import NoVNCAdapter from 'app/libs/novnc-adapter';
import fullscreen from 'app/libs/fullscreen';

const debug = require('debug')('AiC:Views:Project:Live:Session');

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

		fullscreen.addFullscreenchange(this.handleDocumentFullscreenChange);
	}

	handleDocumentFullscreenChange = () => {
		const documentIsFullscreen = Boolean(fullscreen.fullscreenElement());
		debug('onfullscreenchange', documentIsFullscreen, this.isFullscreen());
		if (documentIsFullscreen !== this.isFullscreen()) {
			if (documentIsFullscreen) {
				LiveActions.enterFullscreen();
			} else {
				LiveActions.exitFullscreen();
			}
		}
		if (this.isScaledscreen()) {
			LiveActions.recalculeScale();
		}
	}

	handleEnterFullscreen = () => {
		debug('handleEnterFullscreen');
		fullscreen.requestFullscreen(document.querySelector('#liveBox'));
		LiveActions.enterFullscreen();
	}

	handleExitFullscreen = () => {
		fullscreen.exitFullscreen();
		LiveActions.exitFullscreen();
	}

	isFullscreen = () => {
		return this.state && this.state.live && this.state.live.isFullscreen;
	}

	isScaledscreen = () => {
		return this.state && this.state.live && this.state.live.isScaledscreen;
	}

	getRotation = () => {
		return this.state.live.properties ? this.state.live.properties['aicd.screen_rotation'] : '0';
	}

	handleEnterScaledscreen = () => {
		debug('handleEnterScaledscreen');
		LiveActions.enterScaledscreen();
	}

	handleExitScaledscreen = () => {
		debug('handleExitScaledscreen');
		LiveActions.exitScaledscreen();
	}

	render() {
		debug('render');
		const style = {
			paperCenter: {
				textAlign: 'center',
				padding: Spacing.desktopGutter
			},
			paperLive: {
				padding: this.isFullscreen() ? 0 : (Spacing.desktopGutter - 1),
				display: this.isFullscreen() ? 'flex' : 'block',
				background: this.isFullscreen() ? '#000' : '#fff',
				width: this.isFullscreen() ? '100%' : 'auto',
				height: this.isFullscreen() ? '100%' : 'auto'
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
				paddingBottom: this.isFullscreen() ? 0 : `${Spacing.desktopGutter}px`
			}
		};

		const styleScreen = {
			margin: 'auto',
			marginBottom: this.isFullscreen() ? 'auto' : 20,
			background: '#fff'
		};

		const styleLiveToolBox = {
			position: this.isFullscreen() ? 'absolute' : 'initial',
			top: 0,
			left: 0
		};

		const styleLiveBoxWrapper = {
			width: '100%',
			height: '100%',
			display: this.isFullscreen() ? 'flex' : 'block',
			background: 'transparent'
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
						<div id="liveBox" style={styleLiveBoxWrapper}>

						{this.state.live.status === 'LIVE_STATUS_CONNECTING' ? (
							<div style={style.paperCenter}>
								<CircularProgress mode="indeterminate" size={2}/>
							</div>
						) : null}

							<PanelSessionScreen
								rotation={this.getRotation()}
								width={this.state.liveInfo.hwconfig.width}
								height={this.state.liveInfo.hwconfig.height}
								scale={this.state.live.scale}
								style={styleScreen}
								/>

						{this.state.live.status === 'LIVE_STATUS_CONNECTED' ? (
							<LiveToolbox
								// Live
								avmId={this.state.liveInfo.avm_id}
								// Canvas focus
								onInputFocus={this.handleOnInputFocus}
								onInputBlur={this.handleOnInputBlur}
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
								// Fullscreen
								onEnterFullscreen={this.handleEnterFullscreen}
								onExitFullscreen={this.handleExitFullscreen}
								isFullscreen={this.state.live.isFullscreen}
								onEnterScaledscreen={this.handleEnterScaledscreen}
								onExitScaledscreen={this.handleExitScaledscreen}
								isScaledscreen={this.state.live.isScaledscreen}
								style={styleLiveToolBox}
								/>
						) : null}
						</div>
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

	handleOnInputFocus() {
		NoVNCAdapter.focus();
	}

	handleOnInputBlur() {
		NoVNCAdapter.blur();
	}

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
