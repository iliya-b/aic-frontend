'use strict';

import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import DeviceIcon from 'app/components/icon/device-icon';
import TableTestResult from 'app/components/table/table-test-result';
import adbTestResultParser from 'app/libs/adb-test-result-parser';
import AppPalette from 'app/configs/app-palette';
import AppUtils from 'app/components/shared/app-utils';

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

const PanelTestResults = props => {
	const {
		packages,
		image,
		...other
	} = props;

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

	const infoTests = (
		<div>
			{totalsMachine.total} test {AppUtils.pluralize(totalsMachine.total, 'case')}
			{totalsMachine.passed !== 0 && <span style={{color: AppPalette.successColor}}> {totalsMachine.passed} {AppUtils.pluralize(totalsMachine.passed, 'test')} passed </span>}
			{totalsMachine.failed !== 0 && <span style={{color: AppPalette.errorColor}}> {totalsMachine.failed} {AppUtils.pluralize(totalsMachine.failed, 'test')} failed </span>}
			{totalTime} milliseconds
		</div>
	);

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

	const testProgress = image ? <DeviceIcon isOn image={image}/> : null;

	const resultsPerPackage = parsedResults.map((p, i) => <TableTestResult key={i} testCases={p.testCases}/>);

	// <Paper style={Object.assign(styleRoot, style || {})} {...other}>
	//		<DeviceIcon isOn image={image}/>
	//		<CampaignIcon style={{marginTop: 3, float: 'left'}} tooltip={status} status={status}/>
	//		{apkPackage}
	//		{parsedResult.timeMilliseconds}
	//	</Paper>
	return (
		<Card expandable {...other}>
			<CardHeader
				title={image}
				subtitle={infoTests}
				avatar={testProgress}
				showExpandableButton
				/>
			<CardText expandable>
				{resultsPerPackage}
			</CardText>
		</Card>
	);
};

PanelTestResults.propTypes = {
	style: React.PropTypes.object,
	image: React.PropTypes.string,
	packages: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			stdout: React.PropTypes.string,
			apkPackage: React.PropTypes.string,
			status: React.PropTypes.string,
			image: React.PropTypes.string
		})
	)
};

module.exports = PanelTestResults;
