'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import str from 'string';

// APP
import VoiceSVG from 'app/components/icon/voice';
import GravitySVG from 'app/components/icon/gravity';

// TODO: use LabeledSpan
// import LabeledSpan from 'app/components/form/labeled-span';

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

const avmInfoOrder = [
	{
		label: 'id',
		value: info => info.avm_id
	}, {
		label: 'owner',
		value: info => info.avm_owner
	}, {
		label: 'status',
		value: info => info.avm_status
	}, {
		label: 'machine type',
		value: info => info.image
	}, {
		label: 'creation time',
		value: info => (new Date(info.ts_created)).toLocaleString()
	}
];

const PanelSessionDetails = class extends React.Component {

	render() {
		const styles = {
			paper: {
			},
			icon: {margin: '10px 0 10px 10px', verticalAlign: 'bottom', cursor: 'auto'},
			separator: {margin: '0 10px 12px -2px', height: 25},
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
			field: {minWidth: 100, display: 'inline-block', lineHeight: '20px', margin: 0, padding: '10px 9px'},
			value: {color: 'rgba(0, 0, 0, 0.5)'},
			insetBlock: {margin: '-42px 0 0 48px'},
			insetBlockAPK: {margin: '-42px 0 0 55px', minHeight: 40},
			infoBlock: {clear: 'both'}
		};

		// TODO: should check all other panels for the style presence
		if (this.props.style) {
			styles.paper = Object.assign({}, styles.paper, this.props.style);
		}

		const iconColor = 'rgba(0, 0, 0, 0.4)';
		const iconHoverColor = 'rgba(0, 0, 0, 0.4)';
		const infoRendered = infos.map(info => {
			const infoCamel = str(info.tooltip).capitalize().camelize().s;
			const fieldRendered = info.fields ? info.fields.map((field, index) => {
				const idCamel = str(field.label).capitalize().camelize().s;
				return (
					<span className="sp1ABC" style={styles.field} key={index}>
						<label className={`lbLiveInfo${infoCamel}${idCamel}`} style={styles.label}>{field.label}</label>
						<span className={`spLiveInfo${infoCamel}${idCamel}`} style={styles.value}>{field.value(this.props.properties)}</span>
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
				<div key={info.id} className={`divLiveInfo${infoCamel}`}>
					<IconButton tooltip={info.tooltip}>
						{icon}
					</IconButton>
					{fieldRendered}
				</div>
			);
		});

		const apkListRendered = this.props.apkList ? this.props.apkList.map((apk, index) => {
			const apkCamel = str(apk).capitalize().camelize().s;
			return (
				<span className="sp1ABC" style={styles.field} key={index}>
					<label className={`lbLiveInfoAPK lbLiveInfoAPK${index} lbLiveInfoAPK${apkCamel}`} style={styles.label}>package name</label>
					<span className={`spLiveInfoAPK spLiveInfoAPK${index} spLiveInfoAPK${apkCamel}`} style={styles.value}>{apk}</span>
				</span>
			);
		}) : null;

		const avmInfoRendered = this.props.avmInfo ? avmInfoOrder.map((field, index) => {
			const idCamel = str(field.label).capitalize().camelize().s;
			return (
				<span className="sp1ABC" style={styles.field} key={index}>
					<label className={`lbLiveInfo${idCamel}`} style={styles.label}>{field.label}</label>
					<span className={`spLiveInfo${idCamel}`} style={styles.value}>{field.value(this.props.avmInfo)}</span>
				</span>
			);
		}) : null;

		return (
			<Paper style={styles.paper} zDepth={1}>
				<div style={styles.infoBlock}>
					<IconButton tooltip="machine information">
						<FontIcon style={styles.icon} className="mdi mdi-information" color="rgba(0, 0, 0, 0.4)"/>
					</IconButton>
					<ToolbarSeparator style={styles.separator}/>
					{avmInfoRendered}
				</div>
				<div style={styles.infoBlock}>
					<IconButton tooltip="sensors">
						<FontIcon style={styles.icon} className="mdi mdi-map-marker" color="rgba(0, 0, 0, 0.4)"/>
					</IconButton>
					<ToolbarSeparator style={styles.separator}/>
					<div style={styles.insetBlock}>
					{infoRendered}
					</div>
				</div>
				<div style={styles.infoBlock}>
					<IconButton tooltip="installed APKs">
						<FontIcon style={styles.icon} className="mdi mdi-puzzle" color="rgba(0, 0, 0, 0.4)"/>
					</IconButton>
					<ToolbarSeparator style={styles.separator}/>
					<div style={styles.insetBlockAPK}>
					{apkListRendered}
					</div>
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
	properties: React.PropTypes.object,
	apkList: React.PropTypes.array,
	avmInfo: React.PropTypes.object
};

module.exports = PanelSessionDetails;
