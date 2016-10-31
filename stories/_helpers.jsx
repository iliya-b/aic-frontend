import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appTheme from 'app/configs/app-theme';

const themeDecorator = story => (
	<MuiThemeProvider muiTheme={appTheme}>
		{story()}
	</MuiThemeProvider>
);

const createReactComponent = (component, props, children) => {
	if (!component) {
		throw new Error(`createReactComponent must have valid component, got ${component}.`);
	}
	if (!props || props === undefined || props === null) {
		props = {};
	}
	if (!children || children === null) {
		children = undefined;
	}
	return React.createElement(component, props, children);
};

const buildComponents = (componentRequired, info) => {
	if ('title' in info) {
		const cObj = info.components.map(cInfo => buildComponents(componentRequired, cInfo));
		return (
			<div key={`${componentRequired.name}_${info.title}`}>
				<h2>{info.title}</h2>
				{cObj}
			</div>
		);
	}
	// Skip properties that will throw error (only used by tests)
	if ('throwsError' in info) {
		return null;
	}
	return createReactComponent(componentRequired, info.props, info.children);
};

const buildComponentStories = (story, componentRequired, componentsProps) => {
	let componentObj;
	if (componentRequired.name in componentsProps) {
		componentObj = componentsProps[componentRequired.name].map(cInfo => buildComponents(componentRequired, cInfo)).filter(c => c !== null);
	} else {
		componentObj = createReactComponent(componentRequired);
	}

	story.add(componentRequired.name, () => (
		<div>
			{componentObj}
		</div>
	));
};

module.exports = {
	themeDecorator,
	createReactComponent,
	buildComponents,
	buildComponentStories
};

