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
const Main = require('app/views/main');
const Home = require('app/views/home');
const Themes = require('app/views/themes');
const ProjectWrapper = require('app/views/project/wrapper');
const ProjectList = require('app/views/project/list');
const ProjectPage = require('app/views/project/page');
const ProjectApkList = require('app/views/project/apk-list');
const ProjectApkTestList = require('app/views/project/apk-test-list');
const LiveWrapper = require('app/views/project/live/wrapper');
const LiveSession = require('app/views/project/live/session');
const ProjectCampaign = require('app/views/project/campaign');

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
