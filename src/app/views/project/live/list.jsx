'use strict';

// Vendor
import React from 'react';
const debug = require('debug')('AiC:View:Live:List');

// APP
import LiveStore from 'app/stores/live';
import LiveActions from 'app/actions/live';
import PollingActions from 'app/actions/polling';
import LiveMachineList from 'app/components/project/live-machine-list';
import ToolbarLive from 'app/components/toolbar/toolbar-live';

let projectId;

const variants = [
	{id: 'kitkat-tablet', name: 'kitkatTablet', version: '4'},
	{id: 'kitkat-phone', name: 'kitkatPhone', version: '4'} // ,
	// {id: 'lollipop-tablet', name: 'lollipopTablet', version: '5'},
	// {id: 'lollipop-phone', name: 'lollipopPhone', version: '5'}
];

const LiveList = class extends React.Component {

	constructor(props) {
		super(props);

		this.handleStateChange = newState => {
			debug('changing state', this.state.live ? this.state.live.status : '', newState);
			if (newState.live.status === 'LIVE_STATUS_INITIALIZED') {
				PollingActions.start('liveList');
			}
			this.setState(newState);
		};

		this.handleStartSession = variant => {
			const version = variants.reduce((previous, current) => {
				return previous === null && current.id === variant ? current.version : previous;
			}, null);
			LiveActions.start({variant, projectId, version});
			PollingActions.start('liveList');
		};

		this.onEnterSession = avmId => {
			debug('enter session', arguments);
			this.context.router.push(`/projects/${projectId}/live/${avmId}`);
		};

		this.onStopSession = avmId => {
			LiveActions.stop({avmId});
			PollingActions.start('liveList');
		};

		this.state = {};
	}

	render() {
		const isListLoading = !(this.state.live && this.state.live.status === 'LIVE_STATUS_LISTED');
		let avmList = [];

		// Filter VMs by projectId
		if (this.state.live && this.state.live.hasOwnProperty('avms')) {
			avmList = this.state.live.avms.filter(v => {
				return v.project_id === projectId;
			});
		}

		return (
			<div>
				<ToolbarLive
					onClickStart={this.handleStartSession}
					variants={variants}
					/>
				<LiveMachineList avmList={avmList} isListLoading={isListLoading} actionEnter={this.onEnterSession} actionStop={this.onStopSession}/>
			</div>
		);
	}

	componentDidMount() {
		debug('this.props', this.props);
		debug('this.context.router', this.context.router);
		projectId = this.props.params.projectId;
		this.unsubscribe = LiveStore.listen(this.handleStateChange);
		LiveActions.setProjectId(projectId);
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
		PollingActions.stop('liveList');
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
