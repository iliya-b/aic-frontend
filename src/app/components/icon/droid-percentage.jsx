'use strict';

// Vendor
import React from 'react';
import FontIcon from 'material-ui/FontIcon';

// APP
const DroidPercentage = props => {
	const baseSize = props.style && props.style.fontSize ? props.style.fontSize : 24;
	const remainingSize = (100 - (props.value > 100 ? 100 : props.value)) / 100 * baseSize;

	const styles = {
		root: {
			position: 'relative',
			width: baseSize,
			height: baseSize,
			display: 'inline-block'
		},
		base: {
			fontSize: baseSize,
			position: 'absolute'
		},
		remaining: {
			fontSize: baseSize,
			height: remainingSize,
			overflow: 'hidden',
			position: 'absolute'
		}
	};

	return (
		<div style={styles.root}>
			<FontIcon style={styles.base} className="mdi mdi-android" color={props.bgColor} hoverColor={props.bgColor}/>
			<FontIcon style={styles.remaining} className="mdi mdi-android" color={props.fgColor} hoverColor={props.fgColor}/>
		</div>
	);
};

DroidPercentage.defaultProps = {
	fgColor: 'rgba(255, 255, 255, 0.75)',
	bgColor: 'rgba(0, 158, 234, 1)'
};

DroidPercentage.propTypes = {
	value: React.PropTypes.number.isRequired,
	style: React.PropTypes.object,
	fgColor: React.PropTypes.string,
	bgColor: React.PropTypes.string
};

module.exports = DroidPercentage;
