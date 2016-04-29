'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// APP
const ToolbarGPS = class extends React.Component {

	constructor(props) {
		super(props);
		this.handleClickGPS = this.handleClickGPS.bind(this);
		this.setRefLat = c => {
			this.lat = c;
		};
		this.setRefLon = c => {
			this.lon = c;
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
			}
		};
		return (
			<Paper style={Object.assign(this.props.style, styles.paper)} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-map-marker" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<TextField name="fieldLiveSensorGPSLatitude" style={styles.items} ref={this.setRefLat} hintText="latitude" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField name="fieldLiveSensorGPSLongitude" style={styles.items} ref={this.setRefLon} hintText="longitude" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					className="btLiveSensorGPSSubmit"
					label="Submit"
					title="Submit"
					href="#"
					primary
					onClick={this.handleClickGPS}
					style={styles.buttonSubmit}
					/>
			</Paper>
		);
	}

	handleClickGPS(e) {
		const payload = {
			latitude: parseFloat(this.lat.getValue()),
			longitude: parseFloat(this.lon.getValue())
		};
		this.props.onChange(e, payload);
	}
};

ToolbarGPS.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarGPS.defaultProps = {
	style: {}
};

ToolbarGPS.propTypes = {
	onClickBack: React.PropTypes.func,
	style: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
	onInputFocus: React.PropTypes.func
};

module.exports = ToolbarGPS;
