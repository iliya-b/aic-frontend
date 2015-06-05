'use strict';

var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('./backend-api.jsx');

var Test = {

  getAll: function (cb) {
    var token = Auth.getToken();
    BackendAPI.instanceList(token, (res) => {

      var tests = res.results.map(function (test) {
        return {
          id: test[0],
          name: test[1]
        }
      })

      // { apkId: 'apk1', text: 'APK1', checkbox:true },
      cb(tests);
    });
  },

  create: function (projectId, instanceId, instanceName, APKId, cb) {
    var token = Auth.getToken();
    BackendAPI.testCreate(token, projectId, instanceId, instanceName, APKId, (res) => {
      cb(res);
    });
  }


};


module.exports = Test;

