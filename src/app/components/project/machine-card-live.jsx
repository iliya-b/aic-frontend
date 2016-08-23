'use strict';

// TODO: refactor

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
	CardText,
	CardActions,
	RaisedButton
} = mui;

const debug = require('debug')('AiC:Components:Project:MachineCardLive');

// APP
const MachineCard = require('app/components/project/machine-card');
const CodeBox = require('app/components/shared/code-box');

const MachineCardLive = class extends React.Component {

	render() {
		const state = this.props;
		const handleClicks =	{
			enter: state.actionEnter ? () => {
				state.actionEnter(state.avm_id);
			} : null,
			stop: state.actionStop ? () => {
				state.actionStop(state.avm_id);
			} : null
		};

		const availableButtons = [
			{
				action: MachineCard.ACTIONS.ENTER,
				button: (
					<RaisedButton
						className={`btEnterSession btEnterSession${state.index} btEnterSession${state.avm_id}`}
						primary
						label="Enter session"
						title={`Enter session ${state.avm_id}`}
						key={MachineCard.ACTIONS.ENTER}
						onClick={handleClicks.enter}
						data-avm-id={state.avm_id}
						/>
				)
			},
			{
				action: MachineCard.ACTIONS.STOP,
				button: (
					<RaisedButton
						className={`btStopSession btStopSession${state.index} btStopSession${state.avm_id}`}
						primary
						label="Stop session"
						title={`Stop session ${state.avm_id}`}
						key={MachineCard.ACTIONS.STOP}
						onClick={handleClicks.stop}
						/>
				)
			}
		];

		const enabledButtons = {};
		enabledButtons[MachineCard.VMSTATE.READY] = [MachineCard.ACTIONS.ENTER, MachineCard.ACTIONS.STOP];
		enabledButtons[MachineCard.VMSTATE.CREATING] = [MachineCard.ACTIONS.ENTER];
		enabledButtons[MachineCard.VMSTATE.FAILED] = [MachineCard.ACTIONS.STOP];
		enabledButtons[MachineCard.VMSTATE.DELETING] = [];

		debug(state);

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
