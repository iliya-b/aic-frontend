'use strict';

// Vendor
import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import str from 'string';
const debug = require('debug')('AiC:Views:Project:List');

// APP
import ProjectStore from 'app/stores/project';
import ProjectActions from 'app/actions/project';
import DialogConfirmDelete from 'app/components/dialog/dialog-confirm-delete';

const ProjectList = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			project: {
				list: []
			},
			adding: false,
			deleting: false,
			deleteIndex: null,
			updating: false,
			updateId: null
		};
		this.handleClickEnter = (index, e) => {
			e.preventDefault();
			this.context.router.push(`/projects/${this.state.project.list[index].id}`);
		};

		this.handleClickDelete = (index, e) => {
			e.preventDefault();
			this.setState({deleting: true, deleteIndex: index});
		};

		this.handleClickUpdate = (index, e) => {
			e.preventDefault();
			this.setState({updating: true, updateId: this.state.project.list[index].id});
		};

		this.handleCloseDialog = () => {
			this.setState({deleting: false});
		};

		this.handleConfirmDialog = () => {
			ProjectActions.delete(this.state.project.list[this.state.deleteIndex].id);
			this.setState({deleting: false});
		};

		this.handleClickNewProject = () => {
			this.setState({adding: true});
		};

		this.handleClickSaveProject = () => {
			ProjectActions.create(this.projectName.getValue());
			this.setState({adding: false});
		};

		this.handleClickCancelProject = () => {
			this.setState({adding: false});
		};

		this.handleProjectUpdate = () => {

		};

		this.handleKeyDown = e => {
			if (e.keyCode === 13) {
				this.handleClickSaveProject(e);
			}
		};

		this.handleClickUpdateSave = (index, e) => {
			e.preventDefault();
			ProjectActions.update(this.state.updateId, this.projectNameUpdate.getValue());
			this.setState({updating: false, updateId: null});
		};

		this.handleClickUpdateClose = (index, e) => {
			e.preventDefault();
			this.setState({updating: false, updateId: null});
		};

		this.handleKeyDownUpdate = (index, e) => {
			if (e.keyCode === 13) {
				this.handleClickUpdateSave(index, e);
			}
		};

		this.setRefProjectName = c => {
			debug('setRefProjectName');
			this.projectName = c;
			if (c) {
				c.focus();
			}
		};

		this.setRefProjectNameUpdate = c => {
			debug('setRefProjectNameUpdate');
			this.projectNameUpdate = c;
			if (c) {
				debug('c', c);
				c.focus();
				this.moveCaretToEnd(c.input);
			}
		};

		this.handleStateChange = state => {
			this.setState(state);
		};
	}

	// TODO: move to a lib
	moveCaretToEnd(el) {
		if (typeof el.selectionStart === 'number') {
			debug('selectionStart');
			el.selectionStart = el.selectionEnd = el.value.length;
		} else if (typeof el.createTextRange !== 'undefined') {
			debug('createTextRange');
			el.focus();
			const range = el.createTextRange();
			range.collapse(false);
			range.select();
		}
	}

	render() {
		const styles = {
			newProject: {
				margin: 10
			},
			projectName: {
				display: 'inline-block'
			},
			styleStatic: {
				paddingLeft: 22
			},
			inputProjectName: {
				marginLeft: 10,
				height: 42
			},
			card: {
				margin: 10,
				clear: 'both'
			},
			cardActions: {
				display: 'inline-block'
			}
		};

		let items;

		if (this.state.project.status !== 'listed' && this.state.project.list.length === 0) {
			items = (
				<Card style={styles.card}>
					<CardActions style={styles.cardActions}>
						<span style={styles.inputProjectName}>Loading projects...</span>
					</CardActions>
				</Card>
			);
		} else {
			items = this.state.project.list.map((item, index) => {
				if (this.state.updating && this.state.updateId === item.id) {
					const handleClickUpdateSaveItem = this.handleClickUpdateSave.bind(this, index);
					const handleClickUpdateCloseItem = this.handleClickUpdateClose.bind(this, index);
					const handleKeyDownUpdateItem = this.handleKeyDownUpdate.bind(this, index);
					return (
						<Card key={item.id} style={styles.card}>
							<CardActions style={styles.cardActions}>
								<TextField name="fieldEditProjectName" style={styles.inputProjectName} defaultValue={item.name} ref={this.setRefProjectNameUpdate} onKeyDown={handleKeyDownUpdateItem}/>
								<IconButton className="btProjectUpdateSave" title="Save" tooltip="Save" style={styles.button} onClick={handleClickUpdateSaveItem}>
									<FontIcon className="mdi mdi-check" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
								</IconButton>
								<IconButton className="btProjectUpdateClose" title="Cancel" tooltip="Cancel" style={styles.button} onClick={handleClickUpdateCloseItem}>
									<FontIcon className="mdi mdi-close" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
								</IconButton>
							</CardActions>
						</Card>
					);
				}
				const handleClickEnterItem = this.handleClickEnter.bind(this, index);
				const handleClickDeleteItem = this.handleClickDelete.bind(this, index);
				const handleClickUpdateItem = this.handleClickUpdate.bind(this, index);
				const projectNameCamel = str(item.name).capitalize().camelize().s;

				return (
					<Card key={item.id} style={styles.card}>
						<CardActions style={styles.cardActions}>
							<span className={`txtProjectName txtProjectName${index} txtProjectName${projectNameCamel}`} style={styles.inputProjectName}>{item.name}</span>
							<IconButton className="btProjectEnter" title={`Enter ${item.name}`} tooltip="Enter" style={styles.button} onClick={handleClickEnterItem}>
								<FontIcon className="mdi mdi-arrow-right-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
							</IconButton>
							<IconButton className="btProjectEdit" title={`Edit ${item.name}`} tooltip="Edit" style={styles.button} onClick={handleClickUpdateItem}>
								<FontIcon className="mdi mdi-pencil" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
							</IconButton>
							<IconButton className="btProjectDelete" title={`Delete ${item.name}`} tooltip="Delete" style={styles.button} onClick={handleClickDeleteItem}>
								<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
							</IconButton>
						</CardActions>
					</Card>
				);
			});

			items = (
				<ReactCSSTransitionGroup transitionName="showHideTransition" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
					{items}
				</ReactCSSTransitionGroup>
			);
		}

		let newProject;

		if (this.state.adding) {
			newProject = (
				<Card key="newProjectForm" style={styles.card}>
					<CardActions>
						<TextField name="fieldNewProjectName" style={styles.inputProjectName} ref={this.setRefProjectName} hintText="Project name" onKeyDown={this.handleKeyDown}/>
						<RaisedButton
							label="Save"
							title="Save"
							primary
							style={styles.newProject}
							onClick={this.handleClickSaveProject}
							/>
						<RaisedButton
							label="Cancel"
							title="Cancel"
							primary
							style={styles.newProject}
							onClick={this.handleClickCancelProject}
							/>
					</CardActions>
				</Card>);
		} else {
			newProject = (
				<Card key="newProjectButton" style={styles.card}>
					<CardActions>
						<RaisedButton
							label="New project"
							title="New project"
							primary
							style={styles.newProject}
							icon={<FontIcon className="mdi mdi-plus"/>}
							onClick={this.handleClickNewProject}
							/>
					</CardActions>
				</Card>);
		}

		const deleteName = this.state.deleting ? <span> project <b> {this.state.project.list[this.state.deleteIndex].name}</b></span> : null;

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
