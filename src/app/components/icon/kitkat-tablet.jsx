'use strict';

// Vendor
import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

// APP
module.exports = props => (
	<SvgIcon {...props}>
		<text x="0" y="20" style={{fontSize: 20}}>K</text>
		<path transform="translate(11,6),scale(0.55)" d="M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z"/>
	</SvgIcon>
);
