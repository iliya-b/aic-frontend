/* global window */
'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {Spacing} = mui.Styles;
const {
	Paper,
	FlatButton,
	CircularProgress
} = mui;

// Vendors
const debug = require('debug')('AiC:Views:Project:Live:Session');

// APP
const {
	AppUtils,
	LiveScreen,
	LiveSensors,
	AreaStatus,
	LogBox,
	LogBoxRow
} = require('app/components');
const {LiveStore} = require('app/stores');
const {LiveActions} = require('app/actions');

const LiveSession = class extends React.Component {

	constructor(props) {
		super(props);
		this._onStateChange = this._onStateChange.bind(this);
	}

	render() {
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

		const logBoxRows = null;

		if (this.state && this.state.live) {
			this.state.live.logBox.map((v, i) => {
				return <LogBoxRow key={i} time={v.time}>{v.message}</LogBoxRow>;
			});
		}

		return (
			<div>

				<div style={style.infoArea}>
					<AreaStatus typeName="live" /><br />
					<div style={{width: 547}}>
						<LogBox>
						{logBoxRows}
						</LogBox>
					</div>
				</div>

				{this.context.appConfig.debug ? (
				<div>
					<Paper style={style.paperCenter}>

						<h3>Debug</h3>

						<FlatButton
							label="Test"
							title="Test"
							href="#"
							primary
							onTouchTap={this._onLiveAction.bind(this, 'test')}
							/>

						<FlatButton
							label="Search"
							title="Search"
							primary
							onTouchTap={this._onLiveAction.bind(this, 'check')}
							/>

						<FlatButton
							label="Create"
							title="Create"
							primary
							onTouchTap={this._onLiveAction.bind(this, 'start')}
							/>

						<FlatButton
							label="Load"
							title="Load"
							primary
							onTouchTap={this._onLiveAction.bind(this, 'load')}
							/>

						<FlatButton
							label="Connect"
							title="Connect"
							primary
							onTouchTap={this._onLiveAction.bind(this, 'connect')}
							/>

						<FlatButton
							label="Close"
							title="Close"
							primary
							onTouchTap={this._onLiveAction.bind(this, 'close')}
							/>

						<FlatButton
							label="Set State"
							title="Set State"
							primary
							onTouchTap={this._onLiveAction.bind(this, 'setState')}
							/>

						<input onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur} />

					</Paper>
					<br />
				</div>
				) : null}

				{this.state && this.state.live.status === 'LIVE_STATUS_INITIALIZED' ? (
					<Paper style={style.paperCenter}>
						<FlatButton
							label="Start New Live Session"
							title="Start New Live Session"
							primary
							onTouchTap={this._onLiveAction.bind(this, 'check')}
							/>
					</Paper>
				) : null}

				{this.state && this.state.live.status.substr(-6) === 'FAILED' ? (
				<Paper style={style.paperCenter}>

						<span style={style.error.icon} className="mdi mdi-android" />
						<p style={style.error.status}>{this.state.live.status}</p>
						<p style={style.error.message}>{this.state.live.message}</p>

				</Paper>
				) : null}

				{this.state && (this.state.live.status === 'LIVE_STATUS_CONNECTING' || this.state.live.status === 'LIVE_STATUS_CONNECTED') ? (
				<Paper style={style.paperLive}>

							{this.state.live.status === 'LIVE_STATUS_CONNECTING' ? (
								<div style={style.paperCenter}>
									<CircularProgress mode="indeterminate" size={2} />
								</div>
							) : null}

							<LiveScreen />

							{this.state.live.status === 'LIVE_STATUS_CONNECTED' ? (
							<div>
							<LiveSensors onInputFocus={this._onInputFocus} onInputBlur={this._onInputBlur} avmId={this.state.liveInfo.avm_id} />
							<br />
							<Paper style={style.paperCenter}>
								<FlatButton
									label="Stop Live"
									title="Stop Live"
									primary
									disabled={this.state.live.status === 'LIVE_STATUS_STOPPING'}
									onTouchTap={this._onLiveAction.bind(this, 'close')}
									/>
							</Paper>
							</div>
							) : null}

				</Paper>
				) : null}

				{this.state && (this.state.live.status === 'LIVE_STATUS_STOPPED') ? (
				<Paper style={style.paperCenter}>

						<p>Your live session was sucessfully stopped.</p>

						<FlatButton
							label="Start New Live Session"
							title="Start New Live Session"
							primary
							onTouchTap={this._onLiveAction.bind(this, 'restart')}
							/>

				</Paper>
				) : null}

			</div>
		);
	}

	_onStateChange(state) {
		this.setState(state);
		// if(state.live.status === 'LIVE_STATUS_INITIALIZED'){
			// LiveActions.liveCheck();
		// }
	}

	_onLiveAction(actionName) {
		// debug(arguments);
		switch (actionName) {
			case 'test':
				debug(arguments);

				break;
			case 'check':
				LiveActions.liveCheck();
				break;
			case 'start':
				LiveActions.liveStart();
				break;
			case 'restart':
				LiveActions.liveReset();
				LiveActions.liveCheck();
				break;
			case 'connect':
				LiveActions.liveConnect(this.state.live.screen.ip, this.state.live.screen.port);
				break;
			case 'close':
				LiveActions.liveStop(this.state.live.screen.port);
				break;
			case 'setState':
				if (!this.context.appConfig.debug) {
					return;
				}
				const newState = this.state;
				newState.live.status = 'LIVE_STATUS_CONNECTING';
				newState.live.screen.ip = '10.2.0.156';
				newState.live.screen.port = '5909';
				newState.live.audio = {};
				newState.live.audio.ip = '10.2.0.156';
				newState.live.audio.port = '6909';
				newState.live.screen.rotation = 'horizontal';
				newState.live.delayedRotation = 'horizontal';
				LiveActions.setState(newState);
				break;
			default:
				break;
		}
	}

	_onInputFocus() {
		debug('focus');
		if (!window.rfb) {
			return;
		}
		debug('rfb exists?');
		window.rfb.get_keyboard().set_focused(false);
		window.rfb.get_mouse().set_focused(false);
	}

	_onInputBlur() {
		if (!window.rfb) {
			return;
		}
		window.rfb.get_keyboard().set_focused(true);
		window.rfb.get_mouse().set_focused(true);
	}

	componentDidMount() {
		// debug('componentDidMount');
		// const projectId = AppUtils.getProjectIdFromRouter(this.context.router);
		// const avmId = AppUtils.getAVMIdFromRouter(this.context.router);
		debug('this.props.params', this.props.params);
		const projectId = this.props.params.projectId;
		const avmId = this.props.params.androId;
		this.unsubscribe = LiveStore.listen(this._onStateChange);
		LiveActions.liveReset();
		LiveActions.setProjectId(projectId);
		LiveActions.loadInfo(avmId);
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
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
