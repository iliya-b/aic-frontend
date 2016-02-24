'use strict';

// Reflux
const Reflux = require('reflux');

// APP
const AppUtils = require('app/components/shared/app-utils');
const {APKTestActions} = require('app/actions');

// Store
const APKTestStore = Reflux.createStore({

	// Base Store //

	listenables: APKTestActions,

	init() {
		this.state = {};
		this.state.projectId = null;
		this.state.apks = false;
		this.state.itemsToDelete = [];
		this.state.status = 'initial';
	},

	// Actions //

	onSetProjectId(projectId) {
		this.state.projectId = projectId;
		this.state.status = 'reloadList';
		this.updateState();
	},

	onToggleDelete(apkId) {
		this.state.apks = this.state.apks.map(item => {
			return (item.id === apkId) ? AppUtils.extend(item, {toDelete: !item.toDelete, checked: !item.toDelete}) : item;
		});
		this.updateItemsToDelete();
		this.updateState();
	},

	onDeleteSelectedCompleted() {
		this.state.status = 'reloadList';
		this.updateState();
	},

	onLoadCompleted(data) {
		this.state.apks = this.convertToListItems(data.map(function (apk) {
			return {id: apk.id, name: apk.name, toDelete: this.isMarkedToDelete(apk.id), checked: this.isMarkedToDelete(apk.id)};
		}, this));
		this.updateItemsToDelete();
		switch (this.state.status) {
			case 'reloadList' :
				this.state.status = 'deleteFinished';
				break;
			default:
				break;
		}
		this.updateState();
	},

	// Methods //

	updateState() {
		this.trigger(this.state);
	},

	convertToListItems(list) {
		return list.map(item => {
			return {
				id: item.id,
				name: item.name,
				apkId: item.id,
				key: item.id,
				text: item.name,
				// checkbox: true,
				toDelete: item.toDelete,
				checked: item.toDelete
			};
		});
	},

	isMarkedToDelete(id) {
		return (this.state.itemsToDelete.indexOf(id) > -1);
	},

	updateItemsToDelete() {
		this.state.itemsToDelete = this.state.apks.reduce((previousValue, item) => {
			return item.toDelete ? previousValue.concat(item.id) : previousValue;
		}, []);
	}

});

module.exports = APKTestStore;
