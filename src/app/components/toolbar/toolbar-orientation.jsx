'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// APP
const ToolbarOrientation = class extends React.Component {

	constructor(props) {
		super(props);
		this.setRefAzimuth = c => {
			this.azimuth = c;
		};
		this.setRefPitch = c => {
			this.pitch = c;
		};
		this.setRefRoll = c => {
			this.roll = c;
		};
		this.handleClick = e => {
			const payload = {
				azimuth: parseFloat(this.azimuth.getValue()),
				pitch: parseFloat(this.pitch.getValue()),
				roll: parseFloat(this.roll.getValue())
			};
			this.props.onChange(e, payload);
		};
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
				float: 'left',
				width: 100
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
			}
		};
		return (
			<Paper style={Object.assign(this.props.style, styles.paper)} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-compass"/>
				<ToolbarSeparator style={styles.separator}/>
				<TextField name="fieldLiveSensorOrientationAzimuth" style={styles.items} ref={this.setRefAzimuth} hintText="azimuth" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField name="fieldLiveSensorOrientationPitch" style={styles.items} ref={this.setRefPitch} hintText="pitch" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField name="fieldLiveSensorOrientationRoll" style={styles.items} ref={this.setRefRoll} hintText="roll" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					className="btLiveSensorOrientationSubmit"
					label="Submit"
					title="Submit"
					primary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
			</Paper>
		);
	}
};

ToolbarOrientation.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarOrientation.defaultProps = {
	style: {}
};

ToolbarOrientation.propTypes = {
	onChange: React.PropTypes.func,
	style: React.PropTypes.object,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func
};

module.exports = ToolbarOrientation;
