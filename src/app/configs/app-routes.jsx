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
import Main from 'app/views/main';
import Home from 'app/views/home';
import NotFound from 'app/views/not-found';
import ProjectWrapper from 'app/views/project/wrapper';
import ProjectList from 'app/views/project/list';
import ProjectPage from 'app/views/project/page';
import ProjectDetails from 'app/views/project/details';
import ProjectApkManager from 'app/views/project/apk-manager';
import ProjectTestWrapper from 'app/views/project/test/wrapper';
import ProjectTestManager from 'app/views/project/test/test-manager';
import ProjectTestEditor from 'app/views/project/test/test-editor';
import ProjectLiveWrapper from 'app/views/project/live/wrapper';
import ProjectLiveSession from 'app/views/project/live/session';
import ProjectLiveList from 'app/views/project/live/list';
import ProjectCameraAssets from 'app/views/project/camera-assets';
import ProjectCampaignList from 'app/views/project/campaign/list';
import ProjectCampaignShow from 'app/views/project/campaign/show';

// Routes
const AppRoutes = (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={Home}/>
			<Route path="projects" component={ProjectWrapper}>
				<IndexRoute component={ProjectList}/>
				<Route path=":projectId" component={ProjectPage}>
					<IndexRoute component={ProjectDetails}/>
					<Route path="apks" component={ProjectApkManager}/>
					<Route path="tests" component={ProjectTestWrapper}>
						<IndexRoute component={ProjectTestManager}/>
						<Route path=":testId/editor" component={ProjectTestEditor}/>
						<Route path="create/editor" component={ProjectTestEditor}/>
					</Route>
					<Route path="campaign" component={ProjectLiveWrapper}>
						<IndexRoute component={ProjectCampaignList}/>
						<Route path=":campaignId" component={ProjectCampaignShow}/>
					</Route>
					<Route path="live" component={ProjectLiveWrapper}>
						<IndexRoute component={ProjectLiveList}/>
						<Route path=":androId" component={ProjectLiveSession}/>
					</Route>
					<Route path="camera" component={ProjectCameraAssets}/>
					<Redirect from="/projects/:projectId" to="apks"/>
				</Route>
				<Redirect from="/projects" to="project-list"/>
			</Route>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>
);

module.exports = AppRoutes;
