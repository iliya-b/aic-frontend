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

const order = [
	'OTHERS',
	SimpleStatusIcon.STATUS_LIST.QUEUED,
	SimpleStatusIcon.STATUS_LIST.RUNNING,
	SimpleStatusIcon.STATUS_LIST.ERROR,
	SimpleStatusIcon.STATUS_LIST.READY
];

const calculateProgress = items => {
	const sum = {};
	sum[SimpleStatusIcon.STATUS_LIST.QUEUED] = 0;
	sum[SimpleStatusIcon.STATUS_LIST.RUNNING] = 0;
	sum[SimpleStatusIcon.STATUS_LIST.READY] = 0;
	sum[SimpleStatusIcon.STATUS_LIST.ERROR] = 0;
	sum.OTHERS = 0;

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
			const type = o in sum ? o : 'OTHERS';
			return {
				sum: sum[type],
				progress: parseInt(partial / total * 100, 10),
				color: colors[type],
				type
			};
		});

	return orderInfo;
};

const progressTitles = {};
progressTitles.OTHERS = 'Progress status unknown';
progressTitles[SimpleStatusIcon.STATUS_LIST.QUEUED] = 'Some applications are queued for installation';
progressTitles[SimpleStatusIcon.STATUS_LIST.RUNNING] = 'Some applications are being installed';
progressTitles[SimpleStatusIcon.STATUS_LIST.READY] = 'All applications were successfully installed';
progressTitles[SimpleStatusIcon.STATUS_LIST.ERROR] = 'Some applications were not successfully installed';

const progressSubTitles = {};
progressSubTitles.OTHERS = 'status unknown';
progressSubTitles[SimpleStatusIcon.STATUS_LIST.QUEUED] = 'queued';
progressSubTitles[SimpleStatusIcon.STATUS_LIST.RUNNING] = 'installing';
progressSubTitles[SimpleStatusIcon.STATUS_LIST.READY] = 'ready';
progressSubTitles[SimpleStatusIcon.STATUS_LIST.ERROR] = 'error(s)';

const PanelProgress = props => {
	const {
		style,
		items,
		animation,
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
			return `${p}${joinStr}${c.sum} ${progressSubTitles[c.type]}`;
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

	const itemsRendered = items.map((c, i) => <ChipStatus style={styleChip} key={i} {...c}/>);

	const progressTitle = <span style={{color: percentagesProgressFirst.type === 'OTHERS' ? '#000' : percentagesProgressFirst.color}}>{progressTitles[percentagesProgressFirst.type]}</span>;

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
	status: React.PropTypes.oneOf(PanelProgress.STATUS_LIST),
	size: React.PropTypes.oneOf(PanelProgress.SIZE_LIST),
	items: React.PropTypes.array,
	animation: React.PropTypes.bool
};

module.exports = PanelProgress;
