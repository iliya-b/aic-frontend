import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import DialogLiveCreation from 'app/components/dialog/dialog-live-creation';

storiesOf('Dialog', module)
	.addDecorator(themeDecorator)
	.add('DialogLiveCreation', () => (
		<DialogLiveCreation/>
	));
