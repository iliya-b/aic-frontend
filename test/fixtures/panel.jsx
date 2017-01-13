import React from 'react';
import PanelInfo from 'app/components/panel/panel-info';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';
import PanelSessionStatus from 'app/components/panel/panel-session-status';
import FontIcon from 'material-ui/FontIcon';

const PanelAndroidConfigProps = [{
	props: {
		image: 'kitkat-tablet',
		size: '800x600',
		dpi: '120',
		enableSensors: true,
		enableBattery: true,
		enableGps: true,
		enableCamera: true,
		enableRecord: true,
		enableGsm: true,
		enableNfc: true
	}
}];

const PanelCampaignShowProps = [{
	title: 'Tests passed',
	components: [{
		props: {
			id: '09c40102703b11e69df2fa163e728b77',
			projectId: 'eb8ef796703a11e69df2fa163e728b77',
			status: 'READY',
			progress: 1.0,
			tests: [
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.005\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
					apkapkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					status: 'READY',
					image: 'kitkat-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.002\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
					apkapkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					status: 'READY',
					image: 'lollipop-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				}
			],
			name: 'test'
		}
	}]
}, {
	title: 'Tests queued',
	components: [{
		props: {
			id: '165e4df0710311e69df3fa163e728b77',
			projectId: 'eb8ef796703a11e69df2fa163e728b77',
			status: 'RUNNING',
			progress: 0.0,
			tests: [
				{
					stdout: '',
					apkapkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					status: 'QUEUED',
					image: 'kitkat-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: '',
					apkapkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					status: 'QUEUED',
					image: 'kitkat-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: '',
					apkapkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					status: 'QUEUED',
					image: 'lollipop-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: '',
					apkapkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					status: 'QUEUED',
					image: 'lollipop-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				}
			],
			name: '654'
		}
	}]
}, {
	title: 'Tests on going',
	components: [{
		props: {
			id: 'f8c04ccc818211e69875fa163e728b77',
			tests: [
				{
					stdout: '',
					status: 'QUEUED',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'lollipop-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: '',
					status: 'RUNNING',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'kitkat-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.demo.sensor.BatteryTestCase:\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS1(com.zenika.aic.demo.sensor.BatteryTestCase):\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS2(com.zenika.aic.demo.sensor.BatteryTestCase):\njava.lang.NullPointerException\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:31)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=java.lang.NullPointerException\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:31)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_RESULT: stream=\n.E.E\nTime: 12.949\nThere were 2 failures:\n1) testUS1(com.zenika.aic.demo.sensor.BatteryTestCase)\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n2) testUS2(com.zenika.aic.demo.sensor.BatteryTestCase)\njava.lang.NullPointerException\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:31)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nFAILURES!!!\nTests run: 2,  Failures: 2\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'kitkat-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: '',
					status: 'RUNNING',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'lollipop-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				}
			],
			progress: 0.5714285714285714,
			status: 'RUNNING',
			name: 'xxxxx',
			projectId: '97231e3c7f3811e69574fa163e728b77',
			machines: [
				{
					avmId: 'f8d0fd24818211e69875fa163e728b77',
					avmName: 'f8d0fd24',
					avmOwner: 'karine',
					image: 'lollipop-tablet',
					novncHost: '10.5.1.207',
					novncPort: 10090,
					soundPort: 10091,
					projectId: '97231e3c7f3811e69574fa163e728b77',
					stackName: 'kp2-karine-f8d0fd24818211e69875fa163e728b77',
					status: 'CREATING',
					tsCreated: '2016-09-23T11:43:40Z',
					uptime: 13.846896,
					campaignId: 'f8c04ccc818211e69875fa163e728b77'
				},
				{
					avmId: 'f8cdddb0818211e69875fa163e728b77',
					avmName: 'f8cdddb0',
					avmOwner: 'karine',
					image: 'kitkat-tablet',
					novncHost: '10.5.1.207',
					novncPort: 10095,
					soundPort: 10094,
					projectId: '97231e3c7f3811e69574fa163e728b77',
					stackName: 'kp2-karine-f8cdddb0818211e69875fa163e728b77',
					status: 'READY',
					tsCreated: '2016-09-23T11:43:40Z',
					uptime: 0.498592,
					campaignId: 'f8c04ccc818211e69875fa163e728b77'
				},
				{
					avmId: 'f8cf402e818211e69875fa163e728b77',
					avmName: 'f8cf402e',
					avmOwner: 'karine',
					image: 'kitkat-phone',
					novncHost: '10.5.1.207',
					novncPort: 10093,
					soundPort: 10092,
					projectId: '97231e3c7f3811e69574fa163e728b77',
					stackName: 'kp2-karine-f8cf402e818211e69875fa163e728b77',
					status: 'DELETING',
					tsCreated: '2016-09-23T11:43:40Z',
					uptime: 3.978423,
					campaignId: 'f8c04ccc818211e69875fa163e728b77'
				}
			]
		}
	}]
}, {
	title: 'Tests failure',
	components: [{
		props: {
			id: 'eeda777c7fe411e69576fa163e728b77',
			tests: [
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.demo.sensor.BatteryTestCase:\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS1(com.zenika.aic.demo.sensor.BatteryTestCase):\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS2(com.zenika.aic.demo.sensor.BatteryTestCase):\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java:40)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java:40)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_RESULT: stream=\n.E.E\nTime: 18.712\nThere were 2 failures:\n1) testUS1(com.zenika.aic.demo.sensor.BatteryTestCase)\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n2) testUS2(com.zenika.aic.demo.sensor.BatteryTestCase)\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java:40)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nFAILURES!!!\nTests run: 2,  Failures: 2\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'kitkat-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.demo.sensor.BatteryTestCase:\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS1(com.zenika.aic.demo.sensor.BatteryTestCase):\nandroid.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=android.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=android.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS2(com.zenika.aic.demo.sensor.BatteryTestCase):\nandroid.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=android.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_RESULT: stream=\n.E.E\nTime: 26.674\nThere were 2 failures:\n1) testUS1(com.zenika.aic.demo.sensor.BatteryTestCase)\nandroid.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n2) testUS2(com.zenika.aic.demo.sensor.BatteryTestCase)\nandroid.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nFAILURES!!!\nTests run: 2,  Failures: 2\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'lollipop-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.003\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					image: 'kitkat-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.002\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					image: 'lollipop-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.demo.sensor.BatteryTestCase:\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS1(com.zenika.aic.demo.sensor.BatteryTestCase):\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS2(com.zenika.aic.demo.sensor.BatteryTestCase):\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java:40)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java:40)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_RESULT: stream=\n.E.E\nTime: 19.154\nThere were 2 failures:\n1) testUS1(com.zenika.aic.demo.sensor.BatteryTestCase)\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n2) testUS2(com.zenika.aic.demo.sensor.BatteryTestCase)\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java:40)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nFAILURES!!!\nTests run: 2,  Failures: 2\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'kitkat-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.003\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					image: 'kitkat-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.demo.sensor.BatteryTestCase:\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS1(com.zenika.aic.demo.sensor.BatteryTestCase):\nandroid.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=android.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=android.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS2(com.zenika.aic.demo.sensor.BatteryTestCase):\nandroid.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=android.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_RESULT: stream=\n.E.E\nTime: 26.589\nThere were 2 failures:\n1) testUS1(com.zenika.aic.demo.sensor.BatteryTestCase)\nandroid.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n2) testUS2(com.zenika.aic.demo.sensor.BatteryTestCase)\nandroid.support.test.uiautomator.UiObjectNotFoundException: UiSelector[SCROLLABLE=true]\n\tat android.support.test.uiautomator.UiScrollable.scrollBackward(UiScrollable.java:496)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:544)\n\tat android.support.test.uiautomator.UiScrollable.scrollToBeginning(UiScrollable.java:563)\n\tat android.support.test.uiautomator.UiScrollable.scrollIntoView(UiScrollable.java:265)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:213)\n\tat android.support.test.uiautomator.UiScrollable.getChildByText(UiScrollable.java:190)\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:37)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1853)\n\nFAILURES!!!\nTests run: 2,  Failures: 2\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'lollipop-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.002\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					image: 'lollipop-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				}
			],
			progress: 1.0,
			status: 'READY',
			name: 'test2 - all',
			projectId: '97231e3c7f3811e69574fa163e728b77'
		}
	}]
}, {
	title: 'Test without target package',
	components: [{
		props: {
			id: '09c40102703b11e69df2fa163e728b77',
			projectId: 'eb8ef796703a11e69df2fa163e728b77',
			status: 'READY',
			progress: 1.0,
			tests: [
				{
					stdout: 'INSTRUMENTATION_STATUS: id=ActivityManagerService\nINSTRUMENTATION_STATUS: Error=Unable to find instrumentation target package: aic.zenika.com.sensor\nINSTRUMENTATION_STATUS_CODE: -1\nandroid.util.AndroidException: INSTRUMENTATION_FAILED: aic.zenika.com.sensor.test/android.support.test.runner.AndroidJUnitRunner\n\tat com.android.commands.am.Am.runInstrument(Am.java:977)\n\tat com.android.commands.am.Am.onRun(Am.java:317)\n\tat com.android.internal.os.BaseCommand.run(BaseCommand.java:47)\n\tat com.android.commands.am.Am.main(Am.java:97)\n\tat com.android.internal.os.RuntimeInit.nativeFinishInit(Native Method)\n\tat com.android.internal.os.RuntimeInit.main(RuntimeInit.java:249)',
					apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
					status: 'READY',
					image: 'kitkat-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				}
			],
			name: 'test'
		}
	}]
}, {
	title: 'Test with multiple machines with same image',
	components: [{
		props: {
			id: 'f8c04ccc818211e69875fa163e728b77',
			tests: [
				{
					stdout: '',
					status: 'QUEUED',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'lollipop-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: '',
					status: 'RUNNING',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'lollipop-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.demo.sensor.BatteryTestCase:\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS1(com.zenika.aic.demo.sensor.BatteryTestCase):\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=junit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nError in testUS2(com.zenika.aic.demo.sensor.BatteryTestCase):\njava.lang.NullPointerException\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:31)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=testUS2\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.BatteryTestCase\nINSTRUMENTATION_STATUS: stack=java.lang.NullPointerException\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:31)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_RESULT: stream=\n.E.E\nTime: 12.949\nThere were 2 failures:\n1) testUS1(com.zenika.aic.demo.sensor.BatteryTestCase)\njunit.framework.AssertionFailedError: Battery level not found\n\tat junit.framework.Assert.fail(Assert.java:50)\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\n\tat java.lang.reflect.Method.invokeNative(Native Method)\n\tat java.lang.reflect.Method.invoke(Method.java:515)\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n2) testUS2(com.zenika.aic.demo.sensor.BatteryTestCase)\njava.lang.NullPointerException\n\tat com.zenika.aic.core.automator.AiCAbstractTestCase.runApp(AiCAbstractTestCase.java:31)\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setUp(BatteryTestCase.java:24)\n\tat junit.framework.TestCase.runBare(TestCase.java:132)\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\n\tat junit.framework.TestResult.run(TestResult.java:118)\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\n\tat junit.framework.TestCase.run(TestCase.java:124)\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nFAILURES!!!\nTests run: 2,  Failures: 2\n\n\nINSTRUMENTATION_CODE: -1',
					status: 'READY',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'kitkat-tablet',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				},
				{
					stdout: '',
					status: 'RUNNING',
					apkPackage: 'com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner',
					image: 'lollipop-phone',
					hwconfig: {
						dpi: 160,
						enableBattery: 1,
						enableGps: 1,
						enableGsm: 1,
						enableSensors: 1,
						width: 800,
						enableCamera: 1,
						height: 600,
						enableNfc: 0,
						enableRecord: 0
					}
				}
			],
			progress: 0.5714285714285714,
			status: 'RUNNING',
			name: 'xxxxx',
			projectId: '97231e3c7f3811e69574fa163e728b77',
			machines: [
				{
					avmId: 'f8d0fd24818211e69875fa163e728b77',
					avmName: 'f8d0fd24',
					avmOwner: 'karine',
					image: 'lollipop-phone',
					novncHost: '10.5.1.207',
					novncPort: 10090,
					soundPort: 10091,
					projectId: '97231e3c7f3811e69574fa163e728b77',
					stackName: 'kp2-karine-f8d0fd24818211e69875fa163e728b77',
					status: 'CREATING',
					tsCreated: '2016-09-23T11:43:40Z',
					uptime: 13.846896,
					campaignId: 'f8c04ccc818211e69875fa163e728b77'
				},
				{
					avmId: 'f8cdddb0818211e69875fa163e728b77',
					avmName: 'f8cdddb0',
					avmOwner: 'karine',
					image: 'kitkat-tablet',
					novncHost: '10.5.1.207',
					novncPort: 10095,
					soundPort: 10094,
					projectId: '97231e3c7f3811e69574fa163e728b77',
					stackName: 'kp2-karine-f8cdddb0818211e69875fa163e728b77',
					status: 'READY',
					tsCreated: '2016-09-23T11:43:40Z',
					uptime: 0.498592,
					campaignId: 'f8c04ccc818211e69875fa163e728b77'
				},
				{
					avmId: 'f8cf402e818211e69875fa163e728b77',
					avmName: 'f8cf402e',
					avmOwner: 'karine',
					image: 'lollipop-phone',
					novncHost: '10.5.1.207',
					novncPort: 10093,
					soundPort: 10092,
					projectId: '97231e3c7f3811e69574fa163e728b77',
					stackName: 'kp2-karine-f8cf402e818211e69875fa163e728b77',
					status: 'DELETING',
					tsCreated: '2016-09-23T11:43:40Z',
					uptime: 3.978423,
					campaignId: 'f8c04ccc818211e69875fa163e728b77'
				}
			]
		}
	}]
}];

