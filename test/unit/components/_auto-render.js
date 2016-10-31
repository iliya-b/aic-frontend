import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import ReactTestUtils from 'react-addons-test-utils';
import getTheme from './_get-theme';

let AppThemeTests;

test.before(() => {
	AppThemeTests = getTheme();
});

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

const testComponent = (componentRequired, cProps, cChildren, title) => {
	test(`Render component ${componentRequired.name}: ${title}`, t => {
		const componentObj = createReactComponent(componentRequired, cProps, cChildren);
		const rendered = shallow(componentObj, {context: {muiTheme: AppThemeTests}});
		t.truthy(ReactTestUtils.isElementOfType(componentObj, componentRequired));
		t.is(typeof componentObj, 'object');
		t.is(typeof rendered, 'object');
	});
};

const testError = (componentRequired, cProps, cChildren, title) => {
	test(`Render component ${componentRequired.name} throws error: ${title}`, t => {
		t.throws(() => {
			const componentObj = createReactComponent(componentRequired, cProps, cChildren);
			shallow(componentObj, {context: {muiTheme: AppThemeTests}});
		});
	});
};

const recursiveTest = (componentRequired, info, title) => {
	if ('title' in info) {
		info.components.forEach(cInfo => recursiveTest(componentRequired, cInfo, `${title} ${info.title}`));
	} else if ('throwsError' in info && info.throwsError) {
		testError(componentRequired, info.props, info.children, title);
	} else {
		testComponent(componentRequired, info.props, info.children, title);
	}
};

const buildComponentTests = (componentRequired, componentsProps) => {
	if (componentRequired.name in componentsProps) {
		componentsProps[componentRequired.name].forEach(cInfo => recursiveTest(componentRequired, cInfo, ''));
	} else {
		const componentObj = createReactComponent(componentRequired);
		testComponent(componentRequired, componentObj);
	}
};

module.exports = {
	buildComponentTests
};
