'use strict';

// Vendor
import React from 'react';
import FontIcon from 'material-ui/FontIcon';

// APP
const DroidPercentage = (props, context) => {
	// const baseSize = props.style && props.style.fontSize ? props.style.fontSize : 24;
	const baseSize = 24;
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

	const bgColor = props.bgColor ? props.bgColor : context.muiTheme.palette.primary1Color;
	const fgColor = props.fgColor ? props.fgColor : 'rgba(255, 255, 255, 0.75)';

	return (
		<div style={Object.assign(styles.root, props.style)}>
			<FontIcon style={styles.base} className="mdi mdi-android" color={bgColor} hoverColor={bgColor}/>
			<FontIcon style={styles.remaining} className="mdi mdi-android" color={fgColor} hoverColor={fgColor}/>
		</div>
	);
};

DroidPercentage.contextTypes = {
	muiTheme: React.PropTypes.object
};

DroidPercentage.propTypes = {
	value: React.PropTypes.number.isRequired,
	style: React.PropTypes.object,
	fgColor: React.PropTypes.string,
	bgColor: React.PropTypes.string
};

module.exports = DroidPercentage;
