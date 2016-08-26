'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import LabeledSpan from 'app/components/form/labeled-span';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import IconButtonApp from 'app/components/icon/icon-button-app';
import DeviceIcon from 'app/components/icon/device';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const debug = require('debug')('AiC:Components:Dialog:DialogCampaignCreation');

const DialogCampaignCreation = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// Default configuration
			config: {
				name: '',
				images: [],
				apks: []
			},
			isAddingApk: false
		};
		this.refsC = {};
	}

	udpdateConfig = (config, value) => {
		const newStateConfig = Object.assign({}, this.state.config);
		if (Array.isArray(newStateConfig[config])) {
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

	handleClickParentConfig = e => {
		debug('handleClickParentConfig', e.currentTarget.parentNode);
		this.handleDatasetConfig(e.currentTarget.parentNode);
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

	handleToggleApkSelection = () => {
		this.setState({isAddingApk: !this.state.isAddingApk});
	}

	handleAddApk = () => {
		if (this.state.addingApkId) {
			this.udpdateConfig('apks', this.state.addingApkId);
			this.handleToggleApkSelection();
		}
	}

	handleChangeApk = (event, index, value) => {
		this.setState({addingApkId: value});
	}

	getApkName = apkId => {
		return this.props.apks.reduce((p, apk) => {
			return !p && apk.id === apkId ? apk.filename : p;
		}, false);
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

		const styleChip = {margin: 4};
		const styleChipWrapper = {
			display: 'flex',
			flexWrap: 'wrap'
		};
		const styleAddApk = {
			padding: '0 4px',
			margin: '0 8px',
			width: 'auto',
			height: 'auto'
		};

		const actionsButtons = [
			<RaisedButton secondary label="Start" key="start" onClick={this.handleStart}/>,
			<FlatButton style={{marginLeft: 10}} label="Cancel" key="cancel" onClick={onCancel}/>];

		const styleLabels = {paddingTop: 14, width: 256};

		const devices = this.props.images.map(image => image.image).map(image => {
			return (
				<IconButtonApp key={image} onClick={this.handleClickConfig} data-config-key="images" data-config-value={image} tooltip={image.replace('-', ' ')}>
					<DeviceIcon isOn={this.state.config.images.indexOf(image) !== -1} image={image}/>
				</IconButtonApp>
			);
		});

		const apksSelected = this.state.config.apks.map(apkId => {
			return (
				<Chip
					key={apkId}
					style={styleChip}
					onRequestDelete={this.handleClickParentConfig}
					data-config-key="apks"
					data-config-value={apkId}
					>{this.getApkName(apkId)}</Chip>
			);
		});

		const apksMenu = this.props.apks
			.filter(apk => apk.status === 'READY')
			.filter(apk => this.state.config.apks.indexOf(apk.id) === -1)
			.map(apk => {
				return <MenuItem value={apk.id} key={apk.id} primaryText={apk.filename}/>;
			});

		const apkSelection = this.state.isAddingApk ? (
			<div>
				<SelectField value={this.state.addingApkId} onChange={this.handleChangeApk} maxHeight={200}>
					{apksMenu}
				</SelectField>
				<IconButtonApp onClick={this.handleAddApk} style={styleAddApk} iconClassName="mdi mdi-check" secondary/>
			</div>
		) : (
			<IconButtonApp onClick={this.handleToggleApkSelection} style={styleAddApk} iconClassName="mdi mdi-plus" primary={apksMenu.length !== 0} disabled={apksMenu.length === 0}/>
		);

		return (
			<Dialog {...others} open={open} title="Start campaign" actions={actionsButtons} autoScrollBodyContent onRequestClose={onCancel}>
				<TextField name="createCampaignName" data-config-key="name" ref={this.setRefC} floatingLabelFixed floatingLabelText="campaign name" onChange={this.handleChangeConfig} defaultValue={this.state.config.name}/><br/>
				<LabeledSpan label="devices" off style={styleLabels}/><br/>
				{devices}
				<br/>
				<LabeledSpan label="APKs" off style={styleLabels}/><br/>
				<div style={styleChipWrapper}>
					{apksSelected}
					{apkSelection}
				</div>
			</Dialog>
		);
	}
};

DialogCampaignCreation.contextTypes = {
	muiTheme: React.PropTypes.object
};

DialogCampaignCreation.defaultProps = {
	open: true
};

DialogCampaignCreation.propTypes = {
	open: React.PropTypes.bool,
	onCancel: React.PropTypes.func,
	onStart: React.PropTypes.func,
	apks: React.PropTypes.array,
	images: React.PropTypes.array
};

module.exports = DialogCampaignCreation;
