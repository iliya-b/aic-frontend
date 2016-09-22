import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import CampaignIcon from 'app/components/icon/campaign-icon';

const icons = CampaignIcon.SIZE_LIST.map(s1 => {
	const iconList = CampaignIcon.STATUS_LIST.map(s2 => {
		return <CampaignIcon key={`${s1}-${s2}`} status={s2} size={s1}/>;
	});
	return (
		<div key={s1}>
			<h3>{s1}</h3>
			{iconList}
		</div>
	);
});

const iconsTooltip = CampaignIcon.SIZE_LIST.map(s1 => {
	const iconList = CampaignIcon.STATUS_LIST.map(s2 => {
		return <CampaignIcon key={`${s1}-${s2}`} tooltip={s2} status={s2} size={s1}/>;
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
	.add('CampaignIcon', () => (
		<div>
			<h2>Without tooltip</h2>
			{icons}

			<h2>With tooltip</h2>
			{iconsTooltip}
		</div>
	));
