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
  CircularProgress,
} = mui;

// APP
const {
  AppUtils,
  LiveScreen,
  LiveSensors,
  AreaStatus,
  LogBox,
  LogBoxRow,
} = require('goby/components');
const {LiveStore} = require('goby/stores');
const {LiveActions} = require('goby/actions');

const LiveSession = class extends React.Component {

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
  }

  render() {
    const style = {
      paperCenter: {
        textAlign: 'center',
        padding: Spacing.desktopGutter,
      },
      paperLive: {
        padding: Spacing.desktopGutter,
      },
      error: {
        icon: {
          color: this.context.muiTheme.palette.errorColor,
          fontSize: '50px',
          float: 'left',
        },
        message: {
          color: this.context.muiTheme.palette.errorColor,
        },
        status: {
          display: 'none',
        },
      },
      infoArea: {
        width: 547,
        margin: '0 auto',
        paddingBottom: `${Spacing.desktopGutter}px`,
      },
    };

    const logBoxRows = (this.state && this.state.live) ? this.state.live.logBox.map( function(v,i){ return <LogBoxRow key={i} time={v.time}>{v.message}</LogBoxRow> }  ) : null;

    return  <div>

              <div style={style.infoArea}>
                <AreaStatus typeName='live' /><br />
                <div style={{width:547}}>
                  <LogBox>
                  {logBoxRows}
                  </LogBox>
                </div>
              </div>

              {/* Debugging */}
              {this.context.appConfig.debug ? (
              <div>
                <Paper style={style.paperCenter}>

                  <h3>Debug</h3>

                  <FlatButton
                      label="Test"
                      title="Test"
                      href="#"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'test')} />

                  <FlatButton
                      label="Search"
                      title="Search"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'check')} />

                  <FlatButton
                      label="Create"
                      title="Create"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'start')} />

                  <FlatButton
                      label="Load"
                      title="Load"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'load')} />

                  <FlatButton
                      label="Connect"
                      title="Connect"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'connect')} />

                  <FlatButton
                      label="Close"
                      title="Close"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'close')} />

                  <FlatButton
                      label="Set State"
                      title="Set State"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'setState')} />

                  <input onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur} />

                </Paper>
                <br />
              </div>
              ) : null}

              {/* Live begin */}
              {this.state && this.state.live.status === 'LIVE_STATUS_INITIALIZED' ? (
                <Paper style={style.paperCenter}>
                  <FlatButton
                        label="Start New Live Session"
                        title="Start New Live Session"
                        primary={true}
                        onTouchTap={this._onLiveAction.bind(this, 'check')} />
                </Paper>
              ) : null}

              {/* Live failed */}
              {this.state && this.state.live.status.substr(-6) === 'FAILED' ? (
              <Paper style={style.paperCenter}>

                  <span style={style.error.icon} className='mdi mdi-android' />
                  <p style={style.error.status}>{this.state.live.status}</p>
                  <p style={style.error.message}>{this.state.live.message}</p>

              </Paper>
              ) : null}

              {/* Live started */}
              {this.state && (this.state.live.status === 'LIVE_STATUS_CONNECTING' || this.state.live.status === 'LIVE_STATUS_CONNECTED') ? (
              <Paper style={style.paperLive}>

                    {this.state.live.status === 'LIVE_STATUS_CONNECTING' ? (
                      <div style={style.paperCenter}>
                        <CircularProgress mode="indeterminate" size={2} />
                      </div>
                    ) : null }

                    <LiveScreen />

                    {this.state.live.status === 'LIVE_STATUS_CONNECTED' ? (
                    <div>
                    <LiveSensors onInputFocus={this._onInputFocus} onInputBlur={this._onInputBlur} />
                    <br />
                    <Paper style={style.paperCenter}>
                      <FlatButton
                        label="Stop Live"
                        title="Stop Live"
                        primary={true}
                        disabled={this.state.live.status === 'LIVE_STATUS_STOPPING'}
                        onTouchTap={this._onLiveAction.bind(this, 'close')} />
                    </Paper>
                    </div>
                    ) : null }

              </Paper>
              ) : null}

              {/* Live stopped */}
              {this.state && (this.state.live.status === 'LIVE_STATUS_STOPPED') ? (
              <Paper style={style.paperCenter}>

                  <p>Your live session was sucessfully stopped.</p>

                  <FlatButton
                    label="Start New Live Session"
                    title="Start New Live Session"
                    primary={true}
                    onTouchTap={this._onLiveAction.bind(this, 'restart')} />

              </Paper>
              ) : null}

            </div>;
  }

  _onStateChange(state) {
    this.setState(state);
    // if(state.live.status === 'LIVE_STATUS_INITIALIZED'){
      // LiveActions.liveCheck();
    // }
  }

  _onLiveAction(actionName) {
    // console.log(arguments);
    switch (actionName) {
      case 'test':
        console.log(arguments);

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
    console.log('focus');
    if (!window.rfb) {
      return;
    }
    console.log('rfb exists?');
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
    // console.log('componentDidMount');
    const projectId = AppUtils.getProjectIdFromRouter(this.context.router);
    const avmId = AppUtils.getAVMIdFromRouter(this.context.router);
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
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
  appConfig: React.PropTypes.object,
};

module.exports = LiveSession;
