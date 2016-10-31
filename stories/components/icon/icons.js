import {storiesOf} from '@kadira/storybook';
import {themeDecorator, buildComponentStories} from 'stories/_helpers';
import componentsProps from 'test/prop-samples/icon';

const req = require.context('app/components/icon/', true, /^\.\/.*\.jsx?$/);
const story = storiesOf('Icon', module).addDecorator(themeDecorator);
const components = req.keys().map(req);
components.forEach(componentRequired => buildComponentStories(story, componentRequired, componentsProps));
