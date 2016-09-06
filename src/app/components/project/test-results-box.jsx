'use strict';

import React from 'react';
import Spacing from 'material-ui/styles/spacing';
import {
	Paper,
	Card,
	CardHeader,
	CardText,
	FontIcon,
	Table,
	TableHeader,
	TableHeaderColumn,
	TableBody,
	TableRow,
	TableRowColumn
} from 'material-ui';
import AvatarProgress from 'app/components/shared/avatar-progress';
import AppUtils from 'app/components/shared/app-utils';
import CodeBox from 'app/components/shared/code-box';

const TestResultsBox = class extends React.Component {

	render() {
		// debug(this.props.results);
		const resultsRendered = this.props.results.map((item, index) => {
			const testCasesRendered = item.testCases.map((testCase, testCaseIndex) => {
				const statusIcon = testCase.failure ? <FontIcon className="mdi mdi-close" style={{color: this.context.muiTheme.palette.errorColor}}/> :
					<FontIcon className="mdi mdi-check" style={{color: this.context.muiTheme.palette.successColor}}/>;
				const failure = testCase.failure ? <TableRow key={`${testCaseIndex}-failure`}>
					<TableRowColumn/>
					<TableRowColumn colSpan="2" style={{color: this.context.muiTheme.palette.errorColor}}>
						<p><strong>{testCase.failure.message}</strong></p>
						<p>{testCase.failure.type}</p>
						<CodeBox>{testCase.failure.content}</CodeBox>
					</TableRowColumn>
				</TableRow> : null;
				const rowInfo = (<TableRow key={testCaseIndex} style={failure ? {borderBottomWidth: 0} : {}} >
					<TableRowColumn style={{width: '50px'}}>{statusIcon}</TableRowColumn>
					<TableRowColumn>{testCase.className}</TableRowColumn>
					<TableRowColumn>{testCase.name}</TableRowColumn>
				</TableRow>);
				return failure ? [rowInfo, failure] : [rowInfo];
			}, this);

			const totalTests = item.testCases.length;
			const totalFailedTests = item.testCases.reduce((previous, testCase) => {
				return testCase.failure ? 1 + previous : previous;
			}, 0);
			const percentageFailedTests = Math.round(totalFailedTests / totalTests * 100);
			const totalPassedTests = totalTests - totalFailedTests;

			const testProgress = (<AvatarProgress
				icon={<FontIcon className="mdi mdi-android"/>}
				style={{marginRight: Spacing.desktopGutter}}
				progress={percentageFailedTests}
				color="rgba(0, 0, 0, 0.54)"
				backgroundColor={this.context.muiTheme.palette.successColor}
				foregroundColor={this.context.muiTheme.palette.errorColor}
				/>
			);

			const infoTests = (<div> {totalTests} test {AppUtils.pluralize(totalTests, 'case')}
					{totalPassedTests ? <span style={{color: this.context.muiTheme.palette.successColor}}> {totalPassedTests} {AppUtils.pluralize(totalPassedTests, 'test')} passed </span> : null}
					{totalFailedTests ? <span style={{color: this.context.muiTheme.palette.errorColor}}> {totalFailedTests} {AppUtils.pluralize(totalFailedTests, 'test')} failed </span> : null}
					{item.time} time
			</div>);

			const tableTests = (<Table selectable={false}>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false} >
					<TableRow>
						<TableHeaderColumn style={{width: '50px'}}>Status</TableHeaderColumn>
						<TableHeaderColumn>Class</TableHeaderColumn>
						<TableHeaderColumn>Name</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
				{testCasesRendered}
				</TableBody>
			</Table>);

			return (<Card expandable key={index}>
				<CardHeader
					title={item.name}
					subtitle={infoTests}
					avatar={testProgress}
					showExpandableButton
					/>
				<CardText expandable>
				{tableTests}
				</CardText>
			</Card>);
		}, this);

		return (<div>

			<Paper>
				{resultsRendered}
			</Paper>

		</div>);
	}

};

TestResultsBox.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

TestResultsBox.propTypes = {
	results: React.PropTypes.array
};

module.exports = TestResultsBox;
