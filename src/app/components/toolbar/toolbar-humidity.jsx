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

	constructor(props) {
		super(props);
		this.setRefHumidity = c => this.humidity = c;
		this.handleClick = e => {
			const payload = {
				relative_humidity: parseFloat(this.humidity.getValue()) // eslint-disable-line camelcase
			};
			this.props.onChange(e, payload);
		};
	}

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
				float: 'left'
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
				<FontIcon style={styles.icon} className="mdi mdi-water" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<TextField className="inputLiveSensorHumidity" style={styles.items} ref={this.setRefHumidity} hintText="humidity" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					className="btLiveSensorHumiditySubmit"
					label="Submit"
					title="Submit"
					href="#"
					secondary
					onClick={this.handleClick}
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
	style: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func
};

module.exports = ToolbarGPS;
