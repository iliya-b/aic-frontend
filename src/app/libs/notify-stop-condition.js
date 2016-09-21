'use strict';

const machineStatusUpdating = ['CREATING', 'QUEUED', 'REQUESTED', 'DELETING'];
const campaignStatusUpdating = ['RUNNING', 'QUEUED'];

const NotifyStopCondition = {
	commandShouldStop: commandInfo => (commandInfo.status === 'READY' || commandInfo.status === 'ERROR'),
	machineShouldStop: machineInfo => machineStatusUpdating.indexOf(machineInfo.avm_status) === -1,
	campaignShouldStop: campaignInfo => campaignStatusUpdating.indexOf(campaignInfo.status) === -1,
	liveReadShouldStop: liveInfo => liveInfo.avm_status === 'READY'
};

module.exports = NotifyStopCondition;
