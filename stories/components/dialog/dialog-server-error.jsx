import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import DialogServerError from 'app/components/dialog/dialog-server-error';

storiesOf('Dialog', module)
	.addDecorator(themeDecorator)
	.add('DialogServerError', () => (
		<DialogServerError/>
	));
