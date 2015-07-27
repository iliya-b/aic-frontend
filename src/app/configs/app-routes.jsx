var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;


// Pages //
var Main   = require('../views/main.jsx');
var Home   = require('../views/home.jsx');
var Themes = require('../views/themes.jsx');
var ProjectWrapper = require('../views/project/wrapper.jsx');
var ProjectList = require('../views/project/list.jsx');
var ProjectPage = require('../views/project/page.jsx');
var ProjectSettings = require('../views/project/settings.jsx');
var ProjectApkList = require('../views/project/apk-list.jsx');
var ProjectApkTestList = require('../views/project/apk-test-list.jsx');
var ProjectLive = require('../views/project/live.jsx');
var ProjectTests = require('../views/project/tests.jsx');
var ProjectCampaign = require('../views/project/campaign.jsx');


// Routes //
var AppRoutes = (
  <Route name="main" path="/" handler={Main}>
    <Route name="home" handler={Home} />
    <Route name="theme-test" handler={Themes} />

    <Route name="projects" handler={ProjectWrapper}>
      <Route name="project-list" path='list' handler={ProjectList} />
      <Route name="project-page" path=":projectId" handler={ProjectPage}>
        <Route name="apks" handler={ProjectApkList} />
        <Route name="apks-test" handler={ProjectApkTestList} />
        <Route name="settings" handler={ProjectSettings} />
        <Route name="live" handler={ProjectLive} />
        <Route name="tests" handler={ProjectTests} />
        <Route name="campaign" handler={ProjectCampaign} />
        <Redirect from="/projects/:projectId" to="apks" />
      </Route>
      <Redirect from="/projects" to="project-list" />
    </Route>

    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;