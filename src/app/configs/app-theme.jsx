'use strict';

// Vendors
import Spacing from 'material-ui/lib/styles/spacing';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

// APP
import AppPalette from 'app/configs/app-palette';

const AppTheme = getMuiTheme({
	spacing: Spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: AppPalette
});

module.exports = AppTheme;
