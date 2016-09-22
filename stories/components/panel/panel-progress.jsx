import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';
import PanelProgress from 'app/components/panel/panel-progress';

const items1 = [
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.QUEUED, children: 'com.aic.bla'}
];

const items2 = [
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'}
];

const items3 = [
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'}
];

const items4 = [
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'}
];

const items5 = [
	{status: 'TOTO', children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.QUEUED, children: 'com.aic.bla'}
];

const items6 = [
	{status: SimpleStatusIcon.STATUS_LIST.REQUESTED, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.ERROR, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.READY, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.RUNNING, children: 'com.aic.bla'},
	{status: SimpleStatusIcon.STATUS_LIST.QUEUED, children: 'com.aic.bla'}
];

storiesOf('Panel', module)
	.addDecorator(themeDecorator)
	.add('PanelProgress', () => (
		<div>
			<PanelProgress type="apk" style={{margin: 10, width: 800}} items={items1}/>
			<br/>
			<PanelProgress type="apk" style={{margin: 10, width: 400}} items={items1}/>
			<br/>
			<PanelProgress type="apk" style={{margin: 10, width: '95%'}} items={items1}/>
			<br/>
			<PanelProgress type="apk" style={{margin: 10, width: 800}} items={items2}/>
			<br/>
			<PanelProgress type="apk" style={{margin: 10, width: 800}} items={items3}/>
			<br/>
			<PanelProgress type="apk" style={{margin: 10, width: 800}} items={items4}/>
			<br/>
			<PanelProgress type="apk" style={{margin: 10, width: 800}} items={items5}/>
			<br/>
			<PanelProgress type="apk" style={{margin: 10, width: 800}} items={[]}/>
			<br/>
			<PanelProgress type="apk" style={{margin: 10, width: 800}} items={items6}/>
		</div>
	));
