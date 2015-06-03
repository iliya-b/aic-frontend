var React = require('react');

var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var { Dialog, TextField, FlatButton } = mui;
var { Auth } = require('../../stores/auth.jsx');

var InfoBox = require('../shared/info-box.jsx');
var AppUtils = require('../shared/app-utils.jsx');

var LoginDialog = class extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      loginError: false,
      loginErrorMessage: '',
      blockFields: false,
      loginSuccess: false,
      userName: '',
      loginEmailError: '',
      loginPasswordError: '',
    };

    this._onLoginSubmit = this._onLoginSubmit.bind(this);
    this._onLoginCancel = this._onLoginCancel.bind(this);
    this.checkFields = this.checkFields.bind(this);
  }

  render() {

    var {
      // style,
      ...other
    } = this.props;

    var successBox = <InfoBox boxType={InfoBox.SUCCESS}>New user <strong>{this.state.userName}</strong> successfully registered.</InfoBox>;
    var errorBox = this.state.loginError ? ( <InfoBox boxType={InfoBox.ERROR}>{this.state.loginErrorMessage}</InfoBox>) : '';

    var styles = {
      root:{

      },
      submit: {
        display: this.state.loginSuccess ? 'none' : 'auto'
      }
    };

    var loginActions = [
      <FlatButton
        key="loginActionCancel"
        label={this.state.loginSuccess ? 'Close' : 'Cancel'}
        secondary={true}
        onTouchTap={this._onLoginCancel} />,
      <FlatButton
        key="loginActionSubmit"
        label="Submit"
        primary={true}
        onTouchTap={this._onLoginSubmit}
        style={styles.submit} />
    ];

    //style={this.mergeAndPrefix(styles.root,style)}
    return (
      <Dialog title="Login" actions={loginActions} {...other} ref="loginDialogIn" >
        {this.state.loginSuccess ? successBox : (
          <div>
          {errorBox}
          <TextField ref="loginEmail" errorText={this.state.loginEmailError} onChange={this.checkFields} floatingLabelText="login" disabled={this.state.blockFields} /><br />
          <TextField ref="loginPassword" errorText={this.state.loginPasswordError} onChange={this.checkFields} floatingLabelText="password" type="password"  disabled={this.state.blockFields} />
          </div>
        )}
      </Dialog>
      );
  }

  show(){
    this.setState({ loginError: false,
      loginErrorMessage: '',
      blockFields: false,
      loginSuccess: false,
      userName: '',
      loginEmailError: '',
      loginPasswordError: '',
      });
    this.cleanFields();
    this.refs.loginDialogIn.show();
  }

  blockFields() {
    this.setState({ blockFields: true });
  }

  unblockFields() {
    this.setState({ blockFields: false });
  }

  cleanFields() {
    this.refs.loginEmail.clearValue();
    this.refs.loginPassword.clearValue();
  }

  checkFields() {
    // TODO : only set errorText to modified fields
    var noErrors = true;
    var errorMessage;
    errorMessage = AppUtils.fieldIsRequired( this.refs.loginEmail );
    this.setState({ loginEmailError: errorMessage});
    noErrors = noErrors && (errorMessage === '');
    errorMessage = AppUtils.fieldIsRequired( this.refs.loginPassword );
    this.setState({ loginPasswordError: errorMessage});
    noErrors = noErrors && (errorMessage === '');
    return noErrors;
  }

  _onLoginSubmit(e) {
    e.preventDefault();
    if(this.checkFields()){
      this.blockFields();
      var { router } = this.context;
      var nextPath = router.getCurrentQuery().nextPath;
      var email = this.refs.loginEmail.getValue();
      var pass = this.refs.loginPassword.getValue();
      Auth.login(email, pass, (results) => {
        console.log(results);
        if (!results.authenticated){
          this.setState({ loginError: true, loginErrorMessage: results.errorMessage });
          this.unblockFields();
        } else {
          // Success login
          if (nextPath) {
            // Go to the visited page that required authentication
            router.replaceWith(nextPath);
          } else {
            // Go to the default user home
            Auth.userHome(router);
          }
        }
      });
    }
  }

  _onLoginCancel() {
    this.refs.loginDialogIn.dismiss();
  }

};

LoginDialog.mixins = [StylePropable];

LoginDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = LoginDialog;


