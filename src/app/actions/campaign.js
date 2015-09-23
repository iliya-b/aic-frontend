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
  'logMessage': {},
  'prepare': { children: ["completed","failure"] },
  'create': { children: ["completed","failure"] },
  'run': { children: ["completed","failure"] },
  'result': { children: ["completed","failure"] },
  'loadDevices': { children: ["completed","failure"] },
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

CampaignActions.loadDevices.listen(function () {
  var token = '';
  BackendAPI.instanceList(token, (res) => {
    var tests = [];
    if (res !== undefined && res.results !== undefined && res.results.length > 0){
      tests = res.results.map(function (test) {
        return {
          id: test[0],
          name: test[1]
        }
      });
    }
    // { apkId: 'apk1', text: 'APK1', checkbox:true },
    this.completed(tests);
    // TODO: change api to promises, add failure

  });
});


module.exports = CampaignActions;
