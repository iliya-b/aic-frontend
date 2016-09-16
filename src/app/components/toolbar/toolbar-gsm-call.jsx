'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// APP
const ToolbarGSMCall = class extends React.Component {

	constructor(props) {
		super(props);
		this.setRefNumber = c => {
			this.number = c;
		};
		this.handleClick = e => {
			const payload = {
				action: 'receive',
				phone_number: this.number.getValue() // eslint-disable-line camelcase
			};
			this.props.onChange(e, 'call', payload);
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
			<Paper style={Object.assign(this.props.style || {}, styles.paper)} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-phone" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<TextField name="fieldLiveGSMPhoneNumber" style={styles.items} ref={this.setRefNumber} hintText="phone number" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					className="btLiveSensorGSMCall"
					label="Receive call"
					title="Receive call"
					primary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
			</Paper>
		);
	}
};

ToolbarGSMCall.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarGSMCall.propTypes = {
	style: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func
};

module.exports = ToolbarGSMCall;
