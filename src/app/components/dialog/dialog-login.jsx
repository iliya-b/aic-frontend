'use strict';

// Vendor
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Formsy from 'formsy-react';
const debug = require('debug')('AiC:Component:Home:LoginDialog');

// APP
import FormsyTextField from 'app/components/form/formsy-text-field';

const LoginDialog = class extends React.Component {

	constructor(props) {
		super(props);
		this.refLoginPassword = c => {
			this.loginPassword = c;
		};
		this.refLoginEmail = c => {
			this.loginEmail = c;
		};
		this.refForm = c => {
			this.form = c;
		};

		this.handleKeyDown = e => {
			if (e.keyCode === 13) {
				e.preventDefault();
				this.handleLoginClick(e);
			}
		};

		// Buttons handlers
		this.handleLoginClick = () => {
			this.form.submit();
		};
		this.handleLoginCancel = e => {
			e.preventDefault();
			this.props.onRequestClose(e);
		};

		// Form handlers
		this.handleFormSubmit = e => {
			debug('handleLoginSubmit state.canSubmit', this.state.canSubmit);
			debug('handleLoginSubmit e', e);
			// e.preventDefault();
			if (this.state.canSubmit) {
				const email = this.loginEmail.getValue();
				const pass = this.loginPassword.getValue();
				this.props.onLoginSubmit({login: email, pass});
			}
		};
		this.handleFormValid = () => {
			this.setState({
				canSubmit: true
			});
		};
		this.handleFormInvalid = () => {
			this.setState({
				canSubmit: false
			});
		};

		this.state = {
			canSubmit: false
		};
	}

	render() {
		const loginActions = [
			<FlatButton
				key="loginActionCancel"
				label="Cancel"
				title="Cancel"
				secondary
				onTouchTap={this.handleLoginCancel}
				className="btLoginCancel"
				/>,
			<FlatButton
				key="loginActionSubmit"
				label="Submit"
				title="Submit"
				primary
				onTouchTap={this.handleLoginClick}
				disabled={this.props.formDisabled}
				className="btLoginSubmit"
				/>
		];

		const errorBox = this.props.error ? <div className="txtDialogLoginError" style={{color: this.context.muiTheme.palette.errorColor}}>{this.props.error}</div> : null;
		return (
			<Dialog title="Login" actions={loginActions} open={this.props.open}>
				<Formsy.Form
					onValid={this.handleFormValid}
					onInvalid={this.handleFormInvalid}
					onSubmit={this.handleFormSubmit}
					ref={this.refForm}
					disabled={this.props.formDisabled}
					>
					{errorBox}
					<FormsyTextField
						name="fieldLogin"
						className="loginEmail"
						onKeyDown={this.handleKeyDown}
						ref={this.refLoginEmail}
						floatingLabelText="login"
						requiredError="This field is required"
						required
						/><br/>
					<FormsyTextField
						name="fieldPassword"
						className="loginPassword"
						onKeyDown={this.handleKeyDown}
						ref={this.refLoginPassword}
						type="password"
						floatingLabelText="password"
						requiredError="This field is required"
						required
						/>
				</Formsy.Form>
				<br/>
			</Dialog>
			);
	}
};

LoginDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

LoginDialog.propTypes = {
	location: React.PropTypes.object,
	open: React.PropTypes.bool,
	onRequestClose: React.PropTypes.func,
	onLoginSubmit: React.PropTypes.func,
	error: React.PropTypes.string,
	formDisabled: React.PropTypes.bool
};

module.exports = LoginDialog;
