var React = require('react');

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var List = require('../../../components/list/list.jsx');

var { Menu, Toolbar, ToolbarGroup, IconButton } = mui;

  apks = [
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
        width: '512px',
        textAlign: 'right'
      },
      toolbargroup: {
        paddingRight: '6px',
        float: 'none'
      },
      list: {
        width: '500px'
      }
    };
    return (
      <div>
        <h2>APK List</h2>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup style={style.toolbargroup}>
            <IconButton iconClassName="fa fa-trash" tooltip="Delete selected"/>
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
