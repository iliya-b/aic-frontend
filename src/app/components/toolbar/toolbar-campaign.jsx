'use strict';

import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import IconList from 'app/components/icon/icon-list';
import TitleIcon from 'app/components/icon/title-icon';

const ToolbarCampaign = props => {
	const styleToolbar = {justifyContent: 'initial'};
	const styleSeparator = {
		margin: '0 5px 0 0px',
		borderRight: '1px solid white',
		backgroundColor: 'rgba(0, 0, 0, 0.2)'
	};
	const styleButtons = {marginTop: 5};
	const styleIcon = {
		cursor: 'default',
		margin: '16px 36px 0px -6px',
		width: 24
	};

	const buttons = [
		{
			id: 'start',
			tooltip: 'Start campaign',
			tooltipPosition: 'top-center',
			fontIcon: 'mdi mdi-play'
		}
	];

	const iconListProps = {
		buttons,
		style: styleButtons,
		onClick: {
			start: props.onClickStart
		},
		iconClassNamePrefix: 'btCampaign',
		selectedId: null,
		raised: true
	};
	const renderedButtons = <IconList {...iconListProps}/>;

	return (
		<Toolbar style={Object.assign(props.style || {}, styleToolbar)}>
			<TitleIcon style={styleIcon} className="mdi mdi-settings"/>
			<ToolbarGroup firstChild lastChild>
				<ToolbarTitle className="txtLiveTitle" text="Test Campaigns"/>
				<ToolbarSeparator style={styleSeparator}/>
				{renderedButtons}
			</ToolbarGroup>
		</Toolbar>
	);
};

ToolbarCampaign.propTypes = {
	style: React.PropTypes.object,
	onClickStart: React.PropTypes.func
};

module.exports = ToolbarCampaign;
