'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import DroidPercentage from 'app/components/icon/droid-percentage';
import LabeledSpan from 'app/components/form/labeled-span';

const PanelSessionsInfo = props => {
	const stylePaper = {
		padding: '10px 10px 0 10px',
		zIndex: -100,
		position: 'relative'
	};

	const styleLabel = {
		padding: 10
	};

	let vmCountPerc = 0;
	if (props.vmMaxAllowed !== 0) {
		vmCountPerc = parseInt(props.vmCount / props.vmMaxAllowed * 100, 10);
	}

	return (
		<Paper style={stylePaper}>
			<DroidPercentage value={vmCountPerc}/>
			<LabeledSpan style={styleLabel} value={`${vmCountPerc}%`} label="Quota usage"/>
			<LabeledSpan style={styleLabel} value={props.vmCount} label="Open sessions"/>
			<LabeledSpan style={styleLabel} value={props.vmMaxAllowed} label="Max sessions"/>
		</Paper>
	);
};

PanelSessionsInfo.propTypes = {
	vmCount: React.PropTypes.number.isRequired,
	vmMaxAllowed: React.PropTypes.number.isRequired
};

module.exports = PanelSessionsInfo;
