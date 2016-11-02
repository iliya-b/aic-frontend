'use strict';

import React from 'react';

const TestWrapper = class extends React.Component {

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}

};

TestWrapper.propTypes = {
	children: React.PropTypes.node
};

module.exports = TestWrapper;
