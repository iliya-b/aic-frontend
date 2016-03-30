'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import str from 'string';

// APP
import VoiceSVG from 'app/components/icon/voice';
import GravitySVG from 'app/components/icon/gravity';

const infos = [
	{
		id: 'gps',
		tooltip: 'GPS',
		fontIcon: 'mdi mdi-map-marker',
		fields: [
			{
				label: 'latitude',
				value: properties => properties['aicd.gps.latitude']
			}, {
				label: 'longitude',
				value: properties => properties['aicd.gps.longitude']
			}
		]
	},
	{
		id: 'battery',
		tooltip: 'Battery',
		fontIcon: 'mdi mdi-battery-charging-40',
		fields: [
			{
				label: 'battery level',
				value: properties => `${parseInt(properties['aicd.battery.level'], 10) / parseInt(properties['aicd.battery.full'], 10) * 100}%`
			}, {
				label: 'status',
				value: properties => properties['aicd.battery.status']
			}
		]
	},
	{
		id: 'accelerometer',
		tooltip: 'Accelerometer',
		fontIcon: 'mdi mdi-screen-rotation',
		fields: [
			{
				label: 'screen rotation',
				value: properties => properties['aicd.screen_rotation']
			}, {
				label: 'x',
				value: properties => properties['aicd.accelerometer.x']
			}, {
				label: 'y',
				value: properties => properties['aicd.accelerometer.y']
			}, {
				label: 'z',
				value: properties => properties['aicd.accelerometer.z']
			}
		]
	},
	{
		id: '²',
		tooltip: 'Light',
		fontIcon: 'mdi mdi-white-balance-incandescent',
		fields: [
			{
				label: 'light',
				value: properties => properties['aicd.luxmeter.light']
			}
		]
	},
	{
		id: 'gravity',
		tooltip: 'Gravity',
		svgIcon: GravitySVG,
		fields: [
			{
				label: 'x',
				value: properties => properties['aicd.gravity.x']
			}, {
				label: 'y',
				value: properties => properties['aicd.gravity.y']
			}, {
				label: 'z',
				value: properties => properties['aicd.gravity.z']
			}
		]
	},
	{
		id: 'gyroscope',
		tooltip: 'Gyroscope',
		fontIcon: 'mdi mdi-crosshairs-gps',
		fields: [
			{
				label: 'azimuth',
				value: properties => properties['aicd.gyroscope.azimuth']
			}, {
				label: 'pitch',
				value: properties => properties['aicd.gyroscope.pitch']
			}, {
				label: 'roll',
				value: properties => properties['aicd.gyroscope.roll']
			}
		]
	},
	{
		id: 'linear_acc',
		tooltip: 'Linear acceleration',
		fontIcon: 'mdi mdi-run',
		fields: [
			{
				label: 'x',
				value: properties => properties['aicd.linearacc.x']
			}, {
				label: 'y',
				value: properties => properties['aicd.linearacc.y']
			}, {
				label: 'z',
				value: properties => properties['aicd.linearacc.z']
			}
		]
	},
	{
		id: 'magnetometer',
		tooltip: 'Magnetometer',
		fontIcon: 'mdi mdi-magnet',
		fields: [
			{
				label: 'x',
				value: properties => properties['aicd.magnetometer.x']
			}, {
				label: 'y',
				value: properties => properties['aicd.magnetometer.y']
			}, {
				label: 'z',
				value: properties => properties['aicd.magnetometer.z']
			}
		]
	},
	{
		id: 'orientation',
		tooltip: 'Orientation',
		fontIcon: 'mdi mdi-compass',
		fields: [
			{
				label: 'azimuth',
				value: properties => properties['aicd.orientation.azimuth']
			}, {
				label: 'pitch',
				value: properties => properties['aicd.orientation.pitch']
			}, {
				label: 'roll',
				value: properties => properties['aicd.orientation.roll']
			}
		]
	},
	{
		id: 'pressure',
		tooltip: 'Pressure',
		fontIcon: 'mdi mdi-speedometer',
		fields: [
			{
				label: 'pressure',
				value: properties => properties['aicd.barometer.pressure']
			}
		]
	},
	{
		id: 'proximity',
		tooltip: 'Proximity',
		svgIcon: VoiceSVG,
		fields: [
			{
				label: 'distance',
				value: properties => properties['aicd.telemeter.distance']
			}
		]
	},
	{
		id: 'relative_humidity',
		tooltip: 'Humidity',
		fontIcon: 'mdi mdi-water',
		fields: [
			{
				label: 'humidity',
				value: properties => properties['aicd.hygrometer.humidity']
			}
		]
	},
	{
		id: 'temperature',
		tooltip: 'Temperature',
		fontIcon: 'mdi mdi-thermometer-lines',
		fields: [
			{
				label: 'temperature',
				value: properties => properties['aicd.thermometer.temperature']
			}
		]
	}
];

const PanelSessionDetails = class extends React.Component {

	render() {
		const styles = {
			paper: {
			},
			icon: {margin: '10px 0 10px 10px', verticalAlign: 'bottom'},
			separator: {margin: '5px 10px'},
			label: {
				position: 'absolute',
				// line-height: 22px;
				// top: 38px;
				// transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
				// z-index: 1;
				// cursor: text;
				transform: 'perspective(1px) scale(0.75) translate3d(0px, -20px, 0px)',
				transformOrigin: 'left top 0px',
				// pointer-events: none;
				color: this.context.muiTheme.palette.primary1Color
				// WebkitUserSelect: none;
			},
			field: {padding: '0 10px', minWidth: 100, display: 'inline-block', marginBottom: 5},
			value: {color: 'rgba(0, 0, 0, 0.5)'}
		};

		// TODO: should check all other panels for the style presence
		if (this.props.style) {
			styles.paper = Object.assign({}, styles.paper, this.props.style);
		}

		const iconColor = 'rgba(0, 0, 0, 0.4)';
		const iconHoverColor = 'rgba(0, 0, 0, 0.4)';
		const infoRendered = infos.map(info => {
			const fieldRendered = info.fields ? info.fields.map((field, index) => {
				const idCamel = str(field.label).capitalize().camelize().s;
				return (
					<span style={styles.field} key={index}>
						<label className={`lbLiveInfo${idCamel}`} style={styles.label}>{field.label}</label>
						<span className={`spLiveInfo${idCamel}`} style={styles.value}>{field.value(this.props.properties)}</span>
					</span>
				);
			}) : null;
			let icon;
			if (info.fontIcon) {
				icon = <FontIcon style={styles.icon} className={info.fontIcon} color={iconColor} hoverColor={iconHoverColor}/>;
			} else if (info.svgIcon) {
				icon = React.createElement(info.svgIcon, {style: styles.icon, color: iconColor, hoverColor: iconHoverColor});
			}
			return (
				<div key={info.id} className={`divLiveInfo${str(info.tooltip).camelize().s}`} >
					{icon}
					{fieldRendered}
				</div>
			);
		});

		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-information" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<Divider/>
				{infoRendered}
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
