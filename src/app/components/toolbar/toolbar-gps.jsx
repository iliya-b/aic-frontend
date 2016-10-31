'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PanelToolbarBase from 'app/components/panel/panel-toolbar-base';

const ToolbarGPS = class extends React.Component {
	handleClickGPS = e => {
		const payload = {
			latitude: parseFloat(this.lat.getValue()),
			longitude: parseFloat(this.lon.getValue())
		};
		this.props.onChange(e, payload);
	}

	setRefLat = c => {
		this.lat = c;
	}

	setRefLon = c => {
		this.lon = c;
	}

	render() {
		const styleButtonSubmit = {
			float: 'left',
			marginTop: 10,
			marginLeft: 15
		};
		const styleLon = {
			float: 'left',
			marginTop: -15
		};
		const styleLat = {
			float: 'left',
			marginTop: -15,
			marginLeft: 15
		};
		return (
			<PanelToolbarBase icon={<FontIcon className="mdi mdi-map-marker"/>}>
				<TextField defaultValue={this.props.gps.latitude} name="fieldLiveSensorGPSLatitude" style={styleLat} ref={this.setRefLat} floatingLabelText="latitude" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField defaultValue={this.props.gps.longitude} name="fieldLiveSensorGPSLongitude" style={styleLon} ref={this.setRefLon} floatingLabelText="longitude" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					className="btLiveSensorGPSSubmit"
					label="Submit"
					title="Submit"
					primary
					onClick={this.handleClickGPS}
					style={styleButtonSubmit}
					/>
			</PanelToolbarBase>
		);
	}
};

ToolbarGPS.propTypes = {
	onClickBack: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	gps: React.PropTypes.object
};

module.exports = ToolbarGPS;