const items1 = [
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.QUEUED, children: 'com.aic.bla'}
];

const items2 = [
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'}
];

const items3 = [
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'}
];

const items4 = [
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'}
];

const items5 = [
	{status: 'TOTO', children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.QUEUED, children: 'com.aic.bla'}
];

const items6 = [
	{status: SimpleStatusIcon.STATUS_LIST.REQUESTED, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.QUEUED, children: 'com.aic.bla'}
];

const PanelProgressProps = [{
	props: {type: 'apk', style: {margin: 10, width: 800}, items: items1}
}, {
	props: {type: 'apk', style: {margin: 10, width: 400}, items: items1}
}, {
	props: {type: 'apk', style: {margin: 10, width: '95%'}, items: items1}
}, {
	props: {type: 'apk', style: {margin: 10, width: 800}, items: items2}
}, {
	props: {type: 'apk', style: {margin: 10, width: 800}, items: items3}
}, {
	props: {type: 'apk', style: {margin: 10, width: 800}, items: items4}
}, {
	props: {type: 'apk', style: {margin: 10, width: 800}, items: items5}
}, {
	props: {type: 'apk', style: {margin: 10, width: 800}, items: []}
}, {
	props: {type: 'apk', style: {margin: 10, width: 800}, items: items6}
}];

