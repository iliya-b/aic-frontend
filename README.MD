[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Cloning the project
===================

noVNC is now added as a npm package and there is no need for special
cloning (with --recursive option) on this project.

Building the project
====================

The production environment is the build environment.
The development is the environment for testing.
To install only dependencies needed by the build (exclude packages
for testing) use either `npm install --production`, either
`NODE_ENV=production npm install`, either &lt;insert here another way
to make node in production environment&gt;.
Then run the `npm build`, which will create `./build/` folder.

Development installation
========================

Run `npm install` to install all packages needed to start the
project.


Run `npm start` to start a development web server and open then
application in the browser.


Run `npm build` to build the project at build/ folder. Any
webserver can be used to serve this folder and run the application.

Application configuration file should be served with the rest of the
application files. It must be in the root of your application served
by any webserver. It must be named `config.json`. A sample file is
given in this project as `config-sample.json`.

The backend machine IP can be changed at the `config.json`, the key
to be changed is `backend => host`.

You can also use the following environment variables to set the
front-end configuration, by using the command
`npm run create-conf-from-env` to create a valid file from the
environment variables:

Variables                      | Default       | Description
-------------------------------|---------------|-----------------------------------
AIC_FRONTEND_BACKEND_PROTOCOL  | 'http'        | Protocol of the backend API host
AIC_FRONTEND_BACKEND_HOST      | 'localhost'   | IP/Domain of the backend API host
AIC_FRONTEND_BACKEND_PORT      | '12345'       | Port of the backend API host
AIC_FRONTEND_BACKEND_TIMEOUT   | 5000          | Value in miliseconds for timeout the API calls

Tests
=====

Run `npm test` to run the unit tests on the project.

Run `npm run coverage` to run the unit tests and create test coverage
output. The coverage files are created in a folder named `./coverage`.

To run integration tests use the command
`npm run test-integration-phantom`. Notice that

TODO List
=========

* ~~Change noVNC from git submodule to a npm module~~ :white_check_mark:
* Update all code to xo default style
* Clean up gulp tasks (simplified version can be found in other R&D projects)
* Update readme (config.json, how to run tests, etc...)
* When new version is available put back to npm the nyc package ([instead of the fork with --extension](https://github.com/bcoe/nyc/pull/163))
* Apply [this](https://gist.github.com/tomazzaman/790bc607eb7ca3fd347f) integration testing (just a check if the app is working)

* Write all the unit tests for all the components (the POC is for a single component and does nothing).
* Write/adapt features
* Try other browsers for behavior testing
* Configure backend so the tests can pass
* Update node packages (a lot of work since everything will be broken by that)
* Use ReactTestUtils on unit tests