/* global window, document */
'use strict';

// Vendor
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import refluxPromise from 'reflux-promise';

// APP
import gatewayRegisters from 'app/libs/gateway-registers';
import PollingActions from 'app/actions/polling';

(function () {
	// Needed for configuration
	window.GobyAppGlobals = window.GobyAppGlobals || {};

	// Needed to enable debugging on browser
	window.GobyAppGlobals.Debugger = require('debug');

	// Enable stop polling on browser
	window.GobyAppGlobals.PollingActions = PollingActions;

	// Debugging React
	// window.Perf = require('react-addons-perf');

	// Tap
	const injectTapEventPlugin = require('react-tap-event-plugin');
	// Needed for onTouchTap
	// Can go away when react 1.0 release
	// Check this repo:
	// https://github.com/zilverline/react-tap-event-plugin
	injectTapEventPlugin();

	// TODO: remove polyfills, there are only here so the integration
	// tests can be run in phantomjs.
	// Promise polyfill
	// Phantomjs does not implement (yet) Promise
	// https://github.com/ariya/phantomjs/issues/12401
	if (!window.Promise) {
		window.Promise = require('promise-polyfill');
	}
	// Object.assign polyfill
	// Phantomjs was having TypeError with Object.assign
	// https://github.com/ariya/phantomjs/issues/14506
	require('es6-object-assign').polyfill();

	// Uses the user agent's Promise implementation
	Reflux.use(refluxPromise(window.Promise));

	// Gateway/Backend
	gatewayRegisters();

	// refluxPromise needs to be before the routes import
	// and if AppRoutes is done on the begging of the file
	// browserify will solve it before anything else is executed
	// even when the refluxPromise is before the import
	const AppRoutes = require('app/configs/app-routes');

	// Router
	ReactDOM.render(AppRoutes, document.getElementById('gobyApp'));
})();
