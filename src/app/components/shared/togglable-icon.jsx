const React = require('react');

const mui = require('material-ui');
const FontIcon = mui.FontIcon;
const StylePropable = mui.Mixins.StylePropable;

const TogglableIcon = React.createClass({

	propTypes: {
		iconName: React.PropTypes.string,
		style: React.PropTypes.object,
		isOn: React.PropTypes.bool
	},

	mixins: [StylePropable],

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
				style={this.mergeAndPrefix(
					styles.icon,
					style)}
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
