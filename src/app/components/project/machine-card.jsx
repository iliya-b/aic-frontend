'use strict';

import React from 'react';
import Card from 'material-ui/Card';
import CardText from 'material-ui/Card/CardText';
import CardHeader from 'material-ui/Card/CardHeader';
import MachineIcon from 'app/components/icon/machine-icon';
import {getVmStatus} from 'app/libs/helpers';

const MachineCard = class extends React.Component {

	render() {
		const {
			children,
			avm_status, // eslint-disable-line camelcase
			avm_id, // eslint-disable-line camelcase
			avm_owner, // eslint-disable-line camelcase
			avm_novnc_port, // eslint-disable-line camelcase, no-unused-vars
			avm_novnc_host, // eslint-disable-line camelcase, no-unused-vars
			avm_status_reason, // eslint-disable-line camelcase, no-unused-vars
			...otherProps
		} = this.props;
		const styles = {
			info: {
				paddingLeft: 10,
				lineHeight: '20px'
			}
		};

		const statusMessage = {};
		statusMessage[MachineCard.VMSTATE.READY] = 'success';
		statusMessage[MachineCard.VMSTATE.CREATING] = 'creating';
		statusMessage[MachineCard.VMSTATE.FAILED] = 'error';
		statusMessage[MachineCard.VMSTATE.DELETING] = 'deleting';

		const machineState = <MachineIcon status={getVmStatus(avm_status)}/>; // eslint-disable-line camelcase

		/* eslint-disable camelcase */
		const infoTests = (<div style={styles.info}>
			<strong>{avm_id}</strong> <br/>
			status: {statusMessage[avm_status]}, owner: {avm_owner}
		</div>);
		/* eslint-enable camelcase */

		return (<Card expandable {...otherProps}>
			<CardHeader
				title={''}
				subtitle={infoTests}
				avatar={machineState}
				showExpandableButton
				/>
			<CardText expandable>
			{children}
			</CardText>
		</Card>);
	}

};

MachineCard.VMSTATE = {};
MachineCard.VMSTATE.READY = 'READY';
MachineCard.VMSTATE.CREATING = 'CREATING';
MachineCard.VMSTATE.FAILED = 'FAILED';
MachineCard.VMSTATE.DELETING = 'DELETING';

MachineCard.ACTIONS = {};
MachineCard.ACTIONS.ENTER = 'enter';
MachineCard.ACTIONS.STOP = 'stop';

MachineCard.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

// TODO: change variable names
MachineCard.propTypes = {
	avm_status: React.PropTypes.string, // eslint-disable-line camelcase
	avm_owner: React.PropTypes.string, // eslint-disable-line camelcase
	avm_id: React.PropTypes.string, // eslint-disable-line camelcase
	avm_novnc_port: React.PropTypes.string, // eslint-disable-line camelcase
	avm_novnc_host: React.PropTypes.string, // eslint-disable-line camelcase
	avm_status_reason: React.PropTypes.string, // eslint-disable-line camelcase
	children: React.PropTypes.node
};

module.exports = MachineCard;
