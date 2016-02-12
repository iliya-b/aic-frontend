
Cloning the project
===================

Use the option --recursive in order to clone also the subprojects
dependencies (like NoVNC).

Example:

```
git clone git@git.android-in-cloud.com:aic_vm/front-end-app.git -b proto1 --recursive
```

If the repository is already cloned but without the subprojects, you
can use, for example, the following git command to initialize them.

```
git submodule update --init
```

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



TODO List
=========

* Change noVNC from git submodule to a npm module
* Update all code to xo default style
* Clean up gulp tasks (simplified version can be found in other R&D projects)
* Update readme (config.json, how to run tests, etc...)
* When new version is available put back to npm the nyc package ([instead of the fork with --extension](https://github.com/bcoe/nyc/pull/163))
* Apply [this](https://gist.github.com/tomazzaman/790bc607eb7ca3fd347f) integration testing (just a check if the app is working)
