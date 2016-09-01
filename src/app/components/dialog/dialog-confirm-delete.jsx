'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PanelInfo from 'app/components/panel/panel-info';

const DialogConfirmDelete = props => {
	const actionsButtons = [
		<FlatButton
			key="confirmDeleteDialogActionConfirm"
			label="Confirm"
			title="Confirm"
			secondary
			onClick={props.onConfirm}
			/>,
		<FlatButton
			key="confirmDeleteDialogActionCancel"
			label="Cancel"
			title="Cancel"
			secondary
			onClick={props.onCancel}
			/>
	];
	return (
		<Dialog modal title="Confirm deletion" actions={actionsButtons} {...props}>
			<PanelInfo status={PanelInfo.WARNING} showIcon zDepth={0} size={PanelInfo.BIGGER}>Are you sure to delete{props.deleteItemName}?</PanelInfo>
		</Dialog>
		);
};

DialogConfirmDelete.defaultProps = {
	open: true,
	deleteItemName: '',
	onRequestClose: () => {},
	onCancel: () => {},
	onConfirm: () => {}
};

DialogConfirmDelete.propTypes = {
	open: React.PropTypes.bool.isRequired,
	deleteItemName: React.PropTypes.node,
	onRequestClose: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired,
	onConfirm: React.PropTypes.func.isRequired
};

module.exports = DialogConfirmDelete;
