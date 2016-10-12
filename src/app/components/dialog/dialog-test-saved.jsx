'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PanelInfo from 'app/components/panel/panel-info';

const DialogTestSaved = props => {
	const {
		open,
		onRequestClose,
		message,
		...others
	} = props;
	const actionsButtons = [
		<FlatButton
			key="testSavedDialogActionClose"
			label="Close"
			title="Close"
			secondary
			onClick={onRequestClose}
			/>
	];

	return (
		<Dialog open={open} modal title="Test saved" actions={actionsButtons} {...others}>
			<PanelInfo status={PanelInfo.FIRE} showIcon zDepth={0} size={PanelInfo.BIGGER}>{message}</PanelInfo>
		</Dialog>
		);
};

DialogTestSaved.defaultProps = {
	open: true,
	onRequestClose: () => {},
	message: 'Your file was succesfuly saved on server'
};

DialogTestSaved.propTypes = {
	open: React.PropTypes.bool,
	onRequestClose: React.PropTypes.func,
	message: React.PropTypes.string
};

module.exports = DialogTestSaved;
