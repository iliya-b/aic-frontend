var React = require('react');

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var {
  Dialog,
  FlatButton,
  IconButton,
  Paper,
  Tabs,
  Tab,
  TextField,
  Toolbar,
  ToolbarGroup} = mui;

var List = require('../../components/list/list.jsx');

  apks = [
     { apkId: 'apk1', text: 'APK1', checkbox:true },
     { apkId: 'apk2', text: 'APK2', checkbox:true },
     { apkId: 'apk3', text: 'APK3', checkbox:true }
  ];

var ProjectLive = React.createClass({

  render: function() {
    var style = {
      paperCenter: {
        textAlign: 'center',
        padding: '20px'
      },
      paper: {
        padding: '20px'
      },
      toolbargroup1: {
        paddingTop: '3px',
        float: 'left'
      },
      toolbargroup2: {
        paddingRight: '6px',
        float: 'right'
      },
    };
    return (
      <div>
        <h2>Live</h2>


          <Tabs>
            <Tab label="Create" >
              <Paper style={style.paperCenter}>
                <TextField ref="liveName" hintText="Test Name" /><br />
                <FlatButton
                    label="Save"
                    linkButton={true}
                    primary={true} />

              </Paper>
            </Tab>
            <Tab label="APK List" >
              <Paper style={style.paper}>
                <Toolbar style={style.toolbar}>
                  <ToolbarGroup style={style.toolbargroup1}>
                    <IconButton iconClassName="mdi mdi-cloud-upload" tooltip="Upload APK file"/>
                  </ToolbarGroup>
                  <ToolbarGroup style={style.toolbargroup2}>
                    <IconButton iconClassName="mdi mdi-delete" tooltip="Delete selected"/>
                  </ToolbarGroup>
                </Toolbar>
                <List style={style.list} listItems={apks} onItemTap={this._onItemTap} />
              </Paper>
            </Tab>
            <Tab label="Live" >
              <Paper style={style.paper}>
                <h2>Live</h2>

              </Paper>
            </Tab>
          </Tabs>

      </div>
    );
  },

});

ProjectLive.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectLive;
