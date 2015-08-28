'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing } = mui.Styles;
var { Tabs, Tab, Paper, FlatButton, CircularProgress } = mui;

// APP
var { AppUtils,
      LiveScreen,
      LiveSensors,
      AreaStatus } = require('goby/components');
var { LiveStore } = require('goby/stores');
var { LiveActions } = require('goby/actions');
var AppConfig = require('goby/configs/app-config.jsx');

var ProjectLive = class extends React.Component{

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
  }

  render() {

    var style = {
      paperCenter: {
        textAlign: 'center',
        padding: Spacing.desktopGutter
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
      }
    };

    return  <div>

              <AreaStatus typeName='live' />

              {/* Debugging */}
              {AppConfig.debug ? (
              <div>
                <Paper style={style.paperCenter}>

                  <h3>Debug</h3>

                  <FlatButton
                      label="Search"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'check')} />

                  <FlatButton
                      label="Create"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'start')} />

                  <FlatButton
                      label="Load"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'load')} />

                  <FlatButton
                      label="Connect"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'connect')} />

                  <FlatButton
                      label="Close"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'close')} />

                  <FlatButton
                      label="Set State"
                      primary={true}
                      onTouchTap={this._onLiveAction.bind(this, 'setState')} />

                  <input onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur} />

                </Paper>
                <br />
              </div>
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
                    label="Start New Live"
                    primary={true}
                    onTouchTap={this._onLiveAction.bind(this, 'restart')} />

              </Paper>
              ) : null}

            </div>;

  }

  _onStateChange( state ){
    this.setState( state );
  }

  _onLiveAction(actionName){
    // console.log(arguments);
    switch(actionName){
      case 'check':
        LiveActions.liveCheck();
        break;
      case 'start':
        LiveActions.liveStart();
        break;
      case 'restart':
        LiveActions.liveReset();
        break;
      case 'connect':
        LiveActions.liveConnect(this.state.live.screen.ip, this.state.live.screen.port);
        break;
      case 'close':
        LiveActions.liveStop( this.state.live.screen.port );
        break;
      case 'setState':
        if (!AppConfig.debug) { return; }
        var newState = this.state;
        newState.live.status = 'LIVE_STATUS_CONNECTING';
        newState.live.screen.ip = '10.2.0.156';
        newState.live.screen.port = '5901';
        newState.live.screen.rotation = 'horizontal';
        newState.live.delayedRotation = 'horizontal';
        LiveActions.setState(newState);
        break;
    }
  }

  _onInputFocus() {
    console.log('focus');
    if (!window.rfb) return;
    console.log('rfb exists?');
    window.rfb.get_keyboard().set_focused(false);
    window.rfb.get_mouse().set_focused(false);
  }

  _onInputBlur() {
      if (!window.rfb) return;

      window.rfb.get_keyboard().set_focused(true);
      window.rfb.get_mouse().set_focused(true);
  }

  componentDidMount() {
    var projectId = AppUtils.getProjectIdFromRouter(this.context.router);
    this.unsubscribe = LiveStore.listen( this._onStateChange );
    LiveActions.setProjectId(projectId);
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

ProjectLive.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
};

module.exports = ProjectLive;
