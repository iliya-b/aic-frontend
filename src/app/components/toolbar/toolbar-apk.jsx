'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

// APP
const ToolbarAPK = class extends React.Component {

	render() {
		const styles = {
			button: {
				marginTop: 5,
				float: 'left'
			},
			separator: {
				margin: '0 5px 0 0px'
			},
			icon: {
				marginRight: 10,
				cursor: 'default',
				color: 'rgba(0, 0, 0, 0.4)'
			}
		};

		const buttons = [];
		if (this.props.uploadOpenVisible) {
			buttons.push(
				<IconButton className="btUploadOpen" key={1} tooltip="Upload file" style={styles.button}>
					<FontIcon className="mdi mdi-cloud-upload" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)" onClick={this.props.onClickUploadOpen}/>
				</IconButton>
			);
		}
		if (this.props.uploadCloseVisible) {
			buttons.push(
				<IconButton className="btUploadClose" key={2} tooltip="Close upload" style={styles.button}>
					<FontIcon className="mdi mdi-close-circle" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)" onClick={this.props.onClickUploadClose}/>
				</IconButton>
			);
		}
		if (this.props.deleteFileVisible) {
			buttons.push(
				<IconButton className="btDeleteSelected" key={3} tooltip="Delete selected files" style={styles.button}>
					<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)" onClick={this.props.onClickDeleteFile}/>
				</IconButton>
			);
		}

		return (
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<FontIcon style={styles.icon} className="mdi mdi-puzzle" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>
					<ToolbarTitle text="APK Manager" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{buttons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarAPK.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarAPK.propTypes = {
	style: React.PropTypes.object,
	onClickUploadOpen: React.PropTypes.func,
	onClickUploadClose: React.PropTypes.func,
	onClickDeleteFile: React.PropTypes.func,
	uploadOpenVisible: React.PropTypes.bool,
	uploadCloseVisible: React.PropTypes.bool,
	deleteFileVisible: React.PropTypes.bool
};

module.exports = ToolbarAPK;
