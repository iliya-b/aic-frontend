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
const ToolbarAndroid = class extends React.Component {

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
				<ToolbarGroup firstChild>
					<IconButton style={styles.button}>
						<FontIcon className="mdi mdi-android" color="rgba(0, 0, 0, 0.4)"/>
					</IconButton>
					<ToolbarTitle text="Toolbar"/>
					<ToolbarSeparator style={styles.separator}/>
					<IconButton tooltip="Sensors" style={styles.button} onClick={this.props.onClickSensor}>
						<FontIcon className="mdi mdi-map-marker" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Camera" style={styles.button} onClick={this.props.onClickCamera}>
						<FontIcon className="mdi mdi-camera" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="GSM" style={styles.button} onClick={this.props.onClickGSM}>
						<FontIcon className="mdi mdi-phone" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="APKs" style={styles.button} onClick={this.props.onClickAPKs}>
						<FontIcon className="mdi mdi-puzzle" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Session Details" style={styles.button} onClick={this.props.onClickDetails}>
						<FontIcon className="mdi mdi-information" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Terminate Session" style={styles.button} onClick={this.props.onClickTerminate}>
						<FontIcon className="mdi mdi-power" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarAndroid.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarAndroid.propTypes = {
	style: React.PropTypes.object,
	onClickSensor: React.PropTypes.func,
	onClickCamera: React.PropTypes.func,
	onClickGSM: React.PropTypes.func,
	onClickAPKs: React.PropTypes.func,
	onClickDetails: React.PropTypes.func,
	onClickTerminate: React.PropTypes.func
};

module.exports = ToolbarAndroid;
