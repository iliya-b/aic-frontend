'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import LabeledSpan from 'app/components/form/labeled-span';
import CampaignIcon from 'app/components/icon/campaign-icon';
import PanelTestResults from 'app/components/panel/panel-test-results';

const debug = require('debug')('AiC:Components:Panel:PanelCampaignShow');

const groupByMachine = (tests, machines) => {
	const machinesHash = {};
	machines.forEach(m => {
		machinesHash[m.image] = m;
	});
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
				packages: [t],
				machine: t.image in machinesHash ? machinesHash[t.image] : false
			});
		}
	});
	return testsByMachine;
};

const sortName = (a, b) => {
	if (a.image < a.image) {
		return -1;
	}
	if (a.image > b.image) {
		return 1;
	}

	// names must be equal
	return 0;
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
		machines,
		name,
		...others
	} = props;
	const progressPerc = parseInt(progress * 100, 10);

	const testsList = groupByMachine(tests, machines).sort(sortName).map(t => {
		return <div key={t.image}><PanelTestResults {...t}/><br/></div>;
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
//   machines: [
//   {
//   "avm_id": "f8cf402e818211e69875fa163e728b77",
//   "avm_name": "f8cf402e",
//   "avm_owner": "karine",
//   "image": "kitkat-phone",
//   "novnc_host": "10.5.1.207",
//   "novnc_port": 10093,
//   "sound_port": 10092,
//   "project_id": "97231e3c7f3811e69574fa163e728b77",
//   "stack_name": "kp2-karine-f8cf402e818211e69875fa163e728b77",
//   "status": "READY",
//   "ts_created": "2016-09-23T11:43:40Z",
//   "uptime": 3.978423,
//   "campaign_id": "f8c04ccc818211e69875fa163e728b77"
// }
// ]
//
PanelCampaignShow.defaultProps = {
	machines: []
};

PanelCampaignShow.propTypes = {
	style: React.PropTypes.object,
	progress: React.PropTypes.number,
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	status: React.PropTypes.string,
	projectId: React.PropTypes.string,
	tests: React.PropTypes.array,
	machines: React.PropTypes.array
};

module.exports = PanelCampaignShow;
