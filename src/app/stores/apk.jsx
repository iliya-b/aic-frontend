'use strict';

var { Auth } = require('./auth.jsx');
var BackendAPI = require('./backend-api.jsx');
// var { AppUtils } = require('../components/');
var AppUtils = require('../components/shared/app-utils.jsx');

console.log(AppUtils);

var APK = {

  ERROR_DUPLICATED: 409,

  uploadFiles: function (projectId, files, cb) {
    // apkId, progress, completed
    var token = Auth.getToken();

    files.map(function (file) {
      BackendAPI.apkUpload(token, projectId, file, (res) => { // callback progress
        console.log('cb progress');
        console.log(res);
        if(res.lengthComputable){
          cb( { apkId: file.preview, progress: parseInt(res.loaded/res.total*100) } );
        } else {
          cb( {  } );
        }
      }, (res) => { // callback end upload
        console.log('res upload');
        console.log(res);
        if(res.hasOwnProperty('appId')) {
          cb( { apkId: file.preview, completed:true } );
        } else if((res.hasOwnProperty('code') && res.code === APK.ERROR_DUPLICATED) ||
          (res.hasOwnProperty('status') && res.status === APK.ERROR_DUPLICATED)) {
          cb( { apkId: file.preview, error: true, errorMessage: 'Duplicated APK name file.'} );
        } else {
          cb( { apkId: file.preview, error: true, errorMessage:'Unknown'} );
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
  },


  convertToListItems: function(files) {
    return files.map(function (file) {
      return {
        id: file.preview,
        key: file.name,
        text: file.name,
        size: file.size,
        iconRightClassName: 'mdi mdi-upload',
        progress: 0,
        completed: false
      };
    });
  },

  listUpdate: function (apkList, apk) {
    return apkList.map(function (apkItem) {
      if (apkItem.id == apk.id) {
        return AppUtils.extend(apkItem, apk);
      } else {
        return apkItem;
      }
    });
  },

  listClean: function (apkList) {
    return apkList.filter(function (apkItem) {
      return !apkItem.completed && !apkItem.error;
    });
  }


};


module.exports = APK;

