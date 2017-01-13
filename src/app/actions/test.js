/* global URLSearchParams, File */
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
	// download: {asyncResult: true},
	show: {asyncResult: true},
	compile: {asyncResult: true},

	loadFile: {asyncResult: true},
	handleSaveTest: {asyncResult: true},
	handleFilenameChange: {},
	handleContentsChange: {},
	xtextValidate: {asyncResult: true}
});

TestActions.list.listenAndPromise(Gateway.tests.list);
TestActions.upload.listenAndPromise(Gateway.tests.uploadMany);
TestActions.update.listenAndPromise(Gateway.tests.update);
TestActions.delete.listenAndPromise(Gateway.tests.deleteMany);
// TestActions.download.listenAndPromise(Gateway.tests.download);
TestActions.show.listenAndPromise(Gateway.tests.show);
TestActions.compile.listenAndPromise(Gateway.tests.compile);

TestActions.loadFile.listenAndPromise((projectId, testId) => {
	const isCreatingFile = testId === 'create';

	// Creating new file
	if (isCreatingFile) {
		return Promise.resolve({
			isCreatingFile: true
		});
	}

	// Loading existing file
	return Promise.all([
		Gateway.tests.show({projectId, testId}),
		Gateway.tests.download({projectId, testId})
	]);
});

TestActions.xtextValidate.listenAndPromise((filename, contents) => {
	const rawData = new URLSearchParams();
	rawData.append('fullText', contents);
	return Gateway.xtext.update({resourceId: filename, rawData})
	.then(() => {
		return Gateway.xtext.validate({resourceId: filename}).then(data => {
			return {issues: data};
		});
	});
});

const makeAsFile = (filename, contents) => {
	const d = new Date();
	return new File([contents], filename, {type: 'text/plain', lastModified: d});
};

TestActions.handleSaveTest.listenAndPromise((testId, projectId, filename, contents) => {
	// Saving new file
	if (testId === 'create') {
		const file = makeAsFile(filename, contents);
		const filesArray = Array({projectId, file, progress: event => TestActions.uploadProgress(file, event)});
		return Gateway.tests.uploadMany(filesArray, {includeRequest: true});
	}

	// Updating existing file
	const file = makeAsFile(filename, contents);
	return Gateway.tests.update({projectId, file, filename, testId}, {includeRequest: true});
});

module.exports = TestActions;
