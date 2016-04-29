'use strict';

// APP
let AppThemeTests;

function getTheme() {
	if (!AppThemeTests) {
		const tempNavigator = global.navigator;
		global.navigator = {userAgent: 'all'};
		AppThemeTests = require('app/configs/app-theme');
		global.navigator = tempNavigator;
	}
	return AppThemeTests;
}

module.exports = getTheme;
