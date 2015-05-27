var React = require('react');

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var TogglableIcon = require('../../components/togglable-icon.jsx');

var {
  Dialog,
  FlatButton,
  IconButton,
  FontIcon,
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
        padding: Spacing.desktopGutter
      },
      paper: {
        padding: Spacing.desktopGutter
      },
      paperLive: {
        padding: Spacing.desktopGutter,
        minHeight: (600 + Spacing.desktopGutter*2) + 'px'
      },
      toolbargroup1: {
        paddingTop: '3px',
        float: 'left'
      },
      toolbargroup2: {
        paddingRight: '6px',
        float: 'right'
      },
      device: {
        position: 'absolute',
        fontSize: '600px',
        // color: this.context.muiTheme.palette.primary1Color,
        color: this.context.muiTheme.palette.disabledColor,
        margin: '0 -100px'
      },
      button: {
        paddingTop: Spacing.desktopGutter
      },
      sensors: {
        padding: Spacing.desktopGutter/2,
        marginLeft: '423px'
      },
      sensorIcon: {
        fontSize: '64px',
        padding: (Spacing.desktopGutter/2)+'px'
      }
    };
    return (
      <div>
        <h2>Live</h2>


          <Tabs initialSelectedIndex={2}>
            <Tab label="Create" >
              <Paper style={style.paperCenter}>
                <TextField ref="liveName" floatingLabelText="Test Name" /><br />
                <FlatButton
                    style={style.button}
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
            <Tab label="Live"  >
              <Paper style={style.paperLive}>
                <FontIcon style={style.device} className="mdi mdi-cellphone-android" />
                <Paper style={style.sensors}>
                  <TogglableIcon style={style.sensorIcon} isOn={true} iconName="map-marker" />
                  <TogglableIcon style={style.sensorIcon} iconName="video" />
                  <TogglableIcon style={style.sensorIcon} iconName="airplane"  />
                  <TogglableIcon style={style.sensorIcon} isOn={true} iconName="microphone"  />
                </Paper>
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