const PanelSessionScreenProps = [{
	props: {}
}];

const PanelSessionsInfoProps = [{
	props: {}
}];

const PanelToolbarBaseProps = [{
	props: {
		icon: <FontIcon className="mdi mdi-screen-rotation"/>
	}
}];

const PanelCameraProps = [{
	props: {
		fileList: [{filename: 'file.ext', id: 1}]
	}
}];

const PanelInfoProps = [];
const infoShowIcon = [true, false];
const statuses = PanelInfo.STATUS_LIST.slice();
statuses.push(false);

infoShowIcon.forEach((showIcon, si) => {
	PanelInfo.SIZE_LIST.forEach((size, ti) => {
		statuses.forEach((status, bi) => {
			const statusProp = {
				style: {margin: '10px'},
				key: `${si}-${ti}-${bi}`,
				showIcon,
				size
			};
			if (status) {
				statusProp.status = status;
			}
			PanelInfoProps.push({props: statusProp, children: `${status ? status : 'DEFAULT'} ${showIcon ? 'with icon' : 'no icon'} ${size} message.`});
		});
	});
});

const avmInfo1 = {avm_id: 'cfaamg4e', avm_name: 'cfaamg4e', avm_novnc_host: '10.50.0.86', avm_novnc_port: 19623, avm_owner: 'karine', avm_status: 'CREATING', image: 'kitkat-phone', index: 1, project_id: '0602b27748484b249244ab471a9142d7', stack_name: 'karine-cfaamg4e', ts_created: '2016-03-29T12:25:10.687575', hwconfig: {dpi: 120, enableBattery: 1, enableCamera: 1, enableGps: 1, enableGsm: 1, enableNfc: 1, enableRecord: 0, enableSensors: 1, height: 600, width: 800}}; // eslint-disable-line camelcase
const packageList = ['package1', 'package1', 'package1', 'package1 long name file pack', 'package1', 'package1', 'package1'];
const vmproperties = {'dhcp.eth1.pid': '802', 'ro.aicd.caps.scr': 'on', 'aicd.gyroscope.roll': '0.000000', 'init.svc.drm': 'running', 'ro.board.platform': '', 'init.svc.healthd': 'running', 'ro.factorytest': '0', 'gsm.sim.operator.iso-country': 'us', 'aicd.thermometer.temperature': '9.000000', 'dhcp.eth1.dns4': '', 'dhcp.eth1.ipaddress': '10.7.2.209', 'init.svc.dns-setup': 'stopped', 'gsm.version.ril-impl': 'android reference-ril 1.0', 'ro.aicd.caps.cam': 'on', 'init.svc.wpa_supplicant': 'running', 'dhcp.eth1.leasetime': '600', 'ro.aicd.caps.acc': 'on', 'init.svc.adbd': 'running', 'aicd.battery.full': '50000000', 'init.svc.ril-daemon': 'running', 'aicd.gyroscope.azymuth': '0.000000', 'init.svc.keystore': 'running', 'persist.service.adb.enable': '1', 'ro.build.tags': 'test-keys', 'aicd.gps.longitude': '4.000000', 'aicd.hygrometer.humidity': '88.000000', 'aicd.battery.mode': 'manual', 'init.svc.vinput_seamless': 'running', 'ro.build.version.incremental': 'eng.mathieu.20160310.112404', 'ro.aicd.caps.gps': 'on', 'aicd.magnetometer.y': '8.000000', 'debug.force_rtl': '0', 'ro.product.device': 'gobyp', 'ro.build.fingerprint': 'generic/gobyp/gobyp:4.4.4/R3_CRB01-00/eng.mathieu.20160310.112404:eng/test-keys', 'net.hostname': 'android-ffe361cf7d8610c9', 'ro.hardware': 'goby', 'gsm.defaultpdpcontext.active': 'true', 'init.svc.surfaceflinger': 'running', 'ro.com.android.dateformat': 'MM-dd-yyyy', 'init.svc.vold': 'running', 'aicd.orientation.roll': '0.000000', 'persist.sys.localevar': '', 'ro.build.version.codename': 'REL', 'init.svc.local_gps': 'running', 'ro.opengles.version': '131072', 'aicd.device.id': '00000000000000', 'ro.product.locale.region': 'US', 'gsm.operator.numeric': '310260', 'aicd.linearacc.x': '0.000000', 'init.svc.back_camera': 'running', 'wlan.driver.status': 'ok', 'net.dns2': '8.8.8.8', 'gsm.operator.iso-country': 'us', 'net.change': 'net.dns2', 'net.tcp.buffersize.hsupa': '4094,87380,262144,4096,16384,262144', 'rild.libpath': '/system/lib/libreference-ril.so', 'net.eth0.dns2': '8.8.8.8', 'aicd.linearacc.y': '0.000000', 'init.svc.zygote': 'running', 'ro.product.cpu.abi': 'x86', 'ro.zygote.disable_gl_preload': 'true', 'aicd.barometer.pressure': '999.000000', 'dhcp.eth1.dns1': '8.8.4.4', 'aicd.magnetometer.z': '9.000000', 'persist.sys.profiler_ms': '0', 'ro.build.product': 'gobyp', 'ro.product.locale.language': 'en', 'net.eth2.dns1': '8.8.4.4', 'init.svc.debuggerd': 'running', 'wifi.interface': 'eth1', 'init.svc.servicemanager': 'running', 'init.svc.bootanim': 'stopped', 'init.svc.media': 'running', 'gsm.current.phone-type': '1', 'ARGH': 'ARGH', 'ro.config.ringtone': 'Ring_Synth_04.ogg', 'ro.secure': '0', 'persist.sys.dalvik.vm.lib': 'libdvm.so', 'persist.sys.country': 'US', 'ro.wifi.channels': '', 'ro.aicd.caps.bat': 'on', 'wifi.interface.mac': 'fa:16:3e:a8:16:64', 'service.bootanim.exit': '1', 'dhcp.eth1.mask': '255.255.0.0', 'aicd.telemeter.distance': '8.000000', 'ro.crypto.state': 'unencrypted', 'net.tcp.buffersize.umts': '4094,87380,110208,4096,16384,110208', 'ro.boot.hardware': 'goby', 'ro.sf.lcd_density': '160', 'init.svc.front_camera': 'running', 'rild.libargs': '-d /dev/ttyS0', 'gsm.sim.operator.numeric': '310260', 'aicd.gravity.x': '0.000000', 'dhcp.eth1.dns3': '', 'ro.serialno': '', 'aicd.gravity.y': '9.776219', 'ro.com.google.locationfeatures': '1', 'sys.sysctl.extra_free_kbytes': '5625', 'net.qtaguid_enabled': '1', 'ro.kernel.android.checkjni': '1', 'sys.settings_secure_version': '10', 'ro.radio.use-ppp': 'no', 'ro.allow.mock.location': '1', 'ro.build.date': 'jeudi 10 mars 2016, 11:25:06 (UTC+0100)', 'ro.build.version.sdk': '19', 'init.svc.packages-setup': 'stopped', 'init.svc.installd': 'running', 'ro.config.alarm_alert': 'Alarm_Classic.ogg', 'net.tcp.buffersize.evdo': '4094,87380,262144,4096,16384,262144', 'gsm.sim.state': 'READY', 'ro.build.date.utc': '1457605506', 'ro.ril.gprsclass': '10', 'aicd.accelerometer.z': '0.813417', 'gsm.network.type': 'UMTS', 'init.svc.gsm-daemon': 'running', 'ro.build.characteristics': 'default', 'ro.debuggable': '1', 'ro.ril.hsxpa': '1', 'dhcp.eth1.domain': 'openstacklocal', 'net.tcp.buffersize.hsdpa': '4094,87380,262144,4096,16384,262144', 'aicd.gravity.z': '0.813417', 'net.tcp.default_init_rwnd': '60', 'net.tcp.buffersize.hspa': '4094,87380,262144,4096,16384,262144', 'aicd.battery.level': '50000000', 'dev.bootcomplete': '1', 'ro.revision': '0', 'dhcp.eth1.mtu': '1450', 'aicd.battery.status': 'Not charging', 'aicd.gps.bearing': '0.000000', 'init.svc.goby-setup': 'stopped', 'ro.bootloader': 'unknown', 'persist.sys.timezone': 'America/New_York', 'aicVM.gles.renderer': '1', 'sys.usb.config': 'adb', 'aicd.orientation.azimuth': '0.000000', 'net.tcp.buffersize.wifi': '524288,1048576,2097152,262144,524288,1048576', 'dhcp.eth1.server': '10.7.0.3', 'ro.bootmode': 'unknown', 'aicd.screen_rotation': '0', 'ro.build.host': 'Ontoset', 'ro.build.user': 'mathieu', 'aicd.gyroscope.pitch': '0.000000', 'init.svc.ueventd': 'running', 'net.bt.name': 'Android', 'sys.boot_completed': '1', 'aicVM.inited': '1', 'ro.product.board': '', 'ro.aicd.caps.did': 'on', 'ro.build.id': 'R3_CRB01-00', 'aicd.accelerometer.x': '0.000000', 'aicd.linearacc.z': '0.000000', 'ro.build.type': 'eng', 'aicd.gps.altitude': '0.000000', 'net.dns1': '8.8.4.4', 'sys.settings_global_version': '3', 'ro.product.brand': 'generic', 'ro.carrier': 'unknown', 'net.tcp.buffersize.edge': '4093,26280,35040,4096,16384,35040', 'dalvik.vm.stack-trace-file': '/data/anr/traces.txt', 'aicd.luxmeter.light': '88.000000', 'net.tcp.buffersize.gprs': '4092,8760,11680,4096,8760,11680', 'dhcp.eth1.reason': 'RENEW', 'keyguard.no_require_sim': 'true', 'ro.androidincloud.version': '2.2.0', 'ro.build.description': 'gobyp-eng 4.4.4 R3_CRB01-00 eng.mathieu.20160310.112404 test-keys', 'init.svc.iprenew_eth1': 'stopped', 'net.tcp.buffersize.hspap': '4094,87380,1220608,4096,16384,1220608', 'aicd.ac.online': '1', 'persist.sys.usb.config': 'adb', 'ro.product.name': 'gobyp', 'ro.build.version.release': '4.4.4', 'net.eth2.dns2': '8.8.8.8', 'dalvik.vm.heapsize': '256m', 'persist.sys.language': 'en', 'ro.product.manufacturer': 'Androidincloud', 'ro.config.notification_sound': 'pixiedust.ogg', 'net.tcp.buffersize.default': '4096,87380,110208,4096,16384,110208', 'gsm.sim.operator.alpha': 'Android', 'sys.settings_system_version': '6', 'aicd.gps.latitude': '5.000000', 'gsm.operator.isroaming': 'false', 'net.tcp.buffersize.lte': '524288,1048576,2097152,262144,524288,1048576', 'sys.sysctl.tcp_def_init_rwnd': '60', 'gsm.operator.alpha': 'Android', 'dhcp.eth1.dns2': '8.8.8.8', 'aicd.orientation.pitch': '0.000000', 'init.svc.local_opengl': 'running', 'ro.bq.gpu_to_cpu_unsupported': '1', 'ro.runtime.firstboot': '1458837060064', 'qemu.hw.mainkeys': '0', 'sys.usb.state': 'adb', 'dhcp.eth1.vendorInfo': '', 'init.svc.vinput': 'running', 'init.svc.netd': 'running', 'init.svc.dhcpcd_eth1': 'running', 'aicd.magnetometer.x': '7.000000', 'net.eth0.dns1': '8.8.4.4', 'dhcp.eth1.gateway': '10.7.0.1', 'aicd.gps.status': 'enabled', 'aicVM.gles': '1', 'aicd.accelerometer.y': '9.776219', 'ro.aicd.caps.rmt': 'on', 'dhcp.eth1.result': 'ok', 'ro.com.android.dataroaming': 'true', 'ro.baseband': 'unknown', 'ro.build.display.id': 'gobyp-eng 4.4.4 R3_CRB01-00 eng.mathieu.20160310.112404 test-keys'};

