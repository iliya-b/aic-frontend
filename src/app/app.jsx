/* global window, document */
'use strict';

require('babel-polyfill');

// Vendor
import ReactDOM from 'react-dom';
import str from 'string';

// APP
import AppRoutes from 'app/configs/app-routes';
import gatewayRegisters from 'app/libs/gateway-registers';

(function () {
	// Needed for configuration
	window.GobyAppGlobals = window.GobyAppGlobals || {};

	// Needed to enable debugging on browser
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

	// Gateway/Backend
	gatewayRegisters();
	str.TMPL_OPEN = '{';
	str.TMPL_CLOSE = '}';

	// Router
	ReactDOM.render(AppRoutes, document.getElementById('gobyApp'));
})();
