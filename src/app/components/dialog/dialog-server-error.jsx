'use strict';

// Vendor
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

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
			<InfoBox boxType={InfoBox.SERVERERROR} showIcon zDepth={0} styleType={InfoBox.STYLE_XBIG}>Something went wrong with the API server. Please contact service administration.</InfoBox>
		</Dialog>
		);
};

DialogServerError.propTypes = {
	open: React.PropTypes.bool.isRequired,
	onRequestClose: React.PropTypes.func.isRequired
};

module.exports = DialogServerError;
