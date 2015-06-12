'use strict';

var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('./backend-api.jsx');

var Test = {

  ERROR_CONFLICT: 409,

  getAll: function (cb) {
    var token = Auth.getToken();
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
      cb(tests);
    });
  },

  create: function (projectId, instanceId, instanceName, APKId, APKTestId, cb) {
    var token = Auth.getToken();
    BackendAPI.testCreate(token, projectId, instanceId, instanceName, APKId, APKTestId, (res) => {
      if(res.hasOwnProperty('results')) {
        cb( { results: res.results, error:false } );
      } else if((res.hasOwnProperty('code') && res.code === Test.ERROR_CONFLICT) ||
        (res.hasOwnProperty('status') && res.status === Test.ERROR_CONFLICT) ||
        (res.hasOwnProperty('error') && res.error.hasOwnProperty('code') && res.error.code === Test.ERROR_CONFLICT  ) ) {
        cb( { results: "", error: true, errorMessage: 'Conflict'} );
      } else {
        cb( { results: "", error: true, errorMessage:'Unknown'} );
      }
    });
  }


};


module.exports = Test;

