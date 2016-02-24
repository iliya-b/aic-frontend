'use strict';

// Reflux
const Reflux = require('reflux');

// APP
const AppUtils = require('../components/shared/app-utils');
const {APKUploadActions} = require('../actions/');

// Store
const APKUploadStore = Reflux.createStore({

	// Base Store //

	listenables: APKUploadActions,

	init() {
		this.state = {};
		this.state.files = [];
		this.state.projectId = false;
	},

	getInitialState() {
		return this.state;
	},

	// Actions //

	onSetProjectId(projectId) {
		this.state.projectId = projectId;
		this.updateState();
	},

	onClean() {
		this.state.files = this.state.files.filter(apkItem => {
			return !apkItem.completed && !apkItem.error;
		});
		this.updateState();
	},

	onDrop(projectId, files) {
		const filesInfo = this.convertToListItems(files);
		this.state.files = this.state.files.concat(filesInfo);
		this.updateState();
	},

	onDropProgressed(apkId, progress) {
		this.listUpdate({id: apkId, progress});
		this.updateState();
	},

	onDropCompleted(apkId) {
		this.listUpdate({id: apkId, iconRightClassName: 'mdi mdi-check', progress: false, completed: true});
		this.updateState(true);
	},

	onDropFailed(apkId, errorMessage) {
		this.listUpdate({id: apkId, iconRightClassName: 'mdi mdi-close', progress: false, error: true, errorText: errorMessage});
		this.updateState(true);
	},

	// Methods //

	updateState(shouldReloadAPKList) {
		this.state.shouldReloadAPKList = shouldReloadAPKList || false;
		this.trigger(this.state);
	},

	convertToListItems(files) {
		if (files !== undefined && files.length > 0) {
			return files.map(file => {
				return {
					id: file.preview,
					key: file.name,
					text: file.name,
					size: file.size,
					iconRightClassName: 'mdi mdi-upload',
					progress: 0,
					completed: false
				};
			});
		}
		return [];
	},

	listUpdate(apk) {
		this.state.files = this.state.files.map(apkItem => {
			if (apkItem.id === apk.id) {
				return AppUtils.extend(apkItem, apk);
			}
			return apkItem;
		});
	}

});

module.exports = APKUploadStore;
