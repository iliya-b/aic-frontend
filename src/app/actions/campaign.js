'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var CampaignActions = Reflux.createActions({
  'setProjectId': {},
  'loadState': {},
  'setState': {},
  'reset': {},
  'restart': {},
  'socketMessage': {},
  'prepare': { children: ["completed","failure"] },
  'create': { children: ["completed","failure"] },
  'run': { children: ["completed","failure"] },
  'result': { children: ["completed","failure"] },
});

// Listeners for asynchronous Backend API calls

CampaignActions.create.listen(function (projectId, instanceId, instanceName, APKIds, APKTestIds) {
  var token = '';
  BackendAPI.testCreate(token, projectId, instanceId, instanceName, APKIds, APKTestIds, (res) => {
    if ( res.hasOwnProperty('token') ) {
      var WebsocketActions = require('goby/actions/websocket.js');
      WebsocketActions.connect(res.token, 'campaign');
    }else{
      this.failure('It was not possible to create a campaign.');
    }
  });
});


module.exports = CampaignActions;
