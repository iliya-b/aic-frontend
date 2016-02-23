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
var GobyTheme = require('app/configs/goby-theme.jsx');
var { FullWidthSection,
      SessionEndedDialog } = require('app/components');
var { AuthStore,
      AppConfigStore } = require('app/stores');
var { AuthActions,
      AppConfigActions } = require('app/actions');

var Main = class extends React.Component{

  constructor (props) {
    super(props);
    this._onThemeClick = this._onThemeClick.bind(this);
    this._onHomeClick = this._onHomeClick.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
    this.state = {};
    this.unsubscribe = [];
  }

  _onThemeClick() {
    this.context.router.transitionTo('theme-test');
  }

  _onHomeClick() {
    this.context.router.transitionTo('home');
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
      appConfig: this.state.config ? this.state.config : {} ,
      loginStatus: this.state.login ? this.state.login : {} ,
    };
  }

  render() {
    var styles = {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
      },
      a: {
        color: Colors.darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: '0 0 24px 0',
        color: Colors.lightWhite,
        maxWidth: '335px',
      },
      iconButton: {
        color: Colors.darkWhite,
      },
      root: {
        backgroundColor: ThemeManager.getCurrentTheme().palette.logo1Color,
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
        color: 'white',
        textAlign: 'center',
      },
    };
    // console.log('render state ', this.state);
    return (
      <div>
        {this.state.config && this.state.config.isLoaded && !this.state.config.hasErrors  ? (
        <div>
          <RouteHandler />
          <FullWidthSection useContent={true} style={styles.footer}>
            <p style={styles.p}>COPYRIGHT © AiC</p>

            {this.state.config.debug ? ([
            <RaisedButton key={1} label="Test Theme" title="Test Theme" primary={true}  onClick={this._onThemeClick} />,
            <RaisedButton key={2} linkButton  primary={true} href="#/home" >home</RaisedButton>]
            ) : null }
          </FullWidthSection>
          <SessionEndedDialog ref="sessionEndedDialog" />
        </div>
        ) : this.state.config && this.state.config.isLoaded && this.state.config.hasErrors ? (
        <FullWidthSection style={styles.root}>
          It was not possible to load the application. <br />
          Please contact administrator to verify the application installation.
        </FullWidthSection>
        ) : (
        <FullWidthSection style={styles.root}>
          Loading application configuration.
        </FullWidthSection>
        )}
      </div>

    );
  }

  _onStateChange(newState){
    console.log('main new state');
    if ( newState.login ) {
      var currentPathName = AuthActions.getPathName(this.context.router);
      if (newState.login.status === 'LOGIN_STATUS_DISCONNECTED'
        && currentPathName !== '/' && currentPathName !== '/home' ){
        if ( newState.login.showMessage ){
          this.refs.sessionEndedDialog.show();
        } else {
          AuthActions.redirectDisconnected(this.context.router);
        }
      }
      // One baby panda dies each time we use window.GobyAppGlobals
      // TODO: Therefore we MUST change this
      // We need this because WillTransitionTo have no this.* this.context, etc
      // and we need login information on WillTransitionTo of AuthRequired component
      window.GobyAppGlobals.login = newState.login;
      this.setState(newState);
      // console.log('changed main state' , newState ,  currentPathName);
    }
    if ( newState.config ) {
      console.log('Config loaded');
      window.GobyAppGlobals.config = newState.config;
      // console.log('main new state config', newState, window.GobyAppGlobals);
      this.setState(newState); // Set state MUST be the last call
    }
  }

  componentWillMount() {
    console.log('Main componentWillMount');
    // ThemeManager.setPalette(GobyPalette);
    ThemeManager.setTheme(GobyTheme);
    this.unsubscribe.push(AuthStore.listen( this._onStateChange ));
    AuthStore.init();
    this.unsubscribe.push(AppConfigStore.listen( this._onStateChange ));
    AppConfigActions.load();
  }

  // componentDidMount() {
  //   this.unsubscribe.push(AuthStore.listen( this._onStateChange ));
  //   AuthStore.init();
  //   this.unsubscribe.push(AppConfigStore.listen( this._onStateChange ));
  //   AppConfigActions.load();
  // }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe.map( function(func){ func(); } );
  }

};

Main.willTransitionTo = function (transition, params, query, callback) {
  console.log('Main willTransitionTo');
  // this.unsubscribe.push(AppConfigStore.listen( this._onStateChange ));
  // AppConfigActions.load();
  callback();
};

Main.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
  appConfig: React.PropTypes.object,
};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object,
  appConfig: React.PropTypes.object,
  loginStatus: React.PropTypes.object,
};

module.exports = Main;