const PanelSessionDetailsProps = [{
	props: {avmInfo: avmInfo1, apkList: packageList, properties: vmproperties}
}];

const PanelSessionStatusProps = PanelSessionStatus.STATUS_LIST.map(s => {
	return {
		title: s,
		components: [{
			props: {status: s}
		}]
	};
});

const PanelTestResultsProps = [{
	props: {
		style: {margin: '10px'},
		image: 'kitkat-tablet',
		packages: [{
			stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.005\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
			apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
			status: 'READY',
			image: 'kitkat-tablet'
		}],
		machine: {
			status: 'READY',
			avmName: 'test',
			avmOwner: 'test',
			uptime: 3
		}
	}
}];

const PanelLiveTestResultsProps = [{
	props: {
		items: [{
			commandId: '3c2008e6d1cd11e6b5edfa163e728b77',
			id: '97783db4d1a811e6b5edfa163e728b77-1483459008806',
			label: 'com.example.android.apis/.app.LocalSampleInstrumentation',
			startTime: 1483459008843,
			status: 'READY',
			stdout: 'INSTRUMENTATION_RESULT:\nshortMsg=java.lang.NullPointerException\nINSTRUMENTATION_RESULT:\nlongMsg=java.lang.NullPointerException\nINSTRUMENTATION_CODE:  0',
			updateTime: 1483459008931
		}, {
			commandId: '4794ec46d1cd11e6b5edfa163e728b77',
			id: '97783db4d1a811e6b5edfa163e728b77-1483459028002',
			label: 'aic.zenika.com.sensor.test/android.support.test.runner.AndroidJUnitRunner',
			startTime: 1483459028064,
			status: 'READY',
			stdout: 'INSTRUMENTATION_STATUS: numtests=1\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.demo.sensor.Testing:\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=test1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.Testing\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=1\nINSTRUMENTATION_STATUS: stream=\nError in test1(com.zenika.aic.demo.sensor.Testing):\njava.lang.ArrayIndexOutOfBoundsException: length=1; index=1\n	at com.zenika.aic.core.libs.sensor.Device.setValuesForSensor(Device.java:271)\n	at com.zenika.aic.demo.sensor.Testing.test1(Testing.java:30)\n	at java.lang.reflect.Method.invokeNative(Native Method)\n	at java.lang.reflect.Method.invoke(Method.java:515)\n	at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:50)\n	at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)\n	at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:47)\n	at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)\n	at org.junit.internal.runners.statements.RunBefores.evaluate(RunBefores.java:26)\n	at org.junit.runners.ParentRunner.runLeaf(ParentRunner.java:325)\n	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:78)\n	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:57)\n	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)\n	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)\n	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)\n	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)\n	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)\n	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)\n	at org.junit.runners.Suite.runChild(Suite.java:128)\n	at org.junit.runners.Suite.runChild(Suite.java:27)\n	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)\n	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)\n	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)\n	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)\n	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)\n	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)\n	at org.junit.runner.JUnitCore.run(JUnitCore.java:137)\n	at org.junit.runner.JUnitCore.run(JUnitCore.java:115)\n	at android.support.test.internal.runner.TestExecutor.execute(TestExecutor.java:59)\n	at android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:262)\n	at android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: id=AndroidJUnitRunner\nINSTRUMENTATION_STATUS: test=test1\nINSTRUMENTATION_STATUS: class=com.zenika.aic.demo.sensor.Testing\nINSTRUMENTATION_STATUS: stack=java.lang.ArrayIndexOutOfBoundsException: length=1; index=1\n	at com.zenika.aic.core.libs.sensor.Device.setValuesForSensor(Device.java:271)\n	at com.zenika.aic.demo.sensor.Testing.test1(Testing.java:30)\n	at java.lang.reflect.Method.invokeNative(Native Method)\n	at java.lang.reflect.Method.invoke(Method.java:515)\n	at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:50)\n	at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)\n	at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:47)\n	at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)\n	at org.junit.internal.runners.statements.RunBefores.evaluate(RunBefores.java:26)\n	at org.junit.runners.ParentRunner.runLeaf(ParentRunner.java:325)\n	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:78)\n	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:57)\n	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)\n	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)\n	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)\n	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)\n	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)\n	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)\n	at org.junit.runners.Suite.runChild(Suite.java:128)\n	at org.junit.runners.Suite.runChild(Suite.java:27)\n	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)\n	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)\n	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)\n	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)\n	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)\n	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)\n	at org.junit.runner.JUnitCore.run(JUnitCore.java:137)\n	at org.junit.runner.JUnitCore.run(JUnitCore.java:115)\n	at android.support.test.internal.runner.TestExecutor.execute(TestExecutor.java:59)\n	at android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:262)\n	at android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: -2\nINSTRUMENTATION_RESULT: stream=\n\nTime: 32.889\nThere was 1 failure:\n1) test1(com.zenika.aic.demo.sensor.Testing)\njava.lang.ArrayIndexOutOfBoundsException: length=1; index=1\n	at com.zenika.aic.core.libs.sensor.Device.setValuesForSensor(Device.java:271)\n	at com.zenika.aic.demo.sensor.Testing.test1(Testing.java:30)\n	at java.lang.reflect.Method.invokeNative(Native Method)\n	at java.lang.reflect.Method.invoke(Method.java:515)\n	at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:50)\n	at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)\n	at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:47)\n	at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)\n	at org.junit.internal.runners.statements.RunBefores.evaluate(RunBefores.java:26)\n	at org.junit.runners.ParentRunner.runLeaf(ParentRunner.java:325)\n	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:78)\n	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:57)\n	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)\n	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)\n	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)\n	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)\n	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)\n	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)\n	at org.junit.runners.Suite.runChild(Suite.java:128)\n	at org.junit.runners.Suite.runChild(Suite.java:27)\n	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)\n	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)\n	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)\n	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)\n	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)\n	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)\n	at org.junit.runner.JUnitCore.run(JUnitCore.java:137)\n	at org.junit.runner.JUnitCore.run(JUnitCore.java:115)\n	at android.support.test.internal.runner.TestExecutor.execute(TestExecutor.java:59)\n	at android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:262)\n	at android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\n\nFAILURES!!!\nTests run: 1,  Failures: 1\n\n\nINSTRUMENTATION_CODE: -1',
			updateTime: 1483459028242
		}]
	}
}];

