'use strict';

// Reflux
const Reflux = require('reflux');

// APP
// const BackendAPI = require('app/libs/backend-api');

// Actions
const CampaignActions = Reflux.createActions({
	setProjectId: {},
	loadState: {},
	setState: {},
	reset: {},
	restart: {},
	socketMessage: {},
	logMessage: {},
	prepare: {children: ['completed', 'failure']},
	create: {children: ['completed', 'failure']},
	run: {children: ['completed', 'failure']},
	result: {children: ['completed', 'failure']},
	loadDevices: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls

// CampaignActions.create.listen(function (projectId, instanceId, instanceName, APKIds, APKTestIds) {
// 	const token = '';
// 	BackendAPI.testCreate(token, projectId, instanceId, instanceName, APKIds, APKTestIds, res => {
// 		if (res.hasOwnProperty('token')) {
// 			const WebsocketActions = require('app/actions/websocket');
// 			WebsocketActions.connect(res.token, 'campaign');
// 		} else {
// 			this.failure('It was not possible to create a campaign.');
// 		}
// 	});
// });

// CampaignActions.loadDevices.listen(function () {
// 	const token = '';
// 	BackendAPI.instanceList(token, res => {
// 		let tests = [];
// 		if (res !== undefined && res.results !== undefined && res.results.length > 0) {
// 			tests = res.results.map(test => {
// 				return {
// 					id: test[0],
// 					name: test[1]
// 				};
// 			});
// 		}
// 		// { apkId: 'apk1', text: 'APK1', checkbox:true },
// 		this.completed(tests);
// 		// TODO: change api to promises, add failure
// 	});
// });

module.exports = CampaignActions;
