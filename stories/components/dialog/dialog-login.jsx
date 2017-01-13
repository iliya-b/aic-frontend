import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import DialogLogin from 'app/components/dialog/dialog-login';

storiesOf('Dialog', module)
	.addDecorator(themeDecorator)
	.add('DialogLogin', () => (
		<DialogLogin/>
	));
