'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PanelAndroidCreateConfig from 'app/components/panel/panel-android-create-config';

const debug = require('debug')('AiC:Components:Dialog:DialogLiveCreation');

const DialogLiveCreation = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			config: {
				name: ''
			},
			deviceConfig: null,
			isValidConfig: null
		};
		this.refsC = {};
	}

	handleChangeDeviceConfig = (newConfig, isValidConfig) => {
		debug('newConfig', newConfig);
		this.setState({deviceConfig: newConfig, isValidConfig});
	}

	udpdateConfig = (config, value) => {
		const newStateConfig = Object.assign({}, this.state.config);
		newStateConfig[config] = value;
		debug('udpdateConfig', config, value, {config: newStateConfig});
		this.setState({config: newStateConfig});
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
		this.props.onStart(Object.assign({}, this.state.config, this.state.deviceConfig));
	}

	render() {
		// TODO: treat all the other conflict fields inside ...other
		const {
			open,
			onCancel,
			images,
			...others
		} = this.props;

		const actionsButtons = [
			<RaisedButton secondary label="Start" disabled={!this.state.isValidConfig} key="start" onClick={this.handleStart}/>,
			<FlatButton style={{marginLeft: 10}} label="Cancel" key="cancel" onClick={onCancel}/>];

		return (
			<Dialog {...others} open={open} title="Start session" actions={actionsButtons} autoScrollBodyContent onRequestClose={onCancel}>
				<TextField name="createLiveSessionName" data-config-key="name" ref={this.setRefC} floatingLabelFixed floatingLabelText="session name" onChange={this.handleChangeConfig} defaultValue={this.state.config.name}/><br/>
				<PanelAndroidCreateConfig images={images} onChange={this.handleChangeDeviceConfig}/>
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
