var React = require('react');

var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var { Dialog, FlatButton } = mui;

var InfoBox = require('../shared/info-box.jsx');
var AppUtils = require('../shared/app-utils.jsx');
var { Auth } = require('goby/stores/auth.jsx');

var SessionEndedDialog = class extends React.Component{

  constructor (props) {
    super(props);
    this._onClose = this._onClose.bind(this);
  }

  render() {

    var {
      // style,
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
    Auth.requireAuth(this.context.router);
    this.refs.sessionEndedDialog.dismiss();
  }

};

SessionEndedDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = SessionEndedDialog;


