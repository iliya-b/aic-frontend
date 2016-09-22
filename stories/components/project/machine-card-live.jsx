import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import MachineCardLive from 'app/components/project/machine-card-live';
import MachineCard from 'app/components/project/machine-card';

const avms = [
	{ // eslint-disable-line quote-props
		'avm_novnc_host': '127.0.0.1',
		'avm_owner': 'marco',
		'avm_id': 'jHLGWPeRSVyVzyCpWRsEjg',
		'avm_status': MachineCard.VMSTATE.READY,
		'avm_novnc_port': '5909'
	},
	{ // eslint-disable-line quote-props
		'avm_novnc_host': '127.0.0.1',
		'avm_owner': 'marco',
		'avm_id': 'sijEK9O9T962JYWOuUzHHg',
		'avm_status': MachineCard.VMSTATE.READY,
		'avm_novnc_port': '5946'
	},
	{ // eslint-disable-line quote-props
		'avm_novnc_host': '127.0.0.1',
		'avm_owner': 'marco',
		'avm_id': 'sijEK9O9T962JYWOuUzHHg',
		'avm_status': MachineCard.VMSTATE.CREATING,
		'avm_novnc_port': '5946'
	},
	{ // eslint-disable-line quote-props
		'avm_novnc_host': '127.0.0.1',
		'avm_owner': 'marco',
		'avm_id': 'sijEK9O9T962JYWOuUzHHg',
		'avm_status': MachineCard.VMSTATE.FAILED,
		'avm_novnc_port': '5946',
		'avm_status_reason': 'Resource CREATE failed: OverLimit: VolumeLimitExceeded: \nMaximum number of volumes allowed (50) exceeded (HTTP 413) \n(Request-ID: req-2896fb29-7db3-4b0c-8a96-1554e6dc5f39)'
	}
];

const avmsRendered = avms.map((currentValue, index) => {
	return <MachineCardLive {...currentValue} key={index}/>;
});

storiesOf('Project', module)
	.addDecorator(themeDecorator)
	.add('MachineCardLive', () => (
		<div style={{width: '547px'}}>
			{avmsRendered}
		</div>
	));
