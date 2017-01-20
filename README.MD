[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![ava runner](https://img.shields.io/badge/runner-ava-4d88e3.svg)](https://github.com/avajs/ava)

## Front-end AiC

![Front-end AiC](aic-frontend.png "Front-end AiC")

This is the repo that contains
[AiC project](http://aic-project.rnd.alterway.fr/) web interface.

## Production environment

To set-up a production environment, first install the npm
dependencies.

```
$ npm install --production
```

This will install only dependencies needed by the build, excluding
packages for development and testing.

Then, to create the transpiled JS files and assets, build the project:

```
$ npm run build
```

It will create the `./build/` folder. This folder can be served by any
webserver to start the frontend AiC application.

```
$ cd build/
$ python -m SimpleHTTPServer
Serving HTTP on 0.0.0.0 port 8000 ...
```

Now you can access in your browser http://0.0.0.0:8000/

## Configuration file

The application uses a configuration file in JSON format. It is named
`config.json` and it should be in the root of your application,
typically at `./build/config.json`. In this project we offer a sample
at `./config-sample.json`.


```
{
  "backend": {
    "protocol": "http",
    "host": "localhost",
    "port": 12345,
    "timeout": 5000
  },
  "userHome": "projects",
  "debug": true
}

```

Make sure that you set a valid AiC `backend`, otherwise the
application will not work.

## Development environment

To set-up a development environment, first install the npm
dependencies. In this mode we want to install the all dependencies,
including development and testing ones. Therefore, do not use the
option --production (as seen in production environment).

```
$ npm install
```

This will install all dependencies needed to build, start
development webserver and run tests.

Then, to create the static assets needed by the development webserver,
build the project:

```
$ npm run build
```

It will create the `./build/` folder. This folder is then used by the
development webserver. To start the development webserver use the
`npm start` command.

```
$ npm start

> front-end-app@0.7.6 start /AiC/frontend
> webpack-dev-server --content-base ./build/ --history-api-fallback --progress --port 9080 --hot --inline

 http://localhost:9080/
webpack result is served from /
content is served from /AiC/frontend/build
404s will fallback to /index.html
webpack: wait until bundle finished: /
Hash: 32c181be8097ea1d115f
Version: webpack 2.1.0-beta.21
Time: 16348ms
 Asset     Size  Chunks             Chunk Names
app.js  12.3 MB       0  [emitted]  main
chunk    {0} app.js (main) 4.48 MB [entry] [rendered]
    [0] ./~/react/react.js 56 bytes {0} [built]
[...]
```

Now you can access in your browser http://localhost:9080/

In this environment, each time a change occurs in one of the source
files the application files will be modified automatically, without
restarting the web server or rebuilding the entire application.
However, there is still a need to reload the application in browser.

### Storybook

Storybook offers a simple interface that lists react components, like
a component library for your project. To start storybook with AiC
react components, first install project dependencies and then start
the webpack storybook dev server.

```
$ npm install          # Install all project dependencies
$ npm run start-story  # Start storybook server
```

## Tests

Run `npm test` to run the tests on the project. It runs the code style
test, the unit tests on the components and the check for console usage
in the code.

Run `npm run test:coverage` to run the unit tests and create test
coverage output. The coverage files are created in a folder named
`./coverage`.

Integration tests are now in a separated
[aic_features repository](https://git.rnd.alterway.fr/aic-documentation/aic_features).
The gitlabci integration pipeline will clone and run integration tests
on this project.

## Known Bugs

* Tables: can not unselect all ([open issue](https://github.com/callemall/material-ui/issues/3074) on the Table component of material-ui)
* Tables: header separator bugs on DOM change ([open issue](https://github.com/callemall/material-ui/issues/3957))
* Reflux unsubscribe method is broken, so users will get React messages like this: `Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the undefined component.`
* [Fixed] There was a VM white screen chrome bug [ref1](https://bugs.chromium.org/p/chromium/issues/detail?id=588434) [ref2](http://stackoverflow.com/questions/36114379/chrome-canvas-bug-on-mac-os-x-when-switching-spaces)

## Troubleshooting

### `Cannot GET /`

If in the browser you get the message `Cannot GET /` it is possible
that you start the server without a `/build` directory. Build the
project with the following command and reload the browser.

```
npm run build
```

### `It was not possible to load the application.`

If when opening the application in the browser you have the following
message:

```
It was not possible to load the application.
Please contact administrator to verify the application installation.
```

It is possible that you have an invalid configuration file. Please
check the section [Configuration file](#configuration-file) for more
details.

## Cloning the project

Historically, up to version v0.2.0, this project needed to be cloned
with the recursive option because noVNC was a git sub project.

Now, since version v0.2.1, noVNC is part of the project as a npm
package. Therefore, there is *no* need for special cloning (with
--recursive option) on this project.

## TODO List

* ~~Update all code to xo default style~~ :white_check_mark:
* Update readme (config.json, how to run tests, etc...)
* Tests
	* ~~Configure backend so the tests can pass~~ :white_check_mark:
	* ~~Write/adapt features~~ (transfered to aic_features project) :x:
	* Write all the unit tests for all the components (the POC is for a single component and does nothing).
	* ~~Use ReactTestUtils on unit tests~~ :white_check_mark:
	* Create react-router mink
	* Try other browsers for behavior testing
	* Apply [this](https://gist.github.com/tomazzaman/790bc607eb7ca3fd347f) integration testing (just a check if the app is working)
	* Theme test should be in another app (probably do it with the webpack change)
	* Continuously deployment for dev env with [stridercd](http://alexfernandez.github.io/2016/stridercd.html) ?
	* Add [eslint-plugin-ava](https://github.com/sindresorhus/eslint-plugin-ava) when [xo gets fixed](https://github.com/sindresorhus/xo/issues/88)
	* Components test vs Theme page (maybe they can share some code).
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
	* Lazy load routes https://github.com/reactjs/react-router/issues/924
* Live
  * Get initial VM state to set the frontend sensors (for example battery slides should be relative to the vm battery)
  * ~~Audio port~~ :white_check_mark:
  * Callbacks from async calls should check id (for example previous live calls can trigger current live session)
  * Implement machine state
  * Activate GSM functions only on phone images
  * Activate GSM accept/hold/cancel if there is a current call
  * Limit the extensions allowed on the upload of camera assets
  * Add validation on the fields of frontend (started with formsy package)
* React
	* props => {} functions do not check propTypes, in fact it does [Stateless Functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions), needs more testing
	* reorganize components into stateless components and containers (started with unit tests)
	* Check perf with react-addons-perf https://facebook.github.io/react/docs/perf.html
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
* Prod
	* We probably want to include babel-polyfill for production builds.
