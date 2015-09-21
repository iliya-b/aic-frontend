'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var AppUtils = require('../components/shared/app-utils.jsx');
var { APKUploadActions } = require('../actions/');

// Store
var APKUploadStore =  Reflux.createStore({

  // Base Store //

  listenables: APKUploadActions,

  init: function() {
    this.state = {};
    this.state.files = [];
    this.state.projectId = false;
  },

  getInitialState: function() {
    return this.state;
  },

  // Actions //

  onSetProjectId: function (projectId) {
    this.state.projectId = projectId;
    this.updateState();
  },

  onClean: function(){
    this.state.files = this.state.files.filter(function (apkItem) {
      return !apkItem.completed && !apkItem.error;
    });
    this.updateState();
  },

  onDrop: function(projectId, files){
    var filesInfo = this.convertToListItems(files);
    this.state.files = this.state.files.concat(filesInfo);
    this.updateState();
  },

  onDropProgressed: function(apkId, progress){
    this.listUpdate({id: apkId, progress: progress});
    this.updateState();
  },

  onDropCompleted: function(apkId){
    this.listUpdate({id: apkId, iconRightClassName: 'mdi mdi-check', progress: false, completed: true } );
    this.updateState(true);
  },

  onDropFailed: function(apkId, errorMessage){
    this.listUpdate({id: apkId, iconRightClassName: 'mdi mdi-close', progress: false, error: true, errorText: errorMessage } );
    this.updateState(true);
  },

  // Methods //

  updateState: function( shouldReloadAPKList ){
    this.state.shouldReloadAPKList = shouldReloadAPKList || false;
    this.trigger( this.state );
  },

  convertToListItems: function(files) {
    if (files !== undefined && files.length > 0){
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
    }else{
      return [];
    }
  },

  listUpdate: function (apk) {
    this.state.files = this.state.files.map(function (apkItem) {
      if (apkItem.id == apk.id) {
        return AppUtils.extend(apkItem, apk);
      } else {
        return apkItem;
      }
    });
  },

});


module.exports = APKUploadStore;

