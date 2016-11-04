import {storiesOf} from '@kadira/storybook';
import {themeDecorator, buildComponentStories} from 'stories/_helpers';
import componentsProps from 'test/prop-samples/panel';

const req = require.context('app/components/panel/', true, /^\.\/.*\.jsx?$/);
const story = storiesOf('Panel', module).addDecorator(themeDecorator);
const components = req.keys().map(req);
components.forEach(componentRequired => buildComponentStories(story, componentRequired, componentsProps));
