'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';

const TestActions = Reflux.createActions({
	initiate: {},
	list: {asyncResult: true},
	upload: {asyncResult: true},
	update: {asyncResult: true},
	uploadProgress: {},
	delete: {asyncResult: true},
	toggleDelete: {},
	download: {asyncResult: true},
	show: {asyncResult: true}
});

TestActions.list.listenAndPromise(Gateway.tests.list);
TestActions.upload.listenAndPromise(Gateway.tests.uploadMany);
TestActions.update.listenAndPromise(Gateway.tests.update);
TestActions.delete.listenAndPromise(Gateway.tests.deleteMany);
TestActions.download.listenAndPromise(Gateway.tests.download);
TestActions.show.listenAndPromise(Gateway.tests.show);

module.exports = TestActions;
