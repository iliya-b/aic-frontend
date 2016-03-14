'use strict';

// Vendor
import React from 'react';
import Typography from 'material-ui/lib/styles/typography';
import RaisedButton from 'material-ui/lib/raised-button';
// const debug = require('debug')('AiC:Views:Home');

// APP
import FullWidthSection from 'app/components/shared/full-width-section';
import LoginDialog from 'app/components/home/login-dialog';
import AuthPage from 'app/components/shared/auth-page';

const Home = class extends AuthPage {
// const Home = class extends React.Component {

	constructor(props) {
		super(props);
		this.handleLoginOpen = this.handleLoginOpen.bind(this);
		this.handleLoginClose = this.handleLoginClose.bind(this);
		this.state = {
			loginDialogOpen: false
		};
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
					<h1 style={styles.h1}><img style={styles.svgLogo} src="images/logo.png"/></h1>
					<h2 style={styles.h2}>
						A platform for testing Android applications in the Cloud
					</h2>
					<RaisedButton
						label="Login"
						title="Login"
						href="#"
						onClick={this.handleLoginOpen}
						linkButton
						style={styles.buttonStyle}
						primary
						/>
					<LoginDialog open={this.state.loginDialogOpen} onRequestClose={this.handleLoginClose} location={this.props.location}/>
				</div>
			</FullWidthSection>
		);
	}

	handleLoginOpen(e) {
		e.preventDefault();
		this.setState({loginDialogOpen: true});
	}

	handleLoginClose(e) {
		e.preventDefault();
		this.setState({loginDialogOpen: false});
	}

	willTransitionTo() {
		super.willTransitionTo();
	}

};

Home.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object,
	loginStatus: React.PropTypes.object
};

Home.propTypes = {
	location: React.PropTypes.object
};

module.exports = Home;
