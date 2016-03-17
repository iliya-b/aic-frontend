'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
	Card,
	CardHeader,
	CardText
} = mui;

// APP
const MachineIcon = require('app/components/project/machine-icon');

const MachineCard = class extends React.Component {

	render() {
		const {
			children,
			avm_status, // eslint-disable-line camelcase
			avm_id, // eslint-disable-line camelcase
			avm_owner, // eslint-disable-line camelcase
			...otherProps
		} = this.props;
		const styles = {
			info: {
				paddingLeft: 10,
				lineHeight: '20px'
			}
		};

		const statusIcon = {};
		statusIcon[MachineCard.VMSTATE.READY] = MachineIcon.SUCCESS;
		statusIcon[MachineCard.VMSTATE.CREATING] = MachineIcon.LOADING;
		statusIcon[MachineCard.VMSTATE.DELETING] = MachineIcon.LOADING;
		statusIcon[MachineCard.VMSTATE.FAILED] = MachineIcon.ERROR;

		const statusMessage = {};
		statusMessage[MachineCard.VMSTATE.READY] = 'success';
		statusMessage[MachineCard.VMSTATE.CREATING] = 'creating';
		statusMessage[MachineCard.VMSTATE.FAILED] = 'error';
		statusMessage[MachineCard.VMSTATE.DELETING] = 'deleting';

		const machineState = <MachineIcon status={statusIcon[avm_status]}/>;

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
	children: React.PropTypes.node
};

module.exports = MachineCard;
