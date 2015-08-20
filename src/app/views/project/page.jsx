var React = require('react');

var Router = require('react-router');
var { RouteHandler, State } = Router;

var mui = require('material-ui');
// var { Menu } = mui;
var Menu = require('material-ui/lib/menus/menu.js');
var MenuItem = require('material-ui/lib/menus/menu-item.js');
var { Spacing, Colors } = mui.Styles;
var ObjectListItem = require('goby/components/shared/object-list/object-list-item.jsx');
var ObjectList = require('goby/components/shared/object-list/object-list.jsx');

var menuItems = [
     { path: 'apks', text: 'APK List' },
     { path: 'apks-test', text: 'APK Test List' },
     //{ path: 'settings', text: 'Settings'},
     { path: 'live', text: 'Live Mode'},
     { path: 'campaign', text: 'Campaign'}
  ];

var ProjectPage = React.createClass({

  mixins: [ State ],

  // _onItemTap(index, e) { //, index, menuItem
  _onItemTap(e, index, menuItem) {
    var { projectId } = this.context.router.getCurrentParams();
    this.context.router.transitionTo(menuItems[index].path, {projectId: projectId } );
  },

  _getSelectedIndex() {
    var currentItem;
    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.path && this.context.router.isActive(currentItem.path, this.props.params, this.props.query)) {
        return i;
      }
    }
  },

  getStyles: function(){
    var subNavWidth = Spacing.desktopKeylineIncrement * 3 + 'px';
    var styles = {
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
        padding: Spacing.desktopGutter + 'px',
        maxWidth: (Spacing.desktopKeylineIncrement * 14) + 'px',
        marginLeft: subNavWidth,
        borderLeft: 'solid 1px ' + Colors.grey300,
        minHeight: '90vh'
      },
      menuItemSelected: {
        color: this.context.muiTheme.palette.accent1Color
      }
    };

    return styles;
  },

  render: function() {
    var styles = this.getStyles();
    // var menusItems = menuItems.map(function (item, index) {
    //   return <MenuItem key={index} primaryText={item.text} path={item.path} onTouchTap={this._onItemTap.bind(this, index)} style={this._getSelectedIndex() == index ? styles.menuItemSelected : null } />
    // }, this);
    // var menusItems = menuItems.map(function (item, index) {
    //   return <ObjectListItem key={index} index={index} text="ka" />
    // }, this);
    // console.log(menusItems);
        // <div style={styles.menu} >
        // {menusItems}
        // </div>
        // <ObjectList style={styles.menu} objectListItems={menuItems} />
    return (
      <div style={styles.root}>

        <ObjectList style={styles.menu} objectListItems={menuItems} zDepth={0} selectedIndex={this._getSelectedIndex()} onItemTap={this._onItemTap} />

        <div style={styles.content}>

        <RouteHandler />
        </div>

      </div>
    );
  },

});

ProjectPage.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectPage;
