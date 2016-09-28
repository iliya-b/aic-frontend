import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import PanelSessionStatus from 'app/components/panel/panel-session-status';

const panels = PanelSessionStatus.STATUS_LIST.map((s, i) => {
	return (
		<div key={i}>
			<h2>{s}</h2>
			<PanelSessionStatus status={s}/>
		</div>
	);
});

storiesOf('Panel', module)
	.addDecorator(themeDecorator)
	.add('PanelSessionStatus', () => (
		<div>
		{panels}
		</div>
	));
