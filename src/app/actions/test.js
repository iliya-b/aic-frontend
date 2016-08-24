'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';

const TestActions = Reflux.createActions({
	initiate: {},
	list: {asyncResult: true},
	upload: {asyncResult: true},
	uploadProgress: {},
	delete: {asyncResult: true},
	toggleDelete: {}
});

TestActions.list.listenAndPromise(Gateway.tests.list);
TestActions.upload.listenAndPromise(Gateway.tests.uploadMany);
TestActions.delete.listenAndPromise(Gateway.tests.deleteMany);

module.exports = TestActions;
