'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import PanelToolbarBase from 'app/components/panel/panel-toolbar-base';

const ToolbarBattery = class extends React.Component {
	render() {
		const styleSlider = {float: 'left', width: 300, marginLeft: 10};
		const onChange = (e, value) => {
			this.battery = value;
			// this.props.onChange(e, {level_percent: value, ac_online: 1}); // eslint-disable-line camelcase
		};
		const handleSubmit = e => {
			this.props.onChange(e, {level_percent: this.battery, ac_online: 1}); // eslint-disable-line camelcase
		};
		const styleButtonSubmit = {
			float: 'left',
			marginTop: 10,
			marginLeft: 15
		};
		// TODO: Fix initial value for battery
		// Problem: When setting a new value will be value out of 0 to 100
		// When getting from properties will be value out of 0.0 to 1.0
		// const sliderValue = this.props.battery.level_percent * 100;
		return (
			<PanelToolbarBase icon={<FontIcon className="mdi mdi-battery-charging-40"/>}>
				<Slider className="inputLiveSensorBattery" style={styleSlider} name="battery" max={100} min={0} step={1} onChange={onChange}/>
				<RaisedButton
					className="btLiveSensorBatterySubmit"
					label="Submit"
					title="Submit"
					primary
					onClick={handleSubmit}
					style={styleButtonSubmit}
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
