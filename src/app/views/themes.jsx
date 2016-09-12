'use strict';

import React from 'react';
import Spacing from 'material-ui/styles/spacing';
import Typography from 'material-ui/styles/typography';
import ClearFix from 'material-ui/internal/ClearFix';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import {
	Checkbox,
	DatePicker,
	Dialog,
	DropDownMenu,
	FlatButton,
	FloatingActionButton,
	Drawer,
	RadioButton,
	RadioButtonGroup,
	RaisedButton,
	Snackbar,
	Slider,
	TextField,
	Toggle,
	Paper,
	FontIcon
} from 'material-ui';

import BoxStatus from 'app/components/project/box-status';
import TestResultsBox from 'app/components/project/test-results-box';
import MachineCardLive from 'app/components/project/machine-card-live';
import MachineCard from 'app/components/project/machine-card';
import LiveToolbox from 'app/components/project/live-toolbox';

import SessionEndedDialog from 'app/components/dialog/dialog-session-ended';

import TableFiles from 'app/components/table/table-files';

import AppUtils from 'app/components/shared/app-utils';
import AvatarProgress from 'app/components/shared/avatar-progress';
import LogBox from 'app/components/shared/log-box';
import LogBoxRow from 'app/components/shared/log-box-row';

import CardAndroidSession from 'app/components/card/card-android-session';

import PanelSessionDetails from 'app/components/panel/panel-session-details';

import DroidPercentage from 'app/components/icon/droid-percentage';

import LabeledSpan from 'app/components/form/labeled-span';
import SelectTextField from 'app/components/form/select-text-field';

const debug = require('debug')('AiC:Views:Themes');

// var logBoxRef = Array.apply(0, Array(8)).map(function (v, i) { return { message: 'Message ' + i , time: i }; });
const logBoxRef = [
	{time: AppUtils.getDate(), message: 'Stack creation scheduled'},
	{time: AppUtils.getDate(), message: 'Stack retrieval or creation finished'},
	{time: AppUtils.getDate(), message: 'Docker creation scheduled.'},
	{time: AppUtils.getDate(), message: 'Docker created and ready.'}
];

const componentsThatOpen = ['dialog', 'drawer', 'sessionEndedDialog', 'snackbar'];

