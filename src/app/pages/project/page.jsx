var React = require('react');

var Router = require('react-router');
var { RouteHandler, State } = Router;

var mui = require('material-ui');
var { Menu } = mui;
var { Spacing, Colors } = mui.Styles;

var menuItems = [
     { path: 'apks', text: 'APK List' },
     { path: 'settings', text: 'Settings'},
     { path: 'live', text: 'Live Mode'}
  ];

var ProjectPage = React.createClass({

  mixins: [ State ],

  _onItemTap(e, index, menuItem) {
    var { projectId } = this.context.router.getCurrentParams();
    this.context.router.transitionTo(menuItem.path, {projectId: projectId } );
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
        width: subNavWidth
      },
      content: {
        boxSizing: 'border-box',
        padding: Spacing.desktopGutter + 'px',
        maxWidth: (Spacing.desktopKeylineIncrement * 14) + 'px',
        marginLeft: subNavWidth,
        borderLeft: 'solid 1px ' + Colors.grey300,
        minHeight: '90vh'
      }
    };

    return styles;
  },

  render: function() {
    var styles = this.getStyles();
    // var { projectId } = this.context.router.getCurrentParams();
    return (
      <div style={styles.root}>
        <Menu
          style={styles.menu}
          ref="menuItems"
          zDepth={0}
          menuItems={menuItems}
          onItemTap={this._onItemTap}
          selectedIndex={this._getSelectedIndex()} />

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
