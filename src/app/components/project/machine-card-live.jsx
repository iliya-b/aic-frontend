'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing } = mui.Styles;
var { Paper,
      Card,
      CardHeader,
      CardText,
      CardActions,
      Avatar,
      FontIcon,
      Table,
      TableHeader,
      TableHeaderColumn,
      TableBody,
      TableRow,
      TableRowColumn,
      RaisedButton, } = mui;

// APP
var MachineCard = require('goby/components/project/machine-card.jsx');
var CodeBox = require('goby/components/shared/code-box.jsx');

var MachineCardLive = class extends React.Component{

  render() {

    var state = this.props;

    var availableButtons = [
      {
        action: 'enter',
        button: <RaisedButton linkButton={true} href="#" primary={true} label="Enter Session" key={'enter'} />
      },
      {
        action: 'stop',
        button: <RaisedButton linkButton={true} href="#" primary={true} label="Stop Session" key={'stop'} />
      }
    ];

    var enabledButtons = {
      READY: ['enter', 'stop'],
      CREATING: [],
      CREATE_FAILED: ['stop'],
    };

    var buttons = availableButtons.filter(function(bt){ return enabledButtons[state.avm_status].indexOf(bt.action) !== -1; });
    var buttonBox = buttons ? <CardActions>{buttons.map(function(bt){ return bt.button; })}</CardActions> : '';

    var failedBox = state.avm_status === 'CREATE_FAILED' ? <CardText>
      <CodeBox style={{color:this.context.muiTheme.palette.errorColor, overflowX: 'initial'}}>{state.avm_status_reason}</CodeBox>
    </CardText>
    : '';

    // var failedBox = '';//<CodeBox style={{color:this.context.muiTheme.palette.errorColor}}>{state.avm_status_reason}</CodeBox>

    return <MachineCard {...state}>

    {buttonBox}

    {failedBox}

    </MachineCard>;

  }

};

MachineCardLive.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = MachineCardLive;