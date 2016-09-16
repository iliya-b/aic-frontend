'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// APP
const ToolbarGSMSMS = class extends React.Component {

	constructor(props) {
		super(props);
		this.setRefSMSText = c => {
			this.smsText = c;
		};
		this.setRefPhoneNumber = c => {
			this.phoneNumber = c;
		};
		this.handleClick = e => {
			const payload = {
				phone_number: this.phoneNumber.getValue(), // eslint-disable-line camelcase
				text: this.smsText.getValue()
			};
			this.props.onChange(e, 'sms', payload);
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
				<FontIcon style={styles.icon} className="mdi mdi-message-text" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<TextField name="fieldLiveGSMSMSPhoneNumber" style={styles.items} ref={this.setRefPhoneNumber} hintText="Phone number" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField name="fieldLiveGSMSMSText" style={styles.items} ref={this.setRefSMSText} hintText="SMS text" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					className="btLiveSensorGSMSMSSend"
					label="Send"
					title="Send"
					primary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
			</Paper>
		);
	}
};

ToolbarGSMSMS.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarGSMSMS.propTypes = {
	style: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func
};

module.exports = ToolbarGSMSMS;
