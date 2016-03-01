const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const mui = require('material-ui');
const {Paper} = mui;
const {Transitions} = mui.Styles;
const {KeyLine, Dom, CssEvent} = mui.Utils;

const ObjectListItem = require('./object-list-item');

const ObjectList = React.createClass({

	contextTypes: {
		muiTheme: React.PropTypes.object
	},

	propTypes: {
		autoWidth: React.PropTypes.bool,
		onItemTap: React.PropTypes.func,
		onItemClick: React.PropTypes.func,
		onToggle: React.PropTypes.func,
		onCheck: React.PropTypes.func,
		objectListItems: React.PropTypes.array.isRequired,
		selectedIndex: React.PropTypes.number,
		hideable: React.PropTypes.bool,
		visible: React.PropTypes.bool,
		zDepth: React.PropTypes.number,
		objectListItemStyle: React.PropTypes.object,
		objectListItemStyleSubheader: React.PropTypes.object,
		objectListItemStyleLink: React.PropTypes.object,
		objectListItemClassName: React.PropTypes.string,
		objectListItemClassNameSubheader: React.PropTypes.string,
		objectListItemClassNameLink: React.PropTypes.string,
		style: React.PropTypes.object,
		onItemToggle: React.PropTypes.func,
		onItemCheck: React.PropTypes.func
	},

	getInitialState() {
		return {nestedMenuShown: false};
	},

	getDefaultProps() {
		return {
			autoWidth: true,
			hideable: false,
			visible: true,
			zDepth: 1
		};
	},

	componentDidMount() {
		const el = React.findDOMNode(this);

		// Set the menu width
		this._setKeyWidth(el);

		// Save the initial menu height for later
		this._initialMenuHeight = el.offsetHeight;

		// Show or Hide the menu according to visibility
		this._renderVisibility();
	},

	componentDidUpdate(prevProps) {
		if (this.props.visible !== prevProps.visible) {
			this._renderVisibility();
		}
	},

	getTheme() {
		return this.context.muiTheme.component.menu;
	},

	getSpacing() {
		return this.context.muiTheme.spacing;
	},

	getStyles() {
		const styles = {
			root: {
				backgroundColor: this.getTheme().containerBackgroundColor,
				paddingTop: this.getSpacing().desktopGutterMini,
				paddingBottom: this.getSpacing().desktopGutterMini,
				transition: Transitions.easeOut(null, 'height')
			},
			subheader: {
				paddingLeft: this.context.muiTheme.component.menuSubheader.padding,
				paddingRight: this.context.muiTheme.component.menuSubheader.padding
			},
			hideable: {
				opacity: (this.props.visible) ? 1 : 0,
				overflow: 'hidden',
				position: 'absolute',
				top: 0,
				zIndex: 1
			},
			item: {}
		};
		return styles;
	},

	render() {
		const styles = this.getStyles();
		return (
			<Paper
				ref="paperContainer"
				zDepth={this.props.zDepth}
				style={Object.assign(
					styles.root,
					this.props.hideable && styles.hideable,
					this.props.style)}
				>
				<ReactCSSTransitionGroup transitionName="showHideTransition">
				{this._getChildren()}
				</ReactCSSTransitionGroup>
			</Paper>
		);
	},

	_getChildren() {
		const children = [];
		let objectListItem;
		let itemComponent;
		let isSelected;
		let isDisabled;

		const styles = this.getStyles();

		// This array is used to keep track of all nested menu refs
		this._nestedChildren = [];

		for (let i = 0; i < this.props.objectListItems.length; i++) {
			objectListItem = this.props.objectListItems[i];
			isSelected = i === this.props.selectedIndex;
			isDisabled = (objectListItem.disabled === undefined) ? false : objectListItem.disabled;

			const {
				icon,
				data,
				attribute,
				number,
				toggle,
				check,
				onClick,
				key,
				title,
				...other
			} = objectListItem;

			switch (objectListItem.type) {
				default:
					itemComponent = (
						<ObjectListItem
							{...other}
							selected={isSelected}
							key={key ? key : i}
							index={i}
							icon={icon}
							data={data}
							className={this.props.objectListItemClassName}
							style={Object.assign(styles.item, this.props.objectListItemStyle)}
							attribute={attribute}
							number={number}
							toggle={toggle}
							check={check}
							title={title}
							onToggle={this.props.onToggle}
							onCheck={this.props.onCheck}
							disabled={isDisabled}
							onClick={this._onItemClick}
							onClickItemProp={onClick}
							onTouchTap={this._onItemTap}
							>
							{objectListItem.text}
						</ObjectListItem>
					);
			}
			children.push(itemComponent);
		}

		return children;
	},

	_setKeyWidth(el) {
		const menuWidth = this.props.autoWidth ?
			`${(KeyLine.getIncrementalDim(el.offsetWidth) - this.getTheme().padding)}px` :
			'100%';

		// Update the menu width
		Dom.withoutTransition(el, () => {
			el.style.width = menuWidth;
		});
	},

	_renderVisibility() {
		let el;

		if (this.props.hideable) {
			el = React.findDOMNode(this);
			const container = React.findDOMNode(this.refs.paperContainer);

			if (this.props.visible) {
				// Open the menu
				el.style.transition = Transitions.easeOut();
				el.style.height = `${this._initialMenuHeight}px`;

				// Set the overflow to visible after the animation is done so
				// that other nested menus can be shown
				CssEvent.onTransitionEnd(el, () => {
					// Make sure the menu is open before setting the overflow.
					// This is to accout for fast clicks
					if (this.props.visible) {
						container.style.overflow = 'visible';
					}
				});
			} else {
				// Close the menu
				el.style.height = '0px';

				// Set the overflow to hidden so that animation works properly
				container.style.overflow = 'hidden';
			}
		}
	},

	_onNestedItemClick(e, index, objectListItem) {
		if (this.props.onItemClick) {
			this.props.onItemClick(e, index, objectListItem);
		}
	},

	_onNestedItemTap(e, index, objectListItem) {
		if (this.props.onItemTap) {
			this.props.onItemTap(e, index, objectListItem);
		}
	},

	_onItemClick(e, index) {
		if (this.props.onItemClick) {
			this.props.onItemClick(e, index, this.props.objectListItems[index]);
		}
	},

	_onItemTap(e, index) {
		if (this.props.onItemTap) {
			this.props.onItemTap(e, index, this.props.objectListItems[index]);
		}
	},

	_onItemToggle(e, index, toggled) {
		if (this.props.onItemToggle) {
			this.props.onItemToggle(e, index, this.props.objectListItems[index], toggled);
		}
	},

	_onItemCheck(e, index, checked) {
		if (this.props.onItemCheck) {
			this.props.onItemCheck(e, index, this.props.objectListItems[index], checked);
		}
	}

});

module.exports = ObjectList;
