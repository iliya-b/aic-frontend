'use strict';

import React from 'react';
import PanelInfo from 'app/components/panel/panel-info';
import CardAndroidSession from 'app/components/card/card-android-session';

const debug = require('debug')('AiC:Component:LiveMachineList');

const LiveMachineList = class extends React.Component {
	render() {
		let avmsRendered = '';
		const styleCard = {
			margin: '0 0 20px 20px',
			width: 412
		};
		const styleRoot = {
			marginLeft: '-20px'
		};

		// List VMs or information about loading and no VMs
		if (this.props.avmList && this.props.avmList.length) {
			avmsRendered = this.props.avmList.map((currentValue, index) => {
				debug('currentValue', currentValue);
				currentValue.index = index;
				return <CardAndroidSession style={styleCard} className={`cardLiveVM cardLiveVM${index} cardLiveVM${currentValue.avm_id}`} {...currentValue} key={currentValue.avm_id} actionEnter={this.props.actionEnter} actionStop={this.props.actionStop}/>;
			});
		} else if (this.props.isListLoading) {
			avmsRendered = <PanelInfo style={{textAlign: 'center'}}>Loading sessions...</PanelInfo>;
		} else {
			avmsRendered = <PanelInfo style={{textAlign: 'center'}}>No sessions found. You can start a new session.</PanelInfo>;
		}

		return (
			<div style={styleRoot}>
				{avmsRendered}
			</div>
		);
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
