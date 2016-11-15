'use strict';

import React from 'react';
import ProjectStore from 'app/stores/project';
import ProjectActions from 'app/actions/project';
import DialogConfirmDelete from 'app/components/dialog/dialog-confirm-delete';
import CardNewProject from 'app/components/card/card-new-project';
import ListProject from 'app/components/list/list-project';

const ProjectList = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			project: {
				list: []
			},
			adding: false,
			deleting: false,
			deleteId: null,
			updating: false,
			updateId: null
		};
	}

	// Delete Dialog handlers
	handleCloseDialog = () => {
		this.setState({deleting: false});
	}

	handleConfirmDialog = () => {
		ProjectActions.delete({id: this.state.deleteId});
		this.setState({deleting: false});
	}

	getProjectNameById = projectId => {
		return this.state.project.list.reduce((p, c) => {
			return !p && c.id === projectId ? c.name : p;
		}, false);
	}

	// New Project handlers
	handleNewAdd = () => {
		this.setState({adding: true});
	}

	handleNewSave = name => {
		ProjectActions.create({name});
		this.setState({adding: false});
	}

	handleNewCancel = () => {
		this.setState({adding: false});
	}

	// Existing Project handlers
	handleProjectSave = (projectId, name) => {
		ProjectActions.update({id: projectId, name});
		this.setState({updating: false, updateId: null});
	}

	handleProjectClose = () => {
		this.setState({updating: false, updateId: null});
	}

	handleProjectEnter = projectId => {
		this.context.router.push(`/projects/${projectId}`);
	}

	handleProjectEdit = projectId => {
		this.setState({updating: true, updateId: projectId});
	}

	handleProjectDelete = projectId => {
		this.setState({deleting: true, deleteId: projectId});
	}

	// State handler
	handleStateChange = state => {
		this.setState(state);
	}

	render() {
		const projectsLoading = this.state.project.status !== 'listed' && this.state.project.list.length === 0;
		const updateId = this.state.updating ? this.state.updateId : null;
		const items = (
			<ListProject
				isLoading={projectsLoading}
				projects={this.state.project.list}
				updateId={updateId}
				onSave={this.handleProjectSave}
				onClose={this.handleProjectClose}
				onEnter={this.handleProjectEnter}
				onEdit={this.handleProjectEdit}
				onDelete={this.handleProjectDelete}
				/>);

		const newProject = (
			<CardNewProject
				isAdding={this.state.adding}
				onSave={this.handleNewSave}
				onCancel={this.handleNewCancel}
				onAdd={this.handleNewAdd}
				/>);

		const deleteName = this.state.deleting ? <span> project <b> {this.getProjectNameById(this.state.deleteId)}</b></span> : null;

		return (
			<div>
				<div>
					{items}
					{newProject}
					<DialogConfirmDelete deleteItemName={deleteName} open={this.state.deleting} onRequestClose={this.handleCloseDialog} onCancel={this.handleCloseDialog} onConfirm={this.handleConfirmDialog}/>
				</div>
				<div style={{clear: 'both'}}>&nbsp;</div>
			</div>
		);
	}

	componentDidMount() {
		this.unsubscribe = ProjectStore.listen(this.handleStateChange);
		ProjectActions.list();
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

ProjectList.contextTypes = {
	router: React.PropTypes.object
};

module.exports = ProjectList;
