/* global window */
// TODO: remove global window
'use strict';

// React
const React = require('react');

// Router
const Router = require('react-router');
const RouteHandler = Router.RouteHandler;

// Material design
const mui = require('material-ui');
const ThemeManager = new mui.Styles.ThemeManager();
const Colors = mui.Styles.Colors;
const {RaisedButton} = mui;

// APP
const GobyTheme = require('app/configs/goby-theme');
const {
	FullWidthSection,
	SessionEndedDialog
} = require('app/components');
const {
	AuthStore,
	AppConfigStore
} = require('app/stores');
const {
	AuthActions,
	AppConfigActions
} = require('app/actions');

const Main = class extends React.Component {
	constructor(props) {
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
			appConfig: this.state.config ? this.state.config : {},
			loginStatus: this.state.login ? this.state.login : {}
		};
	}

	render() {
		const styles = {
			footer: {
				backgroundColor: Colors.grey900,
				textAlign: 'center'
			},
			a: {
				color: Colors.darkWhite
			},
			p: {
				margin: '0 auto',
				padding: '0 0 24px 0',
				color: Colors.lightWhite,
				maxWidth: '335px'
			},
			iconButton: {
				color: Colors.darkWhite
			},
			root: {
				backgroundColor: ThemeManager.getCurrentTheme().palette.logo1Color,
				overflow: 'hidden',
				width: '100vw',
				height: '100vh',
				color: 'white',
				textAlign: 'center'
			}
		};
		// console.log('render state ', this.state);

		if (this.state.config && this.state.config.isLoaded && !this.state.config.hasErrors) {
			return (
				<div>
					<RouteHandler />
					<FullWidthSection useContent style={styles.footer}>
						<p style={styles.p}>COPYRIGHT © AiC</p>

						{this.state.config.debug ? ([
							<RaisedButton key={1} label="Test Theme" title="Test Theme" primar onClick={this._onThemeClick} />,
							<RaisedButton key={2} linkButton primary href="#/home" >home</RaisedButton>]
						) : null}
					</FullWidthSection>
					<SessionEndedDialog ref="sessionEndedDialog" />
				</div>
			);
		}

		if (this.state.config && this.state.config.isLoaded && this.state.config.hasErrors) {
			return (
				<FullWidthSection style={styles.root}>
					It was not possible to load the application. <br />
					Please contact administrator to verify the application installation.
				</FullWidthSection>
			);
		}

		return (
			<FullWidthSection style={styles.root}>
				Loading application configuration.
			</FullWidthSection>
		);
	}

	_onStateChange(newState) {
		console.log('main new state');
		if (newState.login) {
			const currentPathName = AuthActions.getPathName(this.context.router);
			if (newState.login.status === 'LOGIN_STATUS_DISCONNECTED' &&
				currentPathName !== '/' &&
				currentPathName !== '/home') {
				if (newState.login.showMessage) {
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
		if (newState.config) {
			console.log('Config loaded');
			window.GobyAppGlobals.config = newState.config;
			// console.log('main new state config', newState, window.GobyAppGlobals);
			// Set state MUST be the last call
			this.setState(newState);
		}
	}

	componentWillMount() {
		console.log('Main componentWillMount');
		// ThemeManager.setPalette(GobyPalette);
		ThemeManager.setTheme(GobyTheme);
		this.unsubscribe.push(AuthStore.listen(this._onStateChange));
		AuthStore.init();
		this.unsubscribe.push(AppConfigStore.listen(this._onStateChange));
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
		this.unsubscribe.map(func => {
			func();
		});
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
	appConfig: React.PropTypes.object
};

Main.childContextTypes = {
	muiTheme: React.PropTypes.object,
	appConfig: React.PropTypes.object,
	loginStatus: React.PropTypes.object
};

module.exports = Main;
