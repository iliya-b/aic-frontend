'use strict';

// Reflux
var Reflux = require('reflux');

// Actions
var AppConfigActions = Reflux.createActions({
  'load': { children: ["completed","failure"] },
});

// Listeners for asynchronous calls
AppConfigActions.load.listen(function () {
  console.log('config loading');
  $.ajax({
      url:  'config.json',
    })
    .done(function(data, textStatus, errorThrown) {
      AppConfigActions.load.completed(data);
    })
    .fail(function(data, textStatus, errorThrown) {
      AppConfigActions.load.failure(errorThrown);
    });
});

module.exports = AppConfigActions;
