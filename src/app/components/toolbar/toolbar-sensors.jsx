'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

// APP
import VoiceSVG from 'app/components/icons/voice';
import GravitySVG from 'app/components/icons/gravity';
import iconList from 'app/components/icons/icon-list';

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

		const buttons = [
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

		const renderedButtons = iconList({
			buttons,
			style: styles.button,
			onClick: this.props.onClick,
			iconClassNamePrefix: 'btLiveSensor',
			selectedId: this.props.secondBar
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
	secondBar: React.PropTypes.string,
	onClick: React.PropTypes.object,
	onClickBack: React.PropTypes.func
};

module.exports = ToolbarSensors;
