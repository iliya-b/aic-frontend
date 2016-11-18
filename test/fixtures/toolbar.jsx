const ToolbarAccelerometerProps = [{
	props: {accelerometer: {x: 1, y: 2, z: 3}}
}];

const ToolbarAndroidProps = [{
	props: {onClick: {android: () => {}}}
}];

const PanelAPKInstallProps = [{
	props: {apkList: []}
}];

const ToolbarBatteryProps = [{
	props: {battery: {level_percent: 80}} // eslint-disable-line camelcase
}];

const ToolbarGPSProps = [{
	props: {gps: {latitude: 42, longitude: 8}}
}];

const ToolbarGSMProps = [{
	props: {onClick: {android: () => {}}}
}];

const ToolbarScreenProps = [{
	props: {onClick: {android: () => {}}}
}];

const ToolbarSensorsProps = [{
	props: {onClick: {android: () => {}}}
}];

const componentsProps = {
	ToolbarAccelerometer: ToolbarAccelerometerProps,
	ToolbarAndroid: ToolbarAndroidProps,
	PanelAPKInstall: PanelAPKInstallProps,
	ToolbarBattery: ToolbarBatteryProps,
	ToolbarGPS: ToolbarGPSProps,
	ToolbarGSM: ToolbarGSMProps,
	ToolbarScreen: ToolbarScreenProps,
	ToolbarSensors: ToolbarSensorsProps
};

module.exports = componentsProps;
