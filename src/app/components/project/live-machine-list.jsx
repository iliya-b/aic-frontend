'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
  LinearProgress,
} = mui;

// Vendor
const debuggerGoby = require('debug')('AiC:Component:LiveList');

// APP
const MachineCardLive = require('app/components/project/machine-card-live.jsx');
const InfoBox = require('app/components/shared/info-box.jsx');
const {LiveListStore} = require('app/stores');

const LiveMachineList = class extends React.Component {

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this.state = {};
  }

  render() {
    let avmsRendered = '';
    let loading = '';
    if (this.state.live) {
      if (this.state.live.status === 'LIVE_STATUS_LISTING') {
        let informationBox = '';
        if (!this.state.live.hasOwnProperty('avms') || this.state.live.avms.length === 0) {
          informationBox = <InfoBox style={{textAlign: 'center'}}>Loading sessions...</InfoBox>;
        }
        loading = <div>
          <LinearProgress mode="indeterminate" style={{backgroundColor: 'rgba(0, 0, 0, 0.54)'}} />
          {informationBox}
        </div>;
      }
      if (this.state.live.avms && this.state.live.avms.length) {
        avmsRendered = this.state.live.avms.map(currentValue => {
          return <MachineCardLive {...currentValue} key={currentValue.avm_id} actionEnter={this.props.actionEnter} actionStop={this.props.actionStop} />;
        });
      } else if (this.state.live.status === 'LIVE_STATUS_LISTED') {
        avmsRendered = <InfoBox style={{textAlign: 'center'}}>No sessions found. You can start a new session.</InfoBox>;
      }
    }

    return <div>
             {loading}
             {avmsRendered}
           </div>;
  }

  _onStateChange(state) {
    debuggerGoby('changing state', state);
    this.setState(state);
  }

  componentDidMount() {
    this.unsubscribe = LiveListStore.listen(this._onStateChange);
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

LiveMachineList.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
  appConfig: React.PropTypes.object,
};

module.exports = LiveMachineList;
