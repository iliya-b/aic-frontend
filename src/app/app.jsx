/* global window, document */
// 'use strict';

(function () {
  // Needed for configuration
  window.GobyAppGlobals = window.GobyAppGlobals || {};
  const {AppRoutes} = require('goby/configs');

  // Needed to enable debugging on console
  window.GobyAppGlobals.Debugger = require('debug');

  // React
  const React = require('react');

  // Needed for React Developer Tools
  // window.React = React;

  // Tap
  const injectTapEventPlugin = require('react-tap-event-plugin');
  // Needed for onTouchTap
  // Can go away when react 1.0 release
  // Check this repo:
  // https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  // Router
  const Router = require('react-router');
  Router
    .create({
      routes: AppRoutes,
      scrollBehavior: Router.ScrollToTopBehavior,
    })
    .run(Handler => {
      React.render(<Handler/>, document.body);
    });
})();
