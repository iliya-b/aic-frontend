/* global window */
'use strict';

import NotifyCore from 'app/libs/notify-core';
import Gateway from 'app/libs/gateway';
import LiveActions from 'app/actions/live';
import LiveListActions from 'app/actions/live-list';
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
	},
	campaign: {
		id: 'campaignId'
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
	liveProperties: {
		group: 'live',
		request: Gateway.live.properties,
		notify: LiveActions.notifyLiveProperties,
		stopCondition: () => false
	},
	liveRead: {
		group: 'live',
		request: Gateway.live.read,
		notify: LiveActions.notifyLiveRead,
		stopCondition: (actionInfo, response) => NotifyStopCondition.liveReadShouldStop(response)
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
		notify: LiveListActions.notifyList,
		stopCondition: (actionInfo, response) => response.every(NotifyStopCondition.machineShouldStop)
	},
	listCampaigns: {
		group: 'projectCampaigns',
		request: Gateway.campaign.list,
		notify: CampaignActions.notifyList,
		stopCondition: (actionInfo, response) => response.every(NotifyStopCondition.campaignShouldStop)
	},
	userQuotaCampaign: {
		group: 'projectCampaigns',
		request: Gateway.user.quota,
		notify: UserActions.notifyQuota,
		stopCondition: () => false
	},
	listSessionsCampaign: {
		group: 'campaign',
		request: Gateway.campaign.machines,
		notify: CampaignActions.notifySessionList,
		stopCondition: () => false // It will stop only when campaign is ready and no machines exists (check campaign show view)
	},
	campaignRead: {
		group: 'campaign',
		request: Gateway.campaign.read,
		notify: CampaignActions.notifyRead,
		stopCondition: (actionInfo, response) => NotifyStopCondition.campaignShouldStop(response)
	}
});

// Enable stop polling on browser
window.GobyAppGlobals.Notify = Notify;

module.exports = Notify;
