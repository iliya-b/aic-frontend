'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import PanelToolbarBase from 'app/components/panel/panel-toolbar-base';

const ToolbarBattery = class extends React.Component {
	render() {
		const styleToggle = {float: 'left', width: 50};
		const styleSlider = {float: 'left', width: 200, marginLeft: 10};
		const onChange = (e, value) => {
			this.props.onChange(e, {level_percent: value, ac_online: 1}); // eslint-disable-line camelcase
		};
		const styleInput = {float: 'left', width: 50};

		return (
			<PanelToolbarBase icon={<FontIcon className="mdi mdi-battery-charging-40"/>}>
				<Slider className="inputLiveSensorBattery" style={styleSlider} name="battery" max={100} min={0} step={1} value={this.props.battery.level_percent} onChange={onChange}/>
				<TextField defaultValue={''} name="fieldLiveSensorGPSLatitude" style={styleInput} floatingLabelText="battery" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<Toggle
					defaultToggled
					style={styleToggle}
					/>
			</PanelToolbarBase>
		);
	}
};

ToolbarBattery.propTypes = {
	onClickBack: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	battery: React.PropTypes.object
};

module.exports = ToolbarBattery;
