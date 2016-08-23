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
		this.rescheduleList();
		this.updateState();
	},

	onListFailed(errorMessage) {
		this.state.project.status = 'error';
		this.state.project.errorMessage = errorMessage;
		this.updateState();
	},

	onCreate() {
		this.state.project.status = 'saving';
		this.updateState();
	},

	onCreateCompleted() {
		this.state.project.status = 'saved';
		ProjectActions.list();
		this.updateState();
	},

	onCreateFailed(errorMessage) {
		this.state.project.status = 'error';
		this.state.project.errorMessage = errorMessage;
		this.updateState();
	},

	onUpdate() {
		this.state.project.status = 'updating';
		this.updateState();
	},

	onUpdateCompleted() {
		this.state.project.status = 'updated';
		ProjectActions.list();
		this.updateState();
	},

	onUpdateFailed(errorMessage) {
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
		ProjectActions.list();
		this.updateState();
	},

	onDeleteFailed(errorMessage) {
		this.state.project.status = 'error';
		this.state.project.errorMessage = errorMessage;
		this.updateState();
	},

	// Methods //

	updateState() {
		this.trigger(this.state);
	},

	rescheduleList() {
		const statusThatNeedReload = ['DELETING', 'CREATING'];
		const shouldListAgain = this.state.project.list.reduce((p, c) => {
			return !p && statusThatNeedReload.indexOf(c.status) !== -1 ? true : p;
		}, false);
		if (shouldListAgain) {
			setTimeout(ProjectActions.list, 1000);
		}
	}
});

module.exports = ProjectStore;
