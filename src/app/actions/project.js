'use strict';

// Reflux
const Reflux = require('reflux');

// Vendors
const sprintf = require('sprintf');

// APP
const BackendAPI = require('app/libs/backend-api');

// Actions
const ProjectActions = Reflux.createActions({
	list: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls
ProjectActions.list.listen(function () {
	BackendAPI.userProjects()
	.then(result => {
		if (result.hasOwnProperty('tenants')) {
			this.completed(result.tenants);
		} else if (result.hasOwnProperty('statusText')) {
			this.failure(sprintf('It was not possible to list projects. Error: %s', result.statusText));
		} else {
			this.failure('It was not possible to list projects. Unknown error');
		}
	});
});

// TODO: change to state ?
ProjectActions.getNameById = function (projectId) {
	return BackendAPI.userProjects()
	.then(result => {
		if (result.hasOwnProperty('tenants')) {
			return result.tenants.reduce((previousValue, currentValue) => {
				if (previousValue === false && currentValue.id === projectId) {
					return currentValue.name;
				}
				return previousValue;
			}, false);
		} else if (result.hasOwnProperty('statusText')) {
			throw sprintf('It was not possible to list projects. Error: %s', result.statusText);
		} else {
			throw new Error('It was not possible to list projects. Unknown error)');
		}
	});
};

module.exports = ProjectActions;
