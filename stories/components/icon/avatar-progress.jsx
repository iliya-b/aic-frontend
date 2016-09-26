import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import AvatarProgress from 'app/components/icon/avatar-progress';
import {FontIcon} from 'material-ui';

const backgroundColor = '#A2A2A2';
const progress = [
	{id: 1, progress: 10, color: 'red'},
	{id: 2, progress: 20, color: 'blue'},
	{id: 3, progress: 40, color: 'violet'},
	{id: 4, progress: 70, color: 'orange'}
];

storiesOf('Icon', module)
	.addDecorator(themeDecorator)
	.add('AvatarProgress', () => (
		<div>
			<AvatarProgress
				icon={<FontIcon className="mdi mdi-android"/>}
				backgroundColor={backgroundColor}
				progress={progress}
				/>
		</div>
	));
