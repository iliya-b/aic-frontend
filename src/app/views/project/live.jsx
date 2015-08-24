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
      LiveStatus } = require('goby/components');
var { LiveStore } = require('goby/stores');
var { LiveActions } = require('goby/actions');
var AppConfig = require('goby/configs/app-config.jsx');

var ProjectLive = class extends React.Component{

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this._onLiveStart = this._onLiveStart.bind(this);
    this._onLiveStop = this._onLiveStop.bind(this);
    // this._onDebug = this._onDebug.bind(this);
    // this._onLiveAction = this._onLiveAction.bind(this);
  }

  render() {

    var style = {
      paperCenter: {
        textAlign: 'center',
        padding: Spacing.desktopGutter
      },
      paperLive: {
        padding: Spacing.desktopGutter,
        minHeight: (600 + Spacing.desktopGutter*2) + 'px',
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

              <LiveStatus />

              {/* Debugging */}
              {AppConfig.debug ? (
              <div>
                <Paper style={style.paperCenter}>

                  <h3>Debug</h3>

                  <FlatButton
                      label="Search"
                      primary={true}
                      onTouchTap={this._onDebug.bind(this, 'check')} />

                  <FlatButton
                      label="Start"
                      primary={true}
                      onTouchTap={this._onDebug.bind(this, 'start')} />

                  <FlatButton
                      label="Connect"
                      primary={true}
                      onTouchTap={this._onDebug.bind(this, 'connect')} />

                  <FlatButton
                      label="Set State"
                      primary={true}
                      onTouchTap={this._onDebug.bind(this, 'setState')} />

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

                  <div>
                    <LiveScreen />
                    <LiveSensors />
                    <br />
                    <Paper style={style.paperCenter}>
                      <FlatButton
                        label="Stop Live"
                        primary={true}
                        disabled={this.state.live.status === 'LIVE_STATUS_STOPPING'}
                        onTouchTap={this._onLiveStop} />
                    </Paper>
                  </div>

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

  _onLiveStart(){
    LiveActions.liveStart();
  }

  _onLiveStop(){
    LiveActions.liveStop( this.state.live.screen.port );
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
    }
  }

  _onDebug(actionName){
    // console.log(arguments);
    switch(actionName){
      case 'check':
        LiveActions.liveCheck();
        break;
      case 'start':
        LiveActions.liveStart();
        break;
      case 'connect':
        LiveActions.liveConnect(this.state.live.screen.ip, this.state.live.screen.port);
        break;
      case 'setState':
        var newState = this.state;
        newState.live.status = 'LIVE_STATUS_CONNECTED';
        newState.live.screen.ip = '10.2.0.156';
        newState.live.screen.port = '5901';
        LiveActions.setState(newState);
        break;
    }

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
