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
import FileCancel from 'app/components/icons/file-cancel';

const ToolbarAPKs = class extends React.Component {

	render() {
		const styles = {
			button: {
				marginTop: 5,
				float: 'left'
			},
			separator: {
				margin: '0 5px 0 0px'
			}
		};

		return (
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<IconButton tooltip="Back to toolbar" tooltipPosition="bottom-right" style={styles.button} onClick={this.props.onClick.android}>
						<FontIcon className="mdi mdi-arrow-left-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<ToolbarTitle text="APKs" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					<IconButton className="btLiveAPKUpload" tooltip="Upload file" style={styles.button} onClick={this.props.onClick.apkUpload}>
						<FontIcon className="mdi mdi-cloud-upload" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveAPKInstall" tooltip="Install" style={styles.button} onClick={this.props.onClick.apkInstall}>
						<FontIcon className="mdi mdi-file-send" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveAPKUninstall" tooltip="Remove" style={styles.button} onClick={this.props.onClick.apkUninstall}>
						<FileCancel color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarAPKs.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarAPKs.propTypes = {
	onClick: React.PropTypes.object,
	style: React.PropTypes.object
};

module.exports = ToolbarAPKs;
