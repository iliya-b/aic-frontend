'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import FontIcon from 'material-ui/lib/font-icon';
import Slider from 'material-ui/lib/slider';
import Paper from 'material-ui/lib/paper';

// APP
const ToolbarBattery = class extends React.Component {

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
		return (
			<Paper style={Object.assign(this.props.style, styles.paper)} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-white-balance-incandescent" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<Slider style={styles.items} name="battery" max={100} min={0} step={1} onChange={this.handleBatteryChange}/>
			</Paper>
		);
	}
};

ToolbarBattery.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarBattery.propTypes = {
	onClickBack: React.PropTypes.func,
	style: React.PropTypes.object
};

module.exports = ToolbarBattery;
