'use strict';

// Vendor
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
			deleteName: null
		};
		this.handleClickEnter = (index, e) => {
			e.preventDefault();
			this.context.router.push(`/projects/${this.state.project.list[index].project_id}`);
		};

		this.handleClickDelete = (index, e) => {
			e.preventDefault();
			this.setState({deleting: true, deleteIndex: index});
		};

		this.handleCloseDialog = () => {
			this.setState({deleting: false});
		};

		this.handleConfirmDialog = () => {
			ProjectActions.delete(this.state.project.list[this.state.deleteIndex].project_id);
			this.setState({deleting: false});
		};

		this._onStateChange = this._onStateChange.bind(this);
		this.handleClickNewProject = () => {
			this.setState({adding: true});
		};

		this.handleClickSaveProject = () => {
			ProjectActions.save(this.projectName.getValue());
			this.setState({adding: false});
		};

		this.setRefProjectName = c => {
			debug('setRefProjectName');
			this.projectName = c;
			if (c) {
				c.focus();
			}
		};
	}

	render() {
		const styles = {
			newProject: {
				margin: 10
			},
			projectName: {
				float: 'left',
				padding: 22
			},
			inputProjectName: {
				marginLeft: 10
			},
			card: {
				margin: 10,
				clear: 'both'
			}
		};
		const items = this.state.project.list.map((item, index) => {
			const handleClickEnterItem = this.handleClickEnter.bind(this, index);
			const handleClickDeleteItem = this.handleClickDelete.bind(this, index);
			return (
				<Card key={item.project_id} style={styles.card}>
					<CardHeader
						title={item.project_name}
						style={styles.projectName}
						/>
					<CardActions>
						<IconButton className="btProjectEnter" title={`Enter ${item.project_name}`} tooltip="Enter" style={styles.button} onClick={handleClickEnterItem}>
							<FontIcon className="mdi mdi-arrow-right-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
						</IconButton>
						<IconButton className="btProjectDelete" title={`Delete ${item.project_name}`} tooltip="Delete" style={styles.button} onClick={handleClickDeleteItem}>
							<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
						</IconButton>
					</CardActions>
				</Card>
			);
		});

		let newProject;

		if (this.state.adding) {
			newProject = (
				<Card key="newProjectForm" style={styles.card}>
					<CardActions>
						<TextField className="inputLiveSensorOrientationRoll" style={styles.inputProjectName} ref={this.setRefProjectName} hintText="Project name"/>
						<RaisedButton
							label="Save"
							title="Save"
							primary
							style={styles.newProject}
							onClick={this.handleClickSaveProject}
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
							linkButton
							primary
							style={styles.newProject}
							icon={<FontIcon className="mdi mdi-plus"/>}
							onClick={this.handleClickNewProject}
							/>
					</CardActions>
				</Card>);
		}

		const deleteName = this.state.deleteIndex >= 0 ? <span> project <b> {this.state.project.list[this.state.deleteIndex].project_name}</b></span> : null;

		return (
			<div style={{position: 'initial'}}>
				<ReactCSSTransitionGroup transitionName="showHideTransition" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
					{items}
				</ReactCSSTransitionGroup>
				{newProject}
				<DialogConfirmDelete deleteItemName={deleteName} open={this.state.deleting} onRequestClose={this.handleCloseDialog} onCancel={this.handleCloseDialog} onConfirm={this.handleConfirmDialog}/>
			</div>
		);
	}

	_onStateChange(state) {
		switch (state.project.status) {
			case 'saved':
			case 'deleted':
				ProjectActions.list();
				break;
			default:
				break;
		}
		this.setState(state);
	}

	componentDidMount() {
		this.unsubscribe = ProjectStore.listen(this._onStateChange);
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
