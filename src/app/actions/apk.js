'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var APKActions = Reflux.createActions({
  'load': {asyncResult: true},                // called upon list change and init
  'toggleDelete': {},                         // called by listItem in APLList
});

// Listeners for asynchronous Backend API calls
APKActions.load.listen(function (projectId) {
  BackendAPI.apkList(projectId)
  .then( (res) => {
    this.completed( res.results );
  });
});

module.exports = APKActions;
