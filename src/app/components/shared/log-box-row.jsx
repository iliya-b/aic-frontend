'use strict';

// Vendor
import React from 'react';
import Spacing from 'material-ui/styles/spacing';
import * as Colors from 'material-ui/styles/colors';

// APP
const LogBoxRow = class extends React.Component {
	render() {
		const style = {
			root: {
				backgroundColor: this.props.style.backgroundColor || '#fff',
				color: this.props.style.color || this.context.muiTheme.palette.primary1Color,
				// fontFamily: this.context.muiTheme.contentFontFamily,
				fontSize: 12,
				padding: Spacing.desktopGutterMini / 2
			},
			time: {
				color: this.props.style.time ? this.props.style.time.color : Colors.grey600,
				marginRight: 4
			}
		};

		const time = <time style={style.time}>[{this.props.time}]</time>;

		return (
			<div style={style.root}>
				{time}{this.props.children}
			</div>
		);
	}

};

LogBoxRow.contextTypes = {
	muiTheme: React.PropTypes.object
};

LogBoxRow.defaultProps = {
	style: {}
};

LogBoxRow.propTypes = {
	children: React.PropTypes.node,
	style: React.PropTypes.object,
	time: React.PropTypes.string
};

module.exports = LogBoxRow;
