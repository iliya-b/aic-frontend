'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CodeBox from 'app/components/shared/code-box';
// TODO: Use context or AppPalette?
import AppPalette from 'app/configs/app-palette';

const statusIcons = {
	OK: <FontIcon className="mdi mdi-check" style={{color: AppPalette.successColor}}/>,
	ERROR: <FontIcon className="mdi mdi-close" style={{color: AppPalette.errorColor}}/>,
	FAILURE: <FontIcon className="mdi mdi-close" style={{color: AppPalette.errorColor}}/>,
	NOTFOUND: <FontIcon className="mdi mdi-help" style={{color: AppPalette.primary1Color}}/>
};

// 			current: 1,
// 			id: 'InstrumentationTestRunner',
// 			numTests: 2,
// 			statusCode: 0,
// 			statusText: 'OK',
// 			testClass: 'com.zenika.aic.core.libs.ParserTest',
// 			testName: 'testAndroidTestCaseSetupProperly'

// 			current: 1,
// 			id: 'InstrumentationTestRunner',
// 			numTests: 2,
// 			statusCode: 0,
// 			statusText: 'OK',
// 			testClass: 'com.zenika.aic.core.libs.ParserTest',
// 			testName: 'testAndroidTestCaseSetupProperly'
// 			stackTrace: 'blabla'

const resultRow = result => {
	const isFailure = result.statusText !== 'OK';
	const isLast = result.current === result.numTests;
	const statusIcon = result.statusText in statusIcons ? statusIcons[result.statusText] : statusIcons.NOTFOUND;

	const rowInfo = (<TableRow key={`info-${result.current}`} style={(isFailure || isLast) ? {borderBottomWidth: 0} : {}} >
		<TableRowColumn style={{width: '50px'}}>{statusIcon}</TableRowColumn>
		<TableRowColumn>{result.testClass}</TableRowColumn>
		<TableRowColumn>{result.testName}</TableRowColumn>
	</TableRow>);

	const rowFailure = isFailure ? <TableRow key={`failure-${result.current}`}>
		<TableRowColumn/>
		<TableRowColumn colSpan="2" style={{color: AppPalette.errorColor}}>
			<CodeBox style={{overflowY: 'hidden'}}>{result.stackTrace}</CodeBox>
		</TableRowColumn>
	</TableRow> : null;

	if (isFailure) {
		return [rowInfo, rowFailure];
	}
	return [rowInfo];
};

const TableTestResult = props => {
	const tableTestCases = props.testCases.map(resultRow);

	return (
		<Table style={{position: 'relative'}} selectable={false}>
			<TableHeader displaySelectAll={false} adjustForCheckbox={false} >
				<TableRow>
					<TableHeaderColumn style={{width: '50px', color: AppPalette.disabledColor}}>Status</TableHeaderColumn>
					<TableHeaderColumn style={{color: AppPalette.disabledColor}}>Class</TableHeaderColumn>
					<TableHeaderColumn style={{color: AppPalette.disabledColor}}>Name</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody displayRowCheckbox={false}>
			{tableTestCases}
			</TableBody>
		</Table>
	);
};

TableTestResult.propTypes = {
	testCases: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			style: React.PropTypes.object,
			stdout: React.PropTypes.string,
			apkPackage: React.PropTypes.string,
			status: React.PropTypes.string,
			image: React.PropTypes.string
		})
	)
};

module.exports = TableTestResult;
