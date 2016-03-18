'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import slug from 'slug';

// APP
const icons = {
	kitkat: require('app/components/icons/kitkat'),
	kitkatPhone: require('app/components/icons/kitkat-phone'),
	lollipop: require('app/components/icons/lollipop')
};

const ToolbarAPK = class extends React.Component {

	handleClickStart(variantID) {
		this.props.onClickStart(variantID);
	}

	render() {
		const styles = {
			button: {
				marginTop: 5,
				float: 'left'
			},
			separator: {
				margin: '0 5px 0 0px'
			},
			icon: {
				marginRight: 10,
				cursor: 'default',
				color: 'rgba(0, 0, 0, 0.4)'
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
				const icon = icons[v.name]({
					color: 'rgba(0, 0, 0, 0.4)',
					hoverColor: 'rgba(0, 0, 0, 0.87)'
				});
				buttons.push(
					// <img key={i}  style={{height: 30}} src={`/images/android-${v.name}.png`}/>
					<IconButton className={`btStart${slug(v.name)}`} key={i} tooltip={`Start ${v.name}`} style={styles.button} onClick={handleClickStartVariant}>
						{icon}
					</IconButton>
				);
			});
		}

		return (
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<FontIcon style={styles.icon} className="mdi mdi-android" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>
					<ToolbarTitle text="Live sessions" style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{buttons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarAPK.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarAPK.propTypes = {
	style: React.PropTypes.object,
	onClickStart: React.PropTypes.func,
	variants: React.PropTypes.array
};

module.exports = ToolbarAPK;
