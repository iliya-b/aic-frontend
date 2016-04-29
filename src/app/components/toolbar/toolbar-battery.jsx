'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';

// APP
const ToolbarBattery = class extends React.Component {

	onChange(e, value) {
		this.props.onChange(e, {level_percent: value, ac_online: 1}); // eslint-disable-line camelcase
	}

	render() {
		const styles = {
			separator: {
				margin: '0 15px 0 0px',
				float: 'left'
			},
			items: {
				float: 'left',
				width: 720
			},
			paper: {
				height: 56
			},
			icon: {
				margin: '15px 10px 0 10px',
				float: 'left'
			}
		};
		const onChange = this.onChange.bind(this);
		return (
			<Paper style={Object.assign(this.props.style, styles.paper)} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-battery-charging-40" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<Slider className="inputLiveSensorBattery" style={styles.items} name="battery" max={100} min={0} step={1} value={this.props.battery.level_percent} onChange={onChange}/>
			</Paper>
		);
	}
};

ToolbarBattery.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarBattery.defaultProps = {
	style: {}
};

ToolbarBattery.propTypes = {
	onClickBack: React.PropTypes.func,
	style: React.PropTypes.object,
	onChange: React.PropTypes.func,
	battery: React.PropTypes.object
};

module.exports = ToolbarBattery;
