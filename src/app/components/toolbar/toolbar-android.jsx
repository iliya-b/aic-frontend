'use strict';

import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon';
import IconList from 'app/components/icon/icon-list';

const ToolbarAndroid = class extends React.Component {

	render() {
		const styles = {
			toolbar: {
				justifyContent: 'initial'
			},
			button: {
				marginTop: 5
			},
			separator: {
				marginLeft: 3
			},
			icon: {
				cursor: 'default',
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
				tooltip: 'Monkey tool',
				fontIcon: 'mdi mdi-panda'
			}, {
				id: 'tests',
				tooltip: 'Tests',
				fontIcon: 'mdi mdi-settings'
			}, {
				id: 'screen',
				tooltip: 'Screen settings',
				fontIcon: 'mdi mdi-desktop-mac'
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

		const iconListProps = {
			buttons,
			style: styles.button,
			onClick: this.props.onClick,
			iconClassNamePrefix: 'btLive',
			selectedId: this.props.secondBar
		};
		const renderedButtons = <IconList {...iconListProps}/>;

		return (
			<Toolbar style={Object.assign(this.props.style || {}, styles.toolbar)}>
				<FontIcon style={styles.icon} className="mdi mdi-android"/>
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
