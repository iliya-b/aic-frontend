var React = require('react');

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var { List } = require('../../components/');

var { Menu, Toolbar, ToolbarGroup, IconButton } = mui;

var apks = [
     { apkId: 'apk1', text: 'APK1', checkbox:true },
     { apkId: 'apk2', text: 'APK2', checkbox:true },
     { apkId: 'apk3', text: 'APK3', checkbox:true }
  ];

var ProjectApkList = React.createClass({

  _onItemTap(e, index, menuItem) {

  },

  render: function() {
    var style = {
      toolbar: {
        // width: '512px',
      },
      toolbargroup1: {
        paddingTop: '3px',
        float: 'left'
      },
      toolbargroup2: {
        paddingRight: '6px',
        float: 'right'
      },
      list: {
        // width: '500px'
      }
    };
    return (
      <div>
        <h2>APK List</h2>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup style={style.toolbargroup1}>
            <IconButton iconClassName="mdi mdi-cloud-upload" tooltip="Upload APK file"/>
          </ToolbarGroup>
          <ToolbarGroup style={style.toolbargroup2}>
            <IconButton iconClassName="mdi mdi-delete" tooltip="Delete selected"/>
          </ToolbarGroup>
        </Toolbar>
        <List style={style.list} listItems={apks} onItemTap={this._onItemTap} />
      </div>
    );
  },

});

ProjectApkList.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectApkList;
