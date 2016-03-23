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
const ToolbarFileUpload = class extends React.Component {

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
				cursor: 'default',
				float: 'left',
				margin: '16px 36px 0px -6px',
				width: 25
			}
		};

		const buttons = [];
		if (this.props.uploadOpenVisible) {
			buttons.push(
				<IconButton title="Upload file" className="btUploadOpen" key={1} style={styles.button} onClick={this.props.onClickUploadOpen}>
					<FontIcon className="mdi mdi-cloud-upload" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
				</IconButton>
			);
		}
		if (this.props.uploadCloseVisible) {
			buttons.push(
				<IconButton title="Close upload" className="btUploadClose" key={2} style={styles.button} onClick={this.props.onClickUploadClose}>
					<FontIcon className="mdi mdi-close-circle" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
				</IconButton>
			);
		}
		if (this.props.deleteFileVisible) {
			buttons.push(
				<IconButton title="Delete selected files" className="btDeleteSelected" key={3} style={styles.button} onClick={this.props.onClickDeleteFile}>
					<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
				</IconButton>
			);
		}

		return (
			<Toolbar style={this.props.style}>
				<FontIcon style={styles.icon} className={this.props.icon} color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>
				<ToolbarGroup firstChild lastChild>
					<ToolbarTitle text={this.props.title} style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{buttons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarFileUpload.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarFileUpload.propTypes = {
	style: React.PropTypes.object,
	onClickUploadOpen: React.PropTypes.func,
	onClickUploadClose: React.PropTypes.func,
	onClickDeleteFile: React.PropTypes.func,
	uploadOpenVisible: React.PropTypes.bool,
	uploadCloseVisible: React.PropTypes.bool,
	deleteFileVisible: React.PropTypes.bool,
	icon: React.PropTypes.string,
	title: React.PropTypes.string
};

module.exports = ToolbarFileUpload;
