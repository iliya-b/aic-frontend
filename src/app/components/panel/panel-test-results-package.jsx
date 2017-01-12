'use strict';

import React from 'react';
import TableTestResult from 'app/components/table/table-test-result';
import adbTestResultParser from 'app/libs/adb-test-result-parser';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import LabeledSpan from 'app/components/form/labeled-span';
import DeviceIcon from 'app/components/icon/device-icon';

const debug = require('debug')('AiC:Components:Panel:PanelTestResults');

const PanelTestResults = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isDetailsOpen: false};
	}

	handleToggleDetails = () => {
		this.setState({isDetailsOpen: !this.state.isDetailsOpen});
	}

	render() {
		const {
			status,
			stdout,
			style,
			apkPackage,
			image,
			...other
		} = this.props;

		debug('render');

		const styleRoot = {
			padding: 10
		};

		const parsedResult = adbTestResultParser(stdout);
		const globalStatus = parsedResult.testCases.some(t => t.statusText !== 'OK') ? 'ERROR' : status;
		const globalStatusIcon = <SimpleStatusIcon status={globalStatus}/>;
		const hasTestsReady = Boolean(stdout);
		const machineIcon = <span style={{minWidth: 52, display: 'inline-block'}}><DeviceIcon style={{marginTop: -6, marginLeft: 10, marginRight: 10, transform: 'scale(0.7)'}} isOn image={image}/></span>;

		return (
			<Paper style={Object.assign(styleRoot, style || {})} {...other}>
				<div>
					{hasTestsReady && <IconButton style={{float: 'right', padding: 0, width: 24, height: 24}} iconClassName={`mdi mdi-${this.state.isDetailsOpen ? 'chevron-up' : 'chevron-down'}`} onClick={this.handleToggleDetails}/>}
					{globalStatusIcon}
					{machineIcon}
					{Boolean(apkPackage) && <LabeledSpan style={{marginLeft: 10, marginTop: 0}} label="package" value={apkPackage}/>}
				</div>
				<div style={{display: this.state.isDetailsOpen ? '' : 'none'}}>
					<TableTestResult testCases={parsedResult.testCases}/>
				</div>
			</Paper>
		);
	}
};

PanelTestResults.propTypes = {
	style: React.PropTypes.object,
	status: React.PropTypes.string,
	stdout: React.PropTypes.string,
	apkPackage: React.PropTypes.string,
	image: React.PropTypes.string
};

module.exports = PanelTestResults;
