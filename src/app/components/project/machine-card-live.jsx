'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
  CardText,
  CardActions,
  RaisedButton,
} = mui;

// APP
const MachineCard = require('goby/components/project/machine-card.jsx');
const CodeBox = require('goby/components/shared/code-box.jsx');

const MachineCardLive = class extends React.Component {

  render() {
    const state = this.props;

    console.log('card', state.avm_id);
    const availableButtons = [
      {
        action: 'enter',
        button: <RaisedButton linkButton={true} primary={true} label="Enter Session" key={'enter'} onClick={state.actionEnter ? state.actionEnter.bind(null, state.avm_id) : null} />,
      },
      {
        action: 'stop',
        button: <RaisedButton linkButton={true} primary={true} label="Stop Session" key={'stop'} onClick={state.actionStop ? state.actionStop.bind(null, state.avm_id) : null} />,
      },
    ];

    const enabledButtons = {
      READY: ['enter', 'stop'],
      CREATING: ['enter'],
      CREATE_FAILED: ['stop'],
    };

    const buttons = availableButtons.filter(bt => {
      return enabledButtons[state.avm_status].indexOf(bt.action) !== -1;
    });

    const buttonBox = buttons ? <CardActions>{buttons.map(bt => {
      return bt.button;
    })}</CardActions> : '';

    const failedBox = state.avm_status === 'CREATE_FAILED' ? <CardText>
      <CodeBox style={{color: this.context.muiTheme.palette.errorColor, overflowX: 'initial'}}>{state.avm_status_reason}</CodeBox>
    </CardText> : '';

    // var failedBox = '';//<CodeBox style={{color:this.context.muiTheme.palette.errorColor}}>{state.avm_status_reason}</CodeBox>

    return <MachineCard {...state}>

    {buttonBox}

    {failedBox}

    </MachineCard>;
  }

};

MachineCardLive.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func,
};

module.exports = MachineCardLive;
