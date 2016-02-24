module.exports = {

	/* Main */
	SessionEndedDialog: require('./main/session-ended-dialog'),

	/* Home */
	LoginDialog: require('./home/login-dialog'),

	/* Project */
	APKUploadDialog: require('./project/apk-upload-dialog'),
	APKTestUploadDialog: require('./project/apk-test-upload-dialog'),
	AreaStatus: require('./project/area-status'),
	BoxStatus: require('./project/box-status'),

	/* Live */
	LiveSensors: require('./project/live-sensors'),
	LiveScreen: require('./project/live-screen'),
	MachineCard: require('./project/machine-card'),
	MachineCardLive: require('./project/machine-card-live'),
	LiveMachineList: require('./project/live-machine-list'),

	/* Campaign */
	TestResultsBox: require('./project/test-results-box'),

	/* Shared */
	ObjectList: require('./shared/object-list/object-list'),
	AppUtils: require('./shared/app-utils'),
	APKSelectionDialog: require('./shared/dialogs/apk-selection'),
	APKTestSelectionDialog: require('./shared/dialogs/apk-test-selection'),
	DeviceSelectionDialog: require('./shared/dialogs/device-selection'),
	FullWidthSection: require('./shared/full-width-section'),
	InfoBox: require('./shared/info-box'),
	TogglableIcon: require('./shared/togglable-icon'),
	AvatarProgress: require('./shared/avatar-progress'),
	LogBox: require('./shared/log-box'),
	LogBoxRow: require('./shared/log-box-row'),
	AuthRequired: require('./shared/auth-required'),
	AuthPage: require('./shared/auth-page'),
	CodeBox: require('./shared/code-box')
};
