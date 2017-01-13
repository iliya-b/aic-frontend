'use strict';

import React from 'react';
import LabeledSpan from 'app/components/form/labeled-span';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButtonApp from 'app/components/icon/icon-button-app';
import DeviceIcon from 'app/components/icon/device-icon';
import {sensors} from 'app/libs/sensors';
import {
	isValidResDpi,
	calcMaxValidSizeByDpi,
	calcMinValidDpiBySize,
	getArrMaxSize,
	getArrMinDpi,
	sizes,
	dpis,
	getSize
} from 'app/libs/dpi';

const debug = require('debug')('AiC:Components:Panel:PanelAndroidCreateConfig');

const getFirstImage = props => {
	return ((props.images && props.images.length) ? props.images[0].image : '');
};

const validateField = {
	size: sizeValue => {
		if (sizeValue === '') {
			throw new Error('Select a valid screen size.');
		}
		const r = /^[0-9]+x[0-9]+$/;
		const valid = r.exec(sizeValue);
		if (!valid) {
			throw new Error('Screen size should be "widthxheight".');
		}
		const sizes = getSize(sizeValue);
		if (sizes.width < 320 || sizes.height < 320) {
			throw new Error('Screen size should be at least 320.');
		}
		return true;
	},
	dpi: dpiValue => {
		if (dpiValue === '') {
			throw new Error('Select a valid screen DPI.');
		}
		let dpiValueInt;
		try {
			dpiValueInt = parseInt(dpiValue, 10);
		} catch (err) {
			throw new Error('Screen DPI should be a number.');
		}
		if (dpiValueInt < 160) {
			throw new Error('Screen DPI should be at least 160.');
		}
		return true;
	}
};

const PanelAndroidCreateConfig = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// Default configuration
			config: {
				image: getFirstImage(props),
				size: sizes[2],
				dpi: dpis[0],
				enableSensors: true,
				enableBattery: true,
				enableGps: true,
				enableCamera: true,
				enableRecord: true,
				enableGsm: true,
				enableNfc: false
			},
			customSize: false,
			customDpi: false,
			sizeErrorText: null,
			dpiErrorText: null
		};
		this.refsC = {};
	}

	udpdateConfig = (config, value) => {
		const newStateConfig = Object.assign({}, this.state.config);
		const extraStateProps = {};
		newStateConfig[config] = value;
		debug('udpdateConfig', {config, value, newStateConfig});

		// Verify config
		try {
			const isFieldValid = validateField[config](value);
			if (isFieldValid) {
				extraStateProps[`${config}ErrorText`] = null;
			}
		} catch (err) {
			debug('err', err);
			extraStateProps[`${config}ErrorText`] = err.message;
		}

		let errors = Object.assign({}, this.state, extraStateProps);
		const isValidConfig = errors.dpiErrorText === null && errors.sizeErrorText === null;
		if (isValidConfig) {
			const isValidConfigResDpi = isValidResDpi(newStateConfig.size, newStateConfig.dpi);
			debug('isValidConfigResDpi', isValidConfigResDpi);
			if (!isValidConfigResDpi) {
				if (config === 'dpi') {
					const possibleSize = calcMaxValidSizeByDpi(parseInt(newStateConfig.dpi, 10));
					const possibleSizeArr = getArrMaxSize(possibleSize);
					if (possibleSizeArr) {
						newStateConfig.size = possibleSizeArr;
						extraStateProps.customSize = false;
					} else {
						newStateConfig.size = possibleSize;
						extraStateProps.customSize = true;
						extraStateProps.sizeValue = newStateConfig.size;
						extraStateProps.sizeErrorText = null;
					}
				} else {
					const possibleDpi = calcMinValidDpiBySize(newStateConfig.size);
					const possibleDpiArr = getArrMinDpi(possibleDpi);
					if (possibleDpiArr) {
						newStateConfig.dpi = possibleDpiArr;
						extraStateProps.customDpi = false;
					} else {
						newStateConfig.dpi = possibleDpi;
						extraStateProps.customDpi = true;
						extraStateProps.dpiValue = newStateConfig.dpi;
						extraStateProps.dpiErrorText = null;
					}
				}
			}
		}

		const newState = Object.assign({config: newStateConfig}, extraStateProps);
		debug('state', newState);
		this.setState(newState);
		if (this.props.onChange) {
			errors = Object.assign({}, this.state, extraStateProps);
			const isValidConfig = errors.dpiErrorText === null && errors.sizeErrorText === null;
			this.props.onChange(newStateConfig, isValidConfig);
		}
	}

	handleClickSensors = e => {
		const sensorKey = e.currentTarget.dataset.sensorKey;
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

	getButtonsDevices = () => {
		if (this.props.images) {
			return this.props.images.map(image => image.image).map(image => {
				return (
					<IconButtonApp key={image} onClick={this.handleClickConfig} data-config-key="image" data-config-value={image} tooltip={image.replace('-', ' ')}>
						<DeviceIcon isOn={this.state.config.image === image} image={image}/>
					</IconButtonApp>
				);
			});
		}
		return [];
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.images.length && this.state.config.image === '') {
			this.setState({config: Object.assign({}, this.state.config, {image: getFirstImage(nextProps)})});
		}
	}

	componentDidMount() {
		if (this.props.onChange) {
			this.props.onChange(this.state.config, true);
		}
	}

	render() {
		const {
			images, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			...other
		} = this.props;
		const styleSizes = {textTransform: 'none'};

		const sensorButtons = sensors.map(s => {
			return (
				<IconButtonApp
					key={s.key}
					data-sensor-key={s.key}
					onClick={this.handleClickSensors}
					on={this.state.config[s.key]}
					off={!this.state.config[s.key]}
					primary
					tooltip={s.tooltip}
					iconClassName={s.iconClassName}
					/>
			);
		});

		const styleBts = {margin: '6px 0 6px 0', float: 'left'};
		const styleBtsInvalid = {margin: '6px 0 6px 0', color: '#bbb', float: 'left'};
		const styleLabels = {paddingTop: 14, width: 256, clear: 'both', display: 'block'};

		const sizeButtons = sizes.map(s => {
			if (!this.state.customSize && s === this.state.config.size) {
				return <RaisedButton style={styleBts} primary key={s} onClick={this.handleClickConfig} data-config-key="size" data-config-value={s} labelStyle={styleSizes} label={s}/>;
			}
			return <FlatButton style={isValidResDpi(s, this.state.config.dpi) ? styleBts : styleBtsInvalid} key={s} onClick={this.handleClickConfig} data-config-key="size" data-config-value={s} labelStyle={styleSizes} label={s}/>;
		});

		const dpiButtons = dpis.map(s => {
			if (!this.state.customDpi && s === this.state.config.dpi) {
				return <RaisedButton style={styleBts} primary key={s} onClick={this.handleClickConfig} data-config-key="dpi" data-config-value={s} labelStyle={styleSizes} label={s}/>;
			}
			return <FlatButton style={isValidResDpi(this.state.config.size, s) ? styleBts : styleBtsInvalid} key={s} onClick={this.handleClickConfig} data-config-key="dpi" data-config-value={s} labelStyle={styleSizes} label={s}/>;
		});

		const devices = this.getButtonsDevices();

		return (
			<div {...other}>
				<LabeledSpan label="device" off style={styleLabels}/><br/>
				{devices}
				<br/>
				<LabeledSpan label="screen size" off style={styleLabels}/><br/>
				{sizeButtons}
				{!this.state.customSize && <FlatButton style={styleBts} label="custom" onClick={this.handleClickCustomSize}/>}
				{this.state.customSize && <TextField name="createLiveSessionSize" errorText={this.state.sizeErrorText} value={this.state.config.size} data-config-key="size" ref={this.setRefC} onChange={this.handleChangeConfig}/>}
				<br/>
				<LabeledSpan label="screen dpi" off style={styleLabels}/><br/>
				{dpiButtons}
				{!this.state.customDpi && <FlatButton style={styleBts} label="custom" onClick={this.handleClickCustomDpi}/>}
				{this.state.customDpi && <TextField name="createLiveSessionDpi" errorText={this.state.dpiErrorText} value={this.state.config.dpi} data-config-key="dpi" ref={this.setRefC} onChange={this.handleChangeConfig}/>}
				<br/>
				<LabeledSpan label="enabled sensors" off style={styleLabels}/><br/>
				{sensorButtons}
			</div>
		);
	}
};

PanelAndroidCreateConfig.defaultProps = {
	images: [{image: 'kitkat-phone'}, {image: 'kitkat-tablet'}, {image: 'lollipop-phone'}, {image: 'lollipop-tablet'}]
};

PanelAndroidCreateConfig.propTypes = {
	images: React.PropTypes.array,
	onChange: React.PropTypes.func
};

module.exports = PanelAndroidCreateConfig;
