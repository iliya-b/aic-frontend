'use strict';

// React
var React = require('react');

// Router
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

// Pages //
var Main   = require('goby/views/main.jsx');
var Home   = require('goby/views/home.jsx');
var Themes = require('goby/views/themes.jsx');
var ProjectWrapper = require('goby/views/project/wrapper.jsx');
var ProjectList = require('goby/views/project/list.jsx');
var ProjectPage = require('goby/views/project/page.jsx');
var ProjectApkList = require('goby/views/project/apk-list.jsx');
var ProjectApkTestList = require('goby/views/project/apk-test-list.jsx');
var ProjectLive = require('goby/views/project/live.jsx');
var ProjectCampaign = require('goby/views/project/campaign.jsx');

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
        <Route name="live" handler={ProjectLive} />
        <Route name="campaign" handler={ProjectCampaign} />
        <Redirect from="/projects/:projectId" to="apks" />
      </Route>
      <Redirect from="/projects" to="project-list" />
    </Route>

    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;