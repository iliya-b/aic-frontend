'use strict';

import React from 'react';
import TableTestResult from 'app/components/table/table-test-result';
import adbTestResultParser from 'app/libs/adb-test-result-parser';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import LabeledSpan from 'app/components/form/labeled-span';

const debug = require('debug')('AiC:Components:Panel:PanelLiveTestResults');

const getTotals = testCases => {
	const total = testCases.length;
	const passed = testCases.reduce((p, c) => {
		return c.statusText === 'OK' ? p + 1 : p;
	}, 0);
	const failed = total - passed;
	const failedPercentage = Math.round(failed / total * 100);
	const passedPercentage = passed * 100;
	return {
		total,
		failed,
		failedPercentage,
		passed,
		passedPercentage
	};
};

const calcMachineTotal = totalsPerPackage => {
	let total = 0;
	let failed = 0;
	let passed = 0;

	totalsPerPackage.forEach(t => {
		total += t.total;
		failed += t.failed;
		passed += t.passed;
	});

	return {
		total,
		failed,
		failedPercentage: Math.round(failed / total * 100),
		passed,
		passedPercentage: Math.round(passed / total * 100)
	};
};

const getGlobalStatus = packages => {
	const order = ['READY', 'QUEUED', 'RUNNING', 'ERROR'];
	let status = -1;
	packages.forEach(p => {
		const packageStatusIndex = order.indexOf(p.status);
		if (packageStatusIndex > status) {
			status = packageStatusIndex;
		}
	});
	return status === -1 ? 'UNKNOWN' : order[status];
};

const getAnyReady = packages => {
	return !packages.every(p => p.status !== 'READY');
};

const PanelLiveTestResults = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isDetailsOpen: false};
	}

	handleToggleDetails = () => {
		this.setState({isDetailsOpen: !this.state.isDetailsOpen});
	}
	render() {
		const {
			items,
			style,
			...other
		} = this.props;

		const styleRoot = {
			padding: 10
		};
		const parsedResults = items.map(p => adbTestResultParser(p.stdout || ''));

		debug('parsedResults', parsedResults);

		const totalsPerPackage = parsedResults.map(p => getTotals(p.testCases));
		const totalsMachine = calcMachineTotal(totalsPerPackage);

		let globalStatus = getGlobalStatus(items);
		if (globalStatus === 'READY' && totalsMachine.failed !== 0) {
			globalStatus = 'ERROR';
		}

		const globalStatusIcon = <SimpleStatusIcon status={globalStatus}/>;

		const resultsPerPackage = parsedResults
			.filter((p, i) => items[i].status === 'READY')
			.map((p, i) => {
				return (
					<div key={items[i].label || i}>
						<LabeledSpan style={{marginLeft: 10}} label="package" value={items[i].label}/>
						<TableTestResult testCases={p.testCases}/>
					</div>
				);
			});

		const hasTestsReady = getAnyReady(items);
		// const elapsedTime = <span style={{minWidth: 150, display: 'inline-block', color: 'rgba(0, 0, 0, 0.5)'}}><FontIcon style={{color: AppPalette.primary1Color, fontSize: 20}} className="mdi mdi-clock"/> {timeHumanize(totalTime)}</span>;

		return (
			<Paper style={Object.assign(styleRoot, style || {})} {...other}>
				<div>
					{globalStatusIcon}
					{/* hasTestsReady && elapsedTime */}
					{hasTestsReady && <IconButton style={{float: 'right', padding: 0, width: 24, height: 24}} iconClassName={`mdi mdi-${this.state.isDetailsOpen ? 'chevron-up' : 'chevron-down'}`} onClick={this.handleToggleDetails}/>}
				</div>
				<div style={{display: this.state.isDetailsOpen ? '' : 'none'}}>
					{hasTestsReady && resultsPerPackage}
				</div>
			</Paper>
		);
	}
};

PanelLiveTestResults.propTypes = {
	style: React.PropTypes.object,
	items: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			stdout: React.PropTypes.string,
			label: React.PropTypes.string,
			status: React.PropTypes.string
		})
	)
};

module.exports = PanelLiveTestResults;
