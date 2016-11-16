'use strict';

import React from 'react';
import LabeledSpan from 'app/components/form/labeled-span';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButtonApp from 'app/components/icon/icon-button-app';
import DeviceIcon from 'app/components/icon/device-icon';
import {sensors} from 'app/libs/sensors';

const debug = require('debug')('AiC:Components:Panel:PanelAndroidCreateConfig');

// References:
// https://developer.android.com/about/dashboards/index.html
// https://developer.android.com/guide/practices/screens_support.html

const sizes = [
	'320x480', '480x800', '800x600', '1280x800'
];

const dpis = [
	'160', '240', '320', '480'
];

const getFirstImage = props => {
	return ((props.images && props.images.length) ? props.images[0].image : '');
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
		if (this.props.onChange) {
			this.props.onChange(newStateConfig);
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
			this.props.onChange(this.state.config);
		}
	}

	render() {
		const {
			images, // eslint-disable-line no-unused-vars
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

		const devices = this.getButtonsDevices();

		return (
			<div {...other}>
				<LabeledSpan label="device" off style={styleLabels}/><br/>
				{devices}
				<br/>
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
