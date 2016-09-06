'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import LabeledSpan from 'app/components/form/labeled-span';
import CampaignIcon from 'app/components/icon/campaign-icon';
import PanelTestResults from 'app/components/panel/panel-test-results';

const debug = require('debug')('AiC:Components:Panel:PanelCampaignShow');

const groupByMachine = tests => {
	const testsByMachine = [];
	const machineIndex = {};
	tests.forEach(t => {
		if (t.image in machineIndex) {
			const i = machineIndex[t.image];
			testsByMachine[i].packages.push(t);
		} else {
			machineIndex[t.image] = testsByMachine.length;
			testsByMachine.push({
				image: t.image,
				packages: [t]
			});
		}
	});
	return testsByMachine;
};

const PanelCampaignShow = props => {
	debug('render');
	const {
		style,
		id,
		projectId, // eslint-disable-line no-unused-vars
		status,
		progress,
		tests,
		name,
		...others
	} = props;
	const progressPerc = parseInt(progress * 100, 10);

	const testsList = groupByMachine(tests).map((t, i) => {
		return <div key={i}><PanelTestResults {...t}/><br/></div>;
	});
	//
	return (
		<div>
			<Paper style={Object.assign({padding: 10}, style)} {...others}>
				<CampaignIcon style={{marginTop: -4, marginRight: 5, float: 'left'}} tooltip={status} status={status}/>
				<LabeledSpan value={`${progressPerc}%`} label="total progress"/>
				<LabeledSpan style={{marginRight: 10}} value={id} label="id"/>
				<LabeledSpan value={name} label="name"/>
			</Paper>
			<br/>
			{testsList}
		</div>
	);
};

//   id: '09c40102703b11e69df2fa163e728b77',
//   project_id: 'eb8ef796703a11e69df2fa163e728b77',
//   status: 'READY',
//   progress: 1.0,
//   tests: [
//     {
//       image: 'kitkat-tablet',
//       packages: [{
//       	stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.005\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
//       	package: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
//       	status: 'READY'
//       },
//       ]
//     },
//     {
//       stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.002\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
//       package: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
//       status: 'READY',
//       image: 'lollipop-tablet'
//     }
//   ],
//   name: 'test'

PanelCampaignShow.propTypes = {
	style: React.PropTypes.object,
	progress: React.PropTypes.number,
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	status: React.PropTypes.string,
	projectId: React.PropTypes.string,
	tests: React.PropTypes.array
};

module.exports = PanelCampaignShow;
