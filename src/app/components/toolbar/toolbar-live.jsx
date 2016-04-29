'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import str from 'string';

// APP
import * as icons from 'app/components/icon/phone-list';

const ToolbarLive = class extends React.Component {

	handleClickStart(variantID) {
		this.props.onClickStart(variantID);
	}

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
			}
		};

		const buttons = [];
		if (this.props.variants.length) {
			this.props.variants.forEach((v, i) => {
				const handleClickStartVariant = this.handleClickStart.bind(this, v.id);
				const icon = icons[v.name] ? icons[v.name]({
					color: 'rgba(0, 0, 0, 0.4)',
					hoverColor: 'rgba(0, 0, 0, 0.87)'
				}) : <FontIcon className="mdi mdi-help" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>;
				buttons.push(
					// <img key={i}  style={{height: 30}} src={`/images/android-${v.name}.png`}/>
					<IconButton className={`btStart${str(v.name).camelize().s}`} key={i} tooltip={`Start ${v.name}`} style={styles.button} onClick={handleClickStartVariant}>
						{icon}
					</IconButton>
				);
			});
		}

		return (
			<Toolbar style={Object.assign(this.props.style || {}, styles.toolbar)}>
				<FontIcon style={styles.icon} className="mdi mdi-android" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarGroup firstChild lastChild>
					<ToolbarTitle className="txtLiveTitle" text="Live sessions" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{buttons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarLive.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarLive.propTypes = {
	style: React.PropTypes.object,
	onClickStart: React.PropTypes.func,
	variants: React.PropTypes.array.isRequired
};

module.exports = ToolbarLive;
