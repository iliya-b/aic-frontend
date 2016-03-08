'use strict';

// Vendor
import Reflux from 'reflux';

// APP
import BackendAPI from 'app/stores/backend-api';

// Actions
const APKActions = Reflux.createActions({
	list: {asyncResult: true},
	upload: {asyncResult: true},
	delete: {asyncResult: true},
	toggleDelete: {}
});

// Listeners for asynchronous Backend API calls
APKActions.list.listen(function (projectId) {
	BackendAPI.apkList(projectId)
	.then(res => {
		this.completed(res);
	});
});

APKActions.upload.listen(function (projectId, file) {
	BackendAPI.apkUpload(projectId, file)
	.then(res => {
		this.completed(res);
	});
});

APKActions.delete.listen(function (projectId) {
	BackendAPI.apkDelete(projectId)
	.then(res => {
		this.completed(res);
	});
});

module.exports = APKActions;
