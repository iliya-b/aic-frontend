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
				marginLeft: 1
			}
		};
		return (
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<IconButton style={styles.button}>
						<FontIcon className="mdi mdi-android" color="rgba(0, 0, 0, 0.4)"/>
					</IconButton>
					<ToolbarTitle text="Toolbar"/>
					<ToolbarSeparator style={styles.separator}/>
					<IconButton className="btLiveSensors" tooltip="Sensors" style={styles.button} onClick={this.props.onClick.sensors}>
						<FontIcon className="mdi mdi-map-marker" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveCamera" tooltip="Camera" style={styles.button} onClick={this.props.onClick.camera}>
						<FontIcon className="mdi mdi-camera" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveGSM" tooltip="GSM" style={styles.button} onClick={this.props.onClick.gsm}>
						<FontIcon className="mdi mdi-phone" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveAPKs" tooltip="APKs" style={styles.button} onClick={this.props.onClick.apks}>
						<FontIcon className="mdi mdi-puzzle" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveDetails" tooltip="Session Details" style={styles.button} onClick={this.props.onClick.details}>
						<FontIcon className="mdi mdi-information" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveTerminate" tooltip="Terminate Session" style={styles.button} onClick={this.props.onClick.terminate}>
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
	onClick: React.PropTypes.object
};

module.exports = ToolbarAndroid;
