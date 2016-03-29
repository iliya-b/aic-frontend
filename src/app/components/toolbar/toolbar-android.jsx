'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FontIcon from 'material-ui/lib/font-icon';

// APP
import iconList from 'app/components/icon/icon-list';

const ToolbarAndroid = class extends React.Component {

	render() {
		const styles = {
			button: {
				marginTop: 5,
				float: 'left'
			},
			separator: {
				marginLeft: 3
			},
			icon: {
				cursor: 'default',
				float: 'left',
				margin: '16px 36px 0px -6px',
				width: 24
			}
		};

		const buttons = [
			{
				id: 'sensors',
				tooltip: 'Sensors',
				fontIcon: 'mdi mdi-map-marker'
			}, {
				id: 'camera',
				tooltip: 'Camera',
				fontIcon: 'mdi mdi-camera'
			}, {
				id: 'gsm',
				tooltip: 'GSM',
				fontIcon: 'mdi mdi-phone'
			}, {
				id: 'apks',
				tooltip: 'APKs',
				fontIcon: 'mdi mdi-puzzle'
			}, {
				id: 'monkeyRunner',
				tooltip: 'Monkey runner',
				fontIcon: 'mdi mdi-panda'
			}, {
				id: 'details',
				tooltip: 'Session details',
				fontIcon: 'mdi mdi-information'
			}, {
				id: 'terminate',
				tooltip: 'Terminate session',
				fontIcon: 'mdi mdi-power'
			}
		];

		const renderedButtons = iconList({
			buttons,
			style: styles.button,
			onClick: this.props.onClick,
			iconClassNamePrefix: 'btLive',
			selectedId: this.props.secondBar
		});

		return (
			<Toolbar style={this.props.style}>
				<FontIcon style={styles.icon} className="mdi mdi-android" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarGroup firstChild lastChild>
					<ToolbarTitle text="Toolbar"/>
					<ToolbarSeparator style={styles.separator}/>
					{renderedButtons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarAndroid.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarAndroid.propTypes = {
	style: React.PropTypes.object,
	onClick: React.PropTypes.object,
	secondBar: React.PropTypes.string
};

module.exports = ToolbarAndroid;
