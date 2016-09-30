'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {camelize} from 'app/libs/helpers';

const IconList = class extends React.Component {
	render() {
		return (
			<div style={Object.assign({display: 'inline-block'}, this.props.styleRoot)}>
			{this.props.buttons.map(b => {
				const iconColor = b.id === this.props.selectedId ? this.props.selectColor : this.props.defaultColor;
				const iconHoverColor = b.id === this.props.selectedId ? this.props.selectColor : this.props.hoverColor;
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
					<IconButton iconStyle={b.iconStyle} {...disabled} className={`${this.props.iconClassNamePrefix}${camelize(b.tooltip)}`} key={b.id} tooltip={b.tooltip} style={this.props.style} onClick={this.props.onClick[b.id]}>
						{icon}
					</IconButton>
				);
			})}
			</div>
		);
	}
};

IconList.defaultProps = {
	selectColor: 'rgba(255, 255, 255, 0.75)',
	hoverColor: 'rgba(0, 0, 0, 0.87)',
	defaultColor: 'rgba(0, 0, 0, 0.4)',
	styleRoot: {}
};

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
	style: React.PropTypes.object,
	selectColor: React.PropTypes.string,
	hoverColor: React.PropTypes.string,
	defaultColor: React.PropTypes.string,
	styleRoot: React.PropTypes.object
};

module.exports = IconList;
