import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';

const icons = SimpleStatusIcon.STATUS_LIST_ARR.map((c, i) => {
	return (
		<div key={i}>
			{c}
			<SimpleStatusIcon style={{margin: 10}} status={c}/>
		</div>
	);
});

storiesOf('Icon', module)
	.addDecorator(themeDecorator)
	.add('SimpleStatusIcon', () => (
		<div>
			{icons}
		</div>
	));
