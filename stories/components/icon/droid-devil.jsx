import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import DroidDevil from 'app/components/icon/droid-devil';

storiesOf('Icon', module)
	.addDecorator(themeDecorator)
	.add('DroidDevil', () => (
		<div>
			<DroidDevil style={{width: 100, height: 100, margin: 10}}/>
		</div>
	));