const vmproperties = {'dhcp.eth1.pid': '802', 'ro.aicd.caps.scr': 'on', 'aicd.gyroscope.roll': '0.000000', 'init.svc.drm': 'running', 'ro.board.platform': '', 'init.svc.healthd': 'running', 'ro.factorytest': '0', 'gsm.sim.operator.iso-country': 'us', 'aicd.thermometer.temperature': '9.000000', 'dhcp.eth1.dns4': '', 'dhcp.eth1.ipaddress': '10.7.2.209', 'init.svc.dns-setup': 'stopped', 'gsm.version.ril-impl': 'android reference-ril 1.0', 'ro.aicd.caps.cam': 'on', 'init.svc.wpa_supplicant': 'running', 'dhcp.eth1.leasetime': '600', 'ro.aicd.caps.acc': 'on', 'init.svc.adbd': 'running', 'aicd.battery.full': '50000000', 'init.svc.ril-daemon': 'running', 'aicd.gyroscope.azymuth': '0.000000', 'init.svc.keystore': 'running', 'persist.service.adb.enable': '1', 'ro.build.tags': 'test-keys', 'aicd.gps.longitude': '4.000000', 'aicd.hygrometer.humidity': '88.000000', 'aicd.battery.mode': 'manual', 'init.svc.vinput_seamless': 'running', 'ro.build.version.incremental': 'eng.mathieu.20160310.112404', 'ro.aicd.caps.gps': 'on', 'aicd.magnetometer.y': '8.000000', 'debug.force_rtl': '0', 'ro.product.device': 'gobyp', 'ro.build.fingerprint': 'generic/gobyp/gobyp:4.4.4/R3_CRB01-00/eng.mathieu.20160310.112404:eng/test-keys', 'net.hostname': 'android-ffe361cf7d8610c9', 'ro.hardware': 'goby', 'gsm.defaultpdpcontext.active': 'true', 'init.svc.surfaceflinger': 'running', 'ro.com.android.dateformat': 'MM-dd-yyyy', 'init.svc.vold': 'running', 'aicd.orientation.roll': '0.000000', 'persist.sys.localevar': '', 'ro.build.version.codename': 'REL', 'init.svc.local_gps': 'running', 'ro.opengles.version': '131072', 'aicd.device.id': '00000000000000', 'ro.product.locale.region': 'US', 'gsm.operator.numeric': '310260', 'aicd.linearacc.x': '0.000000', 'init.svc.back_camera': 'running', 'wlan.driver.status': 'ok', 'net.dns2': '8.8.8.8', 'gsm.operator.iso-country': 'us', 'net.change': 'net.dns2', 'net.tcp.buffersize.hsupa': '4094,87380,262144,4096,16384,262144', 'rild.libpath': '/system/lib/libreference-ril.so', 'net.eth0.dns2': '8.8.8.8', 'aicd.linearacc.y': '0.000000', 'init.svc.zygote': 'running', 'ro.product.cpu.abi': 'x86', 'ro.zygote.disable_gl_preload': 'true', 'aicd.barometer.pressure': '999.000000', 'dhcp.eth1.dns1': '8.8.4.4', 'aicd.magnetometer.z': '9.000000', 'persist.sys.profiler_ms': '0', 'ro.build.product': 'gobyp', 'ro.product.locale.language': 'en', 'net.eth2.dns1': '8.8.4.4', 'init.svc.debuggerd': 'running', 'wifi.interface': 'eth1', 'init.svc.servicemanager': 'running', 'init.svc.bootanim': 'stopped', 'init.svc.media': 'running', 'gsm.current.phone-type': '1', 'ARGH': 'ARGH', 'ro.config.ringtone': 'Ring_Synth_04.ogg', 'ro.secure': '0', 'persist.sys.dalvik.vm.lib': 'libdvm.so', 'persist.sys.country': 'US', 'ro.wifi.channels': '', 'ro.aicd.caps.bat': 'on', 'wifi.interface.mac': 'fa:16:3e:a8:16:64', 'service.bootanim.exit': '1', 'dhcp.eth1.mask': '255.255.0.0', 'aicd.telemeter.distance': '8.000000', 'ro.crypto.state': 'unencrypted', 'net.tcp.buffersize.umts': '4094,87380,110208,4096,16384,110208', 'ro.boot.hardware': 'goby', 'ro.sf.lcd_density': '160', 'init.svc.front_camera': 'running', 'rild.libargs': '-d /dev/ttyS0', 'gsm.sim.operator.numeric': '310260', 'aicd.gravity.x': '0.000000', 'dhcp.eth1.dns3': '', 'ro.serialno': '', 'aicd.gravity.y': '9.776219', 'ro.com.google.locationfeatures': '1', 'sys.sysctl.extra_free_kbytes': '5625', 'net.qtaguid_enabled': '1', 'ro.kernel.android.checkjni': '1', 'sys.settings_secure_version': '10', 'ro.radio.use-ppp': 'no', 'ro.allow.mock.location': '1', 'ro.build.date': 'jeudi 10 mars 2016, 11:25:06 (UTC+0100)', 'ro.build.version.sdk': '19', 'init.svc.packages-setup': 'stopped', 'init.svc.installd': 'running', 'ro.config.alarm_alert': 'Alarm_Classic.ogg', 'net.tcp.buffersize.evdo': '4094,87380,262144,4096,16384,262144', 'gsm.sim.state': 'READY', 'ro.build.date.utc': '1457605506', 'ro.ril.gprsclass': '10', 'aicd.accelerometer.z': '0.813417', 'gsm.network.type': 'UMTS', 'init.svc.gsm-daemon': 'running', 'ro.build.characteristics': 'default', 'ro.debuggable': '1', 'ro.ril.hsxpa': '1', 'dhcp.eth1.domain': 'openstacklocal', 'net.tcp.buffersize.hsdpa': '4094,87380,262144,4096,16384,262144', 'aicd.gravity.z': '0.813417', 'net.tcp.default_init_rwnd': '60', 'net.tcp.buffersize.hspa': '4094,87380,262144,4096,16384,262144', 'aicd.battery.level': '50000000', 'dev.bootcomplete': '1', 'ro.revision': '0', 'dhcp.eth1.mtu': '1450', 'aicd.battery.status': 'Not charging', 'aicd.gps.bearing': '0.000000', 'init.svc.goby-setup': 'stopped', 'ro.bootloader': 'unknown', 'persist.sys.timezone': 'America/New_York', 'aicVM.gles.renderer': '1', 'sys.usb.config': 'adb', 'aicd.orientation.azimuth': '0.000000', 'net.tcp.buffersize.wifi': '524288,1048576,2097152,262144,524288,1048576', 'dhcp.eth1.server': '10.7.0.3', 'ro.bootmode': 'unknown', 'aicd.screen_rotation': '0', 'ro.build.host': 'Ontoset', 'ro.build.user': 'mathieu', 'aicd.gyroscope.pitch': '0.000000', 'init.svc.ueventd': 'running', 'net.bt.name': 'Android', 'sys.boot_completed': '1', 'aicVM.inited': '1', 'ro.product.board': '', 'ro.aicd.caps.did': 'on', 'ro.build.id': 'R3_CRB01-00', 'aicd.accelerometer.x': '0.000000', 'aicd.linearacc.z': '0.000000', 'ro.build.type': 'eng', 'aicd.gps.altitude': '0.000000', 'net.dns1': '8.8.4.4', 'sys.settings_global_version': '3', 'ro.product.brand': 'generic', 'ro.carrier': 'unknown', 'net.tcp.buffersize.edge': '4093,26280,35040,4096,16384,35040', 'dalvik.vm.stack-trace-file': '/data/anr/traces.txt', 'aicd.luxmeter.light': '88.000000', 'net.tcp.buffersize.gprs': '4092,8760,11680,4096,8760,11680', 'dhcp.eth1.reason': 'RENEW', 'keyguard.no_require_sim': 'true', 'ro.androidincloud.version': '2.2.0', 'ro.build.description': 'gobyp-eng 4.4.4 R3_CRB01-00 eng.mathieu.20160310.112404 test-keys', 'init.svc.iprenew_eth1': 'stopped', 'net.tcp.buffersize.hspap': '4094,87380,1220608,4096,16384,1220608', 'aicd.ac.online': '1', 'persist.sys.usb.config': 'adb', 'ro.product.name': 'gobyp', 'ro.build.version.release': '4.4.4', 'net.eth2.dns2': '8.8.8.8', 'dalvik.vm.heapsize': '256m', 'persist.sys.language': 'en', 'ro.product.manufacturer': 'Androidincloud', 'ro.config.notification_sound': 'pixiedust.ogg', 'net.tcp.buffersize.default': '4096,87380,110208,4096,16384,110208', 'gsm.sim.operator.alpha': 'Android', 'sys.settings_system_version': '6', 'aicd.gps.latitude': '5.000000', 'gsm.operator.isroaming': 'false', 'net.tcp.buffersize.lte': '524288,1048576,2097152,262144,524288,1048576', 'sys.sysctl.tcp_def_init_rwnd': '60', 'gsm.operator.alpha': 'Android', 'dhcp.eth1.dns2': '8.8.8.8', 'aicd.orientation.pitch': '0.000000', 'init.svc.local_opengl': 'running', 'ro.bq.gpu_to_cpu_unsupported': '1', 'ro.runtime.firstboot': '1458837060064', 'qemu.hw.mainkeys': '0', 'sys.usb.state': 'adb', 'dhcp.eth1.vendorInfo': '', 'init.svc.vinput': 'running', 'init.svc.netd': 'running', 'init.svc.dhcpcd_eth1': 'running', 'aicd.magnetometer.x': '7.000000', 'net.eth0.dns1': '8.8.4.4', 'dhcp.eth1.gateway': '10.7.0.1', 'aicd.gps.status': 'enabled', 'aicVM.gles': '1', 'aicd.accelerometer.y': '9.776219', 'ro.aicd.caps.rmt': 'on', 'dhcp.eth1.result': 'ok', 'ro.com.android.dataroaming': 'true', 'ro.baseband': 'unknown', 'ro.build.display.id': 'gobyp-eng 4.4.4 R3_CRB01-00 eng.mathieu.20160310.112404 test-keys'};

