'use strict';

// React
var React = require('react');

// Router
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

// Material design
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var { RaisedButton } = mui;

// APP
var AppConfig = require('goby/configs/app-config.jsx');
var GobyTheme = require('goby/configs/goby-theme.jsx');
var { FullWidthSection,
      SessionEndedDialog } = require('goby/components');
var { AuthStore } = require('goby/stores');
var { AuthActions } = require('goby/actions');

var Main = class extends React.Component{

  constructor (props) {
    super(props);
    this._onThemeClick = this._onThemeClick.bind(this);
    this._onHomeClick = this._onHomeClick.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
  }

  _onThemeClick() {
    this.context.router.transitionTo('theme-test');
  }

  _onHomeClick() {
    this.context.router.transitionTo('home');
  }

  componentWillMount() {
    // ThemeManager.setPalette(GobyPalette);
    ThemeManager.setTheme(GobyTheme);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  }

  // childContextTypes: {
  //   muiTheme: React.PropTypes.object,
  //   router: React.PropTypes.func,
  // },

  getStyles() {
    var darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: '0 0 24px 0',
        color: Colors.lightWhite,
        maxWidth: '335px',
      },
      iconButton: {
        color: darkWhite,
      },
    };
  }

  render() {
    var styles = this.getStyles();
    return (
      <div>
        <RouteHandler />
        <FullWidthSection useContent={true} style={styles.footer}>
          <p style={styles.p}>COPYRIGHT © AiC</p>

          {AppConfig.debug ? (
          <RaisedButton label="Test Theme" primary={true}  onClick={this._onThemeClick} />
          ) : null }
        </FullWidthSection>
        <SessionEndedDialog ref="sessionEndedDialog" />
      </div>

    );
  }

  _onStateChange(newState){
    var currentPathName = AuthActions.getPathName(this.context.router);
    if (newState.login.status === 'LOGIN_STATUS_DISCONNECTED' && currentPathName !== '/' && currentPathName !== '/home' ){
      this.refs.sessionEndedDialog.show();
    }
    this.setState(newState);
    console.log('changed main state' , newState ,  currentPathName);
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

Main.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

module.exports = Main;
