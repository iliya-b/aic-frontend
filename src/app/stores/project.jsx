'use strict';

// Reflux
const Reflux = require('reflux');

// APP
const {ProjectActions} = require('app/actions');

// Store
const ProjectStore = Reflux.createStore({

	// Base Store //

	listenables: ProjectActions,

	init() {
		this.state = {};
		this.state.projects = [];
	},

	// Actions //

	onList() {
		// TODO:
		// this.updateState();
	},

	onListCompleted(projects) {
		this.state.projects = projects;
		this.updateState();
	},

	// onListFailure(errorMessage) {
	onListFailure() {
		// TODO:
		// this.updateState();
	},

	// Methods //

	updateState() {
		this.trigger(this.state);
	}
});

module.exports = ProjectStore;
