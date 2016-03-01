'use strict';

// React
const React = require('react');

// Vendors
const debug = require('debug')('AiC:Views:Home');

// Material design
const mui = require('material-ui');
const {Typography} = mui.Styles;
const {RaisedButton} = mui;

// APP
const {
	FullWidthSection,
	LoginDialog
} = require('app/components');

// const Home = class extends AuthPage {
const Home = class extends React.Component {

	constructor(props) {
		super(props);
		this._onLoginClick = this._onLoginClick.bind(this);
		this._onSignUpClick = this._onSignUpClick.bind(this);
		// this.willTransitionTo = this.willTransitionTo.bind(this);
	}

	render() {
		const palette = this.context.muiTheme.palette;
		const styles = {
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
				color: palette.accent1Color
			},
			buttonStyle: {
				margin: '16px 16px 0px 16px'
			},
			h2: {
				// .mui-font-style-title
				color: palette.textLightColor,
				fontWeight: Typography.fontWeightLight,
				fontSize: '20px',
				lineHeight: '28px',
				marginBottom: '13px',
				letterSpacing: '0'
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
				// .mui-font-style-headline;
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
							title="Login"
							href="#"
							onClick={this._onLoginClick}
							linkButton
							style={styles.buttonStyle}
							primary
							/>
						<LoginDialog ref="loginDialog" location={this.props.location}/>
					</div>
			</FullWidthSection>
		);
	}

	_onLoginClick(e) {
		e.preventDefault();
		this.refs.loginDialog.show();
	}

	_onSignUpClick() {
		this.refs.signUpDialog.show();
	}

	// Example with componentWillMount
	componentWillMount() {
		debug(this.context.loginStatus);
		// Auth.redirectIfLogged(this.context.router);
	}

};

Home.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object,
	loginStatus: React.PropTypes.object
};

module.exports = Home;
