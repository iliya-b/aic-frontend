'use strict';

// Vendor
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// APP
import InfoBox from 'app/components/shared/info-box';

const DialogConfirmDelete = props => {
	const actionsButtons = [
		<FlatButton
			key="confirmDeleteDialogActionConfirm"
			label="Confirm"
			title="Confirm"
			href="#"
			secondary
			onClick={props.onConfirm}
			/>,
		<FlatButton
			key="confirmDeleteDialogActionCancel"
			label="Cancel"
			title="Cancel"
			href="#"
			secondary
			onClick={props.onCancel}
			/>
	];
	return (
		<Dialog modal title="Confirm deletion" actions={actionsButtons} {...props}>
			<InfoBox boxType={InfoBox.WARNING} showIcon zDepth={0} styleType={InfoBox.STYLE_XBIG}>Are you sure to delete{props.deleteItemName}?</InfoBox>
		</Dialog>
		);
};

DialogConfirmDelete.propTypes = {
	open: React.PropTypes.bool.isRequired,
	deleteItemName: React.PropTypes.node,
	onRequestClose: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired,
	onConfirm: React.PropTypes.func.isRequired
};

module.exports = DialogConfirmDelete;
