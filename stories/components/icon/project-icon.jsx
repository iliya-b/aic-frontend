import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import ProjectIcon from 'app/components/icon/project-icon';

const icons = ProjectIcon.SIZE_LIST.map(s1 => {
	const iconList = ProjectIcon.STATUS_LIST.map(s2 => {
		return <ProjectIcon key={`${s1}-${s2}`} status={s2} size={s1}/>;
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
	.add('ProjectIcon', () => (
		<div>
		{icons}
		</div>
	));
