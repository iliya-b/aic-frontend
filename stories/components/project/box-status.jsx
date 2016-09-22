import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import BoxStatus from 'app/components/project/box-status';

const allStatus = ['doing', 'success', 'fail', 'disable'];
const allCampaignTypes = ['prepare', 'create', 'run', 'result'];
const allLiveTypes = ['search', 'create', 'load', 'connect', 'close'];

const boxesLive = allStatus.map(function (itemStatus, indexStatus) {
	const boxes = this.map((itemBox, indexBox, arrayBox) => {
		return <BoxStatus key={indexBox} objectName={'session'} typeName={itemBox} status={itemStatus} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox + 1)}/>;
	});
	return <div key={indexStatus}>{boxes}</div>;
}, allLiveTypes);

const boxesCampaign = allStatus.map(function (itemStatus, indexStatus) {
	const boxes = this.map((itemBox, indexBox, arrayBox) => {
		return <BoxStatus key={indexBox} objectName={'campaign'} typeName={itemBox} status={itemStatus} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox + 1)}/>;
	});
	return <div key={indexStatus}>{boxes}</div>;
}, allCampaignTypes);

storiesOf('Project', module)
	.addDecorator(themeDecorator)
	.add('BoxStatus', () => (
		<div>
			<div>
				<h2>Status for live</h2>
				{boxesLive}
			</div>

			<div>
				<h2>Status for campaign</h2>
				{boxesCampaign}
			</div>
		</div>
	));
