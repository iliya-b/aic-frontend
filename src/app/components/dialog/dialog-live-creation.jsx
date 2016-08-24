'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import LabeledSpan from 'app/components/form/labeled-span';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const debug = require('debug')('AiC:Components:Panel:PanelLiveCreation');

// References:
// https://developer.android.com/about/dashboards/index.html
// https://developer.android.com/guide/practices/screens_support.html

const sensors = [
	{key: 'Sensors', tooltip: 'sensors', iconClassName: 'mdi mdi-compass'},
	{key: 'Battery', tooltip: 'battery', iconClassName: 'mdi mdi-battery'},
	{key: 'Gps', tooltip: 'GPS', iconClassName: 'mdi mdi-map-marker'},
	{key: 'Camera', tooltip: 'camera', iconClassName: 'mdi mdi-camera'},
	// {key: 'Record', tooltip: 'screen capture', iconClassName: 'mdi mdi-file-video'},
	{key: 'Gsm', tooltip: 'GSM', iconClassName: 'mdi mdi-phone'},
	{key: 'Nfc', tooltip: 'NFC', iconClassName: 'mdi mdi-nfc'}
];

const sizes = [
	'320x480', '480x800', '800x600', '1280x800'
];

const dpis = [
	'120', '160', '240', '320'
];

const configSensorKey = key => `enable${key}`;

const DialogLiveCreation = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// Default configuration
			config: {
				name: '',
				version: 'kitkat',
				type: 'phone',
				size: '800x600',
				dpi: '120',
				enableSensors: true,
				enableBattery: true,
				enableGps: true,
				enableCamera: true,
				enableRecord: true,
				enableGsm: true,
				enableNfc: true
			},
			customSize: false,
			customDpi: false
		};
		this.refsC = {};
	}

	udpdateConfig = (config, value) => {
		const newStateConfig = Object.assign({}, this.state.config);
		newStateConfig[config] = value;
		debug('udpdateConfig', config, value, {config: newStateConfig});
		this.setState({config: newStateConfig});
	}

	handleClickSensors = e => {
		const sensorKey = configSensorKey(e.currentTarget.dataset.sensorKey);
		const sensorValue = !this.state.config[sensorKey];
		this.udpdateConfig(sensorKey, sensorValue);
	}

	handleClickConfig = e => {
		const configKey = e.currentTarget.dataset.configKey;
		const configValue = e.currentTarget.dataset.configValue;
		this.udpdateConfig(configKey, configValue);
		if (configKey === 'size') {
			this.setState({customSize: false});
		}
		if (configKey === 'dpi') {
			this.setState({customDpi: false});
		}
	}

	handleChangeConfig = e => {
		debug('handleChangeConfig', e.currentTarget.dataset, e.currentTarget, this.refName);
		const configKey = e.currentTarget.dataset.configKey;
		const configValue = this.refsC[configKey].getValue();
		this.udpdateConfig(configKey, configValue);
	}

	setRefC = c => {
		debug('setRefC', c);
		if (c) {
			this.refsC[c.props['data-config-key']] = c;
			c.focus();
		}
	}

	handleClickCustomSize = () => this.setState({customSize: true});
	handleClickCustomDpi = () => this.setState({customDpi: true});

	handleStart = () => {
		this.props.onStart(this.state.config);
	}

	render() {
		// TODO: treat all the other conflict fields inside ...other
		const {
			open,
			onCancel,
			...others
		} = this.props;
		const colorOn = this.context.muiTheme.palette.primary1Color;
		const colorOff = this.context.muiTheme.palette.disabledColor;

		const imgOffFilter = 'grayscale(1) opacity(0.5)';
		const imgOff = {
			WebkitFilter: imgOffFilter,
			MozFilter: imgOffFilter,
			msFilter: imgOffFilter,
			OFilter: imgOffFilter,
			filter: imgOffFilter
		};

		const iconStyleKitkat = Object.assign({width: 23, height: 28}, this.state.config.version === 'kitkat' ? {} : imgOff);
		const iconStyleLollipop = Object.assign({width: 32, height: 28}, this.state.config.version === 'lollipop' ? {} : imgOff);
		const styleSizes = {textTransform: 'none'};

		const iconStylePhone = {color: this.state.config.type === 'phone' ? colorOn : colorOff};
		const iconStyleTablet = {color: this.state.config.type === 'tablet' ? colorOn : colorOff};

		const actionsButtons = [
			<RaisedButton secondary label="Start" key="start" onClick={this.handleStart}/>,
			<FlatButton style={{marginLeft: 10}} label="Cancel" key="cancel" onClick={onCancel}/>];

		const sensorButtons = sensors.map(s => {
			return (
				<IconButton
					key={s.key}
					data-sensor-key={s.key}
					onClick={this.handleClickSensors}
					iconStyle={{color: this.state.config[configSensorKey(s.key)] ? colorOn : colorOff}}
					tooltip={s.tooltip}
					iconClassName={s.iconClassName}
					/>
			);
		});

		const styleBts = {margin: '6px 0 6px 0'};
		const styleLabels = {paddingTop: 14, width: 256};

		const sizeButtons = sizes.map(s => {
			if (!this.state.customSize && s === this.state.config.size) {
				return <RaisedButton primary key={s} onClick={this.handleClickConfig} data-config-key="size" data-config-value={s} labelStyle={styleSizes} label={s}/>;
			}
			return <FlatButton style={styleBts} key={s} onClick={this.handleClickConfig} data-config-key="size" data-config-value={s} labelStyle={styleSizes} label={s}/>;
		});

		const dpiButtons = dpis.map(s => {
			if (!this.state.customDpi && s === this.state.config.dpi) {
				return <RaisedButton primary key={s} onClick={this.handleClickConfig} data-config-key="dpi" data-config-value={s} labelStyle={styleSizes} label={s}/>;
			}
			return <FlatButton style={styleBts} key={s} onClick={this.handleClickConfig} data-config-key="dpi" data-config-value={s} labelStyle={styleSizes} label={s}/>;
		});

		return (
			<Dialog {...others} open={open} title="Start session" actions={actionsButtons} autoScrollBodyContent onRequestClose={onCancel}>
				<TextField name="createLiveSessionName" data-config-key="name" ref={this.setRefC} floatingLabelFixed floatingLabelText="session name" onChange={this.handleChangeConfig} defaultValue={this.state.config.name}/><br/>
				<LabeledSpan label="android version" off style={styleLabels}/><br/>
				<IconButton onClick={this.handleClickConfig} data-config-key="version" data-config-value="kitkat" tooltip="kitkat" iconStyle={iconStyleKitkat}>
					<img src="/img/kitkat.png"/>
				</IconButton>
				<IconButton onClick={this.handleClickConfig} data-config-key="version" data-config-value="lollipop" tooltip="lollipop" iconStyle={iconStyleLollipop}>
					<img src="/img/lollipop.png"/>
				</IconButton><br/>
				<LabeledSpan label="device type" off style={styleLabels}/><br/>
				<IconButton onClick={this.handleClickConfig} data-config-key="type" data-config-value="phone" iconStyle={iconStylePhone} tooltip="phone" iconClassName="mdi mdi-cellphone-android"/>
				<IconButton onClick={this.handleClickConfig} data-config-key="type" data-config-value="tablet" iconStyle={iconStyleTablet} tooltip="tablet" iconClassName="mdi mdi-tablet"/><br/>
				<LabeledSpan label="screen size" off style={styleLabels}/><br/>
				{sizeButtons}
				{!this.state.customSize && <FlatButton label="custom" onClick={this.handleClickCustomSize}/>}
				{this.state.customSize && <TextField name="createLiveSessionSize" data-config-key="size" ref={this.setRefC} onChange={this.handleChangeConfig}/>}
				<br/>
				<LabeledSpan label="screen dpi" off style={styleLabels}/><br/>
				{dpiButtons}
				{!this.state.customDpi && <FlatButton label="custom" onClick={this.handleClickCustomDpi}/>}
				{this.state.customDpi && <TextField name="createLiveSessionDpi" data-config-key="dpi" ref={this.setRefC} onChange={this.handleChangeConfig}/>}
				<br/>
				<LabeledSpan label="enabled sensors" off style={styleLabels}/><br/>
				{sensorButtons}
			</Dialog>
		);
	}
};

DialogLiveCreation.contextTypes = {
	muiTheme: React.PropTypes.object
};

DialogLiveCreation.defaultProps = {
	open: true
};

DialogLiveCreation.propTypes = {
	open: React.PropTypes.bool,
	onCancel: React.PropTypes.func,
	onStart: React.PropTypes.func
};

module.exports = DialogLiveCreation;
