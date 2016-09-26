import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import TableTestResult from 'app/components/table/table-test-result';

const testCasesOK = [
	{
		current: 1,
		id: 'InstrumentationTestRunner',
		numTests: 2,
		statusCode: 0,
		statusText: 'OK',
		testClass: 'com.zenika.aic.core.libs.ParserTest',
		testName: 'testAndroidTestCaseSetupProperly'
	},
	{
		current: 1,
		id: 'InstrumentationTestRunner',
		numTests: 2,
		statusCode: 0,
		statusText: 'OK',
		testClass: 'com.zenika.aic.core.libs.ParserTest',
		testName: 'testAndroidTestCaseSetupProperly',
		stackTrace: 'blabla'
	}
];

const testCasesNOK = [
	{
		numTests: 2,
		id: 'AndroidJUnitRunner',
		testName: 'testUS1',
		testClass: 'com.zenika.aic.demo.sensor.BatteryTestCase',
		stackTrace: 'android.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true],\r\n,\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496),\r\n,\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544),\r\n,\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563),\r\n,\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265),\r\n,\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213),\r\n,\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190),\r\n,\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37),\r\n,\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24),\r\n,\tat junit.framework.TestCase.runBare(TestCase.java:132),\r\n,\tat junit.framework.TestResult$1.protect(TestResult.java:115),\r\n,\tat junit.framework.TestResult.runProtected(TestResult.java:133),\r\n,\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90),\r\n,\tat junit.framework.TestResult.run(TestResult.java:118),\r\n,\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49),\r\n,\tat junit.framework.TestCase.run(TestCase.java:124),\r\n,\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63),\r\n,\tat junit.framework.TestSuite.runTest(TestSuite.java:243),\r\n,\tat junit.framework.TestSuite.run(TestSuite.java:238),\r\n,\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103),\r\n,\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63),\r\n,\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90),\r\n,\tat org.junit.runners.Suite.runChild(Suite.java:128),\r\n,\tat org.junit.runners.Suite.runChild(Suite.java:24),\r\n,\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231),\r\n,\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60),\r\n,\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229),\r\n,\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50),\r\n,\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222),\r\n,\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300),\r\n,\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157),\r\n,\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136),\r\n,\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270),\r\n,\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853),\r\n,',
		current: 1,
		statusCode: -2,
		statusText: 'FAILURE'
	},
	{
		numTests: 2,
		id: 'AndroidJUnitRunner',
		testName: 'testUS2',
		testClass: 'com.zenika.aic.demo.sensor.BatteryTestCase',
		stackTrace: 'android.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true],\r\n,\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496),\r\n,\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544),\r\n,\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563),\r\n,\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265),\r\n,\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213),\r\n,\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190),\r\n,\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37),\r\n,\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24),\r\n,\tat junit.framework.TestCase.runBare(TestCase.java:132),\r\n,\tat junit.framework.TestResult$1.protect(TestResult.java:115),\r\n,\tat junit.framework.TestResult.runProtected(TestResult.java:133),\r\n,\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90),\r\n,\tat junit.framework.TestResult.run(TestResult.java:118),\r\n,\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49),\r\n,\tat junit.framework.TestCase.run(TestCase.java:124),\r\n,\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63),\r\n,\tat junit.framework.TestSuite.runTest(TestSuite.java:243),\r\n,\tat junit.framework.TestSuite.run(TestSuite.java:238),\r\n,\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103),\r\n,\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63),\r\n,\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90),\r\n,\tat org.junit.runners.Suite.runChild(Suite.java:128),\r\n,\tat org.junit.runners.Suite.runChild(Suite.java:24),\r\n,\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231),\r\n,\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60),\r\n,\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229),\r\n,\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50),\r\n,\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222),\r\n,\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300),\r\n,\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157),\r\n,\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136),\r\n,\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270),\r\n,\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853),\r\n,',
		current: 2,
		statusCode: -2,
		statusText: 'FAILURE'
	}
];

storiesOf('Table', module)
	.addDecorator(themeDecorator)
	.add('TableTestResult', () => (
		<div style={{padding: 20}}>
			<h2>Tests ok</h2>
			<TableTestResult testCases={testCasesOK}/>
			<h2>Tests failure</h2>
			<TableTestResult testCases={testCasesNOK}/>
		</div>
	));
