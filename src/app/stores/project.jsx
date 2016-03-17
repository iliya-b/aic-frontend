'use strict';

// Vendor
import Reflux from 'reflux';

// APP
import ProjectActions from 'app/actions/project';

// Store
const ProjectStore = Reflux.createStore({

	// Base Store //

	listenables: ProjectActions,

	init() {
		this.state = {project: {}};
		this.state.project.list = [];
		this.state.project.status = 'init';
		this.state.project.errorMessage = null;
	},

	// Actions //

	onList() {
		this.state.project.status = 'listing';
		this.updateState();
	},

	onListCompleted(projects) {
		this.state.project.list = projects;
		this.state.project.status = 'listed';
		this.updateState();
	},

	onListFailure(errorMessage) {
		this.state.project.status = 'error';
		this.state.project.errorMessage = errorMessage;
		this.updateState();
	},

	onSave() {
		this.state.project.status = 'saving';
		this.updateState();
	},

	onSaveCompleted() {
		this.state.project.status = 'saved';
		this.updateState();
	},

	onSaveFailure(errorMessage) {
		this.state.project.status = 'error';
		this.state.project.errorMessage = errorMessage;
		this.updateState();
	},

	onDelete() {
		this.state.project.status = 'deleting';
		this.updateState();
	},

	onDeleteCompleted() {
		this.state.project.status = 'deleted';
		this.updateState();
	},

	onDeleteFailure(errorMessage) {
		this.state.project.status = 'error';
		this.state.project.errorMessage = errorMessage;
		this.updateState();
	},

	// Methods //

	updateState() {
		this.trigger(this.state);
	}
});

module.exports = ProjectStore;
