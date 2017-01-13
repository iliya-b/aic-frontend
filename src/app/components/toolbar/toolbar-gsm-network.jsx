'use strict';

import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectTextField from 'app/components/form/select-text-field';

// TODO: Change to a single place, I think this repeats at app/libs/backend-api.js
const GSMNetwork = ['umts', 'lte', 'gprs', 'gsm', 'hspa', 'edge', 'cdma', 'evdo', 'hsdpa', 'hsupa', 'full'];

const ToolbarGSMNetwork = class extends React.Component {

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
			this.props.onChange(e, 'network', payload);
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
				<FontIcon style={styles.icon} className="mdi mdi-radio-tower"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectTextField
					name="inputLiveGSMNetwork"
					onChange={this.handleChange}
					hintText="Select network"
					onFocus={this.props.onInputFocus}
					onBlur={this.props.onInputBlur}
					style={{float: 'left'}}
					items={GSMNetwork}
					/>
				<RaisedButton
					className="btLiveGSMNetworkSubmit"
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

ToolbarGSMNetwork.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarGSMNetwork.propTypes = {
	style: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func
};

module.exports = ToolbarGSMNetwork;
