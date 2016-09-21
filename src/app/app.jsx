/* global window, document */
'use strict';

// TODO: polyfill for browser compatibility
// import 'babel-polyfill';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import refluxPromise from 'reflux-promise';
import gatewayRegisters from 'app/libs/gateway-registers';
import Notify from 'app/libs/notify';

(function () {
	// Needed for configuration
	window.GobyAppGlobals = window.GobyAppGlobals || {};

	// Needed to enable debugging on browser
	window.GobyAppGlobals.Debugger = require('debug');

	// Enable stop polling on browser
	window.GobyAppGlobals.Notify = Notify;

	// Debugging React
	// window.Perf = require('react-addons-perf');

	// Tap
	const injectTapEventPlugin = require('react-tap-event-plugin');
	// Needed for onTouchTap
	// Can go away when react 1.0 release
	// Check this repo:
	// https://github.com/zilverline/react-tap-event-plugin
	injectTapEventPlugin();

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
