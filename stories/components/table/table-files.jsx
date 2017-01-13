import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import TableFiles from 'app/components/table/table-files';

const apkList = [
	{
		id: 'abc',
		filename: 'def',
		status: 'uploaded'
	},
	{
		id: '123',
		filename: '456',
		status: 'sending'
	}
];

storiesOf('Table', module)
	.addDecorator(themeDecorator)
	.add('TableFiles', () => (
		<div style={{width: 800, padding: 20}}>
			<TableFiles list={apkList}/>
		</div>
	));
