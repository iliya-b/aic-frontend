'use strict';

import React from 'react';
import BoxStatus from 'app/components/project/box-status';
import {deepAssign} from 'app/libs/helpers';

const boxesBase = [
	{typeName: 'search', status: 'disable', enabled: true, isFirst: true},
	{typeName: 'create', status: 'disable', enabled: false},
	{typeName: 'load', status: 'disable', enabled: true},
	{typeName: 'connect', status: 'disable', enabled: true},
	{typeName: 'close', status: 'disable', enabled: true, isLast: true}
];

const boxesStatus = {};
boxesStatus.null = boxesBase;
boxesStatus.LIVE_STATUS_RESET = boxesBase;
boxesStatus.LIVE_STATUS_INITIALIZED = boxesBase;
boxesStatus.LIVE_STATUS_CHECKING = deepAssign([], boxesBase, [{status: 'doing'}]);
boxesStatus.LIVE_STATUS_STARTING = deepAssign([], boxesBase, [{status: 'success'}, {enabled: true, status: 'doing'}, {enabled: false}]);
boxesStatus.LIVE_STATUS_STARTED = deepAssign([], boxesStatus.LIVE_STATUS_STARTING, [{}, {enabled: true, status: 'success'}]);
boxesStatus.LIVE_STATUS_CONNECTING = deepAssign([], boxesStatus.LIVE_STATUS_STARTED, [{}, {}, {}, {status: 'doing'}]);
boxesStatus.LIVE_STATUS_CONNECTED = deepAssign([], boxesStatus.LIVE_STATUS_CONNECTING, [{}, {}, {}, {status: 'success'}]);
boxesStatus.LIVE_STATUS_STOPPING = deepAssign([], boxesStatus.LIVE_STATUS_CONNECTED, [{}, {}, {}, {}, {status: 'doing'}]);
boxesStatus.LIVE_STATUS_STOPPED = deepAssign([], boxesStatus.LIVE_STATUS_STOPPING, [{}, {}, {}, {}, {status: 'success'}]);

// TODO: Other statuses

const PanelSessionStatus = props => {
	const {
		status,
		...other
	} = props;

	const boxesStatusSelected = status in boxesStatus ? boxesStatus[status] : boxesBase;
	const boxesRendered = boxesStatusSelected.filter(i => i.enabled).map((item, index) => {
		return <BoxStatus key={index} {...item}/>;
	});
	return (
		<div {...other}>
			{boxesRendered}
		</div>
		);
};

PanelSessionStatus.STATUS_LIST = [
	null,
	'LIVE_STATUS_RESET',
	'LIVE_STATUS_INITIALIZED',
	'LIVE_STATUS_CHECKING',
	'LIVE_STATUS_STARTING',
	'LIVE_STATUS_STARTED',
	'LIVE_STATUS_CONNECTING',
	'LIVE_STATUS_CONNECTED',
	'LIVE_STATUS_STOPPING',
	'LIVE_STATUS_STOPPED'
];

PanelSessionStatus.propTypes = {
	status: React.PropTypes.oneOf(PanelSessionStatus.STATUS_LIST)
};

module.exports = PanelSessionStatus;

// TODO: change this to a state machine
// http://stackoverflow.com/questions/13262392/javascript-event-state-machine
// https://github.com/jakesgordon/javascript-state-machine
// http://machina-js.org/
// statusUpdating: {
// 	LIVE_STATUS_INITIATING: {typeName: '', newStatus: ''},
// 	LIVE_STATUS_INITIALIZED: {typeName: '', newStatus: ''},
// 	LIVE_STATUS_INITIAL_FAILED: {typeName: '', newStatus: ''},

// 	LIVE_STATUS_LISTING: {typeName: 'list', newStatus: 'doing'},
// 	LIVE_STATUS_LISTED: {typeName: 'list', newStatus: 'success'},
// 	LIVE_STATUS_LIST_FAILED: {typeName: 'list', newStatus: 'fail'},

// 	LIVE_STATUS_VMSTARTING: {typeName: 'vmstart', newStatus: 'doing'},
// 	LIVE_STATUS_VMSTARTED: {typeName: 'vmstart', newStatus: 'success'},
// 	LIVE_STATUS_VMSTART_FAILED: {typeName: 'vmstart', newStatus: 'fail'},

// 	LIVE_STATUS_CHECKING: {typeName: 'search', newStatus: 'doing'},
// 	LIVE_STATUS_CHECK_FOUND: {typeName: 'search', newStatus: 'success'},
// 	LIVE_STATUS_CHECK_NOTFOUND: {typeName: 'search', newStatus: 'not-found'},
// 	LIVE_STATUS_CHECK_FAILED: {typeName: 'search', newStatus: 'fail'},

// 	LIVE_STATUS_LOADING: {typeName: 'load', newStatus: 'doing'},
// 	LIVE_STATUS_LOADED: {typeName: 'load', newStatus: 'success'},
// 	LIVE_STATUS_LOAD_FAILED: {typeName: 'load', newStatus: 'fail'},

// 	LIVE_STATUS_STARTING: {typeName: 'create', newStatus: 'doing'},
// 	LIVE_STATUS_STARTED: {typeName: 'create', newStatus: 'success'},
// 	LIVE_STATUS_START_FAILED: {typeName: 'create', newStatus: 'fail'},

// 	LIVE_STATUS_CONNECTING: {typeName: 'connect', newStatus: 'doing'},
// 	LIVE_STATUS_CONNECTED: {typeName: 'connect', newStatus: 'success'},
// 	LIVE_STATUS_CONNECT_FAILED: {typeName: 'connect', newStatus: 'fail'},

// 	LIVE_STATUS_STOPPING: {typeName: 'close', newStatus: 'doing'},
// 	LIVE_STATUS_STOPPED: {typeName: 'close', newStatus: 'success'},
// 	LIVE_STATUS_STOP_FAILED: {typeName: 'close', newStatus: 'fail'},

// 	LIVE_STATUS_RESET: {typeName: '', newStatus: ''},

// 	LIVE_STATUS_INSTALLAPK_FAILED: {typeName: 'connect', newStatus: 'fail'},
// 	LIVE_STATUS_LISTPACKAGES_FAILED: {typeName: 'connect', newStatus: 'fail'},
// 	LIVE_STATUS_MONKEYRUNNER_FAILED: {typeName: 'connect', newStatus: 'fail'},
// 	LIVE_STATUS_PROPERTIES_FAILED: {typeName: 'connect', newStatus: 'fail'}
// },
