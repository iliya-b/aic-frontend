'use strict';

import React from 'react';

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
