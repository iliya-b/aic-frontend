'use strict';

// Vendor
const React = require('react');
const {
	Dialog,
	TextField,
	FlatButton
} = require('material-ui');
const debug = require('debug')('AiC:Component:Home:LoginDialog');

// APP
const {AuthStore} = require('app/stores');
const {AuthActions} = require('app/actions');
const AppUtils = require('app/components/shared/app-utils');

const LoginDialog = class extends React.Component {

	constructor(props) {
		super(props);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
		this.handleLoginCancel = this.handleLoginCancel.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.validFields = this.validFields.bind(this);
		this.handleFieldChanges = {};
		this.handleFieldChanges.loginEmail = this.handleFieldChange.bind(this, 'loginEmail');
		this.handleFieldChanges.loginPassword = this.handleFieldChange.bind(this, 'loginPassword');
		this.refLoginPassword = c => this.loginPassword = c;
		this.refLoginEmail = c => this.loginEmail = c;
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
				onTouchTap={this.handleLoginSubmit}
				className="btLoginSubmit"
				/>
		];

		const errorBox = this.state && this.state.login && this.state.login.status === 'LOGIN_STATUS_CONNECT_FAILED' ? <div style={{color: this.context.muiTheme.palette.errorColor}}>{this.state.login.message}</div> : null;

		return (
			<Dialog title="Login" actions={loginActions} open={this.props.open}>
				{this.state && this.state.login ?
					<form onSubmit={this.handleLoginSubmit}>
						{errorBox}
						<TextField
							name="fieldLogin"
							className="loginEmail"
							onKeyDown={this.handleKeyDown}
							ref={this.refLoginEmail}
							onChange={this.handleFieldChanges.loginEmail}
							errorText={this.state.hasOwnProperty('loginEmailError') ? this.state.loginEmailError : ''}
							floatingLabelText="login"
							disabled={this.state.login.status === 'LOGIN_STATUS_CONNECTING'}
							/><br/>
						<TextField
							name="fieldPassword"
							className="loginPassword"
							onKeyDown={this.handleKeyDown}
							ref={this.refLoginPassword}
							onChange={this.handleFieldChanges.loginPassword}
							errorText={this.state.hasOwnProperty('loginPasswordError') ? this.state.loginPasswordError : ''}
							type="password"
							floatingLabelText="password"
							disabled={this.state.login.status === 'LOGIN_STATUS_CONNECTING'}
							/>
					</form> : null}
				<br/>
			</Dialog>
			);
	}

	handleFieldChange(ref) {
		const fieldsChanged = this.state.fieldsChanged ? this.state.fieldsChanged : [];
		fieldsChanged.push(ref);
		this.validFields(AppUtils.extend(this.state, {fieldsChanged}));
	}

	validFields(newState) {
		// debug('newState');
		// debug(newState);
		const fieldAreValid = ['loginEmail', 'loginPassword'].reduce((previous, item) => {
			if (newState.fieldsChanged && newState.fieldsChanged.indexOf(item) > -1) {
				newState[`${item}Error`] = AppUtils.fieldIsRequired(previous[1][item]);
			}
			return [previous[0] && !AppUtils.isEmpty(previous[1][item].getValue()), previous[1]];
		}, [true, this]);
		this.setState(newState);
		return fieldAreValid[0];
	}

	handleKeyDown(e) {
		// debug('handleKeyDown e', e);
		if (e.keyCode === 13) {
			e.preventDefault();
			this.handleLoginSubmit(e);
		}
	}

	handleLoginSubmit(e) {
		e.preventDefault();
		if (this.validFields(AppUtils.extend(this.state, {fieldsChanged: ['loginEmail', 'loginPassword']}))) {
			const email = this.loginEmail.getValue();
			const pass = this.loginPassword.getValue();
			AuthActions.login(email, pass);
		}
	}

	handleLoginCancel(e) {
		e.preventDefault();
		this.props.onRequestClose(e);
	}

	handleStateChange(newState) {
		// TODO: this should be in the store not in the view
		if (newState.login.status === 'LOGIN_STATUS_CONNECTED') {
			debug('this.context.router', this.context.router);
			debug('this.props.location', this.props.location);
			debug('this.context.route', this.context.route);
			debug('this.context.location', this.context.location);
			AuthActions.redirectConnected(this.context.router, this.props.location);
		}
		this.setState(newState);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.open !== nextProps.open && nextProps.open) {
			// onShow
			this.setState({fieldsChanged: [], loginEmailError: '', loginPasswordError: ''});
		}
	}

	componentDidMount() {
		this.unsubscribe = AuthStore.listen(this.handleStateChange);
		AuthStore.init();
	}

	componentWillUnmount() {
		this.unsubscribe();
		debug('unsubscribe');
	}

};

LoginDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

LoginDialog.propTypes = {
	location: React.PropTypes.object,
	open: React.PropTypes.bool,
	onRequestClose: React.PropTypes.func
};

module.exports = LoginDialog;
