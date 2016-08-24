'use strict';

import Reflux from 'reflux';
import TestActions from 'app/actions/test';

const debug = require('debug')('AiC:Stores:Test');

const TestStore = Reflux.createStore({

	// Base Store //

	listenables: TestActions,

	init() {
		this.state = {};
		this.state.test = {};
		this.state.test.tests = [];
		this.state.test.uploadingTests = [];
		this.state.test.itemsToDelete = [];
		this.state.test.status = 'init';
	},

	// Actions //

	onInitiate() {
		this.state.test.status = 'initCompleted';
		this.updateState();
	},

	onListCompleted(data) {
		this.state.test.tests = data;
		this.state.test.status = 'listCompleted';
		this.updateState();
	},

	onUpload(filesArray) {
		debug('onUpload', arguments, filesArray);
		filesArray.forEach(file => this.updateUploading(file.file.name, 0));
		this.updateState();
	},

	onUploadCompleted(result) {
		debug('onUploadCompleted', result);
		this.state.test.status = 'uploadCompleted';
		result.request.forEach(file => {
			this.removeUploading(file.file.name);
		});
		this.updateState();
	},

	onUploadProgress(file, event) {
		const progress = event.lengthComputable ? Math.round((event.loaded / event.total) * 100) : null;
		this.updateUploading(file.name, progress);
		this.updateState();
	},

	onDeleteCompleted(result) {
		debug('onDeleteCompleted', result);
		this.state.test.status = 'deleteCompleted';
		this.updateState();
	},

	// onToggleDelete(apkId) {
	// 	this.state.apk.apks = this.state.apk.apks.map(item => {
	// 		return (item.id === apkId) ? AppUtils.extend(item, {toDelete: !item.toDelete, checked: !item.toDelete}) : item;
	// 	});
	// 	this.updateItemsToDelete();
	// 	this.updateState();
	// },

	// onDeleteSelectedCompleted() {
	// 	this.state.apk.status = 'reloadList';
	// 	this.updateState();
	// },

	// onLoadCompleted(data) {
	// 	this.state.apk.apks = this.convertToListItems(data.map(apk => {
	// 		return {id: apk[0], name: apk[1], toDelete: this.isMarkedToDelete(apk[0]), checked: this.isMarkedToDelete(apk[0])};
	// 	}, this));
	// 	this.updateItemsToDelete();
	// 	switch (this.state.apk.status) {
	// 		case 'reloadList' :
	// 			this.state.apk.status = 'deleteFinished';
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// 	this.updateState();
	// },

	// Methods //

	updateState() {
		this.trigger(this.state);
	},

	updateUploading(filename, progress) {
		const position = this.state.test.uploadingTests.reduce((p, c, i) => {
			return p !== -1 || c.name !== filename ? p : i;
		}, -1);
		if (position === -1) {
			this.state.test.uploadingTests.push({name: filename, progress});
		} else {
			this.state.test.uploadingTests[position].progress = progress;
		}
	},

	removeUploading(filename) {
		const position = this.state.test.uploadingTests.reduce((p, c, i) => {
			return p !== -1 || c.name !== filename ? p : i;
		}, -1);
		debug('onUploadCompleted position', position);
		if (position !== -1) {
			this.state.test.uploadingTests.splice(position, 1);
		}
	}

	// convertToListItems(list) {
	// 	return list.map(item => {
	// 		return {
	// 			id: item.id,
	// 			name: item.name,
	// 			apkId: item.id,
	// 			key: item.id,
	// 			text: item.name,
	// 			// checkbox: true,
	// 			toDelete: item.toDelete,
	// 			checked: item.toDelete
	// 		};
	// 	});
	// },

	// isMarkedToDelete(id) {
	// 	return (this.state.apk.itemsToDelete.indexOf(id) > -1);
	// },

	// updateItemsToDelete() {
	// 	this.state.apk.itemsToDelete = this.state.apk.apks.reduce((previousValue, item) => {
	// 		return item.toDelete ? previousValue.concat(item.id) : previousValue;
	// 	}, []);
	// }

});

module.exports = TestStore;
