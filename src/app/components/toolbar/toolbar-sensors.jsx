'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import slug from 'slug';

// APP
import VoiceSVG from 'app/components/icons/voice';
import GravitySVG from 'app/components/icons/gravity';

const ToolbarSensors = class extends React.Component {

	render() {
		const styles = {
			button: {
				marginTop: 5,
				float: 'left'
			},
			separator: {
				margin: '0 5px 0 0px'
			}
		};

		const SVGs = {
			VoiceSVG,
			GravitySVG
		};

		const buttons = [
			{
				id: 'gps',
				name: 'GPS',
				tooltip: 'GPS',
				fontIcon: 'mdi mdi-map-marker'
			},
			{
				id: 'battery',
				name: 'Battery',
				tooltip: 'Battery',
				fontIcon: 'mdi mdi-battery-charging-40'
			},
			{
				id: 'accelerometer',
				name: 'Accelerometer',
				tooltip: 'Accelerometer',
				fontIcon: 'mdi mdi-screen-rotation'
			},
			{
				id: 'light',
				name: 'Light',
				tooltip: 'Light',
				fontIcon: 'mdi mdi-white-balance-incandescent'
			},
			{
				id: 'gravity',
				name: 'Gravity',
				tooltip: 'Gravity',
				svgIcon: 'GravitySVG'
			},
			{
				id: 'gyroscope',
				name: 'Gyroscope',
				tooltip: 'Gyroscope',
				fontIcon: 'mdi mdi-crosshairs-gps'
			},
			{
				id: 'linear_acc',
				name: 'LinearAcc',
				tooltip: 'Linear acceleration',
				fontIcon: 'mdi mdi-run'
			},
			{
				id: 'magnetometer',
				name: 'Magnetometer',
				tooltip: 'Magnetometer',
				fontIcon: 'mdi mdi-magnet'
			},
			{
				id: 'orientation',
				name: 'Orientation',
				tooltip: 'Orientation',
				fontIcon: 'mdi mdi-compass'
			},
			{
				id: 'pressure',
				name: 'Pressure',
				tooltip: 'Pressure',
				fontIcon: 'mdi mdi-speedometer'
			},
			{
				id: 'proximity',
				name: 'Proximity',
				tooltip: 'Proximity',
				svgIcon: 'VoiceSVG'
			},
			{
				id: 'relative_humidity',
				name: 'Humidity',
				tooltip: 'Humidity',
				fontIcon: 'mdi mdi-water'
			},
			{
				id: 'temperature',
				name: 'Temperature',
				tooltip: 'Temperature',
				fontIcon: 'mdi mdi-thermometer-lines'
			}
		];

		const renderedButtons = buttons.map((b, i) => {
			const iconColor = i === this.props.selectedIndex ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.4)';
			let icon;
			if (b.fontIcon) {
				icon = <FontIcon className={b.fontIcon} color={iconColor} hoverColor="rgba(0, 0, 0, 0.87)"/>;
			} else if (b.svgIcon) {
				icon = React.createElement(SVGs[b.svgIcon], {color: iconColor, hoverColor: 'rgba(0, 0, 0, 0.87)'});
			}
			return (
				<IconButton className={`btLiveSensor${slug(b.name)}`} key={i} tooltip={b.tooltip} style={styles.button} onClick={this.props.onClick[b.id]}>
					{icon}
				</IconButton>
			);
		});

		return (
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<IconButton className="btLiveBack" tooltip="Back to toolbar" tooltipPosition="bottom-right" style={styles.button} onClick={this.props.onClick.android}>
						<FontIcon className="mdi mdi-arrow-left-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<ToolbarTitle text="Sensors" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{renderedButtons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarSensors.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarSensors.propTypes = {
	style: React.PropTypes.object,
	selectedIndex: React.PropTypes.number,
	onClick: React.PropTypes.object,
	onClickBack: React.PropTypes.func,
	onClickGPS: React.PropTypes.func,
	onClickBattery: React.PropTypes.func,
	onClickAccelerometer: React.PropTypes.func,
	onClickLight: React.PropTypes.func,
	onClickGravity: React.PropTypes.func,
	onClickGyroscope: React.PropTypes.func,
	onClickLinearAcc: React.PropTypes.func,
	onClickMagnetometer: React.PropTypes.func,
	onClickOrientation: React.PropTypes.func,
	onClickPressure: React.PropTypes.func,
	onClickProximity: React.PropTypes.func,
	onClickHumidity: React.PropTypes.func,
	onClickTemperature: React.PropTypes.func
};

module.exports = ToolbarSensors;
