'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';

// APP
const PanelSessionDetails = class extends React.Component {

	render() {
		const styles = {
			separator: {
				margin: '0 15px 0 0px',
				float: 'left'
			},
			items: {
				float: 'left'
			},
			paper: {
				height: 56
			},
			icon: {
				margin: '15px 10px 0 10px',
				float: 'left'
			},
			buttonSubmit: {
				float: 'left',
				marginTop: 10,
				marginLeft: 15
			}
		};
		// TODO: should check all other panels for the style presence
		if (this.props.style) {
			styles.paper = Object.assign({}, this.props.style, styles.paper);
		}

		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-info" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				test
			</Paper>
		);
	}
};

PanelSessionDetails.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

PanelSessionDetails.propTypes = {
	style: React.PropTypes.object,
	properties: React.PropTypes.object
};

module.exports = PanelSessionDetails;
