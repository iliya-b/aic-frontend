'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PanelInfo from 'app/components/panel/panel-info';

const debug = require('debug')('AiC:Components:Dialog:SessionEndedDialog');

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
				<PanelInfo status={PanelInfo.WARNING} showIcon zDepth={0} size={PanelInfo.BIGGER}>Your session has been ended.</PanelInfo>
			</Dialog>
			);
	}

};

SessionEndedDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

SessionEndedDialog.defaultProps = {
	open: true,
	onRequestClose: () => {}
};

SessionEndedDialog.propTypes = {
	open: React.PropTypes.bool.isRequired,
	onRequestClose: React.PropTypes.func.isRequired
};

module.exports = SessionEndedDialog;
