'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import AvatarProgress from 'app/components/icon/avatar-progress';
import ChipStatus from 'app/components/form/chip-status';
import SimpleStatusIcon from 'app/components/icon/simple-status-icon';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const colors = SimpleStatusIcon.STATUS_COLORS;
colors.OTHERS = 'white';
colors.QUEUED = 'rgb(152, 152, 152)';
colors.REQUESTED = 'rgb(152, 152, 152)';

const order = [
	'OTHERS',
	SimpleStatusIcon.STATUS_LIST.REQUESTED,
	SimpleStatusIcon.STATUS_LIST.QUEUED,
	SimpleStatusIcon.STATUS_LIST.RUNNING,
	SimpleStatusIcon.STATUS_LIST.ERROR,
	SimpleStatusIcon.STATUS_LIST.READY
];

const calculateProgress = items => {
	const sum = {};
	order.forEach(o => {
		sum[o] = 0;
	});

	items.forEach(i => {
		if (i.status in sum) {
			sum[i.status]++;
		} else {
			sum.OTHERS++;
		}
	});

	const orderInfo = order
		.filter(o => sum[o] > 0)
		.map((o, i, arr) => {
			const total = arr.reduce((p, c) => p + sum[c], 0);
			const partial = arr.reduce((p, c, ci) => ci >= i ? p + sum[c] : p, 0);
			// const type = o in sum ? o : 'OTHERS';
			return {
				sum: sum[o],
				progress: parseInt(partial / total * 100, 10),
				color: colors[o],
				type: o,
				id: o
			};
		});

	return orderInfo;
};

const progressTitles = {apk: {}, monkeyRunner: {}};
progressTitles.apk.OTHERS = 'Progress status unknown';
progressTitles.apk[SimpleStatusIcon.STATUS_LIST.REQUESTED] = 'Some applications were requested for installation';
progressTitles.apk[SimpleStatusIcon.STATUS_LIST.QUEUED] = 'Some applications are queued for installation';
progressTitles.apk[SimpleStatusIcon.STATUS_LIST.RUNNING] = 'Some applications are being installed';
progressTitles.apk[SimpleStatusIcon.STATUS_LIST.READY] = 'All applications were successfully installed';
progressTitles.apk[SimpleStatusIcon.STATUS_LIST.ERROR] = 'Some applications were not successfully installed';

progressTitles.monkeyRunner.OTHERS = 'Progress status unknown';
progressTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.REQUESTED] = 'Some applications were requested for monkey runner';
progressTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.QUEUED] = 'Some applications are queued for monkey runner';
progressTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.RUNNING] = 'Some applications are running';
progressTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.READY] = 'All applications ran successfully';
progressTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.ERROR] = 'Some applications were not successfully ran';

const progressSubTitles = {apk: {}, monkeyRunner: {}};
progressSubTitles.apk.OTHERS = 'status unknown';
progressSubTitles.apk[SimpleStatusIcon.STATUS_LIST.REQUESTED] = 'requested';
progressSubTitles.apk[SimpleStatusIcon.STATUS_LIST.QUEUED] = 'queued';
progressSubTitles.apk[SimpleStatusIcon.STATUS_LIST.RUNNING] = 'installing';
progressSubTitles.apk[SimpleStatusIcon.STATUS_LIST.READY] = 'ready';
progressSubTitles.apk[SimpleStatusIcon.STATUS_LIST.ERROR] = 'error(s)';

progressSubTitles.monkeyRunner.OTHERS = 'status unknown';
progressSubTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.REQUESTED] = 'requested';
progressSubTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.QUEUED] = 'queued';
progressSubTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.RUNNING] = 'running';
progressSubTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.READY] = 'ready';
progressSubTitles.monkeyRunner[SimpleStatusIcon.STATUS_LIST.ERROR] = 'error(s)';

const PanelProgress = props => {
	const {
		style,
		items,
		animation,
		type,
		...others
	} = props;

	const percentagesProgress = calculateProgress(items);

	// Need entire array (with first)
	const progressDetail = percentagesProgress
		.reduce((p, c, i, arr) => {
			let joinStr;
			if (i === 0) {
				joinStr = '';
			} else if ((i + 1) === arr.length) {
				joinStr = ' and ';
			} else {
				joinStr = ', ';
			}
			return `${p}${joinStr}${c.sum} ${progressSubTitles[type][c.type]}`;
		}, '');

	let percentagesProgressFirst;
	if (percentagesProgress.length > 0) {
		percentagesProgressFirst = percentagesProgress.shift();
	} else {
		percentagesProgressFirst = {type: 'EMPTY', color: '#fff'};
	}

	const iconProgress = (
		<AvatarProgress
			animation={animation}
			icon={<FontIcon style={{color: 'rgba(0, 0, 0, 0.54)'}} className="mdi mdi-android"/>}
			style={{marginRight: 12}}
			backgroundColor={percentagesProgressFirst.color}
			progress={percentagesProgress}
			/>
	);

	const styleChip = {
		margin: '0 5px 5px 0'
	};

	const itemsRendered = items.map((c, i) => <ChipStatus style={styleChip} key={c.id || i} {...c}/>);

	const progressTitle = <span style={{color: percentagesProgressFirst.type === 'OTHERS' ? '#000' : percentagesProgressFirst.color}}>{progressTitles[type][percentagesProgressFirst.type]}</span>;

	return (
		<Card containerStyle={{paddingBottom: 0}} style={Object.assign({}, style)} {...others}>
			<CardHeader
				title={progressTitle}
				subtitle={progressDetail}
				avatar={iconProgress}
				actAsExpander
				showExpandableButton
				/>
			<CardText expandable style={{display: 'flex', flexWrap: 'wrap'}}>
				{itemsRendered}
			</CardText>
		</Card>
	);
};

PanelProgress.contextTypes = {
	muiTheme: React.PropTypes.object
};

PanelProgress.propTypes = {
	children: React.PropTypes.node,
	style: React.PropTypes.object,
	showIcon: React.PropTypes.bool,
	status: React.PropTypes.string,
	items: React.PropTypes.array,
	animation: React.PropTypes.bool,
	type: React.PropTypes.string
};

module.exports = PanelProgress;
