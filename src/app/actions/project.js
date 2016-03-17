'use strict';

// Vendor
import Reflux from 'reflux';

// APP
import BackendAPI from 'app/libs/backend-api';

// Actions
const ProjectActions = Reflux.createActions({
	list: {children: ['completed', 'failure']},
	save: {children: ['completed', 'failure']},
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

ProjectActions.save.listen(function (projectName) {
	BackendAPI.projectNew(projectName)
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
		if (result.hasOwnProperty('projects')) {
			return result.projects.reduce((previousValue, currentValue) => {
				if (previousValue === false && currentValue.project_id === projectId) {
					return currentValue.project_name;
				}
				return previousValue;
			}, false);
		}
	});
};

module.exports = ProjectActions;
