'use strict';

import React from 'react';
import LabeledSpan from 'app/components/form/labeled-span';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import timeHumanize from 'app/libs/time-humanize';
// import {getVmStatus} from 'app/libs/helpers';
// import MachineIcon from 'app/components/icon/machine-icon';
import DeviceIcon from 'app/components/icon/device-icon';

const debug = require('debug')('AiC:Components:Panel:PanelCampaignMachine');

const PanelCampaignMachine = class extends React.Component {
	handleEnterMachine = () => {
		if (this.props.onEnter) {
			this.props.onEnter(this.props.avmId);
		}
	}

	handleDeleteMachine = () => {
		if (this.props.onStop) {
			this.props.onStop(this.props.avmId);
		}
	}

	render() {
		debug('render');

		const machineIcon = <span style={{minWidth: 52, display: 'inline-block'}}><DeviceIcon style={{marginTop: -6, marginLeft: 10, marginRight: 10, transform: 'scale(0.7)'}} isOn image={this.props.image}/></span>;

		return (
			<div key={this.props.avmId} style={{padding: 10}}>
				{machineIcon}
				<LabeledSpan style={{marginLeft: 5}} label="status" value={this.props.status}/>
				<LabeledSpan label="name" value={this.props.avmName}/>
				<LabeledSpan label="owner" value={this.props.avmOwner}/>
				<LabeledSpan label="uptime" value={timeHumanize(Math.round(this.props.uptime * 1000))}/>
				{(this.props.status === 'READY') ?
					<IconButton className={`btEnterSession btEnterSession${this.props.avmId}`} label="Enter session" title={`Enter session ${this.props.avmId}`} tooltipPosition="top-center" tooltip="Enter" onClick={this.handleEnterMachine}>
						<FontIcon className="mdi mdi-arrow-right-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton> : null}
				<IconButton className={`btStopSession btStopSession${this.props.avmId}`} label="Stop session" title={`Stop session ${this.props.avmId}`} tooltipPosition="top-center" tooltip="Delete" onClick={this.handleDeleteMachine}>
					<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
				</IconButton>
			</div>
		);
	}
};

PanelCampaignMachine.propTypes = {
	avmId: React.PropTypes.string,
	status: React.PropTypes.string,
	image: React.PropTypes.string,
	avmName: React.PropTypes.string,
	avmOwner: React.PropTypes.string,
	uptime: React.PropTypes.number,
	onEnter: React.PropTypes.func,
	onStop: React.PropTypes.func
};

module.exports = PanelCampaignMachine;
