'use strict';

// Reflux
const Reflux = require('reflux');

// APP
const BackendAPI = require('app/stores/backend-api');

// Actions
const APKActions = Reflux.createActions({
	load: {asyncResult: true},
	toggleDelete: {}
});

// Listeners for asynchronous Backend API calls
APKActions.load.listen(function (projectId) {
	BackendAPI.apkList(projectId)
	.then(res => {
		this.completed(res.results);
	});
});

module.exports = APKActions;
