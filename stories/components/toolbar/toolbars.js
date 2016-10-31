import {storiesOf} from '@kadira/storybook';
import {themeDecorator, buildComponentStories} from 'stories/_helpers';
import componentsProps from 'test/prop-samples/toolbar';

const req = require.context('app/components/toolbar/', true, /^\.\/.*\.jsx?$/);
const story = storiesOf('Toolbar', module).addDecorator(themeDecorator);
const components = req.keys().map(req);
components.forEach(componentRequired => buildComponentStories(story, componentRequired, componentsProps));

