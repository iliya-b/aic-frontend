import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import MachineIcon from 'app/components/icon/machine-icon';

const icons = MachineIcon.SIZE_LIST.map(s1 => {
	const iconList = MachineIcon.STATUS_LIST.map(s2 => {
		return <MachineIcon key={`${s1}-${s2}`} status={s2} size={s1}/>;
	});
	return (
		<div key={s1}>
			<h3>{s1}</h3>
			{iconList}
		</div>
	);
});

storiesOf('Icon', module)
	.addDecorator(themeDecorator)
	.add('MachineIcon', () => (
		<div>
			{icons}
		</div>
	));
