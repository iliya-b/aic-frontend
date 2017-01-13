'use strict';

// Vendors
import Spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// APP
import AppPalette from 'app/configs/app-palette';

const AppTheme = getMuiTheme({
	spacing: Spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: AppPalette,
	toolbar: {
		color: AppPalette.textColor,
		separatorColor: AppPalette.textColor,
		backgroundColor: AppPalette.toolbarBGColor,
		iconColor: AppPalette.textColor
	}
});

module.exports = AppTheme;
