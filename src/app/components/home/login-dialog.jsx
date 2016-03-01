'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
	Dialog,
	TextField,
	FlatButton
} = mui;

// Vendors
const debug = require('debug')('AiC:Component:Home:LoginDialog');

// APP
const {AuthStore} = require('app/stores');
const {AuthActions} = require('app/actions');
const AppUtils = require('app/components/shared/app-utils');

const LoginDialog = class extends React.Component {

	constructor(props) {
		super(props);
		this._onLoginSubmit = this._onLoginSubmit.bind(this);
		this._onLoginCancel = this._onLoginCancel.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);
		this.validFields = this.validFields.bind(this);
		this.state = {open: false};
	}

	render() {
		const loginActions = [
			<FlatButton
				key="loginActionCancel"
				label="Cancel"
				title="Cancel"
				secondary
				onTouchTap={this._onLoginCancel}
				className="btLoginCancel"
				/>,
			<FlatButton
				key="loginActionSubmit"
				label="Submit"
				title="Submit"
				primary
				onTouchTap={this._onLoginSubmit}
				className="btLoginSubmit"
				/>
		];

		const errorBox = this.state && this.state.login && this.state.login.status === 'LOGIN_STATUS_CONNECT_FAILED' ? <div style={{color: this.context.muiTheme.palette.errorColor}}>{this.state.login.message}</div> : null;

		return (
			<Dialog title="Login" actions={loginActions} ref="loginDialogIn" onShow={this.cleanFields} open={this.state.open}>
				{this.state && this.state.login ?
				<form onSubmit={this._onLoginSubmit}>
				{errorBox}
				<TextField name="fieldLogin" className="loginEmail" onKeyDown={this._onKeyDown} ref="loginEmail" onChange={this._onFieldChange.bind(this, 'loginEmail')} errorText={this.state.hasOwnProperty('loginEmailError') ? this.state.loginEmailError : ''} floatingLabelText="login" disabled={this.state.login.status === 'LOGIN_STATUS_CONNECTING'} /><br />
				<TextField name="fieldPassword" className="loginPassword" onKeyDown={this._onKeyDown} ref="loginPassword" onChange={this._onFieldChange.bind(this, 'loginPassword')} errorText={this.state.hasOwnProperty('loginPasswordError') ? this.state.loginPasswordError : ''} type="password" floatingLabelText="password" disabled={this.state.login.status === 'LOGIN_STATUS_CONNECTING'} />
				</form> : null}
				<br />
			</Dialog>
			);
	}

	show() {
		this.setState({fieldsChanged: [], loginEmailError: '', loginPasswordError: ''});
		// this.refs.loginDialogIn.show();
		this.setState({open: true});
	}

	_onFieldChange(ref) {
		const fieldsChanged = this.state.fieldsChanged ? this.state.fieldsChanged : [];
		fieldsChanged.push(ref);
		this.validFields(AppUtils.extend(this.state, {fieldsChanged}));
	}

	validFields(newState) {
		// debug('newState');
		// debug(newState);
		const fieldAreValid = ['loginEmail', 'loginPassword'].reduce((previous, item) => {
			if (newState.fieldsChanged && newState.fieldsChanged.indexOf(item) > -1) {
				newState[`${item}Error`] = AppUtils.fieldIsRequired(previous[1].refs[item]);
			}
			return [previous[0] && !AppUtils.isEmpty(previous[1].refs[item].getValue()), previous[1]];
		}, [true, this]);
		this.setState(newState);
		return fieldAreValid[0];
	}

	_onKeyDown(e) {
		// debug('_onKeyDown e', e);
		if (e.keyCode === 13) {
			e.preventDefault();
			this._onLoginSubmit(e);
		}
	}

	_onLoginSubmit(e) {
		e.preventDefault();
		if (this.validFields(AppUtils.extend(this.state, {fieldsChanged: ['loginEmail', 'loginPassword']}))) {
			const email = this.refs.loginEmail.getValue();
			const pass = this.refs.loginPassword.getValue();
			AuthActions.login(email, pass);
		}
	}

	_onLoginCancel(e) {
		e.preventDefault();
		// this.refs.loginDialogIn.dismiss();
		this.setState({open: false});
	}

	_onStateChange(newState) {
		// TODO: this should be in the store not in the view
		if (newState.login.status === 'LOGIN_STATUS_CONNECTED') {
			debug('this.context.router', this.context.router);
			debug('this.props.location', this.props.location);
			debug('this.context.route', this.context.route);
			debug('this.context.location', this.context.location);
			AuthActions.redirectConnected(this.context.router, this.context.location);
		}
		this.setState(newState);
	}

	componentDidMount() {
		this.unsubscribe = AuthStore.listen(this._onStateChange);
		AuthStore.init();
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		debug('unsubscribe');
		this.unsubscribe();
	}

};

LoginDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object,
	location: React.PropTypes.object
};

module.exports = LoginDialog;
