/* global window, document */
'use strict';

require('babel-polyfill');

// Vendors
// import React from 'react';
import ReactDOM from 'react-dom';

// APP
import {AppRoutes} from 'app/configs';

(function () {
	// Needed for configuration
	window.GobyAppGlobals = window.GobyAppGlobals || {};

	// Needed to enable debugging on console
	window.GobyAppGlobals.Debugger = require('debug');

	// Tap
	const injectTapEventPlugin = require('react-tap-event-plugin');
	// Needed for onTouchTap
	// Can go away when react 1.0 release
	// Check this repo:
	// https://github.com/zilverline/react-tap-event-plugin
	injectTapEventPlugin();

	// TODO: remove polyfill ?
	// Promise polyfill
	// Phantomjs does not implement (yet) Promise
	// https://github.com/ariya/phantomjs/issues/12401
	if (!window.Promise) {
		window.Promise = require('promise-polyfill');
	}

	// Router
	ReactDOM.render(AppRoutes, document.getElementById('gobyApp'));
})();
