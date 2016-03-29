'use strict';

// Vendor
import React from 'react';
import SvgIcon from 'material-ui/lib/svg-icon';

// APP
module.exports = props => (
	<SvgIcon {...props}>
		<text x="0" y="20" style={{fontSize: 20}}>K</text>
		<path transform="translate(10,8),scale(0.6)" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
	</SvgIcon>
);
