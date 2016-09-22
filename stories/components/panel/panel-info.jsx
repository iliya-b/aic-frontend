import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import PanelInfo from 'app/components/panel/panel-info';

const infoShowIcon = [true, false];
const statuses = PanelInfo.STATUS_LIST.slice();
statuses.push(false);

let infoPanels = infoShowIcon.map((showIcon, si) => {
	return Reflect.apply([].concat, [], PanelInfo.SIZE_LIST.map((size, ti) => {
		return statuses.map((status, bi) => {
			const statusProp = {};
			if (status) {
				statusProp.status = status;
			}
			return (
				<PanelInfo
					style={{margin: '10px'}}
					key={`${si}-${ti}-${bi}`}
					showIcon={showIcon}
					{...statusProp}
					size={size}
					>
					{`${status ? status : 'DEFAULT'} ${showIcon ? 'with icon' : 'no icon'} ${size} message.`}
				</PanelInfo>
			);
		});
	}));
});

infoPanels = Reflect.apply([].concat, [], infoPanels);

storiesOf('Panel', module)
	.addDecorator(themeDecorator)
	.add('PanelInfo', () => (
		<div>
		{infoPanels}
		</div>
	));
