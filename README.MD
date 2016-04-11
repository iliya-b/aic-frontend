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

Integration tests are now in [another repository](https://git.rnd.alterway.fr/aic-documentation/aic_features). The gitlabci build
will automatically clone it.


Known Bugs
==========

* Tables: can not unselect all ([open issue](https://github.com/callemall/material-ui/issues/3074) on the Table component of material-ui)
* Tables: header separator bugs on DOM change (to debug)
* Reflux unsubscribe method is broken, so users will get React messages like this: `Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the undefined component.`
* VM white screen is a chrome bug [ref1](https://bugs.chromium.org/p/chromium/issues/detail?id=588434) [ref2](http://stackoverflow.com/questions/36114379/chrome-canvas-bug-on-mac-os-x-when-switching-spaces)

TODO List
=========

* ~~Update all code to xo default style~~ :white_check_mark:
* Update readme (config.json, how to run tests, etc...)
* Tests
	* ~~Configure backend so the tests can pass~~ :white_check_mark:
	* ~~Write/adapt features~~ (transfered to aic_features project) :x:
	* Write all the unit tests for all the components (the POC is for a single component and does nothing).
	* Use ReactTestUtils on unit tests
	* Create react-router mink
	* Try other browsers for behavior testing
	* Apply [this](https://gist.github.com/tomazzaman/790bc607eb7ca3fd347f) integration testing (just a check if the app is working)
	* Theme test should be in another app (probably do it with the webpack change)
	* Continuously deployment for dev env with [stridercd](http://alexfernandez.github.io/2016/stridercd.html) ?
* Auth Todos
	* ~~disconnect user when token is invalid in any backend request~~ :white_check_mark:
	* true logout (now is just application sided not server sided)
	* replace localstorage by another storage?
	* Auth classes need some cleaning
	* Fix 1st load of app when token exists but invalid
* Routing
	* ~~Not found route~~ :white_check_mark:
	* ~~Next Path broken (regression)~~ :white_check_mark:
	* Views have router.push(pathname), probably needs to be changed, so if one changes pathname there is no need to revisit all views.
* Live
  * Get initial VM state to set the frontend sensors (for example battery slides should be relative to the vm battery)
  * Audio port
  * Callbacks from async calls should check id (for example previous live calls can trigger current live session)
  * Implement machine state
  * Activate GSM functions only on phone images
  * Activate GSM accept/hold/cancel if there is a current call
  * Limit the extensions allowed on the upload of camera assets
  * Add security/validation on the fields of frontend
* React
	* props => {} functions do not check propTypes
	* reorganize components into stateless components and containers
* Build
	* Try to light up the build, npm cache?
	* Clean up gulp tasks (simplified version can be found in other R&D projects)
	* Replace browserify by webpack with [tree shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html) then add again the indexes files
* Packages
	* ~~Change noVNC from git submodule to a npm module~~ :white_check_mark:
	* ~~Update node packages (a lot of work since everything will be broken by that)~~ :white_check_mark:
	* ~~When new version is available put back to npm the nyc package ([instead of the fork with --extension](https://github.com/bcoe/nyc/pull/163))~~ :white_check_mark:
	* Extract API lib to external package
* Backend API
	* valid response type (application/json for example)
	* create api user preferences
	* revisit the list vms API, should the filter by project done by frontend?
