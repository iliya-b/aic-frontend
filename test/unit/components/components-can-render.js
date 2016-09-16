import test from 'ava';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import {shallow} from 'enzyme';
import getTheme from '../utils/get-theme';

const componentsReq = {
	// Card
	CardAndroidSession: require('app/components/card/card-android-session'),
	// Dialog
	DialogConfirmDelete: require('app/components/dialog/dialog-confirm-delete'),
	DialogLogin: require('app/components/dialog/dialog-login'),
	DialogServerError: require('app/components/dialog/dialog-server-error'),
	DialogSessionEnded: require('app/components/dialog/dialog-session-ended'),
	// Icon
	IconDroidDevil: require('app/components/icon/droid-devil'),
	IconFileCancel: require('app/components/icon/file-cancel'),
	IconFire: require('app/components/icon/fire'),
	IconGravity: require('app/components/icon/gravity'),
	// IconIconList: require('app/components/icon/icon-list'), // Not a component but a utility function
	IconKitkatPhoneAudio: require('app/components/icon/kitkat-phone-audio'),
	IconKitkatPhone: require('app/components/icon/kitkat-phone'),
	IconKitkatTablet: require('app/components/icon/kitkat-tablet'),
	IconKitkat: require('app/components/icon/kitkat'),
	IconLollipopPhone: require('app/components/icon/lollipop-phone'),
	IconLollipopTablet: require('app/components/icon/lollipop-tablet'),
	IconLollipop: require('app/components/icon/lollipop'),
	IconPhoneAccept: require('app/components/icon/phone-accept'),
	// IconPhoneList: require('app/components/icon/phone-list'), // Not a component but a utility module
	IconVoice: require('app/components/icon/voice'),
	// List
	ListItemStatus: require('app/components/list/list-item-status'),
	// Panel
	PanelCamera: require('app/components/panel/panel-camera'),
	PanelSessionDetails: require('app/components/panel/panel-session-details'),
	PanelSessionScreen: require('app/components/panel/panel-session-screen'),
	// Project
	// AreaStatus: require('app/components/project/area-status'), // Live store
	BoxStatus: require('app/components/project/box-status'),
	LiveMachineList: require('app/components/project/live-machine-list'),
	// LiveScreen: require('app/components/project/live-screen'), // Live store
	// LiveToolbox: require('app/components/project/live-toolbox'), // Live Actions
	MachineCardLive: require('app/components/project/machine-card-live'),
	MachineCard: require('app/components/project/machine-card'),
	MachineIcon: require('app/components/icon/machine-icon'),
	TestResultsBox: require('app/components/project/test-results-box'),
	// Shared
	// AppUtils: require('app/components/shared/app-utils'), // Not a component but a utility module
	// AuthPage: require('app/components/shared/auth-page'), // Auth action
	// AuthRequired: require('app/components/shared/auth-required'), // Auth action
	AvatarProgress: require('app/components/shared/avatar-progress'),
	CodeBox: require('app/components/shared/code-box'),
	Dropzone: require('app/components/shared/dropzone'),
	FullWidthSection: require('app/components/shared/full-width-section'),
	PanelInfo: require('app/components/panel/panel-info'),
	LogBoxRow: require('app/components/shared/log-box-row'),
	LogBox: require('app/components/shared/log-box'),
	Nl2br: require('app/components/shared/nl2br'),
	TogglableIcon: require('app/components/shared/togglable-icon'),
	// Table
	TableFiles: require('app/components/table/table-files'),
	TableProgress: require('app/components/table/table-progress'),
	// Toolbar
	ToolbarAccelerometer: require('app/components/toolbar/toolbar-accelerometer'),
	// ToolbarAndroid: require('app/components/toolbar/toolbar-android'), // TODO: no idea why it throws an error ????
	ToolbarApksInstall: require('app/components/toolbar/toolbar-apks-install'),
	ToolbarBattery: require('app/components/toolbar/toolbar-battery'),
	ToolbarError: require('app/components/toolbar/toolbar-error'),
	ToolbarFileUpload: require('app/components/toolbar/toolbar-file-upload'),
	ToolbarGps: require('app/components/toolbar/toolbar-gps'),
	ToolbarGravity: require('app/components/toolbar/toolbar-gravity'),
	ToolbarGsmCall: require('app/components/toolbar/toolbar-gsm-call'),
	ToolbarGsmNetwork: require('app/components/toolbar/toolbar-gsm-network'),
	ToolbarGsmRoaming: require('app/components/toolbar/toolbar-gsm-roaming'),
	ToolbarGsmSignal: require('app/components/toolbar/toolbar-gsm-signal'),
	ToolbarGsmSms: require('app/components/toolbar/toolbar-gsm-sms'),
	ToolbarGsm: require('app/components/toolbar/toolbar-gsm'),
	ToolbarGyroscope: require('app/components/toolbar/toolbar-gyroscope'),
	ToolbarHumidity: require('app/components/toolbar/toolbar-humidity'),
	ToolbarLight: require('app/components/toolbar/toolbar-light'),
	ToolbarLinearacc: require('app/components/toolbar/toolbar-linearacc'),
	ToolbarLive: require('app/components/toolbar/toolbar-live'),
	ToolbarMagnetometer: require('app/components/toolbar/toolbar-magnetometer'),
	ToolbarMonkey: require('app/components/toolbar/toolbar-monkey-runner'),
	ToolbarOrientation: require('app/components/toolbar/toolbar-orientation'),
	ToolbarPressure: require('app/components/toolbar/toolbar-pressure'),
	ToolbarProximity: require('app/components/toolbar/toolbar-proximity'),
	ToolbarSensors: require('app/components/toolbar/toolbar-sensors'),
	ToolbarTemperature: require('app/components/toolbar/toolbar-temperature')
};

