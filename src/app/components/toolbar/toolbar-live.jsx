'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import str from 'string';

// APP
import VariantIcon from 'app/components/icon/variant-icon';
import DroidPercentage from 'app/components/icon/droid-percentage';
import LabeledSpan from 'app/components/form/labeled-span';

const ToolbarLive = class extends React.Component {

	handleClickStart(variantID) {
		this.props.onClickStart(variantID);
	}

	// getChildContext() {
	// 	return this.context;
	// }

	render() {
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

		const vmCountPerc = parseInt(this.props.vmCount / this.props.vmMaxAllowed * 100, 10);
		const canUserCreateVm = this.props.vmCount < this.props.vmMaxAllowed;

		const buttons = [];
		if (this.props.variants.length) {
			this.props.variants.forEach((v, i) => {
				const handleClickStartVariant = this.handleClickStart.bind(this, v.id);
				buttons.push(
					<IconButton
						className={`btStart${str(v.label).camelize().s}`}
						key={i}
						tooltip={canUserCreateVm ? `Start ${v.label}` : 'Quota limit reached. Please, delete any open session to create a new one.'}
						style={styles.button}
						onClick={handleClickStartVariant}
						// disabled={!canUserCreateVm}
						>
						<VariantIcon variant={v}/>
					</IconButton>
				);
			});
		}

		return (
			<div>
				<Toolbar style={Object.assign(this.props.style || {}, styles.toolbar)}>
					<FontIcon style={styles.icon} className="mdi mdi-android" color="rgba(0, 0, 0, 0.4)"/>
					<ToolbarGroup firstChild lastChild>
						<ToolbarTitle className="txtLiveTitle" text="Live sessions" style={styles.title}/>
						<ToolbarSeparator style={styles.separator}/>
						{buttons}
					</ToolbarGroup>
				</Toolbar>
				<Paper style={styles.paper}>
					<DroidPercentage value={vmCountPerc}/>
					<LabeledSpan value={`${vmCountPerc}%`} label="Quota usage"/>
					<LabeledSpan value={this.props.vmCount} label="Open sessions"/>
					<LabeledSpan value={this.props.vmMaxAllowed} label="Max sessions"/>
				</Paper>
			</div>
		);
	}
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
