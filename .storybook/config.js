import {configure} from '@kadira/storybook';

import 'build/css/materialdesignicons.min.css';
import 'build/fonts/materialdesignicons-webfont.woff2';
import 'build/fonts/materialdesignicons-webfont.woff';
import 'build/fonts/materialdesignicons-webfont.ttf';
import 'build/css/main.css';

const req = require.context('../stories/', true, /^\.\/.*\.jsx?$/);

function loadStories() {
	req.keys().forEach(req);
	// require('../stories/components/panel/panel-progress');
}

configure(loadStories, module);
