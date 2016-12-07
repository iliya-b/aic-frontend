'use strict';

import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import {capimelize, moveCaretToEnd} from 'app/libs/helpers';
import CampaignIcon from 'app/components/icon/campaign-icon';
import IconButtonApp from 'app/components/icon/icon-button-app';

const CardCampaign = class extends React.Component {
	handleClickEnter = () => {
		this.props.onEnter(this.props.id);
	}
	handleClickDelete = () => {
		this.props.onDelete({id: this.props.id, name: this.props.name});
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
			margin: '10px 0',
			clear: 'both'
		};
		const styleCardActions = {display: 'inline-block'};
		const styleInputCampaignName = {
			marginLeft: 10,
			height: 42
		};

		const projectNameCamel = capimelize(this.props.name);
		return (
			<Card key={this.props.id} style={styleCard}>
				<CardActions style={styleCardActions}>
					<span className={`txtCampaignName txtCampaignName${this.props.index} txtCampaignName${projectNameCamel}`} style={styleInputCampaignName}>{this.props.name}</span>
					<CampaignIcon style={{marginTop: 3, float: 'left'}} tooltip={this.props.status} status={this.props.status}/>
					<IconButtonApp raised iconClassName="mdi mdi-arrow-right-bold" className="btCampaignEnter" title={`Enter ${this.props.name}`} tooltip="Enter" onClick={this.handleClickEnter}/>
					<IconButtonApp raised iconClassName="mdi mdi-delete" className="btCampaignDelete" title={`Delete ${this.props.name}`} tooltip="Delete" onClick={this.handleClickDelete}/>
				</CardActions>
			</Card>
		);
	}
};

CardCampaign.propTypes = {
	id: React.PropTypes.string,
	index: React.PropTypes.number,
	name: React.PropTypes.string,
	status: React.PropTypes.string,
	onEnter: React.PropTypes.func,
	onDelete: React.PropTypes.func
};

module.exports = CardCampaign;
