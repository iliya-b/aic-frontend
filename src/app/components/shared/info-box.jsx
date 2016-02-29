'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {StylePropable} = mui.Mixins;
const {Paper} = mui;

// APP
const MachineIcon = require('app/components/project/machine-icon');

const InfoBox = class extends React.Component {

	render() {
		const {
			style,
			boxType,
			showIcon,
			styleType,
			children,
			...other
		} = this.props;

		let boxColor;
		let content;
		let status;
		let iconProps;

		switch (boxType) {
			case InfoBox.ERROR:
				boxColor = this.context.muiTheme.palette.errorColor;
				status = MachineIcon.ERROR;
				break;
			case InfoBox.SUCCESS:
				boxColor = this.context.muiTheme.palette.successColor;
				status = MachineIcon.SUCCESS;
				break;
			case InfoBox.LOADING:
				boxColor = this.context.muiTheme.palette.primary1Color;
				status = MachineIcon.LOADING;
				break;
			case InfoBox.INFO:
				boxColor = this.context.muiTheme.palette.primary1Color;
				status = MachineIcon.INFO;
				break;
			case InfoBox.WARNING:
				boxColor = this.context.muiTheme.palette.warnColor;
				status = MachineIcon.WARNING;
				break;
			case InfoBox.DISABLED:
				boxColor = this.context.muiTheme.palette.disabledColor;
				status = MachineIcon.DISABLED;
				break;
			default:
				boxColor = this.context.muiTheme.palette.textColor;
		}

		const styles = {
			div: {
				padding: 20,
				color: boxColor
			}
		};

		if (styleType === InfoBox.STYLE_BIG) {
			styles.div.fontSize = '20px';
			styles.div.textAlign = 'center';
			iconProps = {bigIcon: true, style: {marginRight: '10px'}};
		}

		if (showIcon) {
			const styleChildren = {
				display: 'inline-block',
				verticalAlign: 'top',
				paddingTop: '15px'
			};
			content = [
				<MachineIcon status={status} {...iconProps} key={1} />,
				<div style={styleChildren} key={2}>{children}</div>
			];
		} else {
			content = children;
		}

		return (
			<Paper style={StylePropable.mergeStyles(styles.div, style)} {...other}>
				{content}
			</Paper>
			);
	}
};

InfoBox.contextTypes = {
	muiTheme: React.PropTypes.object
};

InfoBox.ERROR = 'error';
InfoBox.SUCCESS = 'success';
InfoBox.LOADING = 'loading';
InfoBox.WARNING = 'warning';
InfoBox.INFO = 'info';
InfoBox.DISABLED = 'disabled';

InfoBox.STYLE_BIG = 'big';

InfoBox.propTypes = {
	children: React.PropTypes.node,
	style: React.PropTypes.object,
	boxType: React.PropTypes.string,
	showIcon: React.PropTypes.bool,
	styleType: React.PropTypes.string
};

module.exports = InfoBox;
