'use strict';

import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import TextField from 'material-ui/TextField';
import {capimelize, moveCaretToEnd} from 'app/libs/helpers';
import ProjectIcon from 'app/components/icon/project-icon';
import IconButtonApp from 'app/components/icon/icon-button-app';

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
			marginRight: 0,
			float: 'left'
		};
		const styleSpanProjectName = {
			marginLeft: 10,
			marginRight: 0,
			marginTop: 15,
			float: 'left'
		};
		const styleIcon = {marginTop: 3, float: 'left', marginLeft: 6};

		// Edit on
		if (this.props.isEditOn) {
			return (
				<Card key={this.props.id} style={styleCard}>
					<CardActions style={styleCardActions}>
						<TextField name="fieldEditProjectName" style={styleInputProjectName} defaultValue={this.props.name} ref={this.setRefName} onKeyDown={this.handleKeyDown}/>
						<IconButtonApp raised iconClassName="mdi mdi-check" className="btProjectUpdateSave" title="Save" tooltip="Save" onClick={this.handleClickUpdateSave}/>
						<IconButtonApp raised iconClassName="mdi mdi-close" className="btProjectUpdateClose" title="Cancel" tooltip="Cancel" onClick={this.handleClickUpdateClose}/>
					</CardActions>
				</Card>
			);
		}

		// Edit off
		const projectNameCamel = capimelize(this.props.name);
		return (
			<Card key={this.props.id} style={styleCard}>
				<CardActions style={styleCardActions}>
					<ProjectIcon style={styleIcon} tooltip={this.props.status} status={this.props.status}/>
					<span className={`txtProjectName txtProjectName${this.props.index} txtProjectName${projectNameCamel}`} style={styleSpanProjectName}>{this.props.name}</span>
					<IconButtonApp raised iconClassName="mdi mdi-arrow-right-bold" className="btProjectEnter" title={`Enter ${this.props.name}`} tooltip="Enter" onClick={this.handleClickEnter}/>
					<IconButtonApp raised iconClassName="mdi mdi-pencil" className="btProjectEdit" title={`Edit ${this.props.name}`} tooltip="Edit" onClick={this.handleClickUpdate}/>
					<IconButtonApp raised iconClassName="mdi mdi-delete" className="btProjectDelete" title={`Delete ${this.props.name}`} tooltip="Delete" onClick={this.handleClickDelete}/>
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
