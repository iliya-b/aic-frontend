'use strict';

// Reflux
const Reflux = require('reflux');

// APP
const BackendAPI = require('app/stores/backend-api');

// Actions
const APKTestActions = Reflux.createActions({
	load: {asyncResult: true},
	toggleDelete: {},
	setProjectId: {}
});

// Listeners for asynchronous Backend API calls
APKTestActions.load.listen(function (projectId) {
	BackendAPI.apkTestList(projectId)
	.then(res => {
		this.completed(res.results);
	});
});

module.exports = APKTestActions;
