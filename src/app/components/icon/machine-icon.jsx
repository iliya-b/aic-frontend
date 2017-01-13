'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import StatusIcon from 'app/components/icon/status-icon';
import DroidDevilSVG from 'app/components/icon/droid-devil';

const MachineIcon = props => {
	const {
		status,
		...others
	} = props;

	const icon = status === StatusIcon.FIRE ? <DroidDevilSVG/> : <FontIcon className="mdi mdi-android"/>;

	return (
		<StatusIcon status={status} icon={icon} {...others}/>
		);
};

// TODO: status properties should be a HOC or something else
MachineIcon.STATUS_LIST = StatusIcon.STATUS_LIST;
MachineIcon.SIZE_LIST = StatusIcon.SIZE_LIST;

// TODO: This only works because the keys are the values inside them
// it should be less prone to error on changes
MachineIcon.STATUS_LIST.forEach(s => {
	MachineIcon[s] = StatusIcon[s];
});
MachineIcon.SIZE_LIST.forEach(s => {
	MachineIcon[s] = StatusIcon[s];
});

MachineIcon.propTypes = {
	status: React.PropTypes.oneOf(MachineIcon.STATUS_LIST),
	size: React.PropTypes.oneOf(MachineIcon.SIZE_LIST)
};

module.exports = MachineIcon;
