'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {camelize} from 'app/libs/helpers';

const IconList = props => (
	<div style={{display: 'inline-block'}}>
	{props.buttons.map(b => {
		const iconColor = b.id === props.selectedId ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.4)';
		const iconHoverColor = b.id === props.selectedId ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.87)';
		let icon;
		if (b.fontIcon) {
			icon = <FontIcon className={b.fontIcon} color={iconColor} hoverColor={iconHoverColor}/>;
		} else if (b.svgIcon) {
			icon = React.createElement(b.svgIcon, {color: iconColor, hoverColor: iconHoverColor});
		}
		const disabled = {};
		if (b.disabled) {
			disabled.disabled = true;
		}
		return (
			<IconButton {...disabled} className={`${props.iconClassNamePrefix}${camelize(b.tooltip)}`} key={b.id} tooltip={b.tooltip} style={props.style} onClick={props.onClick[b.id]}>
				{icon}
			</IconButton>
		);
	})}
	</div>
);

IconList.propTypes = {
	buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
		id: React.PropTypes.string,
		tooltip: React.PropTypes.string,
		fontIcon: React.PropTypes.string, // or svgIcon
		svgIcon: React.PropTypes.string // or fontIcon
	})).isRequired,
	selectedId: React.PropTypes.string,
	onClick: React.PropTypes.object,
	iconClassNamePrefix: React.PropTypes.string,
	style: React.PropTypes.object
};

module.exports = IconList;
