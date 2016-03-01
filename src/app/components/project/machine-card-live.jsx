'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
	CardText,
	CardActions,
	RaisedButton
} = mui;

// APP
const MachineCard = require('app/components/project/machine-card');
const CodeBox = require('app/components/shared/code-box');

const MachineCardLive = class extends React.Component {

	render() {
		const state = this.props;

		const availableButtons = [
			{
				action: MachineCard.ACTIONS.ENTER,
				button: <RaisedButton linkButton primary label="Enter Session" key={MachineCard.ACTIONS.ENTER} onClick={state.actionEnter ? state.actionEnter.bind(null, state.avm_id) : null} />
			},
			{
				action: MachineCard.ACTIONS.STOP,
				button: <RaisedButton linkButton primary label="Stop Session" key={MachineCard.ACTIONS.STOP} onClick={state.actionStop ? state.actionStop.bind(null, state.avm_id) : null} />
			}
		];

		const enabledButtons = {};
		enabledButtons[MachineCard.VMSTATE.READY] = [MachineCard.ACTIONS.ENTER, MachineCard.ACTIONS.STOP];
		enabledButtons[MachineCard.VMSTATE.CREATING] = [MachineCard.ACTIONS.ENTER];
		enabledButtons[MachineCard.VMSTATE.FAILED] = [MachineCard.ACTIONS.STOP];
		enabledButtons[MachineCard.VMSTATE.DELETING] = [];

		const buttons = availableButtons.filter(bt => {
			return enabledButtons[state.avm_status].indexOf(bt.action) !== -1;
		});

		const buttonBox = buttons ? <CardActions>{buttons.map(bt => {
			return bt.button;
		})}</CardActions> : '';

		const failedBox = state.avm_status === MachineCard.VMSTATE.FAILED ? <CardText>
			<CodeBox style={{color: this.context.muiTheme.palette.errorColor, overflowX: 'initial'}}>{state.avm_status_reason}</CodeBox>
		</CardText> : '';

		// var failedBox = '';//<CodeBox style={{color:this.context.muiTheme.palette.errorColor}}>{state.avm_status_reason}</CodeBox>

		return (<MachineCard {...state}>

		{buttonBox}

		{failedBox}

		</MachineCard>);
	}

};

MachineCardLive.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

module.exports = MachineCardLive;
