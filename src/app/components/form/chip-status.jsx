'use strict';

import React from 'react';
import {Avatar, Chip} from 'material-ui';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';

const ChipStatus = props => {
	const {
		status,
		children,
		...others
	} = props;
	const styleAvatar = {
		height: 26,
		width: 26,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		border: '3px solid #e0e0e0'
	};
	return (
		<Chip {...others}>
			<Avatar style={styleAvatar} icon={<SimpleStatusIcon tooltip="ERROR" status={status}/>}/>
			{children}
		</Chip>
	);
};

ChipStatus.propTypes = {
	status: React.PropTypes.oneOf(SimpleStatusIcon.STATUS_LIST_ARR),
	children: React.PropTypes.node
};

module.exports = ChipStatus;
