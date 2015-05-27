var React = require('react');

var mui = require('material-ui');
var { Paper } = mui;
var { StylePropable } = mui.Mixins;
var { Transitions } = mui.Styles;
var { KeyLine, Dom } = mui.Utils;

var ListItem = require('./list-item.jsx');

/****************
* List Component
****************/
var List = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    onCheck: React.PropTypes.func,
    listItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    hideable: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    zDepth: React.PropTypes.number,
    listItemStyle: React.PropTypes.object,
    listItemStyleSubheader: React.PropTypes.object,
    listItemStyleLink: React.PropTypes.object,
    listItemClassName: React.PropTypes.string,
    listItemClassNameSubheader: React.PropTypes.string,
    listItemClassNameLink: React.PropTypes.string,
  },

  getInitialState: function() {
    return { nestedMenuShown: false }
  },

  getDefaultProps: function() {
    return {
      autoWidth: true,
      hideable: false,
      visible: true,
      zDepth: 1,
    };
  },

  componentDidMount: function() {
    var el = React.findDOMNode(this);

    //Set the menu width
    this._setKeyWidth(el);

    //Save the initial menu height for later
    this._initialMenuHeight = el.offsetHeight;

    //Show or Hide the menu according to visibility
    this._renderVisibility();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) this._renderVisibility();
  },

  getTheme: function() {
    return this.context.muiTheme.component.menu
  },

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function() {
    var styles = {
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
      }
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();
    return (
      <Paper
        ref="paperContainer"
        zDepth={this.props.zDepth}
        style={this.mergeAndPrefix(
          styles.root,
          this.props.hideable && styles.hideable,
          this.props.style)}>
        {this._getChildren()}
      </Paper>
    );
  },

  _getChildren: function() {
    var children = [],
      listItem,
      itemComponent,
      isSelected,
      isDisabled;

    var styles = this.getStyles();

    //This array is used to keep track of all nested menu refs
    this._nestedChildren = [];

    for (var i=0; i < this.props.listItems.length; i++) {
      listItem = this.props.listItems[i];
      isSelected = i === this.props.selectedIndex;
      isDisabled = (listItem.disabled === undefined) ? false : listItem.disabled;

      var {
        icon,
        data,
        attribute,
        number,
        toggle,
        check,
        onClick,
        ...other
      } = listItem;

      switch (listItem.type) {

        case ListItem.Types.LINK:
          itemComponent = (
            <LinkListItem
              key={i}
              index={i}
              text={listItem.text}
              disabled={isDisabled}
              className={this.props.listItemClassNameLink}
              style={this.props.listItemStyleLink}
              payload={listItem.payload}
              target={listItem.target}/>
          );
          break;

        default:
          itemComponent = (
            <ListItem
              {...other}
              selected={isSelected}
              key={i}
              index={i}
              icon={listItem.icon}
              data={listItem.data}
              className={this.props.listItemClassName}
              style={this.props.listItemStyle}
              attribute={listItem.attribute}
              number={listItem.number}
              toggle={listItem.toggle}
              check={listItem.check}
              onToggle={this.props.onToggle}
              onCheck={this.props.onCheck}
              disabled={isDisabled}
              onClick={this._onItemClick}
              onTouchTap={this._onItemTap}>
              {listItem.text}
            </ListItem>
          );
      }
      children.push(itemComponent);
    }

    return children;
  },

  _setKeyWidth: function(el) {
    var menuWidth = this.props.autoWidth ?
      (KeyLine.getIncrementalDim(el.offsetWidth) -  this.getTheme().padding) + 'px' :
      '100%';

    //Update the menu width
    Dom.withoutTransition(el, function() {
      el.style.width = menuWidth;
    });
  },

  _renderVisibility: function() {
    var el;

    if (this.props.hideable) {
      el = React.findDOMNode(this);
      var container = React.findDOMNode(this.refs.paperContainer);

      if (this.props.visible) {
        //Open the menu
        el.style.transition = Transitions.easeOut();
        el.style.height = this._initialMenuHeight + 'px';

        //Set the overflow to visible after the animation is done so
        //that other nested menus can be shown
        CssEvent.onTransitionEnd(el, function() {
          //Make sure the menu is open before setting the overflow.
          //This is to accout for fast clicks
          if (this.props.visible) container.style.overflow = 'visible';
        }.bind(this));

      } else {

        //Close the menu
        el.style.height = '0px';

        //Set the overflow to hidden so that animation works properly
        container.style.overflow = 'hidden';
      }
    }
  },

  _onNestedItemClick: function(e, index, listItem) {
    if (this.props.onItemClick) this.props.onItemClick(e, index, listItem);
  },

  _onNestedItemTap: function(e, index, listItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, listItem);
  },

  _onItemClick: function(e, index) {
    if (this.props.onItemClick) this.props.onItemClick(e, index, this.props.listItems[index]);
  },

  _onItemTap: function(e, index) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.listItems[index]);
  },

  _onItemToggle: function(e, index, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.listItems[index], toggled);
  },

  _onItemCheck: function(e, index, checked) {
    if (this.props.onItemCheck) this.props.onItemCheck(e, index, this.props.listItems[index], checked);
  }

});

module.exports = List;