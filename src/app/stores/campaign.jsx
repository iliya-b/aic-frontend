'use strict';

// Reflux
const Reflux = require('reflux');

// Vendors
const debug = require('debug')('AiC:Stores:Campaign');

// APP
const AppUtils = require('app/components/shared/app-utils');
const CampaignActions = require('app/actions/campaign');

// Store
const CampaignStore = Reflux.createStore({

	// Base Store //

	listenables: CampaignActions,

	init() {
		this.state = {};
		this.state.projectId = false;
		this.reset();
		this.state.campaign.status = 'CAMPAIGN_STATUS_INITIATING';
		this.onLogMessage('Initiating campaign.');
		this.updateState();
	},

	// Actions //

	// Set project
	onSetProjectId(projectId) {
		this.state.projectId = projectId;
		this.setPreparing();
	},

	onLoadState() {
		this.updateState();
	},

	onSetState(newState) {
		this.state = newState;
		this.updateState();
	},

	// Restart
	// onRestart(projectId) {
	onRestart() {
		this.onLogMessage('Restarting campaign.');
		this.reset();
		this.setPreparing();
	},

	setPreparing() {
		this.onLogMessage('Preparing campaign.');
		this.state.campaign.status = 'CAMPAIGN_STATUS_PREPARING';
		this.updateState();
	},

	// Create

	onCreate() {
		this.onLogMessage('Campaign prepared.');
		this.state.campaign.status = 'CAMPAIGN_STATUS_PREPARED';
		this.updateState();
		this.onLogMessage('Creating campaign.');
		this.state.campaign.status = 'CAMPAIGN_STATUS_CREATING';
		this.updateState();
	},

	onCreateCompleted() {
		this.onLogMessage('Creating created.');
		this.state.campaign.status = 'CAMPAIGN_STATUS_CREATED';
		this.updateState();
	},

	onCreateFailure(errorMessage) {
		this.onLogMessage(errorMessage);
		this.state.campaign.status = 'CAMPAIGN_STATUS_CREATE_FAILED';
		this.state.campaign.message = errorMessage;
		this.updateState();
	},

	// SocketMessage
	onSocketMessage(message) {
		const messageParsed = JSON.parse(message.data);
		debug('onSocketMessage', messageParsed);
		if (messageParsed.hasOwnProperty('message')) {
			this.onLogMessage(messageParsed.message);
			switch (messageParsed.message) {
				case 'Stack retrieval or creation finished':

					break;
				case 'Docker created and ready.':
					CampaignActions.create.completed();
					CampaignActions.run();
					break;
				case 'Test packages list received, instrumentation started':
					CampaignActions.run.completed();
					CampaignActions.result();
					break;
				case 'Tests ran':
					CampaignActions.result.completed(messageParsed.data.testSuites);
					break;
				default:
					// TODO:
					break;
			}
		} else if (messageParsed.hasOwnProperty('error')) {
			switch (this.state.campaign.status) {
				case 'CAMPAIGN_STATUS_CREATING':
					CampaignActions.create.failure(messageParsed.error);
					break;
				case 'CAMPAIGN_STATUS_RUNNING':
					CampaignActions.run.failure(messageParsed.error);
					break;
				case 'CAMPAIGN_STATUS_RESULTING':
					CampaignActions.result.failure(messageParsed.error);
					break;
				default:
					debug('[ERROR] campaign error not treated', messageParsed.error);
					break;
			}
		}
	},

	// Load Devices

	onLoadDevices() {
	},

	onLoadDevicesCompleted(devices) {
		this.state.availableDevices = devices;
		this.updateState();
	},

	onLoadDevicesFailure(errorMessage) {
		this.onLogMessage(errorMessage);
		throw new Error('error');
		// TODO: failure
	},

	// Run

	onRun() {
		this.state.campaign.status = 'CAMPAIGN_STATUS_RUNNING';
		this.updateState();
	},

	onRunCompleted() {
		this.state.campaign.status = 'CAMPAIGN_STATUS_RAN';
		this.updateState();
	},

	onRunFailure(errorMessage) {
		this.onLogMessage(errorMessage);
		this.state.campaign.status = 'CAMPAIGN_STATUS_RUN_FAILED';
		this.state.campaign.message = errorMessage;
		this.updateState();
	},

	// Result

	onResult() {
		this.state.campaign.status = 'CAMPAIGN_STATUS_RESULTING';
		this.updateState();
	},

	onResultCompleted(results) {
		this.state.campaign.results = results;
		this.state.campaign.status = 'CAMPAIGN_STATUS_RESULTED';
		this.updateState();
	},

	onResultFailure(errorMessage) {
		this.onLogMessage(errorMessage);
		this.state.campaign.status = 'CAMPAIGN_STATUS_RESULT_FAILED';
		this.state.campaign.message = errorMessage;
		this.updateState();
	},

	// Log Message

	onLogMessage(message) {
		this.state.campaign.logBox.unshift({time: AppUtils.getDate(), message});
	},

	// Methods //

	// Status Box

	reset() {
		this.state.campaign = {};
		this.state.campaign.logBox = [];
		this.resetBoxes();
	},

	resetBoxes() {
		this.state.campaign.boxes = [
			{typeName: 'prepare', status: 'disable', enabled: true, isFirst: true},
			{typeName: 'create', status: 'disable', enabled: true, objectName: 'campaign'},
			{typeName: 'run', status: 'disable', enabled: true},
			{typeName: 'result', status: 'disable', enabled: true, isLast: true}
		];
	},

	changeBoxes(typeName, field, newValue) {
		// debug(this.state);
		// debug(arguments);
		const replacement = {};
		replacement[field] = newValue;
		this.state.campaign.boxes = this.state.campaign.boxes.map(
			item => {
				return item.typeName === typeName ? AppUtils.extend(item, replacement) : item;
			}
		);
	},

	statusUpdating: {
		CAMPAIGN_STATUS_INITIATING: {typeName: '', newStatus: ''},
		CAMPAIGN_STATUS_PREPARING: {typeName: 'prepare', newStatus: 'doing'},
		CAMPAIGN_STATUS_PREPARED: {typeName: 'prepare', newStatus: 'success'},
		CAMPAIGN_STATUS_PREPARE_FAILED: {typeName: 'prepare', newStatus: 'fail'},

		CAMPAIGN_STATUS_CREATING: {typeName: 'create', newStatus: 'doing'},
		CAMPAIGN_STATUS_CREATED: {typeName: 'create', newStatus: 'success'},
		CAMPAIGN_STATUS_CREATE_FAILED: {typeName: 'create', newStatus: 'fail'},

		CAMPAIGN_STATUS_RUNNING: {typeName: 'run', newStatus: 'doing'},
		CAMPAIGN_STATUS_RAN: {typeName: 'run', newStatus: 'success'},
		CAMPAIGN_STATUS_RUN_FAILED: {typeName: 'run', newStatus: 'fail'},

		CAMPAIGN_STATUS_RESULTING: {typeName: 'result', newStatus: 'doing'},
		CAMPAIGN_STATUS_RESULTED: {typeName: 'result', newStatus: 'success'},
		CAMPAIGN_STATUS_RESULT_FAILED: {typeName: 'result', newStatus: 'fail'},

		CAMPAIGN_STATUS_RESET: {typeName: '', newStatus: ''}
	},

	// State update

	updateState() {
		// debug('updateState');
		// debug(this.state.campaign.status);
		const actualStatus = this.statusUpdating[this.state.campaign.status];
		this.changeBoxes(actualStatus.typeName, 'status', actualStatus.newStatus);
		this.trigger(this.state);
	}

});

module.exports = CampaignStore;
