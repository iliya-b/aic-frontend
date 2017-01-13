'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';

const APKActions = Reflux.createActions({
	initiate: {},
	list: {asyncResult: true},
	upload: {asyncResult: true},
	uploadProgress: {},
	delete: {asyncResult: true},
	toggleDelete: {}
});

APKActions.list.listenAndPromise(Gateway.apks.list);
APKActions.upload.listenAndPromise(Gateway.apks.uploadMany);
APKActions.delete.listenAndPromise(Gateway.apks.deleteMany);

module.exports = APKActions;
