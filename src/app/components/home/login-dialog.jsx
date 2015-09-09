'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog,
      TextField,
      FlatButton } = mui;

// APP
var { Auths } = require('goby/stores');
var AppUtils = require('goby/components/shared/app-utils.jsx');

var LoginDialog = class extends React.Component{

  constructor (props) {
    super(props);
    this._onLoginSubmit = this._onLoginSubmit.bind(this);
  }

  render() {

    var loginActions = [
      <FlatButton
        key='loginActionCancel'
        label='Cancel'
        secondary={true}
        onTouchTap={this._onLoginCancel}
        className='btLoginCancel'  />,
      <FlatButton
        key='loginActionSubmit'
        label='Submit'
        primary={true}
        onTouchTap={this._onLoginSubmit}
        className='btLoginSubmit'  />
    ];

    var errorBox = null;

    return (
      <Dialog title='Login' actions={loginActions} ref='loginDialogIn' onShow={this.cleanFields} >
        <form onsubmit={this._onLoginSubmit}>
        {errorBox}
        <TextField className='loginEmail' onEnterKeyDown={this._onLoginSubmit} ref='loginEmail' changed={false} errorText={'this.state.loginEmailError'} floatingLabelText='login' disabled={this.state.blockFields} /><br />
        <TextField className='loginPassword' onEnterKeyDown={this._onLoginSubmit} ref='loginPassword' changed={false}  errorText={'this.state.loginPasswordError'} floatingLabelText='password' type='password'  disabled={this.state.blockFields} />
        </form>
      </Dialog>
      );
  }

  show(){
    this.refs.loginDialogIn.show();
  }

  blockFields(){
    this.setState({ blockFields: true });
  }

  unblockFields(){
    this.setState({ blockFields: false });
  }

  validFields(){
    return this.refs.loginEmail.getValue() && this.refs.loginPassword.getValue();
  }

  _onLoginSubmit(e) {
    e.preventDefault();
    if(this.validFields()){
      this.blockFields();
      var { router } = this.context;
      var nextPath = router.getCurrentQuery().nextPath;
      var email = this.refs.loginEmail.getValue();
      var pass = this.refs.loginPassword.getValue();
      AuthStore.login(email, pass);
      // Auth.login(email, pass, (results) => {
      //   console.log(results);
      //   if ( results.hasOwnProperty('authenticated') && results.authenticated === true ){
      //     Auth.redirectIfLogged(router);
      //   } else {
      //     this.setState({ loginError: true, loginErrorMessage: results.hasOwnProperty('errorMessage') ? results.errorMessage : 'Unknown error' });
      //     this.unblockFields();
      //   }
      // });
    }
  }

  _onLoginCancel() {
    this.refs.loginDialogIn.dismiss();
  }

  _onStateChange(){

  }

  componentDidMount() {
    this.unsubscribe = AuthStore.listen( this._onStateChange );
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

LoginDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = LoginDialog;


