import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import DeviceIcon from 'app/components/icon/device-icon';

const images = ['kitkat-phone', 'kitkat-tablet', 'lollipop-phone', 'lollipop-tablet'];

const iconsOn = images.map((c, i) => <DeviceIcon key={i} style={{margin: 10}} isOn image={c}/>);
const iconsOff = images.map((c, i) => <DeviceIcon key={i} style={{margin: 10}} isOn={false} image={c}/>);

storiesOf('Icon', module)
	.addDecorator(themeDecorator)
	.add('DeviceIcon', () => (
		<div>
			<h2>On</h2>
			{iconsOn}
			<h2>Off</h2>
			{iconsOff}
		</div>
	));
