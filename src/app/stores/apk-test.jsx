'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var AppUtils = require('goby/components/shared/app-utils.jsx');
var { APKTestActions } = require('goby/actions');

// Store
var APKTestStore = Reflux.createStore({

  // Base Store //

  listenables: APKTestActions,

  init: function() {
    this.state = {};
    this.state.projectId = null;
    this.state.apks = false;
    this.state.itemsToDelete = [];
    this.state.status = 'initial';
  },

  // Actions //

  onSetProjectId: function (projectId) {
    this.state.projectId = projectId;
    this.updateState();
  },

  onToggleDelete: function(apkId) {
    this.state.apks = this.state.apks.map( function (item) {
      return (item.id == apkId) ? AppUtils.extend(item, { toDelete: !item.toDelete, checked: !item.toDelete }) : item;
    });
    this.updateItemsToDelete();
    this.updateState();
  },

  onDeleteSelectedCompleted: function() {
    this.state.status = 'reloadList';
    this.updateState();
  },

  onLoadCompleted: function (data) {
    this.state.apks = this.convertToListItems(data.map(function (apk) {
          return { id: apk.id, name: apk.name, toDelete: this.isMarkedToDelete(apk.id), checked: this.isMarkedToDelete(apk.id) };
        }, this));
    this.updateItemsToDelete();
    switch(this.state.status){
      case 'reloadList' :
        this.state.status = 'deleteFinished';
        break;
      default:
        break;
    }
    this.updateState();
  },

  // Methods //

  updateState: function(){
    this.trigger( this.state );
  },

  convertToListItems: function(list){
    return list.map(function (item) {
      return {
        id: item.id,
        name: item.name,
        apkId: item.id,
        key: item.id,
        text: item.name,
        checkbox: true,
        toDelete: item.toDelete,
        checked: item.toDelete,
      }
    });
  },

  isMarkedToDelete: function(id){
    return (this.state.itemsToDelete.indexOf(id) > -1);
  },

  updateItemsToDelete: function (){
    this.state.itemsToDelete = this.state.apks.reduce( function (previousValue, item) {
        return item.toDelete ? previousValue.concat(item.id) : previousValue ;
      } , []);
  }

});

module.exports = APKTestStore;

