'use strict';

// Reflux
var Reflux = require('reflux');

// Actions
var AppConfigActions = Reflux.createActions({
  'load': { children: ["completed","failure"] },
});

// Listeners for asynchronous calls
AppConfigActions.load.listen(function () {
  // $.ajax({
  //     url:  'config.json',
  //   })
  AppConfigActions.loadConfigFactory()
    .then(function(isConfigLoaded){
      AppConfigActions.load.completed(window.GobyAppGlobals.config);
    },function(error){
      AppConfigActions.load.failure(error);
    });

    // .done(function(data, textStatus, errorThrown) {
    //   AppConfigActions.load.completed(data);
    // })
    // .fail(function(data, textStatus, errorThrown) {
    //   AppConfigActions.load.failure(errorThrown);
    // });
});

AppConfigActions.loadConfigPromise = false;

AppConfigActions.loadConfigFactory = function(){

  console.log('loadConfigFactory');

  // Configuration is already loaded
  if ( window.GobyAppGlobals.config ) {
    console.log('loadConfigFactory loaded');
    return new Promise( function(resolve) { resolve(true); } );
  }

  // Another promise for configuration load already exists
  if ( AppConfigActions.loadConfigPromise ) {
    console.log('loadConfigFactory exists');
    return AppConfigActions.loadConfigPromise ;
  }

  // First time loading configuration
  console.log('loadConfigFactory creating');

  AppConfigActions.loadConfigPromise = new Promise( function(resolve, reject) {
    $.ajax({
      url:  'config.json',
    })
    .then(function(data){
      console.log('data', data);
      window.GobyAppGlobals.config = data;
      resolve(true);
    }, function(data){
      console.log('data', data);
      reject('Error!');
    });
  });

  return AppConfigActions.loadConfigPromise ;

};

module.exports = AppConfigActions;
