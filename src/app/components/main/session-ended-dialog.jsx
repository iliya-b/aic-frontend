'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog,
      FlatButton } = mui;

// APP
var InfoBox = require('goby/components/shared/info-box.jsx');
var { AuthActions } = require('goby/actions');

var SessionEndedDialog = class extends React.Component {

  constructor (props) {
    super(props);
    this._onClose = this._onClose.bind(this);
  }

  render() {

    var {
      ...other
    } = this.props;

    var loginActions = [
      <FlatButton
        key="sessionEndedActionClose"
        label='Go to homepage'
        secondary={true}
        onTouchTap={this._onClose} />,
    ];

    return (
      <Dialog modal={true} title="Session Timeout" actions={loginActions} {...other} ref="sessionEndedDialog" onShow={this.cleanFields} >
        <InfoBox boxType={InfoBox.ERROR}>Your session has been ended.</InfoBox>
      </Dialog>
      );
  }

  show(){
    this.refs.sessionEndedDialog.show();
  }

  _onClose() {
    AuthActions.redirectDisconnected(this.context.router);
    this.refs.sessionEndedDialog.dismiss();
  }

};

SessionEndedDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = SessionEndedDialog;


