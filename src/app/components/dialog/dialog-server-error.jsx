'use strict';

// Vendor
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// APP
import InfoBox from 'app/components/shared/info-box';

const DialogServerError = props => {
	const actionsButtons = [
		<FlatButton
			key="serverErrorDialogActionClose"
			label="Close"
			title="Close"
			href="#"
			secondary
			onClick={props.onRequestClose}
			/>
	];

	return (
		<Dialog modal title="Server Error" actions={actionsButtons} {...props}>
			<InfoBox boxType={InfoBox.SERVERERROR} showIcon zDepth={0} styleType={InfoBox.STYLE_XBIG}>{props.message}</InfoBox>
		</Dialog>
		);
};

DialogServerError.propTypes = {
	open: React.PropTypes.bool.isRequired,
	onRequestClose: React.PropTypes.func.isRequired,
	message: React.PropTypes.string
};

DialogServerError.defaultProps = {
	message: 'Something went wrong. Please contact service administration.'
};

module.exports = DialogServerError;
