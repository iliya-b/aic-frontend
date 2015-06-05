'use strict';

var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('./backend-api.jsx');

var APK = {

  ERROR_DUPLICATED: 409,

  uploadFiles: function (projectId, files, cb) {
    var token = Auth.getToken();

    files.map(function (file) {
      BackendAPI.apkUpload(token, projectId, file, (res) => { // callback progress
        console.log('cb progress');
        console.log(res);
      }, (res) => { // callback end upload
        console.log('res upload');
        console.log(res);
        if(res.hasOwnProperty('appId')) {
          cb({file_uploaded:true});
        } else if(res.hasOwnProperty('status') && res.status === APK.ERROR_DUPLICATED) {
          cb({file_uploaded:false, error: 'Duplicated APK name file.'});
        } else {
          cb({file_uploaded:false, error:'Unknown'});
        }
      });
    })


  },

  getAll: function (projectId, cb) {
    var token = Auth.getToken();
    BackendAPI.apkList(token, projectId, (res) => {

      var apks = res.map(function (apk) {
        return {
          id: apk.id,
          name: apk.name,
          apkId: apk.id,
          key: apk.id,
          text: apk.name,
          checkbox:true
        }
      })

      // { apkId: 'apk1', text: 'APK1', checkbox:true },
      cb(apks);
    });
  },

  getOneById: function (projectId, cb) {
    var project;
    this.getAll( (projectList) => {
        // console.log(projectId);
        // console.log(projectList);
        for (var i = projectList.length - 1; i >= 0; i--) {
          if(projectList[i].id === projectId) {
            project = projectList[i];
            break;
          }
        }
        cb(project);
      }
    );
  },

  getNameById: function (projectId, cb) {
    this.getOneById( projectId, (project) => {
        cb(project.name);
      }
    );
  },

  removeByIds: function (apkIds, cb) {
    var token = Auth.getToken();
    BackendAPI.apkRemove(token, apkIds, (res) => {
      cb(res);
    });
  }


};


module.exports = APK;

