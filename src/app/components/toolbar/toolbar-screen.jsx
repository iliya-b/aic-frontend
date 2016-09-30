'use strict';

import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconList from 'app/components/icon/icon-list';

const ToolbarScreen = class extends React.Component {

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
				id: 'fullscreen',
				tooltip: this.props.isFullscreen ? 'Exit FullScreen' : 'Enter FullScreen',
				fontIcon: this.props.isFullscreen ? 'mdi mdi-fullscreen-exit' : 'mdi mdi-fullscreen'
			}, {
				id: 'scalescreen',
				tooltip: this.props.isScaledscreen ? 'Original size' : 'Scale to fit window',
				fontIcon: this.props.isScaledscreen ? 'mdi mdi-arrow-compress' : 'mdi mdi-arrow-expand'
			}
		];

		const iconListProps = {
			buttons,
			style: styles.button,
			onClick: this.props.onClick,
			iconClassNamePrefix: 'btLiveScreen',
			selectedId: this.props.secondBar
		};
		const renderedButtons = <IconList {...iconListProps}/>;

		return (
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<IconButton className="btLiveBack" tooltip="Back to toolbar" tooltipPosition="bottom-right" style={styles.button} onClick={this.props.onClick.android}>
						<FontIcon className="mdi mdi-arrow-left-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
					</IconButton>
					<ToolbarTitle text="Screen Settings" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{renderedButtons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarScreen.propTypes = {
	onClick: React.PropTypes.object,
	style: React.PropTypes.object,
	secondBar: React.PropTypes.string,
	isFullscreen: React.PropTypes.bool,
	isScaledscreen: React.PropTypes.bool
};

module.exports = ToolbarScreen;
