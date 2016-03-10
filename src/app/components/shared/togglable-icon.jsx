'use strict';

// Vendor
import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';

// APP

const TogglableIcon = class extends React.Component {

	render() {
		const {
			iconName,
			style,
			isOn,
			className,
			...other
		} = this.props;

		const styles = {
			icon: {
				color: (isOn ? this.context.muiTheme.palette.accent1Color : this.context.muiTheme.palette.disabledColor)
			}
		};

		const iconClassName = `${className} mdi mdi-${iconName}${(isOn ? '' : '-off')}`;

		return (
			<FontIcon
				style={Object.assign(styles.icon, style)}
				{...other}
				className={iconClassName}
				/>
			);
	}
};

TogglableIcon.contextTypes = {
	muiTheme: React.PropTypes.object
};

TogglableIcon.propTypes = {
	iconName: React.PropTypes.string,
	style: React.PropTypes.object,
	isOn: React.PropTypes.bool,
	className: React.PropTypes.string
};

module.exports = TogglableIcon;
