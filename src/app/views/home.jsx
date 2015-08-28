var React = require('react');

var mui = require('material-ui');
var { Typography } = mui.Styles;

var { FullWidthSection, LoginDialog, SignUpDialog } = require('../components/');
var { Auth } = require('../stores/auth.jsx');

var { RaisedButton } = mui;

var Home = class extends React.Component {

  constructor (props) {
    super(props);
    this._onLoginClick = this._onLoginClick.bind(this);
    this._onSignUpClick = this._onSignUpClick.bind(this);
    // this.willTransitionTo = this.willTransitionTo.bind(this);
  }

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
              primary={true}
              className="btLogin" />
            <LoginDialog ref="loginDialog" />
            <RaisedButton
              label="Sign Up"
              onTouchTap={this._onSignUpClick}
              linkButton={true}
              style={styles.buttonStyle}
              primary={true} />
            <SignUpDialog ref="signUpDialog" />
          </div>
      </FullWidthSection>
    );
  }

  _onLoginClick() {
    this.refs.loginDialog.show();
  }

  _onSignUpClick() {
    this.refs.signUpDialog.show();
  }

  // // Example with componentWillMount
  // componentWillMount(){
  //   Auth.redirectIfLogged(this.context.router);
  // }

};

Home.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

Home.willTransitionTo = function(transition) {
  Auth.redirectIfLogged(transition);
};

module.exports = Home;
