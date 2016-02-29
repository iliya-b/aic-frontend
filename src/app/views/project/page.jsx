const React = require('react');

const Router = require('react-router');
const {
	RouteHandler,
	State
} = Router;

const mui = require('material-ui');
// const { Menu } = mui;
const Menu = require('material-ui/lib/menus/menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const {
	Spacing,
	Colors
} = mui.Styles;

const menuItems = [
	{path: 'apks', text: 'APK List'},
	{path: 'apks-test', text: 'APK Test List'},
	// { path: 'settings', text: 'Settings'},
	{path: 'live', text: 'Live Mode'},
	{path: 'campaign', text: 'Campaign'}
];

const ProjectPage = React.createClass({

	mixins: [State],

	propTypes: {
		params: React.PropTypes.object,
		query: React.PropTypes.object
	},

	// _onItemTap(index, e) { //, index, menuItem
	// _onItemTap(e, index, menuItem) {
	_onItemTap(e, index) {
		// debug(arguments);
		const {projectId} = this.context.router.getCurrentParams();
		this.context.router.transitionTo(menuItems[index].path, {projectId});
	},

	_onItemClick(index, e) {
		// debug(arguments);
		e.preventDefault();
		const {projectId} = this.context.router.getCurrentParams();
		this.context.router.transitionTo(menuItems[index].path, {projectId});
	},

	_getSelectedIndex() {
		let currentItem;
		for (let i = menuItems.length - 1; i >= 0; i--) {
			currentItem = menuItems[i];
			if (currentItem.path && this.context.router.isActive(currentItem.path, this.props.params, this.props.query)) {
				return i;
			}
		}
	},

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
	},

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

				<RouteHandler />
				</div>

			</div>
		);
	}
});

ProjectPage.contextTypes = {
	router: React.PropTypes.func,
	muiTheme: React.PropTypes.object
};

// ProjectPage.propTypes = {
// 	params: React.PropTypes.string,
// 	query: React.PropTypes.string
// };

module.exports = ProjectPage;
