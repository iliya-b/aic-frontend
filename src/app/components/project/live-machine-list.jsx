'use strict';

// Vendor
const React = require('react');
const debug = require('debug')('AiC:Component:LiveMachineList');

// APP
const MachineCardLive = require('app/components/project/machine-card-live');
const InfoBox = require('app/components/shared/info-box');
const LiveListStore = require('app/stores/live-list');

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
				if (!this.state.live.hasOwnProperty('avms') || this.state.live.avms.length === 0) {
					loading = <InfoBox style={{textAlign: 'center'}}>Loading sessions...</InfoBox>;
				}
			}
			if (this.state.live.avms && this.state.live.avms.length) {
				avmsRendered = this.state.live.avms.map((currentValue, index) => {
					currentValue.index = index;
					return <MachineCardLive className={`cardLiveVM cardLiveVM${index} cardLiveVM${currentValue.avm_id}`} {...currentValue} key={currentValue.avm_id} actionEnter={this.props.actionEnter} actionStop={this.props.actionStop}/>;
				});
			} else if (this.state.live.status === 'LIVE_STATUS_LISTED') {
				avmsRendered = <InfoBox style={{textAlign: 'center'}}>No sessions found. You can start a new session.</InfoBox>;
			}
		}

		return (<div>
			{loading}
			{avmsRendered}
		</div>);
	}

	_onStateChange(state) {
		debug('changing state', state);
		this.setState(state);
	}

	componentDidMount() {
		debug('listing to LiveListStore');
		this.unsubscribe = LiveListStore.listen(this._onStateChange);
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

LiveMachineList.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object,
	appConfig: React.PropTypes.object
};

LiveMachineList.propTypes = {
	actionEnter: React.PropTypes.func,
	actionStop: React.PropTypes.func
};

module.exports = LiveMachineList;
