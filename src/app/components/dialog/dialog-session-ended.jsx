'use strict';

// Vendor
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
const debug = require('debug')('AiC:Components:Dialog:SessionEndedDialog');

// APP
import InfoBox from 'app/components/shared/info-box';
import AuthActions from 'app/actions/auth';

const SessionEndedDialog = class extends React.Component {

	constructor(props) {
		super(props);
		this.handleClose = e => {
			e.preventDefault();
			this.props.onRequestClose();
			debug('handleClose', this.context.router, this.props.location);
			AuthActions.redirectDisconnected(this.context.router, this.props.location);
		};
	}

	render() {
		const {
			onRequestClose, // eslint-disable-line no-unused-vars
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
				<InfoBox boxType={InfoBox.WARNING} showIcon zDepth={0} styleType={InfoBox.STYLE_XBIG}>Your session has been ended.</InfoBox>
			</Dialog>
			);
	}

};

SessionEndedDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

SessionEndedDialog.propTypes = {
	open: React.PropTypes.bool.isRequired,
	location: React.PropTypes.object.isRequired,
	onRequestClose: React.PropTypes.func.isRequired
};

module.exports = SessionEndedDialog;
