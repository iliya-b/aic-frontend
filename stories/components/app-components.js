import {storiesOf} from '@kadira/storybook';
import {themeDecorator, buildComponentStories} from 'stories/_helpers';
import componentsProps from 'test/fixtures';

// Needs to be like this otherwise webpack can not resolve statically the require
const req = {};
req.Card = require.context(`app/components/card/`, true, /^\.\/.*\.jsx?$/);
req.Icon = require.context(`app/components/icon/`, true, /^\.\/.*\.jsx?$/);
req.Panel = require.context(`app/components/panel/`, true, /^\.\/.*\.jsx?$/);
req.Toolbar = require.context(`app/components/toolbar/`, true, /^\.\/.*\.jsx?$/);

const componentsTypes = Object.keys(componentsProps);

componentsTypes.forEach(componentType => {
	console.log('componentType', componentType);
	const story = storiesOf(componentType, module).addDecorator(themeDecorator);
	const components = req[componentType].keys().map(req[componentType]);
	components.forEach(componentRequired => buildComponentStories(story, componentRequired, componentsProps[componentType]));
});
