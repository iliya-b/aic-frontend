'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var AppUtils = require('../components/shared/app-utils.jsx');
var { APKActions } = require('../actions/');

// Store
var APKStore = Reflux.createStore({

  // Base Store //

  listenables: APKActions,

  init: function() {
    this.apks = false;
    this.itemsToDelete = [];
    this.status = 'initial';
  },

  getInitialState: function() {
    return { apks: this.apks, itemsToDelete: this.itemsToDelete };
  },

  // Actions //

  onToggleDelete: function(apkId) {
    this.updateList( this.apks.map( function (item) {
      return (item.id == apkId) ? AppUtils.extend(item, { toDelete: !item.toDelete }) : item;
    }));
  },

  onDeleteSelectedCompleted: function() {
    this.status = 'reloadList';
    this.updateList( this.apks );
  },

  onLoadCompleted: function (data) {
    var newList = data.map(function (apk) {
          return { id: apk.id, name: apk.name, toDelete: this.isMarkedToDelete(apk.id) };
        }, this);
    switch(this.status){
      case 'reloadList' :
        var listIds = newList.map( function (item) { return item.id; } ) ;
        this.itemsToDelete = this.itemsToDelete.filter( function (item) {
            return listIds.indexOf(item) > -1 ;
          });
        this.status = 'deleteFinished';
        break;
      default:
        break;
    }
    this.updateList( newList );
  },

  // Methods //

  updateList: function(newList){
    this.apks = newList;
    this.itemsToDelete = this.apks.reduce( function (previousValue, item) {
      return item.toDelete ? previousValue.concat(item.id) : previousValue ;
    } , []);
    this.trigger( this.convertToListItems(newList), this.itemsToDelete, this.status );
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
    return (this.itemsToDelete.indexOf(id) > -1);
  },

});

module.exports = APKStore;

