'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';

const CampaignActions = Reflux.createActions({
	list: {asyncResult: true},
	read: {asyncResult: true},
	create: {asyncResult: true},
	delete: {asyncResult: true},
	notifyList: {},
	notifyRead: {},
	notifySessionList: {}
});

CampaignActions.list.listenAndPromise(Gateway.campaign.list);
CampaignActions.read.listenAndPromise(Gateway.campaign.read);
CampaignActions.create.listenAndPromise(Gateway.campaign.create);
CampaignActions.delete.listenAndPromise(Gateway.campaign.delete);

module.exports = CampaignActions;