const PanelCampaignMachineProps = [{
	props: {
		avmId: 'f8d0fd24818211e69875fa163e728b77',
		avmName: 'f8d0fd24',
		avmOwner: 'karine',
		image: 'lollipop-phone',
		novncHost: '10.5.1.207',
		novncPort: 10090,
		soundPort: 10091,
		projectId: '97231e3c7f3811e69574fa163e728b77',
		stackName: 'kp2-karine-f8d0fd24818211e69875fa163e728b77',
		status: 'CREATING',
		tsCreated: '2016-09-23T11:43:40Z',
		uptime: 13.846896,
		campaignId: 'f8c04ccc818211e69875fa163e728b77'
	}
}];

const PanelTestResultsPackageProps = [{
	props: {
		stdout: 'INSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\ncom.zenika.aic.core.libs.ParserTest:\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testAndroidTestCaseSetupProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=1\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 1\nINSTRUMENTATION_STATUS: numtests=2\nINSTRUMENTATION_STATUS: stream=.\nINSTRUMENTATION_STATUS: id=InstrumentationTestRunner\nINSTRUMENTATION_STATUS: test=testApplicationTestCaseSetUpProperly\nINSTRUMENTATION_STATUS: class=com.zenika.aic.core.libs.ParserTest\nINSTRUMENTATION_STATUS: current=2\nINSTRUMENTATION_STATUS_CODE: 0\nINSTRUMENTATION_RESULT: stream=\nTest results for InstrumentationTestRunner=..\nTime: 0.005\n\nOK (2 tests)\n\n\nINSTRUMENTATION_CODE: -1',
		apkPackage: 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner',
		status: 'READY',
		image: 'kitkat-tablet',
		style: {}
	}
}];

const componentsProps = {
	PanelAndroidConfig: PanelAndroidConfigProps,
	PanelCampaignShow: PanelCampaignShowProps,
	PanelProgress: PanelProgressProps,
	PanelSessionScreen: PanelSessionScreenProps,
	PanelSessionsInfo: PanelSessionsInfoProps,
	PanelToolbarBase: PanelToolbarBaseProps,
	PanelCamera: PanelCameraProps,
	PanelInfo: PanelInfoProps,
	PanelSessionDetails: PanelSessionDetailsProps,
	PanelSessionStatus: PanelSessionStatusProps,
	PanelTestResults: PanelTestResultsProps,
	PanelLiveTestResults: PanelLiveTestResultsProps,
	PanelCampaignMachine: PanelCampaignMachineProps,
	PanelTestResultsPackage: PanelTestResultsPackageProps
};

module.exports = componentsProps;
