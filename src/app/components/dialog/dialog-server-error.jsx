'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PanelInfo from 'app/components/panel/panel-info';

const DialogServerError = props => {
	const {
		open,
		onRequestClose,
		message,
		...others
	} = props;
	const actionsButtons = [
		<FlatButton
			key="serverErrorDialogActionClose"
			label="Close"
			title="Close"
			secondary
			onClick={onRequestClose}
			/>
	];

	return (
		<Dialog open={open} modal title="Server Error" actions={actionsButtons} {...others}>
			<PanelInfo status={PanelInfo.FIRE} showIcon zDepth={0} size={PanelInfo.BIGGER}>{message}</PanelInfo>
		</Dialog>
		);
};

DialogServerError.defaultProps = {
	open: true,
	onRequestClose: () => {},
	message: 'Something went wrong. Please contact service administration.'
};

DialogServerError.propTypes = {
	open: React.PropTypes.bool,
	onRequestClose: React.PropTypes.func,
	message: React.PropTypes.string
};

module.exports = DialogServerError;
