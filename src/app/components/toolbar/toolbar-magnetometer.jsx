'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// APP
const ToolbarMagnetometer = class extends React.Component {

	constructor(props) {
		super(props);
		this.setRefX = c => {
			this.x = c;
		};
		this.setRefY = c => {
			this.y = c;
		};
		this.setRefZ = c => {
			this.z = c;
		};
		this.handleClick = e => {
			const payload = {
				x: parseFloat(this.x.getValue()),
				y: parseFloat(this.y.getValue()),
				z: parseFloat(this.z.getValue())
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
				<FontIcon style={styles.icon} className="mdi mdi-magnet"/>
				<ToolbarSeparator style={styles.separator}/>
				<TextField name="fieldLiveSensorMagnetometerX" style={styles.items} ref={this.setRefX} hintText="x" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField name="fieldLiveSensorMagnetometerY" style={styles.items} ref={this.setRefY} hintText="y" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField name="fieldLiveSensorMagnetometerZ" style={styles.items} ref={this.setRefZ} hintText="z" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					className="btLiveSensorMagnetometerSubmit"
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

ToolbarMagnetometer.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarMagnetometer.defaultProps = {
	style: {}
};

ToolbarMagnetometer.propTypes = {
	style: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func
};

module.exports = ToolbarMagnetometer;
