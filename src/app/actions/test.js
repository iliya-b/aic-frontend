'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';

const TestActions = Reflux.createActions({
	initiate: {},
	list: {asyncResult: true},
	upload: {asyncResult: true},
	uploadProgress: {},
	delete: {asyncResult: true},
	toggleDelete: {},
	download: {asyncResult: true}
});

TestActions.list.listenAndPromise(Gateway.tests.list);
TestActions.upload.listenAndPromise(Gateway.tests.uploadMany);
TestActions.delete.listenAndPromise(Gateway.tests.deleteMany);
TestActions.download.listenAndPromise(Gateway.tests.download);

module.exports = TestActions;
