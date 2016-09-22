import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import PanelCampaignShow from 'app/components/panel/panel-campaign-show';

const campaignData = [
	{
		id: '09c40102703b11e69df2fa163e728b77',
		projectId: 'eb8ef796703a11e69df2fa163e728b77',
		status: 'READY',
		progress: 1.0,
		tests: [
			{
				stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.005\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
				apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
				status: 'READY',
				image: 'kitkat-tablet'
			},
			{
				stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.002\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
				apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
				status: 'READY',
				image: 'lollipop-tablet'
			}
		],
		name: 'test'
	}, {
		id: '165e4df0710311e69df3fa163e728b77',
		projectId: 'eb8ef796703a11e69df2fa163e728b77',
		status: 'RUNNING',
		progress: 0.0,
		tests: [
			{
				stdout: '',
				apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
				status: 'QUEUED',
				image: 'kitkat-tablet'
			},
			{
				stdout: '',
				apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
				status: 'QUEUED',
				image: 'kitkat-phone'
			},
			{
				stdout: '',
				apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
				status: 'QUEUED',
				image: 'lollipop-tablet'
			},
			{
				stdout: '',
				apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
				status: 'QUEUED',
				image: 'lollipop-phone'
			}
		],
		name: '654'
	}
];

storiesOf('Panel', module)
	.addDecorator(themeDecorator)
	.add('PanelCampaignShow', () => (
		<div>
			<h2>test1</h2>
			<PanelCampaignShow style={{margin: '10px'}} {...campaignData[0]}/>
			<h2>test2</h2>
			<PanelCampaignShow style={{margin: '10px'}} {...campaignData[1]}/>
		</div>
	));
