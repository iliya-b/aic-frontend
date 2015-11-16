'use strict';

// Reflux
const Reflux = require('reflux');

// Vendors
const debuggerGoby = require('debug')('AiC:Actions:AppConfig');

// APP
const BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
const AppConfigActions = Reflux.createActions({
  load: {children: ['completed', 'failure']},
});

// Listeners for asynchronous calls
AppConfigActions.load.listen(() => {
  const options = {
    url: 'config.json',
    method: 'GET',
  };
  BackendAPI.apiCall(options)
  .then(data => {
    debuggerGoby('load.listen then', arguments);
    AppConfigActions.load.completed(data);
  })
  .catch((data, textStatus, errorThrown) => {
    debuggerGoby('load.listen catch', arguments);
    AppConfigActions.load.failure(errorThrown);
  });
});

module.exports = AppConfigActions;
