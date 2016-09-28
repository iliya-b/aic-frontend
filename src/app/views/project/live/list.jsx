'use strict';

import React from 'react';
import LiveStore from 'app/stores/live';
import LiveListStore from 'app/stores/live-list';
import UserStore from 'app/stores/user';
import LiveActions from 'app/actions/live';
import LiveListActions from 'app/actions/live-list';
import LiveMachineList from 'app/components/project/live-machine-list';
import ToolbarLive from 'app/components/toolbar/toolbar-live';
import uuid from 'app/libs/uuid';
import DialogLiveCreation from 'app/components/dialog/dialog-live-creation';
import PanselSessionsInfo from 'app/components/panel/panel-sessions-info';
import Notify from 'app/libs/notify';

const debug = require('debug')('AiC:View:Live:List');

let projectId;

const LiveList = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {dialogCreateOpen: false};
	}

	handleStateChange = newState => {
		debug('handleStateChange', newState);
		newState = Object.assign({}, this.state, newState);
		this.setState(newState);
	}

	onEnterSession = avmId => {
		debug('enter session', arguments);
		this.context.router.push(`/projects/${projectId}/live/${avmId}`);
	}

	onStopSession = avmId => {
		LiveActions.stop({avmId}, {includeRequest: true});
	}

	handleOpenCreateDialog = () => {
		this.setState({dialogCreateOpen: true});
	}

	handleCloseCreateDialog = () => {
		this.setState({dialogCreateOpen: false});
	}

	handleStartSession = config => {
		this.handleCloseCreateDialog();
		debug('handleStartSession', config);
		config.projectId = projectId;
		config.uuid = uuid();
		LiveActions.start(config, {includeRequest: true});
	}

	getAvmList = () => {
		let avmList = [];
		// Filter VMs by projectId and only live sessions (exclude campaign machines)
		if (this.state.liveList && 'avms' in this.state.liveList) {
			avmList = this.state.liveList.avms.filter(v => {
				return v.project_id === projectId && v.campaignId === '';
			});
		}
		return avmList;
	}

	getImageList = () => {
		return this.state.liveList && 'images' in this.state.liveList ? this.state.liveList.images : [];
	}

	render() {
		const isListLoading = !(this.state.liveList && this.state.liveList.status === 'LIVE_STATUS_LISTED');
		const avmList = this.getAvmList();
		const imageList = this.getImageList();

		// User quota
		const liveCurrent = this.state.user && this.state.user.quota ? this.state.user.quota.vmLiveCurrent : 0;
		const liveMax = this.state.user && this.state.user.quota ? this.state.user.quota.vmLiveMax : 0;

		return (
			<div>
				<ToolbarLive
					onClickStart={this.handleOpenCreateDialog}
					variants={imageList}
					vmCount={liveCurrent}
					vmMaxAllowed={liveMax}
					/>
				<PanselSessionsInfo vmCount={liveCurrent} vmMaxAllowed={liveMax}/>
				<br/>
				<DialogLiveCreation images={imageList} open={this.state.dialogCreateOpen} onStart={this.handleStartSession} onCancel={this.handleCloseCreateDialog}/>
				<LiveMachineList avmList={avmList} isListLoading={isListLoading} actionEnter={this.onEnterSession} actionStop={this.onStopSession}/>
			</div>
		);
	}

	componentDidMount() {
		projectId = this.props.params.projectId;
		this.unsubscribe = [];
		this.unsubscribe.push(LiveStore.listen(this.handleStateChange));
		this.unsubscribe.push(UserStore.listen(this.handleStateChange));
		this.unsubscribe.push(LiveListStore.listen(this.handleStateChange));
		LiveActions.setProjectId(projectId);
		LiveListActions.listImages();
		Notify.watchProjectSessions({projectId});
		Notify.startUserQuota({projectId});
		Notify.startListSessions({projectId});
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe.forEach(fn => fn());
		Notify.clearProjectSessions({projectId});
	}

};

LiveList.contextTypes = {
	router: React.PropTypes.object
};

LiveList.propTypes = {
	params: React.PropTypes.object
};

module.exports = LiveList;
