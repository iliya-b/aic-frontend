'use strict';

// Vendors
import React from 'react';
import Spacing from 'material-ui/styles/spacing';
import * as Colors from 'material-ui/styles/colors';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const debug = require('debug')('AiC:Views:Project:Page');

const menuItems = [
	{path: '', text: 'Project Details'},
	{path: 'apks', text: 'APK Manager'},
	{path: 'camera', text: 'Camera Assets'},
	{path: 'tests', text: 'Test Manager'},
	{path: 'live', text: 'Live Mode'},
	{path: 'campaign', text: 'Test Campaigns'}
];

let projectId;

const ProjectPage = class extends React.Component {

	constructor(props) {
		super(props);
		projectId = this.props.params.projectId;
	}

	composePath(partialPath) {
		return `/projects/${projectId}/${partialPath}`;
	}

	handleItemClick = e => {
		debug('handleItemClick', e.currentTarget.dataset);
		e.preventDefault();
		const index = parseInt(e.currentTarget.dataset.keyIndex, 10);
		this.context.router.push(this.composePath(menuItems[index].path));
	}

	_getSelectedIndex() {
		for (let i = menuItems.length - 1; i >= 0; i--) {
			const currentItem = menuItems[i];
			const composedPath = this.composePath(currentItem.path);
			debug('composedPath', composedPath);
			if (this.context.router.isActive({pathname: composedPath})) {
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
				// maxWidth: `${(Spacing.desktopKeylineIncrement * 14)}px`,
				marginLeft: subNavWidth,
				borderLeft: `solid 1px ${Colors.grey300}`,
				minHeight: '90vh'
			},
			menuItemSelected: {
				// color: this.context.muiTheme.palette.accent1Color
				backgroundColor: 'rgba(0, 0, 0, 0.0980392)',
				fontWeight: 500
			}
		};

		return styles;
	}

	render() {
		const styles = this.getStyles();
		const selectedPageIndex = this._getSelectedIndex();
		debug('selectedPageIndex', selectedPageIndex);
		const menusItems = menuItems.map(function (item, index) {
			return (<MenuItem
				key={index}
				data-key-index={index}
				primaryText={item.text}
				onClick={this.handleItemClick}
				title={item.text}
				style={selectedPageIndex === index ? styles.menuItemSelected : null}
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
					<Menu style={styles.menu}>
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
