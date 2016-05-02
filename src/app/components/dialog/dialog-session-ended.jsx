'use strict';

// Vendor
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
const debug = require('debug')('AiC:Components:Dialog:SessionEndedDialog');

// APP
import InfoBox from 'app/components/shared/info-box';

const SessionEndedDialog = class extends React.Component {

	constructor(props) {
		super(props);
		this.handleClose = e => {
			debug('handleClose');
			e.preventDefault();
			this.props.onRequestClose();
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
	onRequestClose: React.PropTypes.func.isRequired
};

module.exports = SessionEndedDialog;
