'use strict';

// React
// Must be define because Route depends on it
const React = require('react');

// Router
const Router = require('react-router');
const Route = Router.Route;
const Redirect = Router.Redirect;
const DefaultRoute = Router.DefaultRoute;

// Pages //
const Main = require('app/views/main.jsx');
const Home = require('app/views/home.jsx');
const Themes = require('app/views/themes.jsx');
const ProjectWrapper = require('app/views/project/wrapper.jsx');
const ProjectList = require('app/views/project/list.jsx');
const ProjectPage = require('app/views/project/page.jsx');
const ProjectApkList = require('app/views/project/apk-list.jsx');
const ProjectApkTestList = require('app/views/project/apk-test-list.jsx');
const LiveWrapper = require('app/views/project/live/wrapper.jsx');
const LiveSession = require('app/views/project/live/session.jsx');
const ProjectCampaign = require('app/views/project/campaign.jsx');

// Routes //
const AppRoutes = (
  <Route name="main" path="/" handler={Main}>
    <Route name="home" handler={Home} />
    <Route name="theme-test" handler={Themes} />

    <Route name="projects" handler={ProjectWrapper}>
      <Route name="project-list" path="list" handler={ProjectList} />
      <Route name="project-page" path=":projectId" handler={ProjectPage}>
        <Route name="apks" handler={ProjectApkList} />
        <Route name="apks-test" handler={ProjectApkTestList} />
        <Route name="live" handler={LiveWrapper} >
          <Route name="live-session" path=":androId" handler={LiveSession} />
        </Route>
        <Route name="campaign" handler={ProjectCampaign} />
        <Redirect from="/projects/:projectId" to="apks" />
      </Route>
      <Redirect from="/projects" to="project-list" />
    </Route>

    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;
