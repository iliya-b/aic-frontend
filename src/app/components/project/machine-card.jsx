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
      TableRowColumn } = mui;

// APP
var MachineIcon = require('goby/components/project/machine-icon.jsx');

var MachineCard = class extends React.Component{

  render() {
    var styles = {
      info: {
        paddingLeft: 10,
        lineHeight: '20px',
      },
    };

    var statusIcon = {
      READY: 'success',
      CREATING: 'doing',
      CREATE_FAILED: 'fail',
    };

    var statusMessage = {
      READY: 'success',
      CREATING: 'creating',
      CREATE_FAILED: 'error',
    };

    var machineState = <MachineIcon status={statusIcon[this.props.avm_status]} /> ;

    var infoTests = <div style={styles.info}>
        <strong>{this.props.avm_id}</strong> <br />
        status: {statusMessage[this.props.avm_status]}, owner: {this.props.avm_owner}
      </div>;

    return  <Card expandable={true}>
              <CardHeader
                title={''}
                subtitle={infoTests}
                avatar={machineState}
                showExpandableButton={true}>
              </CardHeader>
              <CardText expandable={true}>
              {this.props.children}
              </CardText>
            </Card>;
  }

};

MachineCard.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = MachineCard;