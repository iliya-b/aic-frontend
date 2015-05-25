var React = require('react');

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var FullWidthSection = require('../components/full-width-section.jsx');

var Auth = require('../stores/auth.jsx');

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

var Home = React.createClass({

  // _onThemeClick() {
  //   this.context.router.transitionTo('theme-test');
  // },
  // _onHomeClick() {
  //   this.context.router.transitionTo('home');
  // },

  render: function() {
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
              <TextField ref="loginEmail" hintText="your@email"/><br/>
              <TextField ref="loginPassword" hintText="password" type="password" />
            </Dialog>
            <RaisedButton
              label="Sign Up"
              onTouchTap={this._onSignUpClick}
              linkButton={true}
              style={styles.buttonStyle}
              primary={true} />
            <Dialog ref="signUpDialog" title="Sign Up" actions={signUpActions}>
              <TextField ref="signUpEmail" hintText="your@email"/><br/>
              <TextField ref="signUpPassword" hintText="password" type="password" />
            </Dialog>
          </div>
      </FullWidthSection>
    );
  },

  _onLoginClick: function(e) {
    this.refs.loginDialog.show();
  },

  _onLoginSubmit: function(e) {
    console.log('submit login');
    this.context.router.transitionTo('projects');
    // e.preventDefault();
    // var { router } = this.context;
    // var nextPath = router.getCurrentQuery().nextPath;
    // var email = this.refs.loginEmail.getDOMNode().value;
    // var pass = this.refs.loginPassword.getDOMNode().value;
    // Auth.login(email, pass, (loggedIn) => {
    //   if (!loggedIn){
    //     // return this.setState({ error: true });
    //     console.log('submit login 1');
    //   } else if (nextPath) {
    //     // router.replaceWith(nextPath);
    //     console.log('submit login 2');
    //   } else {
    //     // router.replaceWith('/projects');
    //     console.log('submit login 3');
    //   }
    // });
  },

  _onSignUpClick: function(e) {
    this.refs.signUpDialog.show();
  },

  _onSignUpSubmit: function(e) {
    console.log('submit sign');
  },

});

Home.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = Home;
