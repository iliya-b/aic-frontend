'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import DeviceIcon from 'app/components/icon/device-icon';
import LabeledSpan from 'app/components/form/labeled-span';
import IconButtonApp from 'app/components/icon/icon-button-app';
import {getEnabledSensors} from 'app/libs/sensors';
// import {capitalize} from 'app/libs/helpers';

// const debug = require('debug')('AiC:Components:Panel:PanelAndroidConfig');

const PanelAndroidConfig = props => {
	const {
		image,
		size, // eslint-disable-line no-unused-vars
		dpi, // eslint-disable-line no-unused-vars
		enableSensors, // eslint-disable-line no-unused-vars
		enableBattery, // eslint-disable-line no-unused-vars
		enableGps, // eslint-disable-line no-unused-vars
		enableCamera, // eslint-disable-line no-unused-vars
		enableRecord, // eslint-disable-line no-unused-vars
		enableGsm, // eslint-disable-line no-unused-vars
		enableNfc, // eslint-disable-line no-unused-vars
		onClickRemove,
		...other
	} = props;

	// const sensorIcons = sensors.filter(s => {
	// 	debug(`enable${capitalize(s)}`);
	// 	return props[s.key];
	// }).map(s => {
	// 	return (
	// 		<IconButtonApp
	// 			key={s.key}
	// 			on
	// 			primary
	// 			tooltip={s.tooltip}
	// 			iconClassName={s.iconClassName}
	// 			style={{cursor: 'initial'}}
	// 			/>
	// 	);
	// });
	const styleWrapper = {
		padding: '0 50px 5px 10px',
		position: 'relative',
		marginTop: 10
	};
	const styleLabel = {
	};
	const styleLabelLast = {
		marginRight: 0
	};
	const styleIcon = {
		margin: '3px 17px 7px 10px',
		width: 33
	};
	const styleButton = {
		position: 'absolute',
		top: 2,
		right: 0
	};

	// const showSensors = sensorIcons.length > 0;
	let sensorsText = getEnabledSensors(props);
	// const sensorsText = getEnabledSensors({enableBattery: true});
	sensorsText = sensorsText ? sensorsText : ' ';
	return (
		<Paper style={styleWrapper} zDepth={1} {...other}>
			<DeviceIcon style={styleIcon} isOn image={image}/>
			<LabeledSpan style={styleLabel} label="device" off value={image.replace('-', ' ')}/>
			<LabeledSpan style={styleLabel} label="screen size" off value={size}/>
			<LabeledSpan style={styleLabel} label="screen dpi" off value={dpi}/>
			<LabeledSpan style={styleLabelLast} label="enabled sensors" off value={sensorsText}/>
			<IconButtonApp
				raised
				tooltip="Remove"
				tooltipPosition="top-center"
				iconClassName="mdi mdi-delete"
				style={styleButton}
				data-config-id={props['data-config-id']}
				onClick={onClickRemove}
				/>
		</Paper>
	);
};

PanelAndroidConfig.propTypes = {
	'image': React.PropTypes.string,
	'size': React.PropTypes.string,
	'dpi': React.PropTypes.string,
	'enableSensors': React.PropTypes.bool,
	'enableBattery': React.PropTypes.bool,
	'enableGps': React.PropTypes.bool,
	'enableCamera': React.PropTypes.bool,
	'enableRecord': React.PropTypes.bool,
	'enableGsm': React.PropTypes.bool,
	'enableNfc': React.PropTypes.bool,
	'data-config-id': React.PropTypes.any,
	'onClickRemove': React.PropTypes.func
};

module.exports = PanelAndroidConfig;
