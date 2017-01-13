import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import MultiTextField from 'app/components/form/multi-text-field';

storiesOf('Form', module)
	.addDecorator(themeDecorator)
	.add('MultiTextField', () => (
		<div>
			<h2>with hint text</h2>
			<MultiTextField hintText="hintText"/>
			<h2>no hint text</h2>
			<MultiTextField/>
		</div>
	));
