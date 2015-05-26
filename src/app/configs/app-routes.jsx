var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;


// Pages //
var Main   = require('../pages/main.jsx');
var Home   = require('../pages/home.jsx');
var Themes = require('../pages/themes.jsx');
var ProjectWrapper = require('../pages/project/wrapper.jsx');
var ProjectList = require('../pages/project/list.jsx');
var ProjectPage = require('../pages/project/page.jsx');
var ProjectSettings = require('../pages/project/settings.jsx');
var ProjectApkList = require('../pages/project/apk/list.jsx');
var ProjectApkPage = require('../pages/project/apk/page.jsx');

// Routes //
var AppRoutes = (
  <Route name="main" path="/" handler={Main}>
    <Route name="home" handler={Home} />
    <Route name="theme-test" handler={Themes} />

    <Route name="projects" handler={ProjectWrapper}>
      <Route name="project-list" path='list' handler={ProjectList} />
      <Route name="project-page" path=":projectId" handler={ProjectPage}>
        <Route name="apks" path="apks" handler={ProjectApkList}>
          <Route name="apk-page" path=":apkId" handler={ProjectApkPage} />
        </Route>
        <Route name="settings" handler={ProjectSettings} />
        <Redirect from="/projects/:projectId" to="apks" />
      </Route>
      <Redirect from="/projects" to="project-list" />
    </Route>

    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;