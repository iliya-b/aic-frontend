import fs from 'fs';
import test from 'ava';
import adbTestResultParser from 'app/libs/adb-test-result-parser';

// Result sample
// const results = [
// 	{
// 		properties: [],
// 		testCases: [
// 			{
// 				className: 'com.zenika.aic.core.libs.ParserTest',
// 				name: 'testAndroidTestCaseSetupProperly'
// 			},
// 			{
// 				className: 'com.zenika.aic.core.libs.ParserTest',
// 				name: 'testApplicationTestCaseSetUpProperly'
// 			},
// 			{
// 				className: 'com.zenika.aic.demo.sensor.BatteryTestCase',
// 				name: 'testUS1',
// 				failure:
// 				{
// 					message: 'Battery level not found',
// 					type: 'junit.framework.AssertionFailedError',
// 					content: 'junit.framework.AssertionFailedError:  Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java: 50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java: 20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java: 73)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java: 36)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java: 515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java: 214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java: 199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java: 134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java: 115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java: 133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java: 90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java: 118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java: 49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java: 124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java: 63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java: 243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java: 238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java: 103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java: 63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java: 90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java: 128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java: 24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java: 231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java: 60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java: 229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java: 50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java: 222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java: 300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java: 157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java: 136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java: 270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java: 1701)\r\r\n\r'
// 				}
// 			},
// 			{
// 				className: 'com.zenika.aic.demo.sensor.BatteryTestCase',
// 				name: 'testUS2',
// 				failure:
// 				{
// 					message: 'Battery level not found',
// 					type: 'junit.framework.AssertionFailedError',
// 					content: 'junit.framework.AssertionFailedError:  Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java: 50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java: 20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java: 82)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java: 40)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java: 515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java: 214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java: 199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java: 134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java: 115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java: 133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java: 90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java: 118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java: 49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java: 124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java: 63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java: 243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java: 238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java: 103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java: 63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java: 90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java: 128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java: 24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java: 231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java: 60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java: 229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java: 50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java: 222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java: 300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java: 157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java: 136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java: 270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java: 1701)\r\r\n\r'
// 				}
// 			}
// 		],
// 		time: '0.0',
// 		name: 'APK test'
// 	}]; // eslint-disable-line quote-props

test(`Can parse file test-1.stdout`, t => {
	let resultStr = fs.readFileSync('../../assets/test-1.stdout', 'utf8');
	// const firstLinePos = resultStr.indexOf('\n');
	// console.log(resultStr.substring(0, firstLinePos));
	resultStr = resultStr.substring(resultStr.indexOf('\n') + 1);
	// console.log(resultStr);
	const resultObj = adbTestResultParser(resultStr);
	// console.log(resultObj);
	t.is(typeof resultObj, 'object');
	t.is(resultObj.testCases.length, 2);
	t.is(typeof resultObj.timeMilliseconds, 'number');
	t.is(resultObj.timeMilliseconds, 3);
});

test(`Can parse file test-2.stdout`, t => {
	let resultStr = fs.readFileSync('../../assets/test-2.stdout', 'utf8');
	// const firstLinePos = resultStr.indexOf('\n');
	// console.log(resultStr.substring(0, firstLinePos));
	resultStr = resultStr.substring(resultStr.indexOf('\n') + 1);
	// console.log(resultStr);
	const resultObj = adbTestResultParser(resultStr);
	// console.log(resultObj);
	t.is(typeof resultObj, 'object');
	t.is(resultObj.testCases.length, 2);
	t.is(typeof resultObj.timeMilliseconds, 'number');
	t.is(resultObj.timeMilliseconds, 19903);
});

test(`Can parse file test-3.stdout`, t => {
	let resultStr = fs.readFileSync('../../assets/test-3.stdout', 'utf8');
	// const firstLinePos = resultStr.indexOf('\n');
	// console.log(resultStr.substring(0, firstLinePos));
	resultStr = resultStr.substring(resultStr.indexOf('\n') + 1);
	// console.log(resultStr);
	const resultObj = adbTestResultParser(resultStr);
	// console.log(resultObj);
	t.is(typeof resultObj, 'object');
	t.is(resultObj.testCases.length, 1);
	t.is(resultObj.timeMilliseconds, null);
});

test(`Can parse file test-4.stdout`, t => {
	let resultStr = fs.readFileSync('../../assets/test-4.stdout', 'utf8');
	// const firstLinePos = resultStr.indexOf('\n');
	// console.log(resultStr.substring(0, firstLinePos));
	resultStr = resultStr.substring(resultStr.indexOf('\n') + 1);
	// console.log(resultStr);
	const resultObj = adbTestResultParser(resultStr);
	// console.log(resultObj);
	t.is(typeof resultObj, 'object');
	t.is(resultObj.testCases.length, 0);
	t.is(resultObj.timeMilliseconds, null);
});

test(`Can parse file test-5.stdout`, t => {
	let resultStr = fs.readFileSync('../../assets/test-5.stdout', 'utf8');
	// const firstLinePos = resultStr.indexOf('\n');
	// console.log(resultStr.substring(0, firstLinePos));
	resultStr = resultStr.substring(resultStr.indexOf('\n') + 1);
	// console.log(resultStr);
	const resultObj = adbTestResultParser(resultStr);
	// console.log(resultObj);
	t.is(typeof resultObj, 'object');
	t.is(resultObj.testCases.length, 2);
	t.is(typeof resultObj.timeMilliseconds, 'number');
	t.is(resultObj.timeMilliseconds, 19925);
});

test(`Can parse file test-6.stdout`, t => {
	let resultStr = fs.readFileSync('../../assets/test-6.stdout', 'utf8');
	// const firstLinePos = resultStr.indexOf('\n');
	// console.log(resultStr.substring(0, firstLinePos));
	resultStr = resultStr.substring(resultStr.indexOf('\n') + 1);
	// console.log(resultStr);
	const resultObj = adbTestResultParser(resultStr);
	// console.log(resultObj);
	t.is(typeof resultObj, 'object');
	// t.is(resultObj.testCases.length, 2);
	// t.is(typeof resultObj.timeMilliseconds, 'number');
	// t.is(resultObj.timeMilliseconds, 19925);
});
