'use strict';

import {upperFirst, deepAssign, isEqual, isObject} from 'app/libs/helpers';

const debug = require('debug')('AiC:Libs:NotifyCore');

class NotifyCore {
	constructor() {
		this.groups = {};
		this.actions = {};
	}

	createGroup(group, groupOptions) {
		this.groups[group] = deepAssign({children: [], activeCount: {}}, groupOptions);
		const groupLabel = upperFirst(group);

		// Register watch and clear functions
		this[`watch${groupLabel}`] = this.watchGroup.bind(this, group);
		this[`clear${groupLabel}`] = this.clearGroup.bind(this, group);
	}

	getGroupId(group, groupInfo) {
		return groupInfo[this.groups[group].id];
	}

	watchGroup(group, groupInfo) {
		debug(`watch ${group}`, groupInfo);
		const groupId = this.getGroupId(group, groupInfo);
		if (groupId in this.groups[group].activeCount) {
			this.groups[group].activeCount[groupId]++;
		} else {
			this.groups[group].activeCount[groupId] = 1;
		}
		debug(`end watch ${group}`, this.groups, this.actions);
	}

	clearGroup(group, groupInfo) {
		debug(`clear ${group}`, groupInfo);
		const groupId = this.getGroupId(group, groupInfo);
		// const groupIdName = this.groups[group].id;
		this.groups[group].activeCount[groupId]--;

		// Nobody is watching this group, all calls should be removed
		if (this.groups[group].activeCount[groupId] === 0) {
			this.groups[group].children.forEach(action => {
				if (this.isActionRunning(action, groupInfo)) {
					this.stopAction(action, groupInfo);
				}
				// this.actions[action].running[groupId]
					// .filter(r => r.actionInfo[groupIdName] === groupId)
					// .forEach(r => {
					// 	r.shouldStop = true;
					// 	clearTimeout(r.timeout);
					// });
			});
		}
		debug(`end clear ${group}`, this.groups, this.actions);
	}

	addToGroup(groupLabel, action) {
		if (!(groupLabel in this.groups)) {
			this.createGroup(groupLabel);
		}
		this.groups[groupLabel].children.push(action);
	}

	addAction(action, actionOptions) {
		if (action in this.actions) {
			throw new Error(`Action ${action} already exists in Notify.`);
		}

		this.actions[action] = deepAssign({}, actionOptions);
		this.actions[action].action = action;
		this.actions[action].running = {};
		const actionLabel = upperFirst(action);

		// Register start and stop functions
		this[`start${actionLabel}`] = this.startAction.bind(this, action);
		// this[`stop${actionLabel}`] = this.stopAction.bind(this, action);

		// Register in the group
		if ('group' in actionOptions) {
			this.addToGroup(actionOptions.group, action);
		}
	}

	isActionRunning(action, actionInfo) {
		const groupId = this.getGroupIdByAction(action, actionInfo);
		return groupId in this.actions[action].running && !this.actions[action].running[groupId].shouldStop;
	}

	startAction(action, actionInfo, requestExtraOptions, actionExtraOptions) {
		debug(`start${action}`, actionInfo);
		// TODO should reject calls with same action and actionInfo
		if (this.isActionRunning(action, actionInfo)) {
			debug(`Start ${action} ignored. Already running.`, actionInfo);
			return;
		}

		// Should only start action if the group is being watched
		if (this.isActionWatched(action, actionInfo)) {
			const initialDelaySeconds = isObject(actionExtraOptions) && 'initialDelaySeconds' in actionExtraOptions ? actionExtraOptions.initialDelaySeconds : 0;
			const timeoutSeconds = isObject(actionExtraOptions) && 'timeoutSeconds' in actionExtraOptions ? actionExtraOptions.timeoutSeconds : 5;
			// const runningIndex = this.actions[action].running.length;
			const runningIndex = this.getGroupIdByAction(action, actionInfo);
			this.actions[action].running[runningIndex] = {shouldStop: false, lastResponse: null, actionInfo};
			const fn = () => {
				debug(`fn ${action}`, actionInfo);
				this.actions[action].request(actionInfo).then(response => {
					debug(`response ${action}`, response);
					const finalResponse = isObject(response) && 'response' in response ? response.response : response;
					if (!isEqual(finalResponse, this.actions[action].running[runningIndex].lastResponse)) {
						debug(`not equal, notifying ${action}`);
						this.actions[action].running[runningIndex].lastResponse = finalResponse;
						this.actions[action].notify(actionInfo, response);
						if (!this.actions[action].running[runningIndex].shouldStop) {
							const actionShouldStop = this.actions[action].stopCondition(actionInfo, response);
							if (actionShouldStop) {
								this.stopAction(action, actionInfo);
							}
						}
					}
					if (!this.actions[action].running[runningIndex].shouldStop) {
						debug(`new timeout ${action} for ${runningIndex}`);
						this.actions[action].running[runningIndex].timeout = setTimeout(fn, timeoutSeconds * 1000);
					}
				});
			};
			this.actions[action].running[runningIndex].timeout = setTimeout(fn, initialDelaySeconds * 1000);
		} else {
			debug(`Start ${action} ignored. Nobody watching.`, actionInfo);
		}
	}

	stopAction(action, actionInfo) {
		const runningIndex = this.getGroupIdByAction(action, actionInfo);
		debug(`stopping ${action} for ${runningIndex}`);
		this.actions[action].running[runningIndex].shouldStop = true;
		clearTimeout(this.actions[action].running[runningIndex].timeout);
		if ('stopCascade' in this.actions[action]) {
			this.stopCascade(this.actions[action].stopCascade, runningIndex);
		}
	}

	stopCascade(actions, index) {
		actions.forEach(action => {
			if (index in this.actions[action].running) {
				this.actions[action].running[index].shouldStop = true;
			}
		});
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
			this.createGroup(k, info[k]);
		});
	}

	getGroupIdByAction(action, actionInfo) {
		const group = this.getGroupByAction(action);
		return this.getGroupId(group, actionInfo);
	}

	getGroupByAction(action) {
		return this.actions[action].group;
	}

	isActionWatched(action, actionInfo) {
		debug(`isActionWatched ${action}`, actionInfo);
		const group = this.getGroupByAction(action);
		const groupId = this.getGroupIdByAction(action, actionInfo);
		debug(`isActionWatched vars`, group, groupId, this.groups[group].activeCount[groupId]);
		debug(`isActionWatched class`, this.groups, this.actions);
		if (!this.actionExists(action) ||
				!this.groupExists(group) ||
				!this.groupActiveExists(group, groupId)) {
			return false;
		}
		return (this.groups[group].activeCount[groupId] !== 0);
	}

	groupActiveExists(group, groupId) {
		return group in this.groups && groupId in this.groups[group].activeCount;
	}

	groupExists(group) {
		return group in this.groups;
	}

	actionExists(action) {
		return action in this.actions;
	}
}

module.exports = NotifyCore;
