'use strict';

// Vendor
import Reflux from 'reflux';
// const debug = require('debug')('AiC:Actions:APK');

// APP
import Gateway from 'app/libs/gateway';

// Actions
const CameraActions = Reflux.createActions({
	initiate: {},
	list: {asyncResult: true},
	upload: {asyncResult: true},
	uploadProgress: {},
	delete: {asyncResult: true},
	toggleDelete: {}
});

// Listeners for asynchronous Backend API calls
CameraActions.list.listen(function (projectId) {
	Gateway.camera.list({projectId})
	.then(res => {
		this.completed(res);
	});
});

CameraActions.upload.listen(function (projectId, files) {
	Promise.all(
		files.map(file => {
			return Gateway.camera.upload({projectId, file, progress: event => CameraActions.uploadProgress(file, event)});
		})
	)
	.then(() => {
		this.completed(files);
	})
	.catch(err => {
		this.failure(err);
	});
});

CameraActions.delete.listen(function (projectId, cameraFileList) {
	Promise.all(
		cameraFileList.map(cameraFileId => {
			return Gateway.camera.delete({projectId, cameraFileId});
		})
	)
	.then(() => {
		this.completed();
	})
	.catch(err => {
		this.failure(err);
	});
});

module.exports = CameraActions;
