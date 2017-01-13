import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import DialogCampaignCreation from 'app/components/dialog/dialog-campaign-creation';

const apks = [{status: 'READY', id: 'file1', filename: 'file1'}, {status: 'READY', id: 'file2', filename: 'file2'}];
storiesOf('Dialog', module)
	.addDecorator(themeDecorator)
	.add('DialogCampaignCreation', () => (
		<DialogCampaignCreation apks={apks}/>
	));
