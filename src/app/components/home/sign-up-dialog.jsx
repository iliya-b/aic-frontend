var React = require('react');

var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var { Dialog, TextField, FlatButton } = mui;
var { Auth } = require('../../stores/auth.jsx');

var InfoBox = require('../shared/info-box.jsx')

// var SignUpDialog = React.createClass({
var SignUpDialog = class extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      signUpError: false,
      signUpErrorMessage: '',
      blockFields: false,
      signUpSuccess: false,
      userName: ''
    };

    this._onSignUpSubmit = this._onSignUpSubmit.bind(this);
    this._onSignUpCancel = this._onSignUpCancel.bind(this);
  }

  render() {
  // render: function(){

    var {
      // style,
      ...other
    } = this.props;

    // var signUpActions = [
    //   { text: 'Cancel' },
    //   { text: 'Submit', onClick: this._onSignUpSubmit }
    // ];

    var successBox = <InfoBox boxType={InfoBox.SUCCESS}>New user <strong>{this.state.userName}</strong> successfully registered.</InfoBox>;
    var errorBox = this.state.signUpError ? ( <InfoBox boxType={InfoBox.ERROR}>{this.state.signUpErrorMessage}</InfoBox>) : '';

    var styles = {
      root: {},
      submit: {
        display: this.state.signUpSuccess ? 'none' : 'auto'
      }
    };

    var signUpActions = [
      <FlatButton
        key="signUpActionCancel"
        label={this.state.signUpSuccess ? 'Close' : 'Cancel'}
        secondary={true}
        onTouchTap={this._onSignUpCancel} />,
      <FlatButton
        key="signUpActionSubmit"
        label="Submit"
        primary={true}
        onTouchTap={this._onSignUpSubmit}
        style={styles.submit} />
    ];


    return (
      <Dialog title="Sign Up" actions={signUpActions} {...other} ref="signUpDialogIn" >
        {this.state.signUpSuccess ? successBox : (
          <div>
          {errorBox}
          <TextField ref="signUpName" floatingLabelText="name" disabled={this.state.blockFields} /><br />
          <TextField ref="signUpEmail" floatingLabelText="login" disabled={this.state.blockFields} /><br />
          <TextField ref="signUpPassword" floatingLabelText="password" type="password"  disabled={this.state.blockFields} />
          </div>
        )}
      </Dialog>
      );
  }

  show(){
    this.setState({ signUpError: false,
      signUpErrorMessage: '',
      blockFields: false,
      signUpSuccess: false,
      userName: '' });
    this.cleanFields();
    this.refs.signUpDialogIn.show();
  }

  blockFields() {
    this.setState({ blockFields: true });
  }

  unblockFields() {
    this.setState({ blockFields: false });
  }

  cleanFields() {
    this.refs.signUpName.clearValue();
    this.refs.signUpEmail.clearValue();
    this.refs.signUpPassword.clearValue();
  }

  _onSignUpSubmit(e) {
    // console.log('submit register');
    e.preventDefault();
    this.blockFields();
    // var { router } = this.context;
    // var nextPath = router.getCurrentQuery().nextPath;
    var name = this.refs.signUpName.getValue();
    var email = this.refs.signUpEmail.getValue();
    var pass = this.refs.signUpPassword.getValue();
    Auth.register(email, pass, name, (results) => {
      // console.log(results);
      if (!results.registered){
        this.setState({ signUpError: true, signUpErrorMessage: results.errorMessage });
        this.unblockFields();
      } else {
        this.setState({ signUpSuccess: true, userName: name });
      }
    });
  }

  _onSignUpCancel() {
    this.refs.signUpDialogIn.dismiss();
  }

};

SignUpDialog.mixins = [StylePropable];

SignUpDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = SignUpDialog;


