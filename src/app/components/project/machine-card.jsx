'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
  Card,
  CardHeader,
  CardText,
} = mui;

// APP
const MachineIcon = require('goby/components/project/machine-icon.jsx');

const MachineCard = class extends React.Component {

  render() {
    const styles = {
      info: {
        paddingLeft: 10,
        lineHeight: '20px',
      },
    };

    const statusIcon = {
      READY: MachineIcon.SUCCESS,
      CREATING: MachineIcon.LOADING,
      CREATE_FAILED: MachineIcon.ERROR,
    };

    const statusMessage = {
      READY: 'success',
      CREATING: 'creating',
      CREATE_FAILED: 'error',
    };

    const machineState = <MachineIcon status={statusIcon[this.props.avm_status]} />;

    const infoTests = <div style={styles.info}>
        <strong>{this.props.avm_id}</strong> <br />
        status: {statusMessage[this.props.avm_status]}, owner: {this.props.avm_owner}
      </div>;

    return <Card expandable={true}>
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
  router: React.PropTypes.func,
};

module.exports = MachineCard;
