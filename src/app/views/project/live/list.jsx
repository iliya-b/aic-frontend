/* global window */
'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import LiveStore from 'app/stores/live';
import LiveActions from 'app/actions/live';
import PollingActions from 'app/actions/polling';
import LiveMachineList from 'app/components/project/live-machine-list';
import ToolbarLive from 'app/components/toolbar/toolbar-live';
import {variants} from 'app/configs/app-constants';
import uuid from 'app/libs/uuid';
import DialogLiveCreation from 'app/components/dialog/dialog-live-creation';
import PanselSessionsInfo from 'app/components/panel/panel-sessions-info';

const debug = require('debug')('AiC:View:Live:List');

let projectId;
let enableVariants;
const defaultEnableVariants = ['kitkat-tablet', 'kitkat-mp', 'lollipop-tablet', 'lollipop-phone'];

const snackInfo = {
	uuid: [],
	timings: {},
	shouldBeOpen: false
};

const LiveList = class extends React.Component {

	constructor(props) {
		super(props);

		this.handleStateChange = newState => {
			if (!newState.snackbar) {
				newState.snackbar = {message: '', open: false};
			}
			debug('changing state', this.state.live ? this.state.live.status : '', newState);
			if (newState.live.status === 'LIVE_STATUS_INITIALIZED') {
				// PollingActions.start('liveList');
				LiveActions.list();
			}

			debug('ids', this.state.live && this.state.live.startFailedUuid ? this.state.live.startFailedUuid : 'no state', newState.live && newState.live.startFailedUuid ? newState.live.startFailedUuid : 'no new', snackInfo);
			if (newState.live.status === 'LIVE_STATUS_VMSTART_FAILED' && snackInfo.uuid.indexOf(newState.live.startFailedUuid) === -1) {
				// snackInfo.open = true;
				// snackInfo.message = newState.live.message;
				snackInfo.uuid.push(newState.live.startFailedUuid);
				snackInfo.shouldBeOpen = true;
				snackInfo.timings[newState.live.startFailedUuid] = {};
				snackInfo.timings[newState.live.startFailedUuid].start = Date.now();
				// snackInfo.timings[newState.live.startFailedUuid].timeout = setTimeout(() => {
				// 	snackInfo.shouldBeOpen = false;
				// }, 3000);

				newState.snackbar.message = this.state.live.message;
				// newState = Object.assign(newState, {
				// 	snackbar: {
				// 		open: true,
				// 		message: this.state.live.message
				// 	}
				// });
			}
			// To avoid snackbar to be open on other state update
			newState.snackbar.open = snackInfo.shouldBeOpen;
			debug('new new state', newState);
			this.setState(newState);
		};

		this.handleStartSession = variant => {
			const version = enableVariants.reduce((previous, current) => {
				return previous === null && current.id === variant ? current.version : previous;
			}, null);
			const requestUuid = uuid();
			LiveActions.start({variant, projectId, version, uuid: requestUuid}, {includeRequest: true});
			// PollingActions.start('liveList');
		};

		this.onEnterSession = avmId => {
			debug('enter session', arguments);
			this.context.router.push(`/projects/${projectId}/live/${avmId}`);
		};

		this.onStopSession = avmId => {
			LiveActions.stop({avmId}, {includeRequest: true});
			// PollingActions.start('liveList');
		};

		this.handleSnackbarClose = () => {
			snackInfo.shouldBeOpen = false;
			this.setState({
				snackbar: {
					open: false,
					message: ''
				}
			});
		};

		this.state = {
			snackbar: {
				open: false,
				message: ''
			},
			dialogCreateOpen: false
		};
	}

	handleOpenCreateDialog = () => {
		this.setState({dialogCreateOpen: true});
	}

	handleCloseCreateDialog = () => {
		this.setState({dialogCreateOpen: false});
	}

	handleStartSession2 = config => {
		this.handleCloseCreateDialog();
		debug('handleStartSession2', config);
		config.projectId = projectId;
		config.uuid = uuid();
		LiveActions.start(config, {includeRequest: true});
		// PollingActions.start('liveList');
	}

	render() {
		const isListLoading = !(this.state.live && this.state.live.status === 'LIVE_STATUS_LISTED');
		let avmList = [];
		let vmCount = 0;

		// Filter VMs by projectId
		if (this.state.live && 'avms' in this.state.live) {
			vmCount = this.state.live.avms.length;
			avmList = this.state.live.avms.filter(v => {
				return v.project_id === projectId;
			});
		}

		return (
			<div>
				<ToolbarLive
					onClickStart={this.handleOpenCreateDialog}
					variants={enableVariants}
					vmCount={vmCount}
					vmMaxAllowed={3}
					/>
				<PanselSessionsInfo vmCount={vmCount} vmMaxAllowed={3}/>
				<br/>
				<DialogLiveCreation open={this.state.dialogCreateOpen} onStart={this.handleStartSession2} onCancel={this.handleCloseCreateDialog}/>
				<LiveMachineList avmList={avmList} isListLoading={isListLoading} actionEnter={this.onEnterSession} actionStop={this.onStopSession}/>
				<Snackbar
					// open={snackInfo.open}
					// message={snackInfo.message}
					open={this.state.snackbar.open}
					message={this.state.snackbar.message}
					action="close"
					autoHideDuration={3000}
					onRequestClose={this.handleSnackbarClose}
					/>
			</div>
		);
	}

	componentWillMount() {
		debug('componentWillMount');
		let configEnableImages;
		if (window.GobyAppGlobals.config.enableImages) {
			debug('using config enable images');
			configEnableImages = window.GobyAppGlobals.config.enableImages;
		} else {
			debug('using default enable images');
			configEnableImages = defaultEnableVariants;
		}
		debug('configEnableImages', configEnableImages);
		enableVariants = variants.filter(v => {
			return configEnableImages.indexOf(v.id) !== -1;
		});
	}

	componentDidMount() {
		debug('this.props', this.props);
		debug('this.context.router', this.context.router);
		projectId = this.props.params.projectId;
		this.unsubscribe = LiveStore.listen(this.handleStateChange);
		LiveActions.setProjectId(projectId);
		LiveActions.listImages();
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
		// PollingActions.stop('liveList');
	}

};

LiveList.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object,
	appConfig: React.PropTypes.object
};

LiveList.propTypes = {
	params: React.PropTypes.object
};

module.exports = LiveList;
