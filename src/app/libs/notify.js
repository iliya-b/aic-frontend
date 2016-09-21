'use strict';

import NotifyCore from 'app/libs/notify-core';
import Gateway from 'app/libs/gateway';
import LiveActions from 'app/actions/live';
import UserActions from 'app/actions/user';

const debug = require('debug')('AiC:Libs:Notify');

const Notify = new NotifyCore();
Notify.registerGroups({
	live: {
		id: 'avmId'
	},
	projectSessions: {
		id: 'projectId'
	}
});

const sessionStatusUpdating = ['CREATING', 'QUEUED', 'REQUESTED', 'DELETING'];

Notify.registerActions({
	liveInstallAPK: {
		group: 'live',
		request: Gateway.live.command,
		notify: LiveActions.notifyLiveInstallAPK,
		stopCondition: (actionInfo, response) => (response.status === 'READY' || response.status === 'ERROR')
	},
	liveMonkeyRunner: {
		group: 'live',
		request: Gateway.live.command,
		notify: LiveActions.notifyLiveMonkeyRunner,
		stopCondition: (actionInfo, response) => (response.status === 'READY' || response.status === 'ERROR')
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
		// stopCondition: () => false
		stopCondition: (actionInfo, response) => {
			const shouldStop = (response.reduce((p, c) => {
				return p && sessionStatusUpdating.indexOf(c.avm_status) !== -1 ? false : p;
			}, true));
			debug('listSessions, stopCondition', response, shouldStop);
			return shouldStop;
		}
	}
});

module.exports = Notify;
