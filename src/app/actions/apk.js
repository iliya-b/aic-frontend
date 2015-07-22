'use strict';

// Reflux
var Reflux = require('reflux');

// APP
// var { Auth, BackendAPI } = require('../stores/'); // TODO: Check why this does not work sometimes
var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('../stores/backend-api.jsx');

// Actions
var APKActions = Reflux.createActions({
  'load': {asyncResult: true},                // called upon list change and init
  'deleteSelected': {asyncResult: true},      // called by button in APKList
  'toggleDelete': {},                         // called by listItem in APLList
});

// Listeners for asynchronous Backend API calls
APKActions.load.listen(function (projectId) {
  var token = Auth.getToken();
  BackendAPI.apkList(token, projectId, (res) => {
    this.completed( res );
  });
});


APKActions.deleteSelected.listen(function (apkIds) {
  var token = Auth.getToken();
  BackendAPI.apkRemove(token, apkIds, (res) => {
    this.completed(res);
  });
});

module.exports = APKActions;
