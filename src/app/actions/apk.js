'use strict';

// Vendor
import Reflux from 'reflux';
// const debug = require('debug')('AiC:Actions:APK');

// APP
import Gateway from 'app/libs/gateway';

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
APKActions.list.listenAndPromise(Gateway.apks.list);

APKActions.upload.listenAndPromise(Gateway.apks.uploadMany);

APKActions.delete.listenAndPromise(Gateway.apks.deleteMany);

// APKActions.list.listen(function (projectId) {
// 	Gateway.apks.list({projectId})
// 	.then(res => {
// 		this.completed(res);
// 	});
// });

// APKActions.upload.listen(function (projectId, files) {
// 	Promise.all(
// 		files.map(file => {
// 			return Gateway.apks.upload({projectId, file, progress: event => APKActions.uploadProgress(file, event)});
// 		})
// 	)
// 	.then(() => {
// 		this.completed(files);
// 	})
// 	.catch(err => {
// 		this.failure(err);
// 	});
// });

// APKActions.delete.listen(function (projectId, apkIdList) {
// 	Promise.all(
// 		apkIdList.map(apkId => {
// 			return Gateway.apks.delete({projectId, apkId});
// 		})
// 	)
// 	.then(() => {
// 		this.completed();
// 	})
// 	.catch(err => {
// 		this.failure(err);
// 	});
// });

module.exports = APKActions;
