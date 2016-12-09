'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import LabeledSpan from 'app/components/form/labeled-span';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButtonApp from 'app/components/icon/icon-button-app';
import DeviceIcon from 'app/components/icon/device-icon';
import {sensors} from 'app/libs/sensors';

const debug = require('debug')('AiC:Components:Dialog:DialogLiveCreation');

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

const DialogLiveCreation = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// Default configuration
			config: {
				name: '',
				image: getFirstImage(props),
				size: '800x600',
				dpi: '160',
				enableSensors: true,
				enableBattery: true,
				enableGps: true,
				enableCamera: true,
				enableRecord: true,
				enableGsm: true,
				enableNfc: false
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

	handleStart = () => {
		this.props.onStart(this.state.config);
	}

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

	render() {
		// TODO: treat all the other conflict fields inside ...other
		const {
			open,
			onCancel,
			...others
		} = this.props;
		const colorOn = this.context.muiTheme.palette.primary1Color;
		const colorOff = this.context.muiTheme.palette.disabledColor;
		const styleSizes = {textTransform: 'none'};

		const actionsButtons = [
			<RaisedButton secondary label="Start" key="start" onClick={this.handleStart}/>,
			<FlatButton style={{marginLeft: 10}} label="Cancel" key="cancel" onClick={onCancel}/>];

		const sensorButtons = sensors.map(s => {
			return (
				<IconButton
					key={s.key}
					data-sensor-key={s.key}
					onClick={this.handleClickSensors}
					iconStyle={{color: this.state.config[s.key] ? colorOn : colorOff}}
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
			<Dialog {...others} open={open} title="Start session" actions={actionsButtons} autoScrollBodyContent onRequestClose={onCancel}>
				<TextField name="createLiveSessionName" data-config-key="name" ref={this.setRefC} floatingLabelFixed floatingLabelText="session name" onChange={this.handleChangeConfig} defaultValue={this.state.config.name}/><br/>
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
			</Dialog>
		);
	}
};

DialogLiveCreation.contextTypes = {
	muiTheme: React.PropTypes.object
};

DialogLiveCreation.defaultProps = {
	open: true,
	onCancel: () => {},
	onStart: () => {},
	images: [{image: 'kitkat-phone'}, {image: 'kitkat-tablet'}, {image: 'lollipop-phone'}, {image: 'lollipop-tablet'}]
};

DialogLiveCreation.propTypes = {
	open: React.PropTypes.bool,
	onCancel: React.PropTypes.func,
	onStart: React.PropTypes.func,
	images: React.PropTypes.array
};

module.exports = DialogLiveCreation;
