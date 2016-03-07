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
const ToolbarCamera = class extends React.Component {

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
					<IconButton tooltip="Back to toolbar" tooltipPosition="bottom-right" style={styles.button} onClick={this.props.onClickBack}>
						<FontIcon className="mdi mdi-arrow-left-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<ToolbarTitle text="Camera" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					<IconButton tooltip="Turn off camera" style={styles.button}>
						<FontIcon className="mdi mdi-camera" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Turn on video" style={styles.button}>
						<FontIcon className="mdi mdi-video-off" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Upload image file" style={styles.button}>
						<FontIcon className="mdi mdi-file-image" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Upload video file" style={styles.button}>
						<FontIcon className="mdi mdi-file-video" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarCamera.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarCamera.propTypes = {
	onClickBack: React.PropTypes.func,
	style: React.PropTypes.object
};

module.exports = ToolbarCamera;
