import fs from 'fs';
import test from 'ava';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import {shallow} from 'enzyme';
import getTheme from './get-theme';
import componentsProps from '../../prop-samples/icon';

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

let AppThemeTests;

test.before(() => {
	AppThemeTests = getTheme();
});

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

const buildComponentTests = componentRequired => {
	if (componentRequired.name in componentsProps) {
		componentsProps[componentRequired.name].forEach(cInfo => recursiveTest(componentRequired, cInfo, ''));
	} else {
		const componentObj = createReactComponent(componentRequired);
		testComponent(componentRequired, componentObj);
	}
};

const files = fs.readdirSync(`${__dirname}/../../../src/app/components/icon/`).map(f => f.substring(0, f.length - 4));
const components = files.map(f => require(`app/components/icon/${f}`));
components.forEach(buildComponentTests);
