'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import TogglableIcon from 'app/components/shared/togglable-icon';

// APP
const ToolbarGPS = class extends React.Component {

	render() {
		const styles = {
			button: {
				marginTop: 5,
				float: 'left'
			},
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
			buttonSubmit: {
				float: 'left',
				marginTop: 10,
				marginLeft: 15
			},
			icon: {
				margin: '15px 10px 0 10px',
				float: 'left'
			},
			sensorIcon: {
				fontSize: '34px',
				padding: '7px 11px 11px 0'
			},
			sensorIconRotationHorizontal: {
				fontSize: '34px',
				padding: '7px 11px 11px 0',
				transform: 'rotate(-45deg)'
			},
			sensorIconRotationVertical: {
				fontSize: '34px',
				padding: '7px 11px 11px 0',
				transform: 'rotate(45deg)'
			},
			sensorIconRotation: {}
		};

		// TODO: improve this if
		if (this.props.rotation === 'horizontal') {
			styles.sensorIconRotation = styles.sensorIconRotationHorizontal;
		} else if (this.props.rotation === 'vertical') {
			styles.sensorIconRotation = styles.sensorIconRotationVertical;
		} else {
			styles.sensorIconRotation = styles.sensorIcon;
		}
		return (
			<Paper style={Object.assign(this.props.style, styles.paper)} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-screen-rotation" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<TogglableIcon style={styles.sensorIconRotation} isOn iconName="screen-rotation" onClick={this.props.onChangeRotation}/>
				<span>{this.props.rotation}</span>
			</Paper>
		);
	}
};

ToolbarGPS.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarGPS.propTypes = {
	onClickBack: React.PropTypes.func,
	style: React.PropTypes.object,
	rotation: React.PropTypes.string
};

module.exports = ToolbarGPS;
