'use strict';

// Vendor
import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import StylePropable from 'material-ui/lib/mixins/style-propable';

// APP
const TogglableIcon = React.createClass({

	propTypes: {
		iconName: React.PropTypes.string,
		style: React.PropTypes.object,
		isOn: React.PropTypes.bool
	},

	render() {
		const {
			iconName,
			style,
			isOn,
			...other
		} = this.props;

		const styles = {
			icon: {
				color: (isOn ? this.context.muiTheme.palette.accent1Color : this.context.muiTheme.palette.disabledColor)
			}
		};

		const iconClassName = `mdi mdi-${iconName}${(isOn ? '' : '-off')}`;

		return (
			<FontIcon
				style={Object.assign(styles.icon, style)}
				{...other}
				className={iconClassName}
				/>
			);
	}
});

TogglableIcon.contextTypes = {
	muiTheme: React.PropTypes.object
};

// TogglableIcon.propTypes = {
// 	iconName: React.PropTypes.string,
// 	style: React.PropTypes.object,
// 	isOn: React.PropTypes.bool
// };

module.exports = TogglableIcon;
