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
		const styles = {
			info: {
				paddingLeft: 10,
				lineHeight: '20px'
			}
		};

		const statusIcon = {
			READY: MachineIcon.SUCCESS,
			CREATING: MachineIcon.LOADING,
			CREATE_FAILED: MachineIcon.ERROR
		};

		const statusMessage = {};
		statusMessage[MachineCard.VMSTATE.READY] = 'success';
		statusMessage[MachineCard.VMSTATE.CREATING] = 'creating';
		statusMessage[MachineCard.VMSTATE.FAILED] = 'error';
		statusMessage[MachineCard.VMSTATE.DELETING] = 'deleting';

		const machineState = <MachineIcon status={statusIcon[this.props.avm_status]} />;

		const infoTests = (<div style={styles.info}>
				<strong>{this.props.avm_id}</strong> <br />
				status: {statusMessage[this.props.avm_status]}, owner: {this.props.avm_owner}
			</div>);

		return (<Card expandable>
						<CardHeader
							title={''}
							subtitle={infoTests}
							avatar={machineState}
							showExpandableButton
							/>
						<CardText expandable>
						{this.props.children}
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
	router: React.PropTypes.func
};

// TODO: change variable names
MachineCard.propTypes = {
	avm_status: React.PropTypes.string, // eslint-disable-line camelcase
	avm_owner: React.PropTypes.string, // eslint-disable-line camelcase
	avm_id: React.PropTypes.string, // eslint-disable-line camelcase
	children: React.PropTypes.node
};

module.exports = MachineCard;
