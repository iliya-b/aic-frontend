import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import CardAndroidSession from 'app/components/card/card-android-session';

const avmInfo1 = {avm_name: 'machine 1', avm_id: 'cfaamg4e', avm_novnc_host: '10.50.0.86', avm_novnc_port: 19623, avm_owner: 'karine', avm_status: 'CREATING', image: 'kitkat-phone', index: 1, project_id: '0602b27748484b249244ab471a9142d7', stack_name: 'karine-cfaamg4e', ts_created: '2016-03-29T12:25:10.687575'}; // eslint-disable-line camelcase
const avmInfo2 = {avm_name: 'machine 2', avm_id: 'xxx1', avm_novnc_host: '10.50.0.86', avm_novnc_port: 19623, avm_owner: 'karine', avm_status: 'DELETING', image: 'kitkat-tablet', index: 1, project_id: '0602b27748484b249244ab471a9142d7', stack_name: 'karine-cfaamg4e', ts_created: '2016-03-29T12:25:10.687575'}; // eslint-disable-line camelcase
const avmInfo3 = {avm_name: 'machine 3', avm_id: 'yyy2', avm_novnc_host: '10.50.0.86', avm_novnc_port: 19623, avm_owner: 'karine', avm_status: 'READY', image: 'lollipop-phone', index: 1, project_id: '0602b27748484b249244ab471a9142d7', stack_name: 'karine-cfaamg4e', ts_created: '2016-03-29T12:25:10.687575'}; // eslint-disable-line camelcase

storiesOf('Card', module)
	.addDecorator(themeDecorator)
	.add('CardAndroidSession', () => (
		<div style={{width: 847}}>
			<CardAndroidSession {...avmInfo1}/>
			<CardAndroidSession {...avmInfo2}/>
			<CardAndroidSession {...avmInfo3}/>
		</div>
	));
