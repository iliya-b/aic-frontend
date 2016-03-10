'use strict';

// Vendor
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

// APP
import InfoBox from 'app/components/shared/info-box';

const DialogServerError = props => {
	const loginActions = [
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
		<Dialog modal title="Server Error" actions={loginActions} {...props}>
			<InfoBox boxType={InfoBox.SERVERERROR} showIcon zDepth={0} styleType={InfoBox.STYLE_XBIG}>Something went wrong with the API server. Please contact service administration.</InfoBox>
		</Dialog>
		);
};

// const DialogServerError = class extends React.Component {

// 	render() {
// 		const loginActions = [
// 			<FlatButton
// 				key="serverErrorDialogActionClose"
// 				label="Close"
// 				title="Close"
// 				href="#"
// 				secondary
// 				onClick={this.props.onRequestClose}
// 				/>
// 		];

// 		return (
// 			<Dialog modal title="Server Error" actions={loginActions} {...this.props}>
// 				<InfoBox boxType={InfoBox.SERVERERROR}>Something went wrong with the API server. Please contact service administration.</InfoBox>
// 			</Dialog>
// 			);
// 	}
// };

// DialogServerError.contextTypes = {
// 	muiTheme: React.PropTypes.object,
// 	router: React.PropTypes.object
// };

DialogServerError.propTypes = {
	open: React.PropTypes.bool.isRequired,
	onRequestClose: React.PropTypes.func.isRequired
};

module.exports = DialogServerError;
