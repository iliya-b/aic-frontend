'use strict';

import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {capimelize, moveCaretToEnd} from 'app/libs/helpers';
import ProjectIcon from 'app/components/icon/project-icon';

const CardProject = class extends React.Component {
	handleClickUpdateSave = () => {
		this.props.onSave(this.props.id, this.refName.getValue());
	}
	handleClickUpdateClose = () => {
		this.props.onClose(this.props.id);
	}
	handleClickEnter = () => {
		this.props.onEnter(this.props.id);
	}
	handleClickUpdate = () => {
		this.props.onEdit(this.props.id);
	}
	handleClickDelete = () => {
		this.props.onDelete(this.props.id);
	}
	setRefName = c => {
		this.refName = c;
		if (c) {
			c.focus();
			moveCaretToEnd(c.input);
		}
	}
	handleKeyDown = e => {
		if (e.keyCode === 13) {
			this.handleClickUpdateSave();
		}
	}

	render() {
		const styleCard = {
			margin: 10,
			clear: 'both'
		};
		const styleCardActions = {display: 'inline-block'};
		const styleInputProjectName = {
			marginLeft: 10,
			height: 42
		};

		// Edit on
		if (this.props.isEditOn) {
			return (
				<Card key={this.props.id} style={styleCard}>
					<CardActions style={styleCardActions}>
						<TextField name="fieldEditProjectName" style={styleInputProjectName} defaultValue={this.props.name} ref={this.setRefName} onKeyDown={this.handleKeyDown}/>
						<IconButton className="btProjectUpdateSave" title="Save" tooltip="Save" onClick={this.handleClickUpdateSave}>
							<FontIcon className="mdi mdi-check" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
						</IconButton>
						<IconButton className="btProjectUpdateClose" title="Cancel" tooltip="Cancel" onClick={this.handleClickUpdateClose}>
							<FontIcon className="mdi mdi-close" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
						</IconButton>
					</CardActions>
				</Card>
			);
		}

		// Edit off
		const projectNameCamel = capimelize(this.props.name);
		return (
			<Card key={this.props.id} style={styleCard}>
				<CardActions style={styleCardActions}>
					<span className={`txtProjectName txtProjectName${this.props.index} txtProjectName${projectNameCamel}`} style={styleInputProjectName}>{this.props.name}</span>
					<ProjectIcon style={{marginTop: 3, float: 'left'}} tooltip={this.props.status} status={this.props.status}/>
					<IconButton className="btProjectEnter" title={`Enter ${this.props.name}`} tooltip="Enter" onClick={this.handleClickEnter}>
						<FontIcon className="mdi mdi-arrow-right-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btProjectEdit" title={`Edit ${this.props.name}`} tooltip="Edit" onClick={this.handleClickUpdate}>
						<FontIcon className="mdi mdi-pencil" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btProjectDelete" title={`Delete ${this.props.name}`} tooltip="Delete" onClick={this.handleClickDelete}>
						<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
				</CardActions>
			</Card>
		);
	}
};

CardProject.propTypes = {
	isEditOn: React.PropTypes.bool,
	id: React.PropTypes.string,
	index: React.PropTypes.number,
	name: React.PropTypes.string,
	status: React.PropTypes.string,
	onSave: React.PropTypes.func,
	onClose: React.PropTypes.func,
	onEnter: React.PropTypes.func,
	onEdit: React.PropTypes.func,
	onDelete: React.PropTypes.func
};

module.exports = CardProject;
