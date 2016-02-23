'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog,
      FlatButton } = mui;

// APP
var InfoBox = require('app/components/shared/info-box.jsx');
var { AuthActions } = require('app/actions');

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
        title='Go to homepage'
        href='#'
        secondary={true}
        onClick={this._onClose} />,
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

  _onClose(e) {
    e.preventDefault();
    AuthActions.redirectDisconnected(this.context.router);
    this.refs.sessionEndedDialog.dismiss();
  }

};

SessionEndedDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = SessionEndedDialog;


