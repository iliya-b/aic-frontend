module.exports = {

  /* Main */
  SessionEndedDialog: require('./main/session-ended-dialog.jsx'),

  /* Home */
  LoginDialog: require('./home/login-dialog.jsx'),

  /* Project */
  APKUploadDialog: require('./project/apk-upload-dialog.jsx'),
  APKTestUploadDialog: require('./project/apk-test-upload-dialog.jsx'),
  AreaStatus: require('./project/area-status.jsx'),
  BoxStatus: require('./project/box-status.jsx'),

  /* Live */
  LiveSensors: require('./project/live-sensors.jsx'),
  LiveScreen: require('./project/live-screen.jsx'),
  MachineCard: require('./project/machine-card.jsx'),
  MachineCardLive: require('./project/machine-card-live.jsx'),
  LiveMachineList: require('./project/live-machine-list.jsx'),

  /* Campaign */
  TestResultsBox: require('./project/test-results-box.jsx'),

  /* Shared */
  ObjectList: require('./shared/object-list/object-list.jsx'),
  AppUtils: require('./shared/app-utils.jsx'),
  APKSelectionDialog: require('./shared/dialogs/apk-selection.jsx'),
  APKTestSelectionDialog: require('./shared/dialogs/apk-test-selection.jsx'),
  DeviceSelectionDialog: require('./shared/dialogs/device-selection.jsx'),
  FullWidthSection: require('./shared/full-width-section.jsx'),
  InfoBox: require('./shared/info-box.jsx'),
  TogglableIcon: require('./shared/togglable-icon.jsx'),
  List: require('./shared/list/list.jsx'),
  AvatarProgress: require('./shared/avatar-progress.jsx'),
  LogBox: require('./shared/log-box.jsx'),
  LogBoxRow: require('./shared/log-box-row.jsx'),
  CodeBox: require('./shared/code-box.jsx'),

};
