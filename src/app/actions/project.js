'use strict';

// Vendor
import Reflux from 'reflux';
const debug = require('debug')('AiC:Actions:Project');

// APP
import Gateway from 'app/libs/gateway';
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
	Gateway.projects.list()
	.then(result => {
		this.completed(result);
	}, err => {
		this.failure(err);
	});
});

ProjectActions.create.listen(function (projectName) {
	Gateway.projects.create({name: projectName})
	.then(result => {
		this.completed(result);
	}, err => {
		this.failure(err);
	});
});

ProjectActions.update.listen(function (projectId, projectName) {
	Gateway.projects.update({id: projectId, name: projectName})
	.then(result => {
		this.completed(result);
	}, err => {
		this.failure(err);
	});
});

ProjectActions.delete.listen(function (projectId) {
	Gateway.projects.delete({id: projectId})
	.then(result => {
		this.completed(result);
	}, err => {
		this.failure(err);
	});
});

// TODO: change to state ?
ProjectActions.getNameById = function (projectId) {
	return Gateway.projects.list()
	.then(result => {
		// TODO: Why the return does not work on this context?
		let found = false;
		if (result instanceof Array) {
			result.forEach(v => {
				if (v.id === projectId) {
					debug('found project');
					found = v.name;
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
