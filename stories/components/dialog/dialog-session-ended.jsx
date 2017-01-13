import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import DialogSessionEnded from 'app/components/dialog/dialog-session-ended';

storiesOf('Dialog', module)
	.addDecorator(themeDecorator)
	.add('DialogSessionEnded', () => (
		<DialogSessionEnded/>
	));
