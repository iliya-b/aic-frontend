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
  'restart': {},
  'socketMessage': {},
  'prepare': { children: ["completed","failure"] },
  'create': { children: ["completed","failure"] },
  'run': { children: ["completed","failure"] },
  'result': { children: ["completed","failure"] },
});

// Listeners for asynchronous Backend API calls
// CampaignActions.create.listen(function () {
//   var token = Auth.getToken();
//   var projectId = '';
//   var instanceId = '';
//   var instanceName = '';
//   var APKId = [];
//   var APKTestId = [];
//   BackendAPI.testCreate(token, projectId, instanceId, instanceName, APKId, APKTestId, (res) => {
//     if(res.hasOwnProperty('results')) {
//       this.completed();
//       // cb( { results: res.results, error:false } );
//     } else if((res.hasOwnProperty('code') && res.code === Test.ERROR_CONFLICT) ||
//       (res.hasOwnProperty('status') && res.status === Test.ERROR_CONFLICT) ||
//       (res.hasOwnProperty('error') && res.error.hasOwnProperty('code') && res.error.code === Test.ERROR_CONFLICT  ) ) {
//       // cb( { error: true, errorMessage: 'Conflict'} );
//       this.failure();
//     } else {
//       // cb( { error: true, errorMessage:'Unknown'} );
//       this.failure();
//     }
//   });
// });

CampaignActions.create.listen(function (projectId, instanceId, instanceName, APKIds, APKTestIds) {
  var token = Auth.getToken();
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
