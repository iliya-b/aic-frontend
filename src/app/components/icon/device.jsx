'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const availableAndroidVersions = {
	kitkat: {width: 23, height: 28},
	lollipop: {width: 32, height: 28}
};
const availableTypes = {
	tablet: 'mdi mdi-tablet',
	phone: 'mdi mdi-cellphone-android'
};

const imgOffFilter = {
	kitkat: 'grayscale(1) opacity(0.4)',
	lollipop: 'grayscale(1) opacity(1)'
};

const imgOff = androVersion => {
	return {
		WebkitFilter: imgOffFilter[androVersion],
		MozFilter: imgOffFilter[androVersion],
		msFilter: imgOffFilter[androVersion],
		OFilter: imgOffFilter[androVersion],
		filter: imgOffFilter[androVersion]
	};
};

const DeviceIcon = (props, context) => {
	const {
		isOn,
		image,
		...others
	} = props;

	const device = image.split('-');
	const androidVersion = device[0];
	const deviceType = device[1];

	const colorOn = context.muiTheme.palette.primary1Color;
	const colorOff = context.muiTheme.palette.disabledColor;

	const styleDeviceWrapper = {position: 'relative'};
	const shadowSize = 1;
	const shadowColor = '#fff';
	const styleIconDevice = {
		position: 'absolute',
		color: isOn ? colorOn : colorOff,
		top: 23,
		left: 18,
		textShadow: `-${shadowSize}px -${shadowSize}px ${shadowColor},${shadowSize}px -${shadowSize}px ${shadowColor},-${shadowSize}px ${shadowSize}px ${shadowColor},${shadowSize}px ${shadowSize}px ${shadowColor}`
	};

	let iconAndroid;
	if (androidVersion in availableAndroidVersions) {
		iconAndroid = <img src={`/img/${androidVersion}.png`} style={Object.assign({}, availableAndroidVersions[androidVersion], isOn ? {} : imgOff(androidVersion))}/>;
	} else {
		iconAndroid = <FontIcon className="mdi mdi-help" style={{color: isOn ? colorOn : colorOff}}/>;
	}

	let iconType;
	if (deviceType in availableTypes) {
		iconType = <FontIcon style={styleIconDevice} className={availableTypes[deviceType]}/>;
	} else {
		iconType = <FontIcon style={styleIconDevice} className="mdi mdi-help"/>;
	}

	return (
		<div style={styleDeviceWrapper} {...others}>
			{iconAndroid}
			{iconType}
		</div>
	);
};

DeviceIcon.propTypes = {
	isOn: React.PropTypes.bool,
	image: React.PropTypes.string
};

DeviceIcon.contextTypes = {
	muiTheme: React.PropTypes.object
};

module.exports = DeviceIcon;
