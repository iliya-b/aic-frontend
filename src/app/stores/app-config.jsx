'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var { AppConfigActions } = require('goby/actions');

// Store
var AppConfigStore =  Reflux.createStore({

   // Base Store //

  listenables: AppConfigActions,

  init: function() {
    this.state = {};
    this.state.config = {};
  },

  // Actions //

  onLoad: function(){
    //
  },

  onLoadCompleted: function(data){
    this.state.config = data;
    this.state.config.isLoaded = true;
    this.state.config.hasErrors = false;
    this.updateState();
  },

  onLoadFailure: function(error){
    this.state.config.isLoaded = true;
    this.state.config.hasErrors = true;
    this.state.config.error = error;
    this.updateState();
  },

  // Methods //

  updateState: function(){
    this.trigger( this.state );
  },

});


module.exports = AppConfigStore;

