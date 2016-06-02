'use strict';

// Vendor
import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import str from 'string';

// APP
const iconsList = {
	kitkatTablet: require('app/components/icon/kitkat-tablet'),
	kitkatPhone: require('app/components/icon/kitkat-phone'),
	lollipopTablet: require('app/components/icon/lollipop-tablet'),
	lollipopPhone: require('app/components/icon/lollipop-phone'),
	kitkatPhoneAudio: require('app/components/icon/kitkat-phone-audio'),
	kitkatMp: require('app/components/icon/kitkat-phone')
};

const VariantIcon = props => (
	iconsList[str(props.variant.id).camelize().s] ? iconsList[str(props.variant.id).camelize().s]({
		color: 'rgba(0, 0, 0, 0.4)',
		hoverColor: 'rgba(0, 0, 0, 0.87)'
	}) : <FontIcon className="mdi mdi-help" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>
);

VariantIcon.propTypes = {
	variant: React.PropTypes.shape({
		id: React.PropTypes.string.isRequired,
		label: React.PropTypes.string,
		version: React.PropTypes.string
	}).isRequired
};

module.exports = VariantIcon;
