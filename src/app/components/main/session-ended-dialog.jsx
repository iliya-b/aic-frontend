'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
	Dialog,
	FlatButton
} = mui;

// APP
const InfoBox = require('app/components/shared/info-box');
const {AuthActions} = require('app/actions');

const SessionEndedDialog = class extends React.Component {

	constructor(props) {
		super(props);
		this._onClose = this._onClose.bind(this);
	}

	render() {
		const {
			...other
		} = this.props;

		const loginActions = [
			<FlatButton
				key="sessionEndedActionClose"
				label="Go to homepage"
				title="Go to homepage"
				href="#"
				secondary
				onClick={this._onClose}
				/>
		];

		return (
			<Dialog modal title="Session Timeout" actions={loginActions} {...other} ref="sessionEndedDialog" onShow={this.cleanFields} >
				<InfoBox boxType={InfoBox.ERROR}>Your session has been ended.</InfoBox>
			</Dialog>
			);
	}

	show() {
		this.refs.sessionEndedDialog.show();
	}

	_onClose(e) {
		e.preventDefault();
		AuthActions.redirectDisconnected(this.context.router);
		this.refs.sessionEndedDialog.dismiss();
	}

};

SessionEndedDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.func
};

module.exports = SessionEndedDialog;
