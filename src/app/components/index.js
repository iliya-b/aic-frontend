module.exports = {

	/* Main */
	SessionEndedDialog: require('./main/session-ended-dialog'),

	/* Home */
	LoginDialog: require('./home/login-dialog'),

	/* Project */
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
	AppUtils: require('./shared/app-utils'),
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
