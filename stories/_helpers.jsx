import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appTheme from 'app/configs/app-theme';

module.exports = {
	themeDecorator: story => (
		<MuiThemeProvider muiTheme={appTheme}>
			{story()}
		</MuiThemeProvider>
	)
};

