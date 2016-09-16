'use strict';

import NotifyCore from 'app/libs/notify-core';
import Gateway from 'app/libs/gateway';
import LiveActions from 'app/actions/live';

// const debug = require('debug')('AiC:Libs:Notify');

const Notify = new NotifyCore();
Notify.registerGroups({
	live: {
		id: 'avmId'
	}
});

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
	}
});

module.exports = Notify;
