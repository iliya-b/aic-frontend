'use strict';

// Vendors
import React from 'react';

// APP
const APKManager = class extends React.Component {

	render() {
		return (
			<div>
				<h1>APK Manager</h1>
			</div>
		);
	}
};

APKManager.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = APKManager;
