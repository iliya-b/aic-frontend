'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var APKTestActions = Reflux.createActions({
  'load': {asyncResult: true},
  'toggleDelete': {},
  'setProjectId': {},
});

// Listeners for asynchronous Backend API calls
APKTestActions.load.listen(function (projectId) {
  BackendAPI.apkTestList(projectId)
  .then( (res) => {
    this.completed( res.results );
  });
});

module.exports = APKTestActions;
