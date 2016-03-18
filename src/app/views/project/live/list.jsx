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

// const kitkat = 'R3_CRB01-00-20160222-141328';
// const kitkat = 'R3_CRB01-00-20160223-154224';
// const kitkat = 'opengl';
const kitkat = 'kitkat';
// const kitkat = 'kitkat';
const lollipop = 'lollipop';
// const lollipop = 'xxx';
const variants = [{id: kitkat, name: 'kitkat'}, {id: 'kitkat-phone', name: 'kitkatPhone'}, {id: lollipop, name: 'lollipop'}];

const LiveList = class extends React.Component {

	constructor(props) {
		super(props);
		this._onStateChange = this._onStateChange.bind(this);
		this._onStartSession = this._onStartSession.bind(this);
		this._onEnterSession = this._onEnterSession.bind(this);
		this._onStopSession = this._onStopSession.bind(this);
		this.handleStartSession = this._onStartSession.bind(this);
		this.state = {};
	}

	// _onItemTap(index, e) {
	//   // e.preventDefault();
	//   this.context.router.transitionTo('live-session', { projectId: 'fooproject',
	//                                                      androId: 'test'} );
	// }

	_onStartSession(variant) {
		LiveActions.start(variant, projectId);
		PollingActions.liveList();
	}

	_onEnterSession(avmId) {
		debug('enter session', arguments);
		this.context.router.push(`/projects/${projectId}/live/${avmId}`);
		// this.context.router.transitionTo('live-session', {
		// 	projectId,
		// 	androId: avmId
		// });
	}

	_onStopSession(avmId) {
		LiveActions.stop(avmId);
		PollingActions.liveList();
	}

	render() {
		// const startButtons = variants.map(variant => {
		// 	const handleClick = this._onStartSession.bind(this, variant.id);
		// 	return (
		// 		<RaisedButton
		// 			key={variant.id}
		// 			linkButton
		// 			primary
		// 			label={`Start new session ${variant.name}`}
		// 			title={`Start new session ${variant.name}`}
		// 			className={`btStartSession${AppUtils.capitalize(variant.name)}`}
		// 			onClick={handleClick}
		// 			/>
		// 	);
		// });
		return (
			<div>
				<ToolbarLive
					onClickStart={this.handleStartSession}
					variants={variants}
					/>
				<LiveMachineList actionEnter={this._onEnterSession} actionStop={this._onStopSession}/>
			</div>
		);
	}

	_onStateChange(state) {
		debug('changing state', this.state.live ? this.state.live.status : '', state);
		// if (state.live.status === 'LIVE_STATUS_VMSTARTED' && state.live.avm.avm_id) {
		//   // this._onEnterSession(state.live.avm.avm_id);
		//   LiveListActions.list();
		// }
		if (state.live.status === 'LIVE_STATUS_INITIALIZED') {
			PollingActions.liveList();
		}
		this.setState(state);
	}

	componentDidMount() {
		// projectId = AppUtils.getProjectIdFromRouter(this.context.router);
		debug('this.props', this.props);
		debug('this.context.router', this.context.router);
		projectId = this.props.params.projectId;
		this.unsubscribe = LiveStore.listen(this._onStateChange);
		LiveActions.setProjectId(projectId);
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
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
