import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import componentsProps from 'test/prop-samples/icon';

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

const buildComponentStories = (story, componentRequired) => {
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

const req = require.context('app/components/icon/', true, /^\.\/.*\.jsx?$/);
const story = storiesOf('Icon', module).addDecorator(themeDecorator);
// const components = [req(req.keys()[0]), req(req.keys()[1]), req(req.keys()[2])];
const components = req.keys().map(req);
// window.components = components;
components.forEach(componentRequired => buildComponentStories(story, componentRequired));

