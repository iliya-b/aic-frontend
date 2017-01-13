'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import LabeledSpan from 'app/components/form/labeled-span';
import CampaignIcon from 'app/components/icon/campaign-icon';
import PanelTestResultsPackage from 'app/components/panel/panel-test-results-package';
import PanelCampaignMachine from 'app/components/panel/panel-campaign-machine';

const debug = require('debug')('AiC:Components:Panel:PanelCampaignShow');

const PanelCampaignShow = props => {
	debug('render');
	const {
		style,
		id,
		projectId, // eslint-disable-line no-unused-vars
		status,
		progress,
		tests,
		machines,
		name,
		onEnter,
		onStop,
		...others
	} = props;
	const progressPerc = progress ? parseInt(progress * 100, 10) : '';

	const testsList = tests.map((t, i) => {
		return <div key={i}><PanelTestResultsPackage {...t}/><br/></div>;
	});

	const machineList = machines.map(machine => {
		return <PanelCampaignMachine key={machine.avmId} onEnter={onEnter} onStop={onStop} {...machine}/>;
	});

	return (
		<div>
			<Paper style={Object.assign({padding: 10}, style)} {...others}>
				<CampaignIcon style={{marginTop: -4, marginRight: 5, float: 'left'}} tooltip={status} status={status}/>
				<LabeledSpan value={`${progressPerc}%`} label="total progress"/>
				<LabeledSpan style={{marginRight: 10}} value={id} label="id"/>
				<LabeledSpan value={name} label="name"/>
			</Paper>
			<br/>
			{machineList.length > 0 && (
				<div>
					<Paper style={Object.assign({padding: 10}, style)} {...others}>
						{machineList}
					</Paper>
					<br/>
				</div>
			)}

			{testsList}
		</div>
	);
};

PanelCampaignShow.defaultProps = {
	machines: [],
	tests: []
};

PanelCampaignShow.propTypes = {
	style: React.PropTypes.object,
	progress: React.PropTypes.number,
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	status: React.PropTypes.string,
	projectId: React.PropTypes.string,
	tests: React.PropTypes.array,
	machines: React.PropTypes.array,
	onEnter: React.PropTypes.func,
	onStop: React.PropTypes.func
};

module.exports = PanelCampaignShow;
