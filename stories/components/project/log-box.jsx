import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import LogBox from 'app/components/shared/log-box';
import LogBoxRow from 'app/components/shared/log-box-row';
import AppUtils from 'app/components/shared/app-utils';

const logBoxRef = [
	{time: AppUtils.getDate(), message: 'Stack creation scheduled'},
	{time: AppUtils.getDate(), message: 'Stack retrieval or creation finished'},
	{time: AppUtils.getDate(), message: 'Docker creation scheduled.'},
	{time: AppUtils.getDate(), message: 'Docker created and ready.'}
];

const logBoxRows = logBoxRef.map((v, i) => {
	return <LogBoxRow key={i} time={v.time}>{v.message}</LogBoxRow>;
});

storiesOf('Project', module)
	.addDecorator(themeDecorator)
	.add('BoxStatus', () => (
		<div style={{width: '547px'}}>
			<LogBox>
				{logBoxRows}
			</LogBox>
		</div>
	));
