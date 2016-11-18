'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import DroidPercentage from 'app/components/icon/droid-percentage';
import LabeledSpan from 'app/components/form/labeled-span';

const PanelSessionsInfo = props => {
	const stylePaper = {
		padding: '0px 10px 10px 10px',
		position: 'relative'
	};

	const styleIcon = {
		margin: '0px 14px 0px 5px'
	};

	let vmCountPerc = 0;
	if (props.vmMaxAllowed !== 0) {
		vmCountPerc = parseInt(props.vmCount / props.vmMaxAllowed * 100, 10);
	}

	return (
		<Paper style={stylePaper}>
			<DroidPercentage style={styleIcon} value={vmCountPerc}/>
			<LabeledSpan value={`${vmCountPerc}%`} label="Quota usage"/>
			<LabeledSpan value={props.vmCount} label="Open sessions"/>
			<LabeledSpan value={props.vmMaxAllowed} label="Max sessions"/>
		</Paper>
	);
};

PanelSessionsInfo.propTypes = {
	vmCount: React.PropTypes.number.isRequired,
	vmMaxAllowed: React.PropTypes.number.isRequired
};

module.exports = PanelSessionsInfo;
