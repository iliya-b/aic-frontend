'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';

const CameraActions = Reflux.createActions({
	initiate: {},
	list: {asyncResult: true},
	upload: {asyncResult: true},
	uploadProgress: {},
	delete: {asyncResult: true},
	toggleDelete: {}
});

CameraActions.list.listenAndPromise(Gateway.camera.list);
CameraActions.upload.listenAndPromise(Gateway.camera.uploadMany);
CameraActions.delete.listenAndPromise(Gateway.camera.deleteMany);

module.exports = CameraActions;
