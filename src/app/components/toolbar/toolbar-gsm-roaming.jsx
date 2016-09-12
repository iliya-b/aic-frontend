'use strict';

import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectTextField from 'app/components/form/select-text-field';

// TODO: Change to a single place, I think this repeats at app/libs/backend-api.js
const GSMRoaming = ['home', 'denied', 'searching', 'roaming', 'none'];

const ToolbarGSMRoaming = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: null};
		this.handleChange = value => {
			this.setState({value});
		};
		this.handleClick = e => {
			const payload = {
				type: this.state.value
			};
			this.props.onChange(e, 'registration', payload);
		};
	}

	render() {
		const styles = {
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
			icon: {
				margin: '15px 10px 0 10px',
				float: 'left'
			},
			buttonSubmit: {
				float: 'left',
				marginTop: 10,
				marginLeft: 15
			}
		};
		// TODO: should check all other panels for the style presence
		if (this.props.style) {
			styles.paper = Object.assign({}, this.props.style, styles.paper);
		}

		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-home" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectTextField
					name="inputLiveGSMRoaming"
					onChange={this.handleChange}
					hintText="Select roaming"
					onFocus={this.props.onInputFocus}
					onBlur={this.props.onInputBlur}
					style={{float: 'left'}}
					items={GSMRoaming}
					/>
				<RaisedButton
					className="btLiveGSMRoamingSubmit"
					label="Submit"
					title="Submit"
					primary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
			</Paper>
		);
	}
};

ToolbarGSMRoaming.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarGSMRoaming.propTypes = {
	style: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func
};

module.exports = ToolbarGSMRoaming;
