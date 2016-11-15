'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import DeviceIcon from 'app/components/icon/device-icon';
import LabeledSpan from 'app/components/form/labeled-span';
import IconButtonApp from 'app/components/icon/icon-button-app';
import {sensors} from 'app/libs/constants';
import {capitalize} from 'app/libs/helpers';

const debug = require('debug')('AiC:Components:Panel:PanelAndroidConfig');

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
		...other
	} = props;

	const sensorIcons = sensors.filter(s => {
		debug(`enable${capitalize(s)}`);
		return props[s.key];
	}).map(s => {
		return (
			<IconButtonApp
				key={s.key}
				on
				primary
				tooltip={s.tooltip}
				iconClassName={s.iconClassName}
				style={{cursor: 'initial'}}
				/>
		);
	});
	const styleWrapper = {
		display: 'inline-block',
		padding: '5px 10px'
	};
	const styleLabel = {
		width: '100%'
	};
	const styleDelete = {
		float: 'right'
	};

	const showSensors = sensorIcons.length > 0;

	return (
		<Paper style={styleWrapper} zDepth={1} {...other}>
			<IconButtonApp
				secondary
				tooltip="Remove"
				iconClassName="mdi mdi-delete"
				style={styleDelete}
				/>
			<LabeledSpan style={styleLabel} label="device" off/><br/>
			<DeviceIcon isOn image={image}/><br/>
			<LabeledSpan style={styleLabel} label="screen size" off value={size}/><br/>
			<LabeledSpan style={styleLabel} label="screen dpi" off value={dpi}/><br/>
			{showSensors && <div><LabeledSpan style={styleLabel} label="enabled sensors" off/><br/></div>}
			{sensorIcons}
		</Paper>
	);
};

PanelAndroidConfig.propTypes = {
	image: React.PropTypes.string,
	size: React.PropTypes.string,
	dpi: React.PropTypes.string,
	enableSensors: React.PropTypes.bool,
	enableBattery: React.PropTypes.bool,
	enableGps: React.PropTypes.bool,
	enableCamera: React.PropTypes.bool,
	enableRecord: React.PropTypes.bool,
	enableGsm: React.PropTypes.bool,
	enableNfc: React.PropTypes.bool
};

module.exports = PanelAndroidConfig;
