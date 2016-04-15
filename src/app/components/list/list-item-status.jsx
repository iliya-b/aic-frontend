'use strict';

// Vendor
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';

// APP
const ListItemsStatus = class extends React.Component {

	render() {
		const styles = {
			badge: {
				root: {
					padding: '12px 16px 12px 12px'
				},
				button: {
					width: 12,
					height: 12,
					padding: 3
				},
				button2: {
					width: 24,
					height: 24,
					padding: 0
				},
				text: {
					fontSize: '12px'
				},
				textAnimate: {
					animation: 'liveIconRotate 3s linear infinite',
					fontSize: '12px'
				}
			}
		};

		const iconStatusMapping = {
			ERROR: {icon: 'mdi mdi-close', color: this.context.muiTheme.palette.errorColor, style: styles.badge.text},
			LOADING: {icon: 'mdi mdi-reload', color: this.context.muiTheme.palette.primary1Color, style: styles.badge.textAnimate},
			SUCCESS: {icon: 'mdi mdi-check', color: this.context.muiTheme.palette.successColor, style: styles.badge.text}
		};

		if (this.props.items && this.props.items.length) {
			const itemsRendered = this.props.items.map(item => {
				const icon = (
					<IconButton style={styles.badge.button2} iconStyle={iconStatusMapping[item.icon].style} tooltip={item.iconTooltip}>
						<FontIcon className={iconStatusMapping[item.icon].icon} color={iconStatusMapping[item.icon].color}/>
					</IconButton>
				);
				return (
					<Badge key={item.id} badgeContent={icon} style={styles.badge.root} badgeStyle={styles.badge.button}>
						{item.label}
					</Badge>
				);
			});
			return (
				<ReactCSSTransitionGroup style={this.props.style} transitionName="showHideTransition" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
					{itemsRendered}
				</ReactCSSTransitionGroup>
			);
		}
		return <span></span>;
	}
};

ListItemsStatus.contextTypes = {
	muiTheme: React.PropTypes.object
};

ListItemsStatus.propTypes = {
	items: React.PropTypes.array,
	style: React.PropTypes.object
};

module.exports = ListItemsStatus;
