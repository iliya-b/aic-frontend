module.exports = {
  Auth: require('./auth.jsx').Auth,
  RequireAuthComponent: require('./auth.jsx').RequireAuthComponent,
  Project: require('./project.jsx'),
  APKStore: require('./apk.jsx'),
  APKUploadStore: require('./apk-upload.jsx'),
  APKTestStore: require('./apk-test.jsx'),
  APKTestUploadStore: require('./apk-test-upload.jsx'),
  Test: require('./test.jsx'),
  LiveStore: require('./live.jsx'),
  BackendAPI: require('./backend-api.jsx'),
};
