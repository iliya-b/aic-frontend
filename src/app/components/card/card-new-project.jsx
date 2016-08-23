'use strict';

import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const CardNewProject = class extends React.Component {
	handleClickSaveProject = () => {
		this.props.onSave(this.refName.getValue());
	}
	handleKeyDown = e => {
		if (e.keyCode === 13) {
			this.handleClickSaveProject();
		}
	}
	handleClickCancelProject = () => {
		this.props.onCancel();
	}
	handleClickNewProject = () => {
		this.props.onAdd();
	}
	setRefName = c => {
		this.refName = c;
		if (c) {
			c.focus();
		}
	}

	render() {
		const styleCard = {
			margin: 10,
			clear: 'both'
		};
		const styleInputProjectName = {
			marginLeft: 10,
			height: 42
		};
		const styleNewProject = {margin: 10};
		if (this.props.isAdding) {
			return (
				<Card key="newProjectForm" style={styleCard}>
					<CardActions>
						<TextField name="fieldNewProjectName" style={styleInputProjectName} ref={this.setRefName} hintText="Project name" onKeyDown={this.handleKeyDown}/>
						<RaisedButton
							label="Save"
							title="Save"
							secondary
							style={styleNewProject}
							onClick={this.handleClickSaveProject}
							/>
						<RaisedButton
							label="Cancel"
							title="Cancel"
							secondary
							style={styleNewProject}
							onClick={this.handleClickCancelProject}
							/>
					</CardActions>
				</Card>);
		}
		return (
			<Card key="newProjectButton" style={styleCard}>
				<CardActions>
					<RaisedButton
						label="New project"
						title="New project"
						secondary
						style={styleNewProject}
						icon={<FontIcon className="mdi mdi-plus"/>}
						onClick={this.handleClickNewProject}
						/>
				</CardActions>
			</Card>);
	}
};

CardNewProject.propTypes = {
	isAdding: React.PropTypes.bool,
	onSave: React.PropTypes.func,
	onCancel: React.PropTypes.func,
	onAdd: React.PropTypes.func
};

module.exports = CardNewProject;
