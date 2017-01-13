'use strict';

import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import VoiceSVG from 'app/components/icon/voice';
import GravitySVG from 'app/components/icon/gravity';
import IconList from 'app/components/icon/icon-list';

const ToolbarSensors = class extends React.Component {

	render() {
		const styles = {
			toolbar: {
				justifyContent: 'initial'
			},
			button: {
				marginTop: 5
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

		const iconListProps = {
			buttons,
			style: styles.button,
			onClick: this.props.onClick,
			iconClassNamePrefix: 'btLiveSensor',
			selectedId: this.props.secondBar
		};
		const renderedButtons = <IconList {...iconListProps}/>;

		return (
			<Toolbar style={Object.assign(this.props.style || {}, styles.toolbar)}>
				<ToolbarGroup firstChild lastChild>
					<IconButton className="btLiveBack" tooltip="Back to toolbar" tooltipPosition="bottom-right" style={styles.button} onClick={this.props.onClick.android}>
						<FontIcon className="mdi mdi-arrow-left-bold" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<ToolbarTitle text="Sensors" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{renderedButtons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarSensors.propTypes = {
	style: React.PropTypes.object,
	secondBar: React.PropTypes.string,
	onClick: React.PropTypes.object.isRequired,
	onClickBack: React.PropTypes.func
};

module.exports = ToolbarSensors;
