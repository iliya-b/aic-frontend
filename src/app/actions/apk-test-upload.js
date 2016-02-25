'use strict';

// Reflux
const Reflux = require('reflux');

// APP
const BackendAPI = require('app/stores/backend-api');

// Actions
const APKTestUploadActions = Reflux.createActions({
	drop: {asyncResult: true, children: ['progressed']},
	clean: {},
	setProjectId: {}
});

// Listeners for asynchronous Backend API calls
APKTestUploadActions.drop.listen((projectId, files) => {
	const ERROR_DUPLICATED = 409;

	if (projectId !== null && files !== undefined && files.length > 0) {
		files.map(function (file) {
			BackendAPI.apkTestUpload(projectId, file, res => {
				// callback progress
				if (res.lengthComputable) {
					this.progressed(file.preview, parseInt(res.loaded / res.total * 100, 10));
				}
			})
			.then(res => {
				// callback end upload
				if (res.hasOwnProperty('testId')) {
					this.completed(file.preview);
				} else if ((res.hasOwnProperty('code') && res.code === ERROR_DUPLICATED) ||
					(res.hasOwnProperty('status') && res.status === ERROR_DUPLICATED)) {
					this.failed(file.preview, 'Duplicated APK name file.');
				} else {
					this.failed(file.preview, 'Unknown');
				}
			});
		});
	}
});

module.exports = APKTestUploadActions;
