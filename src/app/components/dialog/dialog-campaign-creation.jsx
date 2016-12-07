'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import LabeledSpan from 'app/components/form/labeled-span';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButtonApp from 'app/components/icon/icon-button-app';
import SelectTextField from 'app/components/form/select-text-field';
import PanelAndroidCreateConfig from 'app/components/panel/panel-android-create-config';
import PanelAndroidConfig from 'app/components/panel/panel-android-config';

const debug = require('debug')('AiC:Components:Dialog:DialogCampaignCreation');

const DialogCampaignCreation = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// Default configuration
			config: {
				name: '',
				devices: [],
				apks: [],
				packages: []
			},
			isChosingDevice: false,
			deviceConfig: null
		};
		this.refsC = {};
	}

	udpdateConfig = (config, value) => {
		const newStateConfig = Object.assign({}, this.state.config);
		if (Array.isArray(newStateConfig[config]) && config !== 'apks' && config !== 'packages') {
			const posConfig = newStateConfig[config].indexOf(value);
			if (posConfig === -1) {
				newStateConfig[config].push(value);
			} else {
				newStateConfig[config].splice(posConfig, 1);
			}
		} else {
			newStateConfig[config] = value;
		}
		debug('udpdateConfig', config, value, {config: newStateConfig});
		this.setState({config: newStateConfig});
	}

	handleDatasetConfig = element => {
		const configKey = element.dataset.configKey;
		const configValue = element.dataset.configValue;
		this.udpdateConfig(configKey, configValue);
	}

	handleClickConfig = e => {
		debug('handleClickConfig', e.currentTarget);
		this.handleDatasetConfig(e.currentTarget);
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

	handleStart = () => {
		this.props.onStart(this.state.config);
	}

	handleChangeAPKs = newSelection => {
		this.udpdateConfig('apks', newSelection);
	}

	handleChangePackages = newSelection => {
		this.udpdateConfig('packages', newSelection);
	}

	handleClickDeviceOpen = () => {
		this.setState({isChosingDevice: true});
	}

	handleClickDeviceClose = () => {
		this.setState({isChosingDevice: false});
	}

	handleClickDeviceSelect = () => {
		this.udpdateConfig('devices', this.state.deviceConfig);
		this.setState({isChosingDevice: false});
	}

	handleChangeDeviceConfig = newConfig => {
		debug('newConfig', newConfig);
		this.setState({deviceConfig: newConfig});
	}

	handleDeleteDevice = e => {
		const deviceIndex = parseInt(e.currentTarget.dataset.configId, 10);
		const newStateConfig = Object.assign({}, this.state.config);
		newStateConfig.devices = this.state.config.devices.slice();
		newStateConfig.devices.splice(deviceIndex, 1);
		this.setState({config: newStateConfig});
	}

	render() {
		// TODO: treat all the other conflict fields inside ...other
		const {
			open,
			onCancel,
			onStart, // eslint-disable-line no-unused-vars
			apks, // eslint-disable-line no-unused-vars
			images, // eslint-disable-line no-unused-vars
			...others
		} = this.props;

		const actionsButtons = [];

		if (this.state.isChosingDevice) {
			actionsButtons.push([
				<RaisedButton secondary label="Select" key="select" onClick={this.handleClickDeviceSelect}/>,
				<FlatButton style={{marginLeft: 10}} label="Return" key="Return" onClick={this.handleClickDeviceClose}/>
			]);
		} else {
			actionsButtons.push([
				<RaisedButton secondary label="Start" key="start" onClick={this.handleStart}/>,
				<FlatButton style={{marginLeft: 10}} label="Cancel" key="cancel" onClick={onCancel}/>
			]);
		}

		const styleLabels = {paddingTop: 14, width: 256};

		const devices = this.state.config.devices.map((deviceInfo, i) => (
			<PanelAndroidConfig onClickRemove={this.handleDeleteDevice} data-config-id={i} key={i} {...deviceInfo}/>
		));

		const apksMenu = this.props.apks
			.filter(apk => apk.status === 'READY')
			.map(apk => ({value: apk.id, label: apk.filename}));

		return (
			<Dialog {...others} open={open} title={`${this.state.isChosingDevice ? 'Choose device' : 'Start campaign'}`} actions={actionsButtons} autoScrollBodyContent onRequestClose={onCancel}>
				{!this.state.isChosingDevice &&
					<div>
						<TextField
							name="createCampaignName"
							data-config-key="name"
							ref={this.setRefC}
							floatingLabelFixed
							floatingLabelText="campaign name"
							onChange={this.handleChangeConfig}
							defaultValue={this.state.config.name}
							/><br/>
						<LabeledSpan label="devices" off style={styleLabels}/><br/>
						<div>
							{devices}
							<IconButtonApp primary tooltip="Add device" iconClassName="mdi mdi-plus" onClick={this.handleClickDeviceOpen}/>
						</div>
						<LabeledSpan label="APKs" off style={styleLabels}/><br/>
						<SelectTextField
							name="startCampaignAPKs"
							onChange={this.handleChangeAPKs}
							hintText="Select APKs"
							style={{position: 'initial', width: '100%'}}
							menuStyle={{width: 'calc(100% - 50px)'}}
							items={apksMenu}
							multiple
							initialValue={this.state.config.apks}
							/>
					</div>}
				{this.state.isChosingDevice &&
					<div>
						<PanelAndroidCreateConfig images={images} onChange={this.handleChangeDeviceConfig}/>
					</div>}
			</Dialog>
		);
	}
};

DialogCampaignCreation.contextTypes = {
	muiTheme: React.PropTypes.object
};

DialogCampaignCreation.defaultProps = {
	open: true,
	images: [{image: 'kitkat-phone'}, {image: 'kitkat-tablet'}, {image: 'lollipop-phone'}, {image: 'lollipop-tablet'}],
	apks: [],
	onCancel: () => {},
	onStart: () => {}
};

DialogCampaignCreation.propTypes = {
	open: React.PropTypes.bool,
	onCancel: React.PropTypes.func,
	onStart: React.PropTypes.func,
	apks: React.PropTypes.array,
	images: React.PropTypes.array
};

module.exports = DialogCampaignCreation;