const ThemesPage = class extends React.Component {

	constructor(props) {
		super(props);
		const openComponents = {};
		componentsThatOpen.forEach(componentName => {
			openComponents[componentName] = false;
		});
		this.state = {
			isThemeDark: false,
			// logbox: [],
			logbox: logBoxRef,
			openComponents
		};
		this.handleOpenable = {
			open: {},
			close: {}
		};
		componentsThatOpen.forEach(componentName => {
			this.handleOpenable.open[componentName] = this.handleBoxesControl.bind(this, componentName, true);
			this.handleOpenable.close[componentName] = this.handleBoxesControl.bind(this, componentName, false);
		});
		this.handleClickAddLogBox = this.handleClickAddLogBox.bind(this);
	}

	handleBoxesControl(componentName, toOpen) {
		// debug('e', e);
		// debug('arguments', arguments);
		// debug('e.target', e.target);
		// debug('e.currentTarget', e.currentTarget);
		// debug('Object.keys(e.currentTarget)', Object.keys(e.currentTarget));
		// Copy the current state
		const currentOpenComponents = JSON.parse(JSON.stringify(this.state.openComponents));
		currentOpenComponents[componentName] = toOpen;
		this.setState({openComponents: currentOpenComponents});
	}

	getStyles() {
		const canvasColor = this.context.muiTheme.palette.canvasColor;
		const styles = {
			group: {
				float: 'left',
				width: '33%',
				marginTop: '16px',
				padding: '0 50px',
				boxSizing: 'border-box'
			},
			groupSlider: {
				marginTop: '0px',
				width: '100%'
			},
			container: {
				marginBottom: '16px',
				minHeight: '24px',
				textAlign: 'left'
			},
			containerCentered: {
				textAlign: 'center'
			},
			paper: {
				height: '100px',
				width: '100px',
				margin: '0 auto',
				marginBottom: '64px'
			},
			center: {
				textAlign: 'center'
			},
			spacing: {
				padding: Spacing.desktopGutter
			},
			textfield: {
				width: '100%'
			},
			slider: {
				marginTop: '0px',
				marginBottom: '0px'
			},
			codeExample: {
				backgroundColor: canvasColor,
				marginBottom: '32px'
			},
			title: {
				fontSize: '20px',
				lineHeight: '28px',
				paddingTop: '19px',
				marginBottom: '13px',
				letterSpacing: '0',
				fontWeight: Typography.fontWeightMedium,
				color: Typography.textDarkBlack
			},
			menu: {
				position: 'relative',
				float: 'left'
			},
			avatarProgressAndro: {
				color: '#7ABF27',
				foregroundColor: '#0DCAC9',
				backgroundColor: '#A2A2A2'
			}
		};

		styles.containerCentered = Object.assign(styles.container, styles.containerCentered);
		styles.groupSlider = Object.assign(styles.group, styles.groupSlider);

		return styles;
	}

	render() {
		const styles = this.getStyles();
		const menuItems = [
			{payload: '1', text: 'Never'},
			{payload: '2', text: 'Every Night'},
			{payload: '3', text: 'Weeknights'},
			{payload: '4', text: 'Weekends'},
			{payload: '5', text: 'Weekly'}
		];
		const standardActions = [
			<FlatButton key="1" label="Cancel" onClick={this.handleOpenable.close.dialog}/>,
			<FlatButton key="2" primary label="Submit" onClick={this.handleOpenable.close.dialog}/>
		];
		const menuItemsNav = [
			{route: 'get-started', text: 'Get Started'},
			{route: 'customization', text: 'Customization'},
			{route: 'component', text: 'Component'},
			{text: 'Resources'},
			{
				payload: 'https://github.com/callemall/material-ui',
				text: 'GitHub'
			},
			{
				text: 'Disabled',
				disabled: true
			},
			{
				// type: MenuItem.Types.LINK,
				payload: 'https://www.google.com',
				text: 'Disabled Link',
				disabled: true
			}
		];

		const allStatus = ['doing', 'success', 'fail', 'disable'];
		const allCampaignTypes = ['prepare', 'create', 'run', 'result'];
		const allLiveTypes = ['search', 'create', 'load', 'connect', 'close'];

		const boxesLive = allStatus.map(function (itemStatus, indexStatus) {
			const boxes = this.map((itemBox, indexBox, arrayBox) => {
				return <BoxStatus key={indexBox} objectName={'session'} typeName={itemBox} status={itemStatus} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox + 1)}/>;
			});
			return <div key={indexStatus}>{boxes}</div>;
		}, allLiveTypes);

		const boxesCampaign = allStatus.map(function (itemStatus, indexStatus) {
			const boxes = this.map((itemBox, indexBox, arrayBox) => {
				return <BoxStatus key={indexBox} objectName={'campaign'} typeName={itemBox} status={itemStatus} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox + 1)}/>;
			});
			return <div key={indexStatus}>{boxes}</div>;
		}, allCampaignTypes);

		const boxesLogBox = (<div>
			{allCampaignTypes.map((itemBox, indexBox, arrayBox) => {
				return <BoxStatus key={indexBox} objectName={'campaign'} typeName={itemBox} status={'success'} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox + 1)}/>;
			})}
		</div>);

		const logBoxRows = this.state && this.state.logbox ? this.state.logbox.map((v, i) => {
			return <LogBoxRow key={i} time={v.time}>{v.message}</LogBoxRow>;
		}) : null;

		const results = [{'properties': [], 'testCases': [{'className': 'com.zenika.aic.core.libs.ParserTest', 'name': 'testAndroidTestCaseSetupProperly'}, {'className': 'com.zenika.aic.core.libs.ParserTest', 'name': 'testApplicationTestCaseSetUpProperly'}, {'className': 'com.zenika.aic.demo.sensor.BatteryTestCase', 'name': 'testUS1', 'failure': {'message': 'Battery level not found', 'type': 'junit.framework.AssertionFailedError', 'content': 'junit.framework.AssertionFailedError:  Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java: 50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java: 20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java: 73)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java: 36)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java: 515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java: 214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java: 199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java: 134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java: 115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java: 133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java: 90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java: 118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java: 49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java: 124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java: 63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java: 243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java: 238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java: 103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java: 63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java: 90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java: 128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java: 24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java: 231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java: 60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java: 229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java: 50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java: 222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java: 300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java: 157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java: 136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java: 270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java: 1701)\r\r\n\r'}}, {'className': 'com.zenika.aic.demo.sensor.BatteryTestCase', 'name': 'testUS2', 'failure': {'message': 'Battery level not found', 'type': 'junit.framework.AssertionFailedError', 'content': 'junit.framework.AssertionFailedError:  Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java: 50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java: 20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java: 82)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java: 40)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java: 515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java: 214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java: 199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java: 134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java: 115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java: 133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java: 90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java: 118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java: 49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java: 124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java: 63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java: 243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java: 238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java: 103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java: 63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java: 90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java: 128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java: 24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java: 231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java: 60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java: 229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java: 50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java: 222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java: 300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java: 157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java: 136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java: 270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java: 1701)\r\r\n\r'}}], 'time': '0.0', 'name': 'APK test'}]; // eslint-disable-line quote-props

		const avms = [
			{ // eslint-disable-line quote-props
				'avm_novnc_host': '127.0.0.1',
				'avm_owner': 'marco',
				'avm_id': 'jHLGWPeRSVyVzyCpWRsEjg',
				'avm_status': MachineCard.VMSTATE.READY,
				'avm_novnc_port': '5909'
			},
			{ // eslint-disable-line quote-props
				'avm_novnc_host': '127.0.0.1',
				'avm_owner': 'marco',
				'avm_id': 'sijEK9O9T962JYWOuUzHHg',
				'avm_status': MachineCard.VMSTATE.READY,
				'avm_novnc_port': '5946'
			},
			{ // eslint-disable-line quote-props
				'avm_novnc_host': '127.0.0.1',
				'avm_owner': 'marco',
				'avm_id': 'sijEK9O9T962JYWOuUzHHg',
				'avm_status': MachineCard.VMSTATE.CREATING,
				'avm_novnc_port': '5946'
			},
			{ // eslint-disable-line quote-props
				'avm_novnc_host': '127.0.0.1',
				'avm_owner': 'marco',
				'avm_id': 'sijEK9O9T962JYWOuUzHHg',
				'avm_status': MachineCard.VMSTATE.FAILED,
				'avm_novnc_port': '5946',
				'avm_status_reason': 'Resource CREATE failed: OverLimit: VolumeLimitExceeded: \nMaximum number of volumes allowed (50) exceeded (HTTP 413) \n(Request-ID: req-2896fb29-7db3-4b0c-8a96-1554e6dc5f39)'
			}
		];

		const avmsRendered = avms.map((currentValue, index) => {
			return <MachineCardLive {...currentValue} key={index}/>;
		});

		const apkList = [
			{
				id: 'abc',
				filename: 'def',
				status: 'uploaded'
			},
			{
				id: '123',
				filename: '456',
				status: 'sending'
			}
		];

		// const apkList = [];

		const avmInfo1 = {avm_id: 'cfaamg4e', avm_novnc_host: '10.50.0.86', avm_novnc_port: 19623, avm_owner: 'karine', avm_status: 'CREATING', image: 'kitkat-phone', index: 1, project_id: '0602b27748484b249244ab471a9142d7', stack_name: 'karine-cfaamg4e', ts_created: '2016-03-29T12:25:10.687575'}; // eslint-disable-line camelcase
		const avmInfo2 = {avm_id: 'xxx1', avm_novnc_host: '10.50.0.86', avm_novnc_port: 19623, avm_owner: 'karine', avm_status: 'DELETING', image: 'kitkat', index: 1, project_id: '0602b27748484b249244ab471a9142d7', stack_name: 'karine-cfaamg4e', ts_created: '2016-03-29T12:25:10.687575'}; // eslint-disable-line camelcase
		const avmInfo3 = {avm_id: 'yyy2', avm_novnc_host: '10.50.0.86', avm_novnc_port: 19623, avm_owner: 'karine', avm_status: 'READY', image: 'lollipop', index: 1, project_id: '0602b27748484b249244ab471a9142d7', stack_name: 'karine-cfaamg4e', ts_created: '2016-03-29T12:25:10.687575'}; // eslint-disable-line camelcase

		const packageList = ['package1', 'package1', 'package1', 'package1 long name file pack', 'package1', 'package1', 'package1'];

		return (
			<div>
				<ClearFix>
					<RaisedButton linkButton href={'/'} secondary label={'Back to Home'}/>
				</ClearFix>

				<ClearFix>
					<h2>Form</h2>
					<SelectTextField items={'abc', 'def', 'long strange label of longness super extensive', 'Maps', 'Books', 'Flights', 'Apps'}/>
				</ClearFix>

				<ClearFix>

					<h2>Live</h2>

					<DroidPercentage value={33}/>

				</ClearFix>

				<ClearFix>

					<h2>Info</h2>

					<div style={{width: 847}}>
						<PanelSessionDetails avmInfo={avmInfo1} apkList={packageList} properties={vmproperties}/>
					</div>

					<h2>VM Card</h2>

					<div style={{width: 847}}>
						<CardAndroidSession {...avmInfo1}/>
						<CardAndroidSession {...avmInfo2}/>
						<CardAndroidSession {...avmInfo3}/>
					</div>

				</ClearFix>

				<ClearFix style={{width: 800, padding: 20}}>
					<TableFiles list={apkList}/>
				</ClearFix>

				<ClearFix style={{width: 800, padding: 20}}>
					<LiveToolbox/>
				</ClearFix>

				<ClearFix>

					<div style={styles.group}>
						<div style={styles.containerCentered}>
							<FloatingActionButton iconClassName="mdi mdi-star" disabled/>
						</div>
						<div style={styles.containerCentered}>
							<FloatingActionButton iconClassName="mdi mdi-star" disabled={false}/>
						</div>
						<div style={styles.containerCentered}>
							<FloatingActionButton iconClassName="mdi mdi-star" disabled={false} secondary/>
						</div>
						<div style={styles.containerCentered}>
							<RaisedButton label="Secondary" secondary/>
						</div>
						<div style={styles.containerCentered}>
							<RaisedButton label="Primary" primary/>
						</div>
						<div style={styles.containerCentered}>
							<RaisedButton label="Default"/>
						</div>
						<div style={styles.containerCentered}>
							<FlatButton label="Secondary" secondary/>
						</div>
						<div style={styles.containerCentered}>
							<FlatButton label="Primary" primary/>
						</div>
						<div style={styles.containerCentered}>
							<FlatButton label="Default"/>
						</div>
					</div>

					<div style={styles.group}>
						<div style={styles.container}>
							<Checkbox name="checkboxName1" value="checkboxValue1" label="checkbox"/>
							<Checkbox name="checkboxName2" value="checkboxValue2" label="disabled checkbox" disabled/>
						</div>
						<div style={styles.container}>
							<RadioButtonGroup name="shipSpeed" defaultSelected="usd">
								<RadioButton value="usd" label="USD"/>
								<RadioButton value="euro" label="Euro" defaultChecked/>
								<RadioButton value="mxn" label="MXN" disabled/>
							</RadioButtonGroup>
						</div>
						<div style={styles.container}>
							<Toggle name="toggleName1" value="toggleValue1" label="toggle"/>
							<Toggle name="toggleName2" value="toggleValue2" label="disabled toggle" defaultToggled disabled/>
						</div>
						<div style={styles.container}>

							<Menu style={styles.menu}>
								<MenuItem primaryText="Maps"/>
								<MenuItem primaryText="Books"/>
								<MenuItem primaryText="Flights"/>
								<MenuItem primaryText="Apps"/>
							</Menu>
						</div>
					</div>

					<div style={Object.assign(styles.group, {marginTop: 0})}>
						<div style={styles.container}>
							<TextField
								style={styles.textfield}
								hintText="TextField"
								/>
						</div>
						<div style={styles.container}>
							<DatePicker
								hintText="Landscape Dialog"
								mode="landscape"
								style={{width: '100%'}}
								/>
						</div>
						<div style={styles.container}>
							<DropDownMenu menuItems={menuItems} style={{width: '100%'}}/>
						</div>
					</div>

					<div style={styles.groupSlider}>
						<Slider style={styles.slider} name="slider2" defaultValue={0.5}/>
					</div>

					<div style={styles.group}>
						<div style={styles.containerCentered}>
							<FlatButton label="View Dialog" onClick={this.handleOpenable.open.dialog} boxRef="dialog" boxOpen/>
							<Dialog open={this.state.openComponents.dialog} title="Dialog With Standard Actions" actions={standardActions}>
								The actions in this window are created from the json that&#39;s passed in.
							</Dialog>
						</div>
					</div>

					<div style={styles.group}>
						<div style={styles.containerCentered}>
							<FlatButton
								onTouchTap={this.handleClickNav}
								label="View Drawer"
								/>
							<Drawer ref={this.setRef} refName="drawer" docked={false} menuItems={menuItemsNav}/>
						</div>
					</div>

					<div style={styles.group}>
						<div style={styles.containerCentered}>
							<FlatButton
								onTouchTap={this.handleOpenable.open.snackbar}
								label="View Snackbar"
								/>
							<Snackbar message="This is a snackbar" action="Got It!" open={this.state.openComponents.snackbar} onRequestClose={this.handleOpenable.close.snackbar}/>
						</div>
					</div>
				</ClearFix>

				<ClearFix>
					<h2>Status for live</h2>
					{boxesLive}
				</ClearFix>

				<ClearFix>
					<h2>Status for campaign</h2>
					{boxesCampaign}
				</ClearFix>

				<ClearFix>

					<RaisedButton label="Session Ended Dialog" primary onClick={this.handleOpenable.open.sessionEndedDialog}/>
					<SessionEndedDialog open={this.state.openComponents.sessionEndedDialog} onRequestClose={this.handleOpenable.close.sessionEndedDialog}/>

				</ClearFix>

				<ClearFix>
					<AvatarProgress
						progress={0}
						icon={<FontIcon className="mdi mdi-android"/>}
						color={styles.avatarProgressAndro.color}
						backgroundColor={styles.avatarProgressAndro.backgroundColor}
						foregroundColor={styles.avatarProgressAndro.foregroundColor}
						/>

					<AvatarProgress
						style={{marginLeft: '10px'}}
						progress={12}
						icon={<FontIcon className="mdi mdi-android"/>}
						color={styles.avatarProgressAndro.color}
						backgroundColor={styles.avatarProgressAndro.backgroundColor}
						foregroundColor={styles.avatarProgressAndro.foregroundColor}
						/>

					<AvatarProgress
						style={{marginLeft: '10px'}}
						progress={25}
						icon={<FontIcon className="mdi mdi-android"/>}
						color={styles.avatarProgressAndro.color}
						backgroundColor={styles.avatarProgressAndro.backgroundColor}
						foregroundColor={styles.avatarProgressAndro.foregroundColor}
						/>

					<AvatarProgress
						style={{marginLeft: '10px'}}
						progress={50}
						icon={<FontIcon className="mdi mdi-android"/>}
						color={styles.avatarProgressAndro.color}
						backgroundColor={styles.avatarProgressAndro.backgroundColor}
						foregroundColor={styles.avatarProgressAndro.foregroundColor}
						/>

					<AvatarProgress
						style={{marginLeft: '10px'}}
						progress={75}
						icon={<FontIcon className="mdi mdi-android"/>}
						color={styles.avatarProgressAndro.color}
						backgroundColor={styles.avatarProgressAndro.backgroundColor}
						foregroundColor={styles.avatarProgressAndro.foregroundColor}
						/>

					<AvatarProgress
						style={{marginLeft: '10px'}}
						progress={100}
						icon={<FontIcon className="mdi mdi-android"/>}
						color={styles.avatarProgressAndro.color}
						backgroundColor={styles.avatarProgressAndro.backgroundColor}
						foregroundColor={styles.avatarProgressAndro.foregroundColor}
						/>
				</ClearFix>

				<ClearFix>

					<Paper style={styles.spacing}>

						<h2>Results</h2>

						<TestResultsBox results={results}/>

						<br/>

						<div style={styles.center} >
							<FlatButton
								label="Start new campaign"
								primary
								/>
						</div>

					</Paper>

				</ClearFix>

				<ClearFix>

					<Paper style={styles.spacing} zDepth={0} >

						<FlatButton
							label="Add log line"
							primary
							onClick={this.handleClickAddLogBox}
							/>

						<h2>LogBox</h2>

						{boxesLogBox} <br/>
						<div style={{width: '547px'}}>
							<LogBox>
							{logBoxRows}
							</LogBox>
						</div>

					</Paper>

				</ClearFix>

				<ClearFix>

					<h2>Live Sessions</h2>

					{avmsRendered}

				</ClearFix>

				<ClearFix>

					<h2>LabeledSpan side by side</h2>
					<TextField floatingLabelFixed floatingLabelText="TextField for comparison" defaultValue="TextField for comparison"/>
					<LabeledSpan/>
					<LabeledSpan off/>
					<LabeledSpan label="no value"/>
					<LabeledSpan label="empty value" value=""/>
					<LabeledSpan label="with value" value="value"/>
					<LabeledSpan off label="no value"/>
					<LabeledSpan off label="empty value" value=""/>
					<LabeledSpan off label="with value" value="value"/>

					<h2>LabeledSpan br</h2>
					<TextField floatingLabelFixed floatingLabelText="TextField for comparison" defaultValue="TextField for comparison"/><br/>
					<LabeledSpan/><br/>
					<LabeledSpan off/><br/>
					<LabeledSpan label="no value"/><br/>
					<LabeledSpan label="empty value" value=""/><br/>
					<LabeledSpan label="with value" value="value"/><br/>
					<LabeledSpan off label="no value off"/><br/>
					<LabeledSpan off label="empty value off"/><br/>
					<LabeledSpan off label="with value off" value="value"/><br/>
				</ClearFix>

			</div>
		);
	}

	handleClickAddLogBox(e) {
		debug(arguments);
		e.preventDefault();
		const n = (this.state.logbox.length % logBoxRef.length) + 1;
		this.setState({logbox: logBoxRef.slice(0, n)});
	}

};

ThemesPage.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = ThemesPage;
