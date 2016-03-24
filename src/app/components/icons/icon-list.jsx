'use strict';

// Vendor
import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import str from 'string';

// APP
const IconList = props => (
	props.buttons.map(b => {
		const iconColor = b.id === props.selectedId ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.4)';
		const iconHoverColor = b.id === props.selectedId ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.87)';
		let icon;
		if (b.fontIcon) {
			icon = <FontIcon className={b.fontIcon} color={iconColor} hoverColor={iconHoverColor}/>;
		} else if (b.svgIcon) {
			icon = React.createElement(b.svgIcon, {color: iconColor, hoverColor: iconHoverColor});
		}
		return (
			<IconButton className={`${props.iconClassNamePrefix}${str(b.tooltip).camelize().s}`} key={b.id} tooltip={b.tooltip} style={props.style} onClick={props.onClick[b.id]}>
				{icon}
			</IconButton>
		);
	})
);

IconList.propTypes = {
	buttons: React.PropTypes.array,
	selectedId: React.PropTypes.string,
	onClick: React.PropTypes.object,
	iconClassNamePrefix: React.PropTypes.string,
	style: React.PropTypes.object
};

module.exports = IconList;
