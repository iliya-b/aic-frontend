'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import Paper from 'material-ui/lib/paper';

// APP
import FileCancel from 'app/components/icons/file-cancel';

const PanelAPKUninstall = class extends React.Component {

	render() {
		const styles = {
			separator: {
				margin: '0 15px 0 0px',
				float: 'left'
			},
			items: {
				float: 'left',
				width: 720
			},
			paper: {
				height: 56
			},
			icon: {
				margin: '15px 10px 0 10px',
				float: 'left'
			}
		};
		if (this.props.style) {
			styles.paper = Object.assign({}, this.props.style, styles.paper);
		}
		return (
			<Paper style={styles.paper} zDepth={1}>
				<FileCancel style={styles.icon} color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
			</Paper>
		);
	}
};

PanelAPKUninstall.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

PanelAPKUninstall.propTypes = {
	style: React.PropTypes.object
};

module.exports = PanelAPKUninstall;
