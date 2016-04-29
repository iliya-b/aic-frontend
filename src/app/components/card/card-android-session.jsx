'use strict';

// Vendor
import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
// import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import CardText from 'material-ui/Card/CardText';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import str from 'string';
// const debug = require('debug')('AiC:Components:Card:CardAndroidSession');

// APP
import MachineIcon from 'app/components/project/machine-icon';
import * as IconPhoneList from 'app/components/icon/phone-list';

// function getRandomInt(min, max) {
// 	return Math.floor(Math.random() * (max - min)) + min;
// }

const styles = {
	iconAction: {
		padding: 0,
		width: 35,
		height: 35
	},
	iconInfo: {
		padding: 0,
		width: 35,
		height: 35,
		cursor: 'pointer',
		color: 'rgba(0, 0, 0, 0.4)',
		verticalAlign: 'top',
		marginTop: 5
	},
	avatar: {
		backgroundColor: 'transparent',
		// backgroundColor: 'rgba(188, 188, 188, 0.15)',
		margin: '16px 16px 0 16px',
		float: 'left'
	},
	textInfo: {
		marginLeft: 10,
		color: 'rgba(0, 0, 0, 0.5)',
		fontWeight: 500,
		display: 'inline-block',
		paddingTop: 15
	}
};

// const MachineIconStates = [MachineIcon.SUCCESS, MachineIcon.LOADING, MachineIcon.ERROR];
// MachineCard.VMSTATE = {};
// MachineCard.VMSTATE.READY = 'READY';
// MachineCard.VMSTATE.CREATING = 'CREATING';
// MachineCard.VMSTATE.FAILED = 'FAILED';
// MachineCard.VMSTATE.DELETING = 'DELETING';
// 	const statusIcon = {};
// 		statusIcon[MachineCard.VMSTATE.READY] = MachineIcon.SUCCESS;
// 		statusIcon[MachineCard.VMSTATE.CREATING] = MachineIcon.LOADING;
// 		statusIcon[MachineCard.VMSTATE.DELETING] = MachineIcon.LOADING;
// 		statusIcon[MachineCard.VMSTATE.FAILED] = MachineIcon.ERROR;

const MachineIconStates = {
	READY: MachineIcon.SUCCESS,
	CREATING: MachineIcon.LOADING,
	FAILED: MachineIcon.ERROR,
	DELETING: MachineIcon.LOADING
};

// chart-line timer-sand information

const CardAndroidSession = props => {
	const validKeys = Object.keys(IconPhoneList).filter(key => {
		return {}.hasOwnProperty.call(IconPhoneList, key) && key !== 'default';
	});

	const iconPhoneKey = str(props.image).camelize().s;

	let icon;
	if (validKeys.indexOf(iconPhoneKey) === -1) {
		icon = <FontIcon className="mdi mdi-help" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>;
	} else {
		icon = IconPhoneList[iconPhoneKey]({
			color: 'rgba(0, 0, 0, 0.4)',
			hoverColor: 'rgba(0, 0, 0, 0.4)'
		});
	}

	const localCreationTime = (new Date(props.ts_created)).toLocaleString();
//			<CardMedia>
//				<img src={`http://lorempixel.com/600/337/nature/${getRandomInt(0, 10) + 1}/`}/>
//			</CardMedia>
	return (
		<Card className={props.className} style={{width: 400, display: 'inline-block', margin: '10px'}}>
			<Avatar style={styles.avatar} icon={<MachineIcon style={{margin: '0 0 0 2px'}} status={MachineIconStates[props.avm_status]}/>}/>
			<CardTitle className={`spLiveVMTitle spLiveVMTitle${props.index} spLiveVMTitle${props.avm_id}`} title={props.avm_id}/>
			<CardText style={{paddingTop: 0}}>

				<IconButton style={styles.iconInfo} tooltip="owner">
					<FontIcon className="mdi mdi-account" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>
				</IconButton>
				<span style={styles.textInfo} className={`spLiveVMOwner spLiveVMOwner${props.index} spLiveVMOwner${props.avm_id}`}>{props.avm_owner}</span><br/>

				<IconButton style={styles.iconInfo} tooltip="status">
					<FontIcon className="mdi mdi-information-outline" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>
				</IconButton>
				<span style={styles.textInfo} className={`spLiveVMStatus spLiveVMStatus${props.index} spLiveVMStatus${props.avm_id}`}>{props.avm_status}</span><br/>

				<IconButton style={styles.iconInfo} tooltip="machine type">
					{icon}
				</IconButton>
				<span style={styles.textInfo} className={`spLiveVMMachineType spLiveVMMachineType${props.index} spLiveVMMachineType${props.avm_id}`}>{props.image}</span><br/>

				<IconButton style={styles.iconInfo} tooltip="creation time">
					<FontIcon className="mdi mdi-clock" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>
				</IconButton>
				<span style={styles.textInfo} className={`spLiveVMCreationTime spLiveVMCreationTime${props.index} spLiveVMCreationTime${props.avm_id}`}>{localCreationTime}</span>

			</CardText>
			<Divider/>
			<CardActions>
				<IconButton className={`btEnterSession btEnterSession${props.index} btEnterSession${props.avm_id}`} label="Enter session" title={`Enter session ${props.avm_id}`} tooltip="Enter" onClick={props.actionEnter ? props.actionEnter.bind(null, props.avm_id) : null}>
					<FontIcon className="mdi mdi-arrow-right-bold" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
				</IconButton>
				<IconButton className={`btStopSession btStopSession${props.index} btStopSession${props.avm_id}`} label="Stop session" title={`Stop session ${props.avm_id}`} tooltip="Delete" onClick={props.actionStop ? props.actionStop.bind(null, props.avm_id) : null}>
					<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
				</IconButton>
			</CardActions>
		</Card>
	);
};

CardAndroidSession.propTypes = {
	avm_id: React.PropTypes.string, // eslint-disable-line camelcase
	avm_owner: React.PropTypes.string, // eslint-disable-line camelcase
	avm_status: React.PropTypes.string, // eslint-disable-line camelcase
	image: React.PropTypes.string.isRequired,
	ts_created: React.PropTypes.string, // eslint-disable-line camelcase
	index: React.PropTypes.number,
	actionStop: React.PropTypes.func,
	actionEnter: React.PropTypes.func,
	className: React.PropTypes.string
};

module.exports = CardAndroidSession;
