const sensors = [
	{key: 'enableSensors', tooltip: 'sensors', iconClassName: 'mdi mdi-compass'},
	{key: 'enableBattery', tooltip: 'battery', iconClassName: 'mdi mdi-battery'},
	{key: 'enableGps', tooltip: 'GPS', iconClassName: 'mdi mdi-map-marker'},
	{key: 'enableCamera', tooltip: 'camera', iconClassName: 'mdi mdi-camera'},
	// {key: 'enableRecord', tooltip: 'screen capture', iconClassName: 'mdi mdi-file-video'},
	{key: 'enableGsm', tooltip: 'GSM', iconClassName: 'mdi mdi-phone'},
	{key: 'enableNfc', tooltip: 'NFC', iconClassName: 'mdi mdi-nfc'}
];

const getEnabledSensors = info => {
	const enabled = [];
	sensors.forEach(sensor => {
		if (info[sensor.key]) {
			enabled.push(sensor.tooltip);
		}
	});
	return enabled.join(', ');
};

export {
	sensors,
	getEnabledSensors
};
