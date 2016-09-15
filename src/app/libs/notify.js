'use strict';

import NotifyCore from 'app/libs/notify-core';
import Gateway from 'app/libs/gateway';
import LiveActions from 'app/actions/live';

// const debug = require('debug')('AiC:Libs:Notify');

const Notify = new NotifyCore();
Notify.register({
	liveInstallAPK: {
		group: 'live',
		request: Gateway.live.command,
		notify: LiveActions.notifyLiveInstallAPK,
		stopCondition: (actionInfo, response) => (response.status === 'READY' || response.status === 'ERROR')
	}
});

// const Notify = {



// 	// startLiveInstallAPK({avmId: this.state.liveInfo.avm_id, commandId: this.state.live.installedAPKs[index].commandId});
// 	startLiveInstallAPK: liveInstallAPKInfo => {

// 	},


// LiveActions.notifyLiveInstallAPK(commandInfo)

// 	if (commandInfo.status === 'READY' || commandInfo.status === 'ERROR') {
// 				Notify.stopLiveInstallAPK({avmId: this.state.liveInfo.avm_id, commandId: commandInfo.commandId});
// 			}
// };

module.exports = Notify;
