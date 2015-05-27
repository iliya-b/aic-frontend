var React = require('react');

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var FullWidthSection = require('../components/full-width-section.jsx');
var ErrorBox = require('../components/error-box.jsx');
var { Auth, RequireAuth } = require('../stores/auth.jsx');

var {
  Checkbox,
  ClearFix,
  DatePicker,
  Dialog,
  DropDownMenu,
  FlatButton,
  FloatingActionButton,
  LeftNav,
  MenuItem,
  Paper,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Snackbar,
  Slider,
  Tabs,
  Tab,
  TextField,
  Toggle} = mui;

var Home = class extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      // loggedIn: auth.loggedIn()
      loginError: false,
      loginErrorMessage: '',
      signUpError: false,
      signUpErrorMessage: ''
    };
    this._onLoginClick = this._onLoginClick.bind(this);
    this._onLoginSubmit = this._onLoginSubmit.bind(this);
    this._onSignUpClick = this._onSignUpClick.bind(this);
    this._onSignUpSubmit = this._onSignUpSubmit.bind(this);
  }

  // _onThemeClick() {
  //   this.context.router.transitionTo('theme-test');
  // },
  // _onHomeClick() {
  //   this.context.router.transitionTo('home');
  // },

  render() {
    var palette = this.context.muiTheme.palette;
    var styles = {
      root: {
        backgroundColor: palette.logo1Color,
        overflow: 'hidden'
      },
      svgLogo: {
        width: '420px'
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: '575px'
      },
      label: {
        color: palette.accent1Color,
      },
      buttonStyle: {
        margin: '16px 16px 0px 16px'
      },
      h2: {
        //.mui-font-style-title
        color: palette.textLightColor,
        fontWeight: Typography.fontWeightLight,
        fontSize: '20px',
        lineHeight: '28px',
        marginBottom: '13px',
        letterSpacing: '0',
      },
      nowrap: {
        whiteSpace: 'nowrap'
      },
      taglineWhenLarge: {
        marginTop: '32px'
      },
      h1WhenLarge: {
        fontSize: '56px'
      },
      h2WhenLarge: {
        //.mui-font-style-headline;
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px'
      }
    };
    var loginActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onLoginSubmit }
    ];
    var signUpActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onSignUpSubmit }
    ];
    return (
      <FullWidthSection style={styles.root}>

          <div style={styles.tagline}>
            <h1 style={styles.h1}><img style={styles.svgLogo} src="images/logo.png" /></h1>
            <h2 style={styles.h2}>
              A platform for testing Android applications in the Cloud
            </h2>
            <RaisedButton
              label="Login"
              onTouchTap={this._onLoginClick}
              linkButton={true}
              style={styles.buttonStyle}
              primary={true} />
            <Dialog ref="loginDialog" title="Login" actions={loginActions}>
              {this.state.loginError ? (
                <ErrorBox>Error during login. Login or password invalid. {this.state.loginErrorMessage} </ErrorBox>
              ) : '' }
              <TextField ref="loginEmail" floatingLabelText="login"/><br/>
              <TextField ref="loginPassword" floatingLabelText="password" type="password" />
            </Dialog>
            <RaisedButton
              label="Sign Up"
              onTouchTap={this._onSignUpClick}
              linkButton={true}
              style={styles.buttonStyle}
              primary={true} />
            <Dialog ref="signUpDialog" title="Sign Up" actions={signUpActions}>
              {this.state.signUpError ? (
                <ErrorBox>Error during sign up. {this.state.signUpErrorMessage} </ErrorBox>
              ) : '' }
              <TextField ref="signUpName" floatingLabelText="name"/><br/>
              <TextField ref="signUpEmail" floatingLabelText="login"/><br/>
              <TextField ref="signUpPassword" floatingLabelText="password" type="password" />
            </Dialog>
          </div>
      </FullWidthSection>
    );
  }

  _onLoginClick(e) {
    this.refs.loginDialog.show();
  }

  _onLoginSubmit(e) {
    console.log('submit login');
    // this.context.router.transitionTo('projects');
    e.preventDefault();
    var { router } = this.context;
    var nextPath = router.getCurrentQuery().nextPath;
    var email = this.refs.loginEmail.getValue();
    var pass = this.refs.loginPassword.getValue();
    Auth.login(email, pass, (loggedIn) => {
      console.log(loggedIn);
      if (!loggedIn.authenticated){
        this.setState({ loginError: true, loginErrorMessage: loggedIn.errorMessage });
        console.log('submit login 1');
      } else if (nextPath) {
        router.replaceWith(nextPath);
        console.log('submit login 2');
      } else {
        // router.replaceWith('projects');
        console.log('submit login 3');
        Auth.userHome(router);
      }
    });
  }

  _onSignUpClick(e) {
    this.refs.signUpDialog.show();
  }

  _onSignUpSubmit(e) {
    console.log('submit register');
    // this.context.router.transitionTo('projects');
    e.preventDefault();
    var { router } = this.context;
    var nextPath = router.getCurrentQuery().nextPath;
    var name = this.refs.signUpName.getValue();
    var email = this.refs.signUpEmail.getValue();
    var pass = this.refs.signUpPassword.getValue();
    Auth.register(email, pass, name, (results) => {
      console.log(results);
      if (!results.registered){
        this.setState({ signUpError: true, signUpErrorMessage: results.errorMessage });
        console.log('register 1');
      } else {
        // router.replaceWith('projects');
        console.log('submit register 3');
      }
    });
  }

};

Home.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

Home.willTransitionTo = function(transition) {
  console.log('hometrans2');
  Auth.userHome(transition);
};

module.exports = Home;
