'use strict';

var AppConfig = {};

AppConfig.backend = {};

/* machine vertx running verticle http server */
AppConfig.backend.api = process.env.BACKEND_API || 'http://localhost:12345';

/* timeout for the api calls in milliseconds */
AppConfig.backend.timeout = process.env.BACKEND_TIMEOUT || 5000 ;

/* page where user lands after login */
AppConfig.userHome = 'projects';

module.exports = AppConfig;
