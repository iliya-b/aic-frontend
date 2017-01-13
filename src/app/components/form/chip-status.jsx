'use strict';

import React from 'react';
import {Avatar, Chip} from 'material-ui';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';

const ChipStatus = props => {
	const {
		status,
		children,
		style,
		labelStyle,
		...others
	} = props;
	const styleAvatar = {
		height: 26,
		width: 26,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		border: '3px solid #e0e0e0'
	};
	const styleChip = {maxWidth: '100%'};

	const styleChipLabel = {
		maxWidth: '100%',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	};
	return (
		<Chip
			style={Object.assign(styleChip, style)}
			labelStyle={Object.assign(styleChipLabel, labelStyle)}
			{...others}
			>
			<Avatar style={styleAvatar} icon={<SimpleStatusIcon status={status}/>}/>
			{children}
		</Chip>
	);
};

ChipStatus.propTypes = {
	status: React.PropTypes.string,
	children: React.PropTypes.node,
	style: React.PropTypes.object,
	labelStyle: React.PropTypes.object
};

module.exports = ChipStatus;
