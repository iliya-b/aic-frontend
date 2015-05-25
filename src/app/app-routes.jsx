var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;


// Pages //
var Main   = require('./components/pages/main.jsx');
var Home   = require('./components/pages/home.jsx');
var Themes = require('./components/pages/themes.jsx');


// Routes //
var AppRoutes = (
  <Route name="main" path="/" handler={Main}>
    <Route name="home" handler={Home} />
    <Route name="theme-test" handler={Themes} />
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;