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
		// this.handleClickEnter = (index, e) => {
		// 	e.preventDefault();
		// 	this.context.router.push(`/projects/${this.state.project.list[index].id}`);
		// };

		// this.handleClickDelete = (index, e) => {
		// 	e.preventDefault();
		// 	this.setState({deleting: true, deleteIndex: index});
		// };

		// this.handleClickUpdate = (index, e) => {
		// 	e.preventDefault();
		// 	this.setState({updating: true, updateId: this.state.project.list[index].id});
		// };
		// this.handleClickUpdateSave = e => {
		// 	e.preventDefault();
		// 	ProjectActions.update({id: this.state.updateId, name: this.projectNameUpdate.getValue()});
		// 	this.setState({updating: false, updateId: null});
		// };

		// this.handleClickUpdateClose = e => {
		// 	e.preventDefault();
		// 	this.setState({updating: false, updateId: null});
		// };
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
		// let items;

		// if (this.state.project.status !== 'listed' && this.state.project.list.length === 0) {
		// 	items = (
		// 		<Card style={styles.card}>
		// 			<CardActions style={styles.cardActions}>
		// 				<span style={styles.inputProjectName}>Loading projects...</span>
		// 			</CardActions>
		// 		</Card>
		// 	);
		// } else {
		// 	items = this.state.project.list.map((item, index) => {
		// 		if (this.state.updating && this.state.updateId === item.id) {
		// 			const handleKeyDownUpdateItem = this.handleKeyDownUpdate.bind(this, index);
		// 			return (
		// 				<Card key={item.id} style={styles.card}>
		// 					<CardActions style={styles.cardActions}>
		// 						<TextField name="fieldEditProjectName" style={styles.inputProjectName} defaultValue={item.name} ref={this.setRefProjectNameUpdate} onKeyDown={handleKeyDownUpdateItem}/>
		// 						<IconButton className="btProjectUpdateSave" title="Save" tooltip="Save" style={styles.button} onClick={this.handleClickUpdateSave}>
		// 							<FontIcon className="mdi mdi-check" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
		// 						</IconButton>
		// 						<IconButton className="btProjectUpdateClose" title="Cancel" tooltip="Cancel" style={styles.button} onClick={this.handleClickUpdateClose}>
		// 							<FontIcon className="mdi mdi-close" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
		// 						</IconButton>
		// 					</CardActions>
		// 				</Card>
		// 			);
		// 		}
		// 		const handleClickEnterItem = this.handleClickEnter.bind(this, index);
		// 		const handleClickDeleteItem = this.handleClickDelete.bind(this, index);
		// 		const handleClickUpdateItem = this.handleClickUpdate.bind(this, index);
		// 		const projectNameCamel = capimelize(item.name);

		// 		return (
		// 			<Card key={item.id} style={styles.card}>
		// 				<CardActions style={styles.cardActions}>
		// 					<span className={`txtProjectName txtProjectName${index} txtProjectName${projectNameCamel}`} style={styles.inputProjectName}>{item.name}</span>
		// 					<IconButton className="btProjectEnter" title={`Enter ${item.name}`} tooltip="Enter" style={styles.button} onClick={handleClickEnterItem}>
		// 						<FontIcon className="mdi mdi-arrow-right-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
		// 					</IconButton>
		// 					<IconButton className="btProjectEdit" title={`Edit ${item.name}`} tooltip="Edit" style={styles.button} onClick={handleClickUpdateItem}>
		// 						<FontIcon className="mdi mdi-pencil" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
		// 					</IconButton>
		// 					<IconButton className="btProjectDelete" title={`Delete ${item.name}`} tooltip="Delete" style={styles.button} onClick={handleClickDeleteItem}>
		// 						<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
		// 					</IconButton>
		// 				</CardActions>
		// 			</Card>
		// 		);
		// 	});

		// 	items = (
		// 		<ReactCSSTransitionGroup transitionName="showHideTransition" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
		// 			{items}
		// 		</ReactCSSTransitionGroup>
		// 	);
		// }

		// let newProject;

		// if (this.state.adding) {
		// 	newProject = (
		// 		<Card key="newProjectForm" style={styles.card}>
		// 			<CardActions>
		// 				<TextField name="fieldNewProjectName" style={styles.inputProjectName} ref={this.setRefProjectName} hintText="Project name" onKeyDown={this.handleKeyDown}/>
		// 				<RaisedButton
		// 					label="Save"
		// 					title="Save"
		// 					secondary
		// 					style={styles.newProject}
		// 					onClick={this.handleClickSaveProject}
		// 					/>
		// 				<RaisedButton
		// 					label="Cancel"
		// 					title="Cancel"
		// 					secondary
		// 					style={styles.newProject}
		// 					onClick={this.handleClickCancelProject}
		// 					/>
		// 			</CardActions>
		// 		</Card>);
		// } else {
		// 	newProject = (
		// 		<Card key="newProjectButton" style={styles.card}>
		// 			<CardActions>
		// 				<RaisedButton
		// 					label="New project"
		// 					title="New project"
		// 					secondary
		// 					style={styles.newProject}
		// 					icon={<FontIcon className="mdi mdi-plus"/>}
		// 					onClick={this.handleClickNewProject}
		// 					/>
		// 			</CardActions>
		// 		</Card>);
		// }

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
			<div style={{position: 'initial'}}>
				{items}
				{newProject}
				<DialogConfirmDelete deleteItemName={deleteName} open={this.state.deleting} onRequestClose={this.handleCloseDialog} onCancel={this.handleCloseDialog} onConfirm={this.handleConfirmDialog}/>
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
