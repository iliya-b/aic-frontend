'use strict';

// Vendor
import Reflux from 'reflux';

// APP
// import AppUtils from 'app/components/shared/app-utils';
import APKActions from 'app/actions/apk';

// Store
const APKStore = Reflux.createStore({

	// Base Store //

	listenables: APKActions,

	init() {
		this.state = {};
		this.state.apks = [];
		this.state.itemsToDelete = [];
	},

	// Actions //

	onListCompleted(data) {
		this.state.apks = data;
		this.updateState();
	},

	// onToggleDelete(apkId) {
	// 	this.state.apks = this.state.apks.map(item => {
	// 		return (item.id === apkId) ? AppUtils.extend(item, {toDelete: !item.toDelete, checked: !item.toDelete}) : item;
	// 	});
	// 	this.updateItemsToDelete();
	// 	this.updateState();
	// },

	// onDeleteSelectedCompleted() {
	// 	this.state.status = 'reloadList';
	// 	this.updateState();
	// },

	// onLoadCompleted(data) {
	// 	this.state.apks = this.convertToListItems(data.map(apk => {
	// 		return {id: apk[0], name: apk[1], toDelete: this.isMarkedToDelete(apk[0]), checked: this.isMarkedToDelete(apk[0])};
	// 	}, this));
	// 	this.updateItemsToDelete();
	// 	switch (this.state.status) {
	// 		case 'reloadList' :
	// 			this.state.status = 'deleteFinished';
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// 	this.updateState();
	// },

	// Methods //

	updateState() {
		this.trigger(this.state);
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
	// 	return (this.state.itemsToDelete.indexOf(id) > -1);
	// },

	// updateItemsToDelete() {
	// 	this.state.itemsToDelete = this.state.apks.reduce((previousValue, item) => {
	// 		return item.toDelete ? previousValue.concat(item.id) : previousValue;
	// 	}, []);
	// }

});

module.exports = APKStore;
