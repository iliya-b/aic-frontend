'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var { Auth } = require('goby/stores/auth.jsx');
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var CampaignActions = Reflux.createActions({
  'setProjectId': {},
  'loadState': {},
  'setState': {},
  'reset': {},
  'prepare': { children: ["completed","failure"] },
  'create': { children: ["completed","failure"] },
  'run': { children: ["completed","failure"] },
  'result': { children: ["completed","failure"] },
});

// Listeners for asynchronous Backend API calls


module.exports = CampaignActions;
