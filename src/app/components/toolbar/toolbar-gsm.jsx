'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import SvgIcon from 'material-ui/lib/svg-icon';

// APP
const ToolbarGSM = class extends React.Component {

	render() {
		const styles = {
			button: {
				marginTop: 5,
				float: 'left'
			},
			separator: {
				margin: '0 5px 0 0px'
			}
		};

		const PhoneAccept = props => (
			<SvgIcon {...props}>
				<path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
				<path transform="translate(1,-9)" d="M21.5,11.5L23,13L16,20L11.5,15.5L13,14L16,17L21.5,11.5Z"/>
			</SvgIcon>
		);

		return (
			// 'RECEIVE_CALL', 'ACCEPT_CALL', 'CANCEL_CALL',
			// 'HOLD_CALL', 'RECEIVE_SMS', 'SET_SIGNAL',
			// 'SET_NETWORK_TYPE', 'SET_NETWORK_REGISTRATION'
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<IconButton tooltip="Back to toolbar" tooltipPosition="bottom-right" style={styles.button} onClick={this.props.onClickBack}>
						<FontIcon className="mdi mdi-arrow-left-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<ToolbarTitle text="GSM" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					<IconButton tooltip="Call" style={styles.button}>
						<FontIcon className="mdi mdi-phone" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Accept call" style={styles.button}>
						<PhoneAccept color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Hold call" style={styles.button}>
						<FontIcon className="mdi mdi-phone-paused" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Cancel call" style={styles.button}>
						<FontIcon className="mdi mdi-phone-missed" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="SMS" style={styles.button}>
						<FontIcon className="mdi mdi-message-text" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Signal" style={styles.button}>
						<FontIcon className="mdi mdi-signal" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Network" style={styles.button}>
						<FontIcon className="mdi mdi-radio-tower" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton tooltip="Roaming" style={styles.button}>
						<FontIcon className="mdi mdi-home" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarGSM.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarGSM.propTypes = {
	onClickBack: React.PropTypes.func,
	style: React.PropTypes.object
};

module.exports = ToolbarGSM;
