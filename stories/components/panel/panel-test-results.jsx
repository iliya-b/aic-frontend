// TODO: investigate why it does not work
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import PanelTestResults from 'app/components/panel/panel-test-results';

const panelData = {
	image: 'kitkat-tablet',
	packages: [{
		stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.005\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
		apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
		status: 'READY',
		image: 'kitkat-tablet'
	}]
};

storiesOf('Panel', module)
	.addDecorator(themeDecorator)
	.add('PanelTestResults', () => (
		<div>
			<PanelTestResults style={{margin: '10px'}} {...panelData}/>
		</div>
	));
