'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog,
      TextField,
      FlatButton } = mui;

// APP
var { AuthStore } = require('goby/stores');
var { AuthActions } = require('goby/actions');
var AppUtils = require('goby/components/shared/app-utils.jsx');

var LoginDialog = class extends React.Component{

  constructor (props) {
    super(props);
    this._onLoginSubmit = this._onLoginSubmit.bind(this);
    this._onLoginCancel = this._onLoginCancel.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
    this.validFields = this.validFields.bind(this);
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

    var errorBox = this.state && this.state.login.status === 'LOGIN_STATUS_CONNECT_FAILED' ? <div style={{color:this.context.muiTheme.palette.errorColor}}>{this.state.login.message}</div> : null ;

    return (
      <Dialog title='Login' actions={loginActions} ref='loginDialogIn' onShow={this.cleanFields} >
        {this.state ?
        <form onsubmit={this._onLoginSubmit}>
        {errorBox}
        <TextField className='loginEmail' onEnterKeyDown={this._onLoginSubmit} ref='loginEmail' onChange={this.validFields} errorText={this.state.hasOwnProperty('loginEmailError') ? this.state.loginEmailError : ''} floatingLabelText='login' disabled={this.state.login.status === 'LOGIN_STATUS_CONNECTING'} /><br />
        <TextField className='loginPassword' onEnterKeyDown={this._onLoginSubmit} ref='loginPassword' onChange={this.validFields} errorText={this.state.hasOwnProperty('loginPasswordError') ? this.state.loginPasswordError : ''} floatingLabelText='password' type='password' disabled={this.state.login.status === 'LOGIN_STATUS_CONNECTING'} />
        </form>
        : null}
      </Dialog>
      );
  }

  show(){
    this.refs.loginDialogIn.show();
  }

  validFields(){
    var newState = this.state;
    var fieldAreValid = ['loginEmail', 'loginPassword'].reduce(function (previous, item) {
      newState[item + 'Error'] = AppUtils.fieldIsRequired( previous[1].refs[ item ] );
      return [previous[0] && !AppUtils.isEmpty( previous[1].refs[ item ].getValue() ), previous[1]];
    },  [ true, this ] );
    this.setState( newState );
    return fieldAreValid[0];
  }

  _onLoginSubmit(e) {
    e.preventDefault();
    if(this.validFields()){
      var email = this.refs.loginEmail.getValue();
      var pass = this.refs.loginPassword.getValue();
      AuthActions.login(email, pass);
    }
  }

  _onLoginCancel() {
    this.refs.loginDialogIn.dismiss();
  }

  _onStateChange(newState){
    if (newState.login.status === 'LOGIN_STATUS_CONNECTED'){
      AuthActions.redirect(this.context.router);
    }
    this.setState(newState);
  }

  componentDidMount() {
    this.unsubscribe = AuthStore.listen( this._onStateChange );
    AuthStore.init();
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


