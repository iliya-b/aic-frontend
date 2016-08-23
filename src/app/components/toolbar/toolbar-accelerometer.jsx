'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import TogglableIcon from 'app/components/shared/togglable-icon';

// APP

const rotationSets = {
	horizontal: {x: 0, y: 5.9, z: 0},
	vertical: {x: 5.9, y: 0, z: 0}
};

const oposite = {
	horizontal: 'vertical',
	vertical: 'horizontal'
};

function isRotation(set, rotation) {
	return set.x === rotationSets[rotation].x && set.y === rotationSets[rotation].y && set.z === rotationSets[rotation].z;
}

const ToolbarAccelerometer = class extends React.Component {
	onChange(rotationName, e) {
		this.props.onChange(e, rotationSets[oposite[rotationName]]);
	}

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
		let rotationName = '';
		if (isRotation(this.props.accelerometer, 'horizontal')) {
			styles.sensorIconRotation = styles.sensorIconRotationHorizontal;
			rotationName = 'horizontal';
		} else if (isRotation(this.props.accelerometer, 'vertical')) {
			styles.sensorIconRotation = styles.sensorIconRotationVertical;
			rotationName = 'vertical';
		} else {
			styles.sensorIconRotation = styles.sensorIcon;
		}
		const onChange = () => {
			this.onChange(rotationName);
		};
		return (
			<Paper style={Object.assign(this.props.style, styles.paper)} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-screen-rotation" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<TogglableIcon className="btLiveSensorRotation" style={styles.sensorIconRotation} isOn iconName="screen-rotation" onClick={onChange}/>
				<span>{rotationName}</span>
			</Paper>
		);
	}
};

ToolbarAccelerometer.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarAccelerometer.defaultProps = {
	style: {}
};

ToolbarAccelerometer.propTypes = {
	onClickBack: React.PropTypes.func,
	style: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	accelerometer: React.PropTypes.object
};

module.exports = ToolbarAccelerometer;
