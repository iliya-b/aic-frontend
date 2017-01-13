import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import DialogConfirmDelete from 'app/components/dialog/dialog-confirm-delete';

storiesOf('Dialog', module)
	.addDecorator(themeDecorator)
	.add('DialogConfirmDelete', () => (
		<DialogConfirmDelete/>
	));
