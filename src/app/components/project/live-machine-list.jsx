'use strict';

// Vendor
const React = require('react');
const debug = require('debug')('AiC:Component:LiveMachineList');

// APP
const MachineCardLive = require('app/components/project/machine-card-live');
const InfoBox = require('app/components/shared/info-box');
const LiveListStore = require('app/stores/live-list');

let projectId;

const LiveMachineList = class extends React.Component {

	constructor(props) {
		super(props);
		this._onStateChange = this._onStateChange.bind(this);
		this.state = {};
	}

	render() {
		let avmsRendered = '';
		let avmList = [];

		// Filter VMs by projectId
		if (this.state.live && this.state.live.hasOwnProperty('avms')) {
			avmList = this.state.live.avms.filter(v => {
				return v.project_id === projectId;
			});
		}

		// List VMs or information about loading and no VMs
		if (avmList && avmList.length) {
			avmsRendered = avmList.map((currentValue, index) => {
				currentValue.index = index;
				return <MachineCardLive className={`cardLiveVM cardLiveVM${index} cardLiveVM${currentValue.avm_id}`} {...currentValue} key={currentValue.avm_id} actionEnter={this.props.actionEnter} actionStop={this.props.actionStop}/>;
			});
		} else if (this.state.live && this.state.live.status === 'LIVE_STATUS_LISTED') {
			avmsRendered = <InfoBox style={{textAlign: 'center'}}>No sessions found. You can start a new session.</InfoBox>;
		} else {
			avmsRendered = <InfoBox style={{textAlign: 'center'}}>Loading sessions...</InfoBox>;
		}

		return (<div>
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
		projectId = this.props.params.projectId;
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
	actionStop: React.PropTypes.func,
	params: React.PropTypes.object
};

module.exports = LiveMachineList;
