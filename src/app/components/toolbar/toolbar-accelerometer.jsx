'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconList from 'app/components/icon/icon-list';
import AppPalette from 'app/configs/app-palette';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PanelToolbarBase from 'app/components/panel/panel-toolbar-base';

const rotationSets = {
	rotation0: {x: 0, y: 5.9, z: 0},
	rotation270: {x: -5.9, y: 0, z: 0}, // 90 google
	rotation180: {x: 0, y: -5.9, z: 0},
	rotation90: {x: 5.9, y: 0, z: 0} // 270 google
};

const buttons = [
	{
		id: 'rotation0',
		tooltip: '0°',
		fontIcon: 'mdi mdi-cellphone-android'
	},
	{
		id: 'rotation90',
		tooltip: '90°',
		fontIcon: 'mdi mdi-cellphone-android',
		iconStyle: {transform: 'rotate(90deg)'}
	},
	{
		id: 'rotation180',
		tooltip: '180°',
		fontIcon: 'mdi mdi-cellphone-android',
		iconStyle: {transform: 'rotate(180deg)'}
	},
	{
		id: 'rotation270',
		tooltip: '270°',
		fontIcon: 'mdi mdi-cellphone-android',
		iconStyle: {transform: 'rotate(270deg)'}
	}
];

const ToolbarAccelerometer = class extends React.Component {
	setRefX = c => {
		this.x = c;
	}

	setRefY = c => {
		this.y = c;
	}

	setRefZ = c => {
		this.z = c;
	}

	handleClick = e => {
		const payload = {
			x: parseFloat(this.x.getValue()),
			y: parseFloat(this.y.getValue()),
			z: parseFloat(this.z.getValue())
		};
		this.props.onChange(e, payload);
	}

	handleClickRotation = rotation => {
		this.x.input.value = rotation.x;
		this.y.input.value = rotation.y;
		this.z.input.value = rotation.z;
		this.handleClick();
	}

	handleClickRotation0 = () => {
		this.handleClickRotation(rotationSets.rotation0);
	}
	handleClickRotation90 = () => {
		this.handleClickRotation(rotationSets.rotation90);
	}
	handleClickRotation180 = () => {
		this.handleClickRotation(rotationSets.rotation180);
	}
	handleClickRotation270 = () => {
		this.handleClickRotation(rotationSets.rotation270);
	}

	render() {
		const stylesInput = {
			width: 100,
			marginTop: -15,
			float: 'left'
		};

		const styleButtonSubmit = {
			float: 'left',
			marginTop: 10,
			marginLeft: 15
		};

		const props = {
			buttons,
			styleRoot: {float: 'left', marginRight: 10, marginTop: 3},
			onClick: {rotation0: this.handleClickRotation0, rotation90: this.handleClickRotation90, rotation180: this.handleClickRotation180, rotation270: this.handleClickRotation270},
			iconClassNamePrefix: 'btLiveSensor',
			selectColor: AppPalette.primary1Color,
			selectedId: `rotation${this.props.rotation}`
		};
		const renderedButtons = <IconList {...props}/>;

		return (
			<PanelToolbarBase icon={<FontIcon className="mdi mdi-screen-rotation"/>}>
				{renderedButtons}
				<TextField name="fieldLiveSensorAccelerometerX" defaultValue={this.props.accelerometer.x} style={stylesInput} ref={this.setRefX} floatingLabelText="x" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField name="fieldLiveSensorAccelerometerY" defaultValue={this.props.accelerometer.y} style={stylesInput} ref={this.setRefY} floatingLabelText="y" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField name="fieldLiveSensorAccelerometerZ" defaultValue={this.props.accelerometer.z} style={stylesInput} ref={this.setRefZ} floatingLabelText="z" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					className="btLiveSensorAccelerometerSubmit"
					label="Submit"
					title="Submit"
					primary
					onClick={this.handleClick}
					style={styleButtonSubmit}
					/>
			</PanelToolbarBase>
		);
	}
};

ToolbarAccelerometer.propTypes = {
	onClickBack: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	accelerometer: React.PropTypes.object,
	rotation: React.PropTypes.string
};

module.exports = ToolbarAccelerometer;
