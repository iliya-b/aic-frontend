'use strict';

// Vendor
import Reflux from 'reflux';
const debug = require('debug')('AiC:Actions:Project');

// APP
import BackendAPI from 'app/libs/backend-api';
import AppActions from 'app/actions/app';

// Actions
const ProjectActions = Reflux.createActions({
	list: {children: ['completed', 'failure']},
	create: {children: ['completed', 'failure']},
	update: {children: ['completed', 'failure']},
	delete: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls
ProjectActions.list.listen(function () {
	BackendAPI.userProjects()
	.then(result => {
		this.completed(result.projects);
	}, err => {
		this.failure(err);
	});
});

ProjectActions.create.listen(function (projectName) {
	BackendAPI.projectCreate(projectName)
	.then(result => {
		this.completed(result);
	}, err => {
		this.failure(err);
	});
});

ProjectActions.update.listen(function (projectId, projectName) {
	BackendAPI.projectUpdate(projectId, projectName)
	.then(result => {
		this.completed(result);
	}, err => {
		this.failure(err);
	});
});

ProjectActions.delete.listen(function (projectId) {
	BackendAPI.projectDelete(projectId)
	.then(result => {
		this.completed(result);
	}, err => {
		this.failure(err);
	});
});

// TODO: change to state ?
ProjectActions.getNameById = function (projectId) {
	return BackendAPI.userProjects()
	.then(result => {
		// TODO: Why the return does not work on this context?
		let found = false;
		if (result.hasOwnProperty('projects')) {
			result.projects.forEach(v => {
				if (v.project_id === projectId) {
					debug('found project');
					found = v.project_name;
				}
			});
		}
		if (found) {
			return found;
		}
		debug('not found project', projectId, result);
		AppActions.notFound();
	});
};

module.exports = ProjectActions;