let AppThemeTests;

test.before(() => {
	AppThemeTests = getTheme();
});

const componentsProps = {
	CardAndroidSession: {image: 'kitkat-phone'},
	DialogConfirmDelete: {open: true, onRequestClose: () => {},	onCancel: () => {},	onConfirm: () => {}},
	DialogLogin: {open: true},
	DialogServerError: {open: true, onRequestClose: () => {}},
	DialogSessionEnded: {open: true, onRequestClose: () => {}},
	// IconIconList: {buttons: [{id: 'a', tooltip: '', fontIcon: 'help'}], onClick: {a: () => {}}},
	PanelCamera: {fileList: []},
	PanelSessionDetails: {properties: {}},
	MachineCardLive: {avm_status: componentsReq.MachineCard.VMSTATE.READY}, // eslint-disable-line camelcase
	TestResultsBox: {results: []},
	ToolbarAccelerometer: {accelerometer: {x: 0, y: 0, z: 0}, onChange: () => {}},
	ToolbarApksInstall: {apkList: []},
	ToolbarBattery: {battery: {level_percent: 50}}, // eslint-disable-line camelcase
	ToolbarFileUpload: {title: ''},
	ToolbarGsm: {onClick: {gsmCall: () => {}}},
	ToolbarLive: {variants: []},
	ToolbarMonkey: {packageList: []},
	ToolbarSensors: {onClick: {}}
};

const componentsChildren = {
	Nl2br: 'test\n123\n312'
};

Object.keys(componentsReq).forEach(componentName => {
	// console.log(component);
	test(`Render component ${componentName}`, t => {
		const componentRequired = componentsReq[componentName];
		const componentProps = componentName in componentsProps ? componentsProps[componentName] : {};
		const componentChildren = componentName in componentsChildren ? componentsChildren[componentName] : undefined;
		const component = React.createElement(componentRequired, componentProps, componentChildren);
		const rendered = shallow(component, {context: {muiTheme: AppThemeTests}});

		t.truthy(ReactTestUtils.isElementOfType(component, componentRequired));

		t.is(typeof component, 'object');
		t.is(typeof rendered, 'object');
	});
});
