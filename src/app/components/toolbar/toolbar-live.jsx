'use strict';

import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import iconList from 'app/components/icon/icon-list';

const ToolbarLive = props => {
	// handleClickStart(variantID) {
	// 	props.onClickStart(variantID);
	// }

	// getChildContext() {
	// 	return context;
	// }

	// render() {
	const styles = {
		toolbar: {
			justifyContent: 'initial'
		},
		button: {
			marginTop: 5
		},
		separator: {
			margin: '0 5px 0 0px'
		},
		icon: {
			cursor: 'default',
			margin: '16px 36px 0px -6px',
			width: 24
		},
		image: {
			background: 'white',
			border: 'white 1px solid',
			borderRadius: 16,
			height: 30,
			borderRightWidth: 6,
			borderLeftWidth: 6
		},
		paper: {
			padding: '10px 10px 0 10px',
			zIndex: -100,
			position: 'relative'
		}
	};

	// const vmCountPerc = parseInt(props.vmCount / props.vmMaxAllowed * 100, 10);
	const canUserCreateVm = props.vmCount < props.vmMaxAllowed;

	// const buttons = [];
	// if (props.variants.length) {
	// 	props.variants.forEach((v, i) => {
	// 		const handleClickStartVariant = handleClickStart.bind( v.id);
	// 		buttons.push(
	// 			<IconButton
	// 				className={`btStart${str(v.label).camelize().s}`}
	// 				key={i}
	// 				tooltip={canUserCreateVm ? `Start ${v.label}` : 'Quota limit reached. Please, delete any open session to create a new one.'}
	// 				style={styles.button}
	// 				onClick={handleClickStartVariant}
	// 				disabled={!canUserCreateVm}
	// 				>
	// 				<VariantIcon variant={v}/>
	// 			</IconButton>
	// 		);
	// 	});
	// }
	//
	const styleBt = {
		marginTop: 5
	};

	const buttons = [
		{
			id: 'start',
			tooltip: 'Start session',
			fontIcon: 'mdi mdi-play',
			disabled: !canUserCreateVm
		}
	];

	const renderedButtons = iconList({
		buttons,
		style: styleBt,
		onClick: {
			start: props.onClickStart
		},
		iconClassNamePrefix: 'btLive',
		selectedId: null
	});

	return (
		<Toolbar style={Object.assign(props.style || {}, styles.toolbar)}>
			<FontIcon style={styles.icon} className="mdi mdi-android" color="rgba(0, 0, 0, 0.4)"/>
			<ToolbarGroup firstChild lastChild>
				<ToolbarTitle className="txtLiveTitle" text="Live sessions" style={styles.title}/>
				<ToolbarSeparator style={styles.separator}/>
				{renderedButtons}
			</ToolbarGroup>
		</Toolbar>
	);
};

ToolbarLive.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

// ToolbarLive.childContextTypes = {
// 	muiTheme: React.PropTypes.object,
// 	router: React.PropTypes.object
// };

ToolbarLive.propTypes = {
	style: React.PropTypes.object,
	onClickStart: React.PropTypes.func,
	variants: React.PropTypes.array.isRequired,
	vmCount: React.PropTypes.number.isRequired,
	vmMaxAllowed: React.PropTypes.number.isRequired
};

module.exports = ToolbarLive;
