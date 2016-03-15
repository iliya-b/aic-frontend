'use strict';

// Vendor
import Reflux from 'reflux';
// const debug = require('debug')('AiC:Actions:APK');

// APP
import BackendAPI from 'app/libs/backend-api';

// Actions
const APKActions = Reflux.createActions({
	initiate: {},
	list: {asyncResult: true},
	upload: {asyncResult: true},
	uploadProgress: {},
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

APKActions.upload.listen(function (projectId, files) {
	// const ERROR_DUPLICATED = 409;

	Promise.all(
		files.map(file => {
			return BackendAPI.apkUpload(projectId, file, event => APKActions.uploadProgress(file, event));
		})
	)
	.then(result => {
		this.completed(result);
	})
	.catch(err => {
		this.failure(err);
	});

	// if (projectId !== null && files !== undefined && files.length > 0) {
	// 	files.map(function (file) {
	// 		BackendAPI.apkUpload(projectId, file, res => {
	// 			// callback progress
	// 			if (res.lengthComputable) {
	// 				// APKUploadActions.drop.progressed(file.preview, parseInt(res.loaded / res.total * 100, 10));
	// 				debug('progress', file.preview, parseInt(res.loaded / res.total * 100, 10));
	// 			}
	// 		})
	// 		.then(res => {
	// 			if (res.hasOwnProperty('app_id')) {
	// 				this.completed();
	// 			} else {
	// 				this.failure('unknow error upload');
	// 			}
	// 			// callback end upload
	// 			// if (res.hasOwnProperty('appId')) {
	// 			// 	this.completed(file.preview);
	// 			// } else if ((res.hasOwnProperty('code') && res.code === ERROR_DUPLICATED) ||
	// 			// 	(res.hasOwnProperty('status') && res.status === ERROR_DUPLICATED)) {
	// 			// 	this.failed(file.preview, 'Duplicated APK name file.');
	// 			// } else {
	// 			// 	this.failed(file.preview, 'Unknown');
	// 			// }
	// 		});
	// 	});
	// }
});

APKActions.delete.listen(function (projectId, apkIdList) {
	Promise.all(
		apkIdList.map(apkId => {
			return BackendAPI.apkDelete(projectId, apkId);
		})
	)
	.then(() => {
		this.completed();
	})
	.catch(err => {
		this.failure(err);
	});
});

module.exports = APKActions;
