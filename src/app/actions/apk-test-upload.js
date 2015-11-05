'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var APKTestUploadActions = Reflux.createActions({
  'drop': { asyncResult: true, children: ["progressed"] },
  'clean': {},
  'setProjectId': {},
});

// Listeners for asynchronous Backend API calls
APKTestUploadActions.drop.listen(function (projectId, files) {
  var ERROR_DUPLICATED = 409;

  if (projectId !== null && files !== undefined && files.length > 0){
    files.map(function (file) {
      BackendAPI.apkTestUpload(projectId, file, (res) => { // callback progress
        if(res.lengthComputable){
          this.progressed( file.preview, parseInt(res.loaded/res.total*100) );
        }
      })
      .then( (res) => { // callback end upload
        if(res.hasOwnProperty('testId')) {
          this.completed( file.preview );
        } else if((res.hasOwnProperty('code') && res.code === ERROR_DUPLICATED) ||
          (res.hasOwnProperty('status') && res.status === ERROR_DUPLICATED)) {
          this.failed( file.preview, 'Duplicated APK name file.' );
        } else {
          this.failed( file.preview, 'Unknown' );
        }
      });
    });
  }

});

module.exports = APKTestUploadActions;