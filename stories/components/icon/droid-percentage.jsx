import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import DroidPercentage from 'app/components/icon/droid-percentage';

storiesOf('Icon', module)
	.addDecorator(themeDecorator)
	.add('DroidPercentage', () => (
		<div>
			0% <DroidPercentage value={0}/>
			<br/>
			33% <DroidPercentage value={33}/>
			<br/>
			66% <DroidPercentage value={66}/>
			<br/>
			100% <DroidPercentage value={100}/>
		</div>
	));
