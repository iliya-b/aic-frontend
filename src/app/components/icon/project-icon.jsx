'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import StatusIcon from 'app/components/icon/status-icon';

// buffer
// file-tree
// flask-outline
// layers
// newspaper
// package
// package-variant
// presentation --
// star

const project2Status = {};

const ProjectIcon = props => {
	const {
		status,
		...others
	} = props;
	const icon = <FontIcon className="mdi mdi-package-variant"/>;

	const translatedStatus = project2Status[status];
	return (
		<StatusIcon status={translatedStatus} icon={icon} {...others}/>
		);
};

ProjectIcon.ERROR = 'ERROR';
ProjectIcon.CREATING = 'CREATING';
ProjectIcon.READY = 'READY';
ProjectIcon.DELETING = 'DELETING';

project2Status[ProjectIcon.ERROR] = StatusIcon.ERROR;
project2Status[ProjectIcon.CREATING] = StatusIcon.LOADING;
project2Status[ProjectIcon.READY] = StatusIcon.SUCCESS;
project2Status[ProjectIcon.DELETING] = StatusIcon.LOADING;

ProjectIcon.STATUS_LIST = [
	ProjectIcon.ERROR,
	ProjectIcon.CREATING,
	ProjectIcon.READY,
	ProjectIcon.DELETING
];
ProjectIcon.SIZE_LIST = StatusIcon.SIZE_LIST;

ProjectIcon.propTypes = {
	status: React.PropTypes.oneOf(ProjectIcon.STATUS_LIST),
	size: React.PropTypes.oneOf(ProjectIcon.SIZE_LIST)
};

module.exports = ProjectIcon;
