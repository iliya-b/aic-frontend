import test from 'ava';
import TogglableIcon from '../../../../src/app/components/shared/togglable-icon.jsx';
// import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
// import ReactDOMServer from 'react-dom/server';

test('Render TogglableIcon component', t => {
	const component = React.createElement(TogglableIcon);

	// const rendered = ReactDOMServer.renderToStaticMarkup(component);

	// t.same(rendered, '<span class="form__error">Error message</span>');

	console.log(component);

	t.pass();
});

test('bar', async t => {
	const bar = Promise.resolve('bar');

	t.is(await bar, 'bar');
});

// References
// https://github.com/Swizec/react-testing-example/blob/master/src/__tests__/RandomPicker-test.jsx
// https://www.toptal.com/react/how-react-components-make-ui-testing-easy
