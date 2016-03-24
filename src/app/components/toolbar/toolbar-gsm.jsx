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
import iconList from 'app/components/icons/icon-list';

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

		const buttons = [
			{
				id: 'gsmCall',
				tooltip: 'Receive call',
				fontIcon: 'mdi mdi-phone'
			}, {
				id: 'gsmAcceptCall',
				tooltip: 'Accept call',
				svgIcon: PhoneAcceptSVG
			}, {
				id: 'gsmHoldCall',
				tooltip: 'Hold call',
				fontIcon: 'mdi mdi-phone-paused'
			}, {
				id: 'gsmCancelCall',
				tooltip: 'Cancel call',
				fontIcon: 'mdi mdi-phone-missed'
			}, {
				id: 'gsmSMS',
				tooltip: 'SMS',
				fontIcon: 'mdi mdi-message-text'
			}, {
				id: 'gsmSignal',
				tooltip: 'Signal',
				fontIcon: 'mdi mdi-signal'
			}, {
				id: 'gsmNetwork',
				tooltip: 'Network',
				fontIcon: 'mdi mdi-radio-tower'
			}, {
				id: 'gsmRoaming',
				tooltip: 'Roaming',
				fontIcon: 'mdi mdi-home'
			}
		];

		const renderedButtons = iconList({
			buttons,
			style: styles.button,
			onClick: this.props.onClick,
			iconClassNamePrefix: 'btLiveGSM',
			selectedId: this.props.secondBar
		});

		return (
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<IconButton className="btLiveBack" tooltip="Back to toolbar" tooltipPosition="bottom-right" style={styles.button} onClick={this.props.onClick.android}>
						<FontIcon className="mdi mdi-arrow-left-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<ToolbarTitle text="GSM" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{renderedButtons}
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
	style: React.PropTypes.object,
	secondBar: React.PropTypes.string
};

module.exports = ToolbarGSM;
