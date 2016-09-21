'use strict';

import NotifyCore from 'app/libs/notify-core';
import Gateway from 'app/libs/gateway';
import LiveActions from 'app/actions/live';
import UserActions from 'app/actions/user';
import NotifyStopCondition from 'app/libs/notify-stop-condition';
import CampaignActions from 'app/actions/campaign';

// const debug = require('debug')('AiC:Libs:Notify');

const Notify = new NotifyCore();
Notify.registerGroups({
	live: {
		id: 'avmId'
	},
	projectSessions: {
		id: 'projectId'
	},
	projectCampaigns: {
		id: 'projectId'
	}
});

Notify.registerActions({
	liveInstallAPK: {
		group: 'live',
		request: Gateway.live.command,
		notify: LiveActions.notifyLiveInstallAPK,
		stopCondition: (actionInfo, response) => NotifyStopCondition.commandShouldStop(response)
	},
	liveMonkeyRunner: {
		group: 'live',
		request: Gateway.live.command,
		notify: LiveActions.notifyLiveMonkeyRunner,
		stopCondition: (actionInfo, response) => NotifyStopCondition.commandShouldStop(response)
	},
	userQuota: {
		group: 'projectSessions',
		request: Gateway.user.quota,
		notify: UserActions.notifyQuota,
		stopCondition: () => false
	},
	listSessions: {
		group: 'projectSessions',
		request: Gateway.live.list,
		notify: LiveActions.notifyList,
		stopCondition: (actionInfo, response) => response.every(NotifyStopCondition.machineShouldStop)
	},
	listCampaigns: {
		group: 'projectCampaigns',
		request: Gateway.campaign.list,
		notify: CampaignActions.notifyList,
		stopCondition: (actionInfo, response) => response.every(NotifyStopCondition.campaignShouldStop)
	}
});

module.exports = Notify;
