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
		this.handleClose = this.handleClose.bind(this);
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
				onClick={this.handleClose}
				/>
		];

		return (
			<Dialog modal title="Session Timeout" actions={loginActions} {...other}>
				<InfoBox boxType={InfoBox.ERROR}>Your session has been ended.</InfoBox>
			</Dialog>
			);
	}

	handleClose(e) {
		e.preventDefault();
		this.props.onRequestClose();
		AuthActions.redirectDisconnected(this.context.router);
	}

};

SessionEndedDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

SessionEndedDialog.propTypes = {
	open: React.PropTypes.bool.isRequired,
	onRequestClose: React.PropTypes.func.isRequired
};

module.exports = SessionEndedDialog;
