'use strict';

// Vendor
const React = require('react');
const debug = require('debug')('AiC:Component:LiveMachineList');

// APP
// const MachineCardLive = require('app/components/project/machine-card-live');
const InfoBox = require('app/components/shared/info-box');
import CardAndroidSession from 'app/components/card/card-android-session';

const LiveMachineList = class extends React.Component {
	render() {
		let avmsRendered = '';

		// List VMs or information about loading and no VMs
		if (this.props.avmList && this.props.avmList.length) {
			avmsRendered = this.props.avmList.map((currentValue, index) => {
				debug('currentValue', currentValue);
				currentValue.index = index;
				return <CardAndroidSession className={`cardLiveVM cardLiveVM${index} cardLiveVM${currentValue.avm_id}`} {...currentValue} key={currentValue.avm_id} actionEnter={this.props.actionEnter} actionStop={this.props.actionStop}/>;
			});
		} else if (this.props.isListLoading) {
			avmsRendered = <InfoBox style={{textAlign: 'center'}}>Loading sessions...</InfoBox>;
		} else {
			avmsRendered = <InfoBox style={{textAlign: 'center'}}>No sessions found. You can start a new session.</InfoBox>;
		}

		return (<div>
			{avmsRendered}
		</div>);
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
	avmList: React.PropTypes.array,
	isListLoading: React.PropTypes.bool
};

module.exports = LiveMachineList;
