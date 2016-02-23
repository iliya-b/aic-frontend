'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var { ProjectActions } = require('app/actions');

// Store
var ProjectStore = Reflux.createStore({

  // Base Store //

  listenables: ProjectActions,

  init: function() {
    this.state = {};
    this.state.projects = [];
  },

  // Actions //

  onList: function() {
    // TODO:
    // this.updateState();
  },

  onListCompleted: function (projects) {
    this.state.projects = projects;
    this.updateState();
  },

  onListFailure: function (errorMessage) {
    // TODO:
    // this.updateState();
  },

  // Methods //

  updateState: function(){
    this.trigger( this.state );
  },

});

module.exports = ProjectStore;