'use strict';

import {upperFirst, deepAssign, isEqual} from 'app/libs/helpers';

const debug = require('debug')('AiC:Libs:NotifyCore');

class NotifyCore {
	constructor() {
		this.groups = {};
		this.actions = {};
	}

	createGroup(group) {
		this.groups[group] = {children: []};
		const groupLabel = upperFirst(group);

		// Register watch and clear functions
		this[`watch${groupLabel}`] = groupInfo => {
			debug(`watch${groupLabel}`, groupInfo);
		};
		this[`clear${groupLabel}`] = groupInfo => {
			debug(`clear${groupLabel}`, groupInfo);
			// this.groups[group].forEach(label => {
			// 	this[`stop${label}`]();
			// });
		};
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
		this.actions[action].running = [];
		const actionLabel = upperFirst(action);

		// Register start and stop functions
		this[`start${actionLabel}`] = this.startAction.bind(this, action);
		this[`stop${actionLabel}`] = this.stopAction.bind(this, action);

		// Register in the group
		if ('group' in actionOptions) {
			this.addToGroup(actionOptions.group, action);
		}
	}

	startAction(action, actionInfo) {
		debug(`start${action}`, actionInfo);
		// TODO should reject calls with same action and actionInfo
		const initialDelaySeconds = 0;
		const timeoutSeconds = 5;
		const runningIndex = this.actions[action].running.length;
		this.actions[action].running.push({shouldStop: false, lastResponse: null});
		const fn = () => {
			debug(`fn ${action}`, actionInfo);
			this.actions[action].request(actionInfo).then(response => {
				debug(`response ${action}`, response);
				const finalResponse = 'response' in response ? response.response : response;
				if (!isEqual(finalResponse, this.actions[action].running[runningIndex].lastResponse)) {
					this.actions[action].running[runningIndex].lastResponse = finalResponse;
					this.actions[action].notify(actionInfo, response);
					this.actions[action].running[runningIndex].shouldStop = this.actions[action].stopCondition(actionInfo, response);
				}
				if (!this.actions[action].running[runningIndex].shouldStop) {
					this.actions[action].running[runningIndex].timeout = setTimeout(fn, timeoutSeconds * 1000);
				}
			});
		};
		this.actions[action].running[runningIndex].timeout = setTimeout(fn, initialDelaySeconds * 1000);
	}

	stopAction(action, actionInfo) {
		debug(`stop${action}`, actionInfo);
		// this.actions[action].running[runningIndex].shouldStop = true;
	}

	register(info) {
		const keys = Object.keys(info);
		keys.forEach(k => {
			this.addAction(k, info[k]);
		});
	}
}

module.exports = NotifyCore;
