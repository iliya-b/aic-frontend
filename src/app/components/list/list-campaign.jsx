'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import CardCampaign from 'app/components/card/card-campaign';

const ListCampaign = props => {
	let items;

	if (props.isLoading) {
		items = (
			<Card>
				<CardText style={{paddingBottom: 8}}>Loading campaigns...</CardText>
			</Card>
		);
	} else {
		items = props.campaigns.map((item, index) => {
			return (
				<CardCampaign
					id={item.campaign_id}
					key={item.campaign_id}
					index={index}
					name={item.campaign_name || item.campaign_id}
					status={item.status}
					onEnter={props.onEnter}
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

ListCampaign.propTypes = {
	isLoading: React.PropTypes.bool,
	campaigns: React.PropTypes.array,
	onEnter: React.PropTypes.func
};

module.exports = ListCampaign;
