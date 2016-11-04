import {storiesOf} from '@kadira/storybook';
import {themeDecorator, buildComponentStories} from 'stories/_helpers';
import componentsProps from 'test/prop-samples/card';

const req = require.context('app/components/card/', true, /^\.\/.*\.jsx?$/);
const story = storiesOf('Card', module).addDecorator(themeDecorator);
const components = req.keys().map(req);
components.forEach(componentRequired => buildComponentStories(story, componentRequired, componentsProps));
