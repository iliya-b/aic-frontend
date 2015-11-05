'use strict';

// Reflux
var Reflux = require('reflux');

// Vendors
var sprintf = require('sprintf');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var ProjectActions = Reflux.createActions({
  'list': { children: ["completed","failure"] },
});

// Listeners for asynchronous Backend API calls
ProjectActions.list.listen(function () {

  BackendAPI.userProjects()
  .then( (result) => {
    if ( result.hasOwnProperty('tenants') ) {
      this.completed( result['tenants'] );
    }else if ( result.hasOwnProperty('statusText') ) {
      this.failure( sprintf('It was not possible to list projects. Error: %s', result.statusText) );
    }else{
      this.failure('It was not possible to list projects. Unknown error');
    }
  });

});

// TODO: change to state ?
ProjectActions.getNameById = function (projectId) {

  return BackendAPI.userProjects()
  .then( (result) => {
    if ( result.hasOwnProperty('tenants') ) {
      return result['tenants'].reduce( function(previousValue, currentValue){
        return (previousValue !== false) ? previousValue :
               (currentValue.id === projectId) ? currentValue.name : previousValue;
      }, false);
    }else if ( result.hasOwnProperty('statusText') ) {
      throw sprintf('It was not possible to list projects. Error: %s', result.statusText);
    }else{
      throw 'It was not possible to list projects. Unknown error)';
    }
  });

};

module.exports = ProjectActions;
