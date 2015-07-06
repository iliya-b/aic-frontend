'use strict';

var AppConfig = {
  backend: {
    // api: 'http://10.2.0.143:12345', /* machine vertx running verticle http server */
    api: 'http://localhost:12345',
    timeout: 5000 /* timeout for the api calls in milliseconds */
  },
  // backend: 'http://localhost:12345', /* machine vertx running verticle http server */
  userHome: 'projects'
};

module.exports = AppConfig;

// TODO: implement flux, reflux, flummox, alt, etc https://github.com/acdlite/flummox