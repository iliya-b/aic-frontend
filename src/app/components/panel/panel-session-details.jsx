'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';

// APP
import VoiceSVG from 'app/components/icons/voice';
import GravitySVG from 'app/components/icons/gravity';

const PanelSessionDetails = class extends React.Component {

	render() {
		const styles = {
			separator: {
				margin: '0 15px 0 0px',
				float: 'left'
			},
			items: {
				float: 'left'
			},
			paper: {
			},
			icon: {
				margin: '15px 10px 0 10px',
				float: 'left'
			},
			buttonSubmit: {
				float: 'left',
				marginTop: 10,
				marginLeft: 15
			}
		};

		const infos = [
			{
				id: 'gps',
				tooltip: 'GPS',
				fontIcon: 'mdi mdi-map-marker'
			},
			{
				id: 'battery',
				tooltip: 'Battery',
				fontIcon: 'mdi mdi-battery-charging-40'
			},
			{
				id: 'accelerometer',
				tooltip: 'Accelerometer',
				fontIcon: 'mdi mdi-screen-rotation'
			},
			{
				id: 'light',
				tooltip: 'Light',
				fontIcon: 'mdi mdi-white-balance-incandescent'
			},
			{
				id: 'gravity',
				tooltip: 'Gravity',
				svgIcon: GravitySVG
			},
			{
				id: 'gyroscope',
				tooltip: 'Gyroscope',
				fontIcon: 'mdi mdi-crosshairs-gps'
			},
			{
				id: 'linear_acc',
				tooltip: 'Linear acceleration',
				fontIcon: 'mdi mdi-run'
			},
			{
				id: 'magnetometer',
				tooltip: 'Magnetometer',
				fontIcon: 'mdi mdi-magnet'
			},
			{
				id: 'orientation',
				tooltip: 'Orientation',
				fontIcon: 'mdi mdi-compass'
			},
			{
				id: 'pressure',
				tooltip: 'Pressure',
				fontIcon: 'mdi mdi-speedometer'
			},
			{
				id: 'proximity',
				tooltip: 'Proximity',
				svgIcon: VoiceSVG
			},
			{
				id: 'relative_humidity',
				tooltip: 'Humidity',
				fontIcon: 'mdi mdi-water'
			},
			{
				id: 'temperature',
				tooltip: 'Temperature',
				fontIcon: 'mdi mdi-thermometer-lines'
			}
		];

		// TODO: should check all other panels for the style presence
		if (this.props.style) {
			styles.paper = Object.assign({}, styles.paper, this.props.style);
		}

		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={{margin: '10px 0 10px 10px'}} className="mdi mdi-information" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				<Divider/>
				<FontIcon style={{margin: '10px 0 10px 10px'}} className="mdi mdi-map-marker" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				status: {this.props.properties['aicd.gps.status']}
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				lat: {this.props.properties['aicd.gps.latitude']}
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				long: {this.props.properties['aicd.gps.longitude']}
				<Divider/>
				<FontIcon style={{margin: '10px 0 10px 10px'}} className="mdi mdi-battery" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				battery level: {parseInt(this.props.properties['aicd.battery.level'], 10) / parseInt(this.props.properties['aicd.battery.full'], 10) * 100}%
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				status: {this.props.properties['aicd.battery.status']}
				<Divider/>
				<div>
				<FontIcon style={{margin: '10px 0 10px 10px'}} className="mdi mdi-screen-rotation" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				screen rotation: {this.props.properties['aicd.screen_rotation']}
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				x: {this.props.properties['aicd.accelerometer.x']}
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				y: {this.props.properties['aicd.accelerometer.y']}
				<ToolbarSeparator style={{margin: '5px 10px'}}/>
				z: {this.props.properties['aicd.accelerometer.z']}
				</div>
			</Paper>
		);
	}
};

PanelSessionDetails.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

PanelSessionDetails.propTypes = {
	style: React.PropTypes.object,
	properties: React.PropTypes.object
};

module.exports = PanelSessionDetails;
