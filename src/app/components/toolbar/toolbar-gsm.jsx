'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

// APP
import PhoneAcceptSVG from 'app/components/icons/phone-accept';

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

		return (
			// 'RECEIVE_CALL', 'ACCEPT_CALL', 'CANCEL_CALL',
			// 'HOLD_CALL', 'RECEIVE_SMS', 'SET_SIGNAL',
			// 'SET_NETWORK_TYPE', 'SET_NETWORK_REGISTRATION'
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<IconButton className="btLiveBack" tooltip="Back to toolbar" tooltipPosition="bottom-right" style={styles.button} onClick={this.props.onClick.android}>
						<FontIcon className="mdi mdi-arrow-left-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<ToolbarTitle text="GSM" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					<IconButton className="btLiveGSMCall" tooltip="Receive call" style={styles.button} onClick={this.props.onClick.gsmCall}>
						<FontIcon className="mdi mdi-phone" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveGSMAcceptCall" tooltip="Accept call" style={styles.button} onClick={this.props.onClick.gsmAcceptCall}>
						<PhoneAcceptSVG color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveGSMHoldCall" tooltip="Hold call" style={styles.button} onClick={this.props.onClick.gsmHoldCall}>
						<FontIcon className="mdi mdi-phone-paused" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveGSMCancelCall" tooltip="Cancel call" style={styles.button} onClick={this.props.onClick.gsmCancelCall}>
						<FontIcon className="mdi mdi-phone-missed" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveGSMSMS" tooltip="SMS" style={styles.button} onClick={this.props.onClick.gsmSMS}>
						<FontIcon className="mdi mdi-message-text" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveGSMSignal" tooltip="Signal" style={styles.button} onClick={this.props.onClick.gsmSignal}>
						<FontIcon className="mdi mdi-signal" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveGSMNetwork" tooltip="Network" style={styles.button} onClick={this.props.onClick.gsmNetwork}>
						<FontIcon className="mdi mdi-radio-tower" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<IconButton className="btLiveGSMRoaming" tooltip="Roaming" style={styles.button} onClick={this.props.onClick.gsmRoaming}>
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
	onClick: React.PropTypes.object,
	style: React.PropTypes.object
};

module.exports = ToolbarGSM;
