'use strict';

var AppConfig = {};

AppConfig.backend = {};

/* machine vertx running verticle http server */
AppConfig.backend.protocol = process.env.BACKEND_PROTOCOL || 'http';
AppConfig.backend.host = process.env.BACKEND_HOST || 'localhost';
AppConfig.backend.port = process.env.BACKEND_PORT || '12345';

/* timeout for the api calls in milliseconds */
AppConfig.backend.timeout = process.env.BACKEND_TIMEOUT || 5000 ;

/* page where user lands after login */
AppConfig.userHome = 'projects';

/* debugging */
AppConfig.debug = (process.env.FRONT_DEBUG === 'true') || false;

module.exports = AppConfig;
