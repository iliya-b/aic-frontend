'use strict';

import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import PhoneAcceptSVG from 'app/components/icon/phone-accept';
import IconList from 'app/components/icon/icon-list';

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

		const iconListProps = {
			buttons,
			style: styles.button,
			onClick: this.props.onClick,
			iconClassNamePrefix: 'btLiveGSM',
			selectedId: this.props.secondBar
		};
		const renderedButtons = <IconList {...iconListProps}/>;

		return (
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<IconButton className="btLiveBack" tooltip="Back to toolbar" tooltipPosition="bottom-right" style={styles.button} onClick={this.props.onClick.android}>
						<FontIcon className="mdi mdi-arrow-left-bold" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<ToolbarTitle text="GSM" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{renderedButtons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarGSM.propTypes = {
	onClick: React.PropTypes.object,
	style: React.PropTypes.object,
	secondBar: React.PropTypes.string
};

module.exports = ToolbarGSM;
