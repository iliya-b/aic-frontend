'use strict';

// Vendors
import React from 'react';
import Spacing from 'material-ui/lib/styles/spacing';
import * as Colors from 'material-ui/lib/styles/colors';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const menuItems = [
	{path: '', text: 'APK Manager'},
	{path: 'live', text: 'Live Mode'},
	{path: 'campaign', text: 'Campaign'}
];

const ProjectPage = class extends React.Component {

	_onItemClick(index, e) {
		// debug(arguments);
		e.preventDefault();
		const {projectId} = this.props.params;
		this.context.router.push(`/projects/${projectId}/${menuItems[index].path}`);
	}

	_getSelectedIndex() {
		let currentItem;
		for (let i = menuItems.length - 1; i >= 0; i--) {
			currentItem = menuItems[i];
			if (currentItem.path && this.context.router.isActive({pathname: currentItem.path})) {
				return i;
			}
		}
	}

	// 192px - 224 / 24+8

	getStyles() {
		// const subNavWidth = Spacing.desktopKeylineIncrement * 3 ;
		const subNavWidth = 56 * 3;
		const styles = {
			root: {
				position: 'relative'
			},
			menu: {
				position: 'absolute',
				top: '0px',
				left: '0px',
				width: subNavWidth
			},
			content: {
				boxSizing: 'border-box',
				padding: `${Spacing.desktopGutter}px`,
				maxWidth: `${(Spacing.desktopKeylineIncrement * 14)}px`,
				marginLeft: subNavWidth,
				borderLeft: `solid 1px ${Colors.grey300}`,
				minHeight: '90vh'
			},
			menuItemSelected: {
				color: this.context.muiTheme.palette.accent1Color
			}
		};

		return styles;
	}

	render() {
		const styles = this.getStyles();
		const menusItems = menuItems.map(function (item, index) {
			return (<MenuItem
				key={index}
				primaryText={item.text}
				path={item.path}
				onClick={this._onItemClick.bind(this, index)}
				title={item.text}
				href="#"
				style={this._getSelectedIndex() === index ? styles.menuItemSelected : null}
				/>);
		}, this);
		// const menusItems = menuItems.map(function (item, index) {
		//   return <MenuItem key={index} primaryText={item.text} path={item.path} onTouchTap={this._onItemTap.bind(this, index)} style={this._getSelectedIndex() == index ? styles.menuItemSelected : null } />
		// }, this);
		// const menusItems = menuItems.map(function (item, index) {
		//   return <ObjectListItem key={index} index={index} text="ka" />
		// }, this);
		// debug(menusItems);
				// <div style={styles.menu} >
				// {menusItems}
				// </div>
				// <ObjectList style={styles.menu} objectListItems={menuItems} />
		return (
			<div style={styles.root}>
				<div style={{width: 100}}>
					<Menu style={styles.menu} zDepth={0}>
						{menusItems}
					</Menu>
				</div>

				<div style={styles.content}>
					{this.props.children}
				</div>

			</div>
		);
	}
};

ProjectPage.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

ProjectPage.propTypes = {
	children: React.PropTypes.node,
	params: React.PropTypes.object
};

module.exports = ProjectPage;
