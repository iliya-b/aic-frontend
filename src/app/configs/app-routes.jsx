'use strict';

// React
// Must be define because Route depends on it
import React from 'react';

// Router
import {
	Router,
	Route,
	Redirect,
	IndexRoute,
	hashHistory
} from 'react-router';

// Views
import {
	Main,
	Home,
	NotFound,
	Themes,
	ProjectWrapper,
	ProjectList,
	ProjectPage,
	ProjectApkManager,
	ProjectApkTestList,
	ProjectLiveWrapper,
	ProjectLiveSession,
	ProjectLiveList,
	ProjectCampaign
} from 'app/views';

// import {
// 	Router,
// 	hashHistory
// } from 'react-router';

// Routes
const AppRoutes = (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={Home}/>
			<Route path="theme-test" component={Themes}/>
			<Route path="projects" component={ProjectWrapper}>
				<IndexRoute component={ProjectList}/>
				<Route path=":projectId" component={ProjectPage}>
					<IndexRoute component={ProjectApkManager}/>
					<Route path="apks-test" component={ProjectApkTestList}/>
					<Route path="live" component={ProjectLiveWrapper}>
						<IndexRoute component={ProjectLiveList}/>
						<Route path=":androId" component={ProjectLiveSession}/>
					</Route>
					<Route path="campaign" component={ProjectCampaign}/>
					<Redirect from="/projects/:projectId" to="apks"/>
				</Route>
				<Redirect from="/projects" to="project-list"/>
			</Route>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>
);

module.exports = AppRoutes;
