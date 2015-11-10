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
  MachineCardLive,
  InfoBox,
} = require('goby/components');
const {LiveStore} = require('goby/stores');
const {LiveActions} = require('goby/actions');

const LiveList = class extends React.Component {

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this.state = {};
  }

  // _onItemTap(index, e) {
  //   // e.preventDefault();
  //   this.context.router.transitionTo('live-session', { projectId: 'fooproject',
  //                                                      androId: 'test'} );
  // }

  render() {
    let avmsRendered = '';
    if (this.state.live) {
      if (this.state.live.status === 'LIVE_STATUS_LISTING' || this.state.live.status === 'LIVE_STATUS_INITIALIZED') {
        avmsRendered = <InfoBox showIcon={true} boxType={InfoBox.LOADING}>Loading sessions...</InfoBox>;
      }
      if (this.state.live.status === 'LIVE_STATUS_LISTED') {
        if (this.state.live.avms && this.state.live.avms.length) {
          avmsRendered = this.state.live.avms.map((currentValue, index) => {
            return <MachineCardLive {...currentValue} key={index} />;
          });
        } else {
          avmsRendered = <InfoBox showIcon={true} boxType={InfoBox.WARNING}>No sessions found.</InfoBox>;
        }
      }
    }

    return <div>

              <h2>Live Sessions</h2>

              <CardActions>

              <RaisedButton linkButton={true} href="/" primary={true} label="Start new session" />

              </CardActions>

              {avmsRendered}

            </div>;
  }

  _onStateChange(state) {
    debuggerGoby('changing state', this.state.live ? this.state.live.status : '', state);
    this.setState(state);
  }

  componentDidMount() {
    const projectId = AppUtils.getProjectIdFromRouter(this.context.router);
    this.unsubscribe = LiveStore.listen(this._onStateChange);
    LiveActions.list();
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
