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
      LiveSensors } = require('goby/components');
var { LiveStore } = require('goby/stores');
var { LiveActions } = require('goby/actions');
var AppConfig = require('goby/configs/app-config.jsx');

var ProjectLive = class extends React.Component{

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this._onLiveStart = this._onLiveStart.bind(this);
    this._onLiveStop = this._onLiveStop.bind(this);
    this._onDebug = this._onDebug.bind(this);
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
    };

    return  <div>
              <h2>Live</h2>

              {/* Debugging */}
              {AppConfig.debug ? (
              <div>
                <Paper style={style.paperCenter}>

                  <h3>Debug</h3>

                  <FlatButton
                      label="Set State"
                      primary={true}
                      onTouchTap={this._onDebug} />

                </Paper>
                <br />
              </div>
              ) : null}

              <Tabs initialSelectedIndex={1}>
                <Tab label="Live"  >

                  {/* Starting live */}
                  {this.state && (this.state.live.status === 'LIVE_STATUS_INITIALIZED') ? (
                  <Paper style={style.paperCenter}>

                      <FlatButton
                        label="Start Live"
                        primary={true}
                        disabled={this.state.live.status === 'LIVE_STATUS_STARTING'}
                        onTouchTap={this._onLiveStart} />

                  </Paper>
                  ) : null}

                  {/* Live loading */}
                  {this.state && (this.state.live.status === 'LIVE_STATUS_STARTING' || this.state.live.status === 'LIVE_STATUS_STOPPING') ? (
                  <Paper style={style.paperCenter}>
                    <CircularProgress mode="indeterminate" size={2} />
                  </Paper>
                  ) : null}

                  {/* Live failed */}
                  {this.state && this.state.live.status === 'LIVE_STATUS_FAILED' ? (
                  <Paper style={style.paperCenter}>

                      <p>Something went wrong...</p>

                  </Paper>
                  ) : null}

                  {/* Live started */}
                  {this.state && (this.state.live.status === 'LIVE_STATUS_STARTED') ? (
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
                        onTouchTap={this._onLiveStart} />

                  </Paper>
                  ) : null}

                </Tab>
              </Tabs>

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

  _onDebug(){
    LiveActions.setState({
      live: {
        status: 'LIVE_STATUS_STARTED',
        screen: {
          ip: '10.2.0.156',
          port: '5901',
          rotation: 'horizontal',
        },
        delayedRotation: 'horizontal',
        rotationSets: {
          horizontal: { x: 0, y: 5.9, z: 0, next: 'vertical'},
          vertical:   { x: 5.9, y: 0, z: 0, next: 'horizontal'},
        },
      }
    });
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
