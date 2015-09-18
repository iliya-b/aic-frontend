'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var APKTestActions = Reflux.createActions({
  'load': {asyncResult: true},
  'deleteSelected': {asyncResult: true},
  'toggleDelete': {},
  'setProjectId': {},
});

// Listeners for asynchronous Backend API calls
APKTestActions.load.listen(function (projectId) {
  var token = '';
  BackendAPI.apkTestList(token, projectId, (res) => {
    this.completed( res );
  });
});


APKTestActions.deleteSelected.listen(function (apkIds) {
  var token = '';
  BackendAPI.apkTestRemove(token, apkIds, (res) => {
    this.completed(res);
  });
});

module.exports = APKTestActions;
