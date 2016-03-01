'use strict';

// Vendors
import React from 'react';

// APP
const LiveWrapper = class extends React.Component {

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}

};

LiveWrapper.propTypes = {
	children: React.PropTypes.node
};

module.exports = LiveWrapper;
