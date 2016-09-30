'use strict';

import {upperFirst, isEqual, isObject} from 'app/libs/helpers';

const debug = require('debug')('AiC:Libs:NotifyCore');


class NotifyGroup {
	constructor(groupName, groupOptions) {
		this.name = groupName;
		this.options = groupOptions;
		this.activeCount = {};
		this.actions = [];
	}

	getLabel() {
		return upperFirst(this.name);
	}

	watch(info) {
		debug(`NotifyGroup:watch ${this.name}`, info);
		const groupInfoId = this.getGroupInfoId(info);
		if (groupInfoId in this.activeCount) {
			this.activeCount[groupInfoId]++;
		} else {
			this.activeCount[groupInfoId] = 1;
		}
	}

	clear(info) {
		debug(`NotifyGroup:clear ${this.name}`, info);
		const groupInfoId = this.getGroupInfoId(info);
		this.activeCount[groupInfoId]--;

		// Nobody is watching this group, all calls should be removed
		if (!this.isBeingWatched(info)) {
			// Should stop only the ones connected to info
			this.actions.forEach(action => action.stopAllRunning(info)); // Stop actions
		}
	}

	getGroupInfoId(info) {
		return info[this.options.id];
	}

	addAction(action) {
		this.actions.push(action);
	}

	isBeingWatched(info) {
		const groupInfoId = this.getGroupInfoId(info);
		return this.activeCount[groupInfoId] > 0;
	}
}

class NotifyActionRunning {
	constructor(actionInfo, requestExtraOptions, actionExtraOptions, action) {
		const initialDelaySeconds = isObject(actionExtraOptions) && 'initialDelaySeconds' in actionExtraOptions ? actionExtraOptions.initialDelaySeconds : 0;

		this.timeoutSeconds = isObject(actionExtraOptions) && 'timeoutSeconds' in actionExtraOptions ? actionExtraOptions.timeoutSeconds : 5;
		this.shouldStop = false;
		this.lastResponse = null;
		this.info = actionInfo;
		this.action = action;

		this.timeout = setTimeout(this.request.bind(this), initialDelaySeconds * 1000);
	}

	request() {
		debug(`fn ${this.action.getLabel()}`, this.info);
		this.action.doRequest(this.info).then(response => {
			debug(`response ${this.action.getLabel()}`, response);
			const finalResponse = isObject(response) && 'response' in response ? response.response : response;
			if (!isEqual(finalResponse, this.lastResponse)) {
				debug(`not equal, notifying ${this.action.getLabel()}`);
				this.lastResponse = finalResponse;
				this.action.doNotify(this.info, response);
				if (!this.shouldStop) {
					const actionShouldStop = this.action.doStopCondition(this.info, response);
					if (actionShouldStop) {
						this.action.stop(this.info);
					}
				}
			}
			if (!this.shouldStop) {
				debug(`new timeout ${this.action.getLabel()} for ${this.info}`);
				this.timeout = setTimeout(this.request.bind(this), this.timeoutSeconds * 1000);
			}
		});
	}

	stop() {
		debug(`stopping ${this.info}`);
		this.shouldStop = true;
		clearTimeout(this.timeout);
	}

	isRunning() {
		return !this.shouldStop;
	}
}

class NotifyAction {
	constructor(actionName, actionOptions, group) {
		this.name = actionName;
		this.options = actionOptions;
		this.running = {};
		this.group = group;
		this.group.addAction(this);
		this.doRequest = actionOptions.request;
		this.doNotify = actionOptions.notify;
		this.doStopCondition = actionOptions.stopCondition;
	}

	getLabel() {
		return upperFirst(this.name);
	}

	start(actionInfo, requestExtraOptions, actionExtraOptions) {
		debug(`NotifyAction: start${this.name}`, actionInfo);
		// TODO should reject calls with same action and actionInfo
		if (this.isActionRunning(actionInfo)) {
			debug(`Start ${this.name} ignored. Already running.`, actionInfo);
			return;
		}

		// Should only start action if the group is being watched
		if (this.group.isBeingWatched(actionInfo)) {
			this.createRunning(actionInfo, requestExtraOptions, actionExtraOptions);
		} else {
			debug(`Start ${this.name} ignored. Nobody watching.`, actionInfo);
		}
	}

	stop(actionInfo) {
		const runningIndex = this.getRunningIndex(actionInfo);
		const actionRunning = this.getRunning(actionInfo);
		actionRunning.stop();
		delete this.running[runningIndex];
	}

	getRunningIndex(actionInfo) {
		let runningIndex = this.group.getGroupInfoId(actionInfo);
		if (this.options.id) {
			runningIndex = `${runningIndex}-${actionInfo[this.options.id]}`;
		}
		debug('runningIndex', runningIndex, 'actionInfo', actionInfo, 'options', this.options);
		return runningIndex;
	}

	getRunning(actionInfo) {
		const runningIndex = this.getRunningIndex(actionInfo);
		return this.running[runningIndex];
	}

	isActionRunning(actionInfo) {
		const actionRunning = this.getRunning(actionInfo);
		return actionRunning && actionRunning.isRunning();
	}

	createRunning(actionInfo, requestExtraOptions, actionExtraOptions) {
		const actionRunning = new NotifyActionRunning(actionInfo, requestExtraOptions, actionExtraOptions, this);
		const runningIndex = this.getRunningIndex(actionInfo);
		this.running[runningIndex] = actionRunning;
	}

	stopAllRunning(info) {
		// TODO: info
		const allRunning = Object.keys(this.running);
		allRunning.forEach(runningIndex => this.running[runningIndex].stop());
		this.running = {};
	}
}

class NotifyCore {
	constructor() {
		this.groups = {};
		this.actions = {};
	}

	registerActions(info) {
		const keys = Object.keys(info);
		keys.forEach(k => {
			this.addAction(k, info[k]);
		});
	}

	registerGroups(info) {
		const keys = Object.keys(info);
		keys.forEach(k => {
			this.addGroup(k, info[k]);
		});
	}

	addGroup(groupName, groupOptions) {
		const groupObj = new NotifyGroup(groupName, groupOptions);
		this.groups[groupName] = groupObj;
		const groupLabel = groupObj.getLabel();

		// Register watch and clear functions
		this[`watch${groupLabel}`] = groupObj.watch.bind(groupObj);
		this[`clear${groupLabel}`] = groupObj.clear.bind(groupObj);
	}

	addAction(actionName, actionOptions) {
		const group = this.groups[actionOptions.group];
		if (!group) {
			throw new Error(`Group ${actionOptions.group} does not exists.`);
		}
		if (actionName in this.actions) {
			throw new Error(`Action ${actionName} already exists.`);
		}
		const action = new NotifyAction(actionName, actionOptions, group);
		const actionLabel = action.getLabel();
		this.actions[actionName] = action;

		// Register start and stop functions
		this[`start${actionLabel}`] = action.start.bind(action);
		this[`stop${actionLabel}`] = action.stop.bind(action);
	}

	groupExists(group) {
		return group in this.groups;
	}

	actionExists(action) {
		return action in this.actions;
	}
}

module.exports = NotifyCore;
