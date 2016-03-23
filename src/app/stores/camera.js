'use strict';

// Vendor
import Reflux from 'reflux';
const debug = require('debug')('AiC:Stores:Camera');

// APP
import CameraActions from 'app/actions/camera';

// Store
const CameraStore = Reflux.createStore({

	// Base Store //

	listenables: CameraActions,

	init() {
		this.state = {};
		this.state.camera = {};
		this.state.camera.files = [];
		this.state.camera.uploadingFiles = [];
		this.state.camera.itemsToDelete = [];
		this.state.camera.status = 'init';
	},

	// Actions //

	onInitiate() {
		this.state.camera.status = 'initCompleted';
		this.updateState();
	},

	onListCompleted(data) {
		this.state.camera.files = data;
		this.state.camera.status = 'listCompleted';
		this.updateState();
	},

	onUpload(projectId, files) {
		debug('onUpload', arguments, projectId, files);
		files.map(file => this.updateUploading(file.name, 0));
		this.updateState();
	},

	onUploadCompleted(files) {
		debug('onUploadCompleted', files);
		this.state.camera.status = 'uploadCompleted';
		files.forEach(file => {
			this.removeUploading(file.name);
		});
		this.updateState();
	},

	onUploadProgress(file, event) {
		const progress = event.lengthComputable ? Math.round((event.loaded / event.total) * 100) : null;
		this.updateUploading(file.name, progress);
		this.updateState();
	},

	onDeleteCompleted(data) {
		debug('onDeleteCompleted', data);
		this.state.camera.status = 'deleteCompleted';
		this.updateState();
	},

	// Methods //

	updateState() {
		this.trigger(this.state);
	},

	updateUploading(filename, progress) {
		const position = this.state.camera.uploadingFiles.reduce((p, c, i) => {
			return p !== -1 || c.name !== filename ? p : i;
		}, -1);
		if (position === -1) {
			this.state.camera.uploadingFiles.push({name: filename, progress});
		} else {
			this.state.camera.uploadingFiles[position].progress = progress;
		}
	},

	removeUploading(filename) {
		const position = this.state.camera.uploadingFiles.reduce((p, c, i) => {
			return p !== -1 || c.name !== filename ? p : i;
		}, -1);
		debug('onUploadCompleted position', position);
		if (position !== -1) {
			this.state.camera.uploadingFiles.splice(position, 1);
		}
	}

});

module.exports = CameraStore;
