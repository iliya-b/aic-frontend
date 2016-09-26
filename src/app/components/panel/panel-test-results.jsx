'use strict';

import React from 'react';
import DeviceIcon from 'app/components/icon/device-icon';
import TableTestResult from 'app/components/table/table-test-result';
import adbTestResultParser from 'app/libs/adb-test-result-parser';
import AppPalette from 'app/configs/app-palette';
import timeHumanize from 'app/libs/time-humanize';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import LabeledSpan from 'app/components/form/labeled-span';
import FontIcon from 'material-ui/FontIcon';
import MachineIcon from 'app/components/icon/machine-icon';
import {getVmStatus} from 'app/libs/helpers';

const debug = require('debug')('AiC:Components:Panel:PanelTestResults');

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

const PanelTestResults = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isDetailsOpen: false};
	}

	handleToggleDetails = () => {
		this.setState({isDetailsOpen: !this.state.isDetailsOpen});
	}

	handleEnterMachine = () => {
		if (this.props.onEnter) {
			this.props.onEnter(this.props.machine.avmId);
		}
	}

	handleDeleteMachine = () => {
		if (this.props.onStop) {
			this.props.onStop(this.props.machine.avmId);
		}
	}

	render() {
		const {
			packages,
			image,
			style,
			machine,
			...other
		} = this.props;

		debug('render', machine);

		const hasMachine = machine !== false;
		const styleRoot = {
			padding: 10
		};
		const parsedResults = packages.map(p => adbTestResultParser(p.stdout));

	// parsedResult = {
	// 	statusCode: -1,
	// 	statusText: 'ERROR',
	// 	timeMilliseconds: 2,
	// 	testCases: [
	// 		{
	// 			current: 1,
	// 			id: 'InstrumentationTestRunner',
	// 			numTests: 2,
	// 			statusCode: 0,
	// 			statusText: 'OK',
	// 			testClass: 'com.zenika.aic.core.libs.ParserTest',
	// 			testName: 'testAndroidTestCaseSetupProperly'
	// 		}
	// 	]
	// }

		const totalsPerPackage = parsedResults.map(p => getTotals(p.testCases));
		const totalsMachine = calcMachineTotal(totalsPerPackage);
		const totalTime = parsedResults.reduce((p, c) => p + c.timeMilliseconds, 0);

		// const infoTests = (
		// 	<div>
		// 		{totalsMachine.total} test {AppUtils.pluralize(totalsMachine.total, 'case')}
		// 		{totalsMachine.passed !== 0 && <span style={{color: AppPalette.successColor}}> {totalsMachine.passed} {AppUtils.pluralize(totalsMachine.passed, 'test')} passed </span>}
		// 		{totalsMachine.failed !== 0 && <span style={{color: AppPalette.errorColor}}> {totalsMachine.failed} {AppUtils.pluralize(totalsMachine.failed, 'test')} failed </span>}
		// 		{timeHumanize(totalTime)}
		// 	</div>
		// );

		// const testProgress = (
		// 	<AvatarProgress
		// 		icon={<FontIcon className="mdi mdi-android"/>}
		// 		style={{marginRight: 12}}
		// 		progress={totals.failedPercentage}
		// 		color="rgba(0, 0, 0, 0.54)"
		// 		backgroundColor={AppPalette.successColor}
		// 		foregroundColor={AppPalette.errorColor}
		// 		/>
		// );

		let globalStatus = getGlobalStatus(packages);
		if (globalStatus === 'READY' && totalsMachine.failed !== 0) {
			globalStatus = 'ERROR';
		}
		const machineIcon = <span style={{minWidth: 52, display: 'inline-block'}}><DeviceIcon style={{marginTop: -6, marginLeft: 10, marginRight: 10, transform: 'scale(0.7)'}} isOn={hasMachine} image={image}/></span>;
		const globalStatusIcon = <SimpleStatusIcon status={globalStatus}/>;

		const resultsPerPackage = parsedResults
			.filter((p, i) => packages[i].status === 'READY')
			.map((p, i) => {
				return (
					<div key={packages[i].apkPackage}>
						<LabeledSpan style={{marginLeft: 10}} label="package" value={packages[i].apkPackage}/>
						<TableTestResult testCases={p.testCases}/>
					</div>
				);
			});

		const hasTestsReady = getAnyReady(packages);
		const elapsedTime = <span style={{minWidth: 150, display: 'inline-block', color: 'rgba(0, 0, 0, 0.5)'}}><FontIcon style={{color: AppPalette.primary1Color, fontSize: 20}} className="mdi mdi-clock"/> {timeHumanize(totalTime)}</span>;
		const machineText = <span style={{minWidth: 150, display: 'inline-block', color: 'rgba(0, 0, 0, 0.5)'}}>{`${image.replace('-', ' ')}`}</span>;
		const index = 0;
		const machineRunning = (
			<div style={{padding: 10}}>
				<MachineIcon status={getVmStatus(machine.status)}/>
				<LabeledSpan style={{marginLeft: 5}} label="status" value={machine.status}/>
				<LabeledSpan label="name" value={machine.avmName}/>
				<LabeledSpan label="owner" value={machine.avmOwner}/>
				<LabeledSpan label="uptime" value={timeHumanize(Math.round(machine.uptime * 1000))}/>
				{(machine.status === 'READY') ?
					<IconButton className={`btEnterSession btEnterSession${index}  btEnterSession${machine.avmId}`} label="Enter session" title={`Enter session ${machine.avmId}`} tooltipPosition="top-center" tooltip="Enter" onClick={this.handleEnterMachine}>
						<FontIcon className="mdi mdi-arrow-right-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton> : null}
				<IconButton className={`btStopSession btStopSession${index} btStopSession${machine.avmId}`} label="Stop session" title={`Stop session ${machine.avmId}`} tooltipPosition="top-center" tooltip="Delete" onClick={this.handleDeleteMachine}>
					<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
				</IconButton>
			</div>
		);
		return (
			<Paper style={Object.assign(styleRoot, style || {})} {...other}>
				<div>
					{globalStatusIcon}
					{machineIcon} {machineText}
					{hasTestsReady && elapsedTime}
					{(hasTestsReady || hasMachine) && <IconButton style={{float: 'right', padding: 0, width: 24, height: 24}} iconClassName={`mdi mdi-${this.state.isDetailsOpen ? 'chevron-up' : 'chevron-down'}`} onClick={this.handleToggleDetails}/>}
				</div>
				<div style={{display: this.state.isDetailsOpen ? '' : 'none'}}>
					{hasMachine && machineRunning}
					{hasTestsReady && resultsPerPackage}
				</div>
			</Paper>
		);
	}
};

PanelTestResults.propTypes = {
	style: React.PropTypes.object,
	image: React.PropTypes.string,
	machine: React.PropTypes.oneOf(React.PropTypes.object, React.PropTypes.bool),
	packages: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			stdout: React.PropTypes.string,
			apkPackage: React.PropTypes.string,
			status: React.PropTypes.string,
			image: React.PropTypes.string
		})
	),
	onEnter: React.PropTypes.func,
	onStop: React.PropTypes.func
};

module.exports = PanelTestResults;
