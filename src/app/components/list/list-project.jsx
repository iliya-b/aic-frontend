'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardProject from 'app/components/card/card-project';

const ListProject = props => {
	let items;
	const styleCard = {
		margin: 10,
		clear: 'both'
	};
	const styleInputProjectName = {
		marginLeft: 10,
		height: 42
	};
	const styleCardActions = {display: 'inline-block'};
	if (props.isLoading) {
		items = (
			<Card style={styleCard}>
				<CardActions style={styleCardActions}>
					<span style={styleInputProjectName}>Loading projects...</span>
				</CardActions>
			</Card>
		);
	} else {
		items = props.projects.map((item, index) => {
			return (
				<CardProject
					isEditOn={props.updateId === item.id}
					id={item.id}
					key={item.id}
					index={index}
					name={item.name}
					status={item.status}
					onSave={props.onSave}
					onClose={props.onClose}
					onEnter={props.onEnter}
					onEdit={props.onEdit}
					onDelete={props.onDelete}
					/>
				);
		});
		items = (
			<ReactCSSTransitionGroup transitionName="showHideTransition" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
				{items}
			</ReactCSSTransitionGroup>
		);
	}

	return items;
};

ListProject.propTypes = {
	isLoading: React.PropTypes.bool,
	projects: React.PropTypes.array,
	updateId: React.PropTypes.string,
	onSave: React.PropTypes.func,
	onClose: React.PropTypes.func,
	onEnter: React.PropTypes.func,
	onEdit: React.PropTypes.func,
	onDelete: React.PropTypes.func
};

module.exports = ListProject;
