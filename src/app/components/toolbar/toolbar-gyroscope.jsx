'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

// APP
const ToolbarGPS = class extends React.Component {

	render() {
		const styles = {
			button: {
				marginTop: 5,
				float: 'left'
			},
			separator: {
				margin: '0 15px 0 0px',
				float: 'left'
			},
			items: {
				float: 'left',
				width: 100
			},
			paper: {
				height: 56
			},
			buttonSubmit: {
				float: 'left',
				marginTop: 10,
				marginLeft: 15
			},
			icon: {
				margin: '15px 10px 0 10px',
				float: 'left'
			}
		};
		return (
			<Paper style={Object.assign(this.props.style, styles.paper)} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-crosshairs-gps" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<TextField style={styles.items} ref={this.setRefLat} hintText="azimuth" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField style={styles.items} ref={this.setRefLon} hintText="pitch" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField style={styles.items} ref={this.setRefLon} hintText="roll" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					label="Submit"
					title="Submit"
					href="#"
					secondary
					onClick={this.handleLocationSubmit}
					style={styles.buttonSubmit}
					/>
			</Paper>
		);
	}
};

ToolbarGPS.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarGPS.propTypes = {
	onClickBack: React.PropTypes.func,
	style: React.PropTypes.object
};

module.exports = ToolbarGPS;
