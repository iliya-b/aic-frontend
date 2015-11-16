'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
  CardActions,
  RaisedButton,
} = mui;

// Vendor
const debuggerGoby = require('debug')('AiC:View:Live:List');

// APP
const {
  AppUtils,
  LiveMachineList,
} = require('goby/components');
const {LiveStore} = require('goby/stores');
const {
  LiveActions,
  PollingActions,
} = require('goby/actions');

let projectId;

const LiveList = class extends React.Component {

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this._onStartSession = this._onStartSession.bind(this);
    this._onEnterSession = this._onEnterSession.bind(this);
    this._onStopSession = this._onStopSession.bind(this);
    this.state = {};
  }

  // _onItemTap(index, e) {
  //   // e.preventDefault();
  //   this.context.router.transitionTo('live-session', { projectId: 'fooproject',
  //                                                      androId: 'test'} );
  // }

  _onStartSession() {
    LiveActions.start();
    PollingActions.liveList();
  }

  _onEnterSession(avmId) {
    console.log('enter session', arguments);
    this.context.router.transitionTo('live-session', {
      projectId,
      androId: avmId,
    });
  }

  _onStopSession(avmId) {
    LiveActions.stop(avmId);
    PollingActions.liveList();
  }

  render() {
    return <div>

              <h2>Live Sessions</h2>

              <CardActions>

              <RaisedButton linkButton={true} primary={true} label="Start new session" onClick={this._onStartSession} />

              </CardActions>

              <LiveMachineList actionEnter={this._onEnterSession} actionStop={this._onStopSession} />

            </div>;
  }

  _onStateChange(state) {
    debuggerGoby('changing state', this.state.live ? this.state.live.status : '', state);
    // if (state.live.status === 'LIVE_STATUS_VMSTARTED' && state.live.avm.avm_id) {
    //   // this._onEnterSession(state.live.avm.avm_id);
    //   LiveListActions.list();
    // }
    if (state.live.status === 'LIVE_STATUS_INITIALIZED') {
      PollingActions.liveList();
    }
    this.setState(state);
  }

  componentDidMount() {
    projectId = AppUtils.getProjectIdFromRouter(this.context.router);
    this.unsubscribe = LiveStore.listen(this._onStateChange);
    LiveActions.setProjectId(projectId);
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

LiveList.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
  appConfig: React.PropTypes.object,
};

module.exports = LiveList;
