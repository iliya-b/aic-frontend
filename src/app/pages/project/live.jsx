var React = require('react');

var mui = require('material-ui');
var { Spacing } = mui.Styles;
var { StylePropable, StyleResizable } = mui.Mixins;

var { TogglableIcon, List } = require('../../components/');

var {
  FlatButton,
  IconButton,
  FontIcon,
  Paper,
  Tabs,
  Tab,
  TextField,
  Toolbar,
  ToolbarGroup,
  Slider} = mui;

var apks = [
     { apkId: 'apk1', text: 'APK1', checkbox:true },
     { apkId: 'apk2', text: 'APK2', checkbox:true },
     { apkId: 'apk3', text: 'APK3', checkbox:true }
  ];

var { Live } = require('../../stores/');

var ProjectLive = React.createClass({

  mixins: [StylePropable, StyleResizable],

  getInitialState: function() {
    return {
      rotation: 'horizontal'
    };
  },

  _onBatteryChange(e, value) {
    var intValue = parseInt(value);
    Live.setBattery(intValue, function (res) {
      console.log(res);
    });
  },

  _onRotationChange() {
    Live.flipRotation( res => {
      console.log(res);
      this.setState({rotation: Live.getRotation()});
    });
  },

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
        // marginLeft: '423px'
        marginTop: '20px'
      },
      sensorIcon: {
        fontSize: '64px',
        padding: (Spacing.desktopGutter/2)+'px'
      },
      sensorBox: {
        width: '687px',
        padding: '10px',
        boxSizing: 'border-box',
        position: 'absolute',
        display: 'inline-block'
      },
      sensorIconRotationHorizontal: {
        transform: 'rotate(-45deg)'
      },
      sensorIconRotationVertical: {
        transform: 'rotate(45deg)'
      },
    };
    style.sensorIconRotation = this.state.rotation == 'horizontal' ? this.mergeStyles(style.sensorIcon, style.sensorIconRotationHorizontal) :
                               this.state.rotation == 'vertical' ? this.mergeStyles(style.sensorIcon, style.sensorIconRotationVertical) :
                               style.sensorIcon;
     // <FontIcon style={style.device} className="mdi mdi-cellphone-android" />
     // <Paper style={style.sensors}>
     //              <TogglableIcon style={style.sensorIcon} isOn={true} iconName="map-marker" />
     //              <TogglableIcon style={style.sensorIcon} iconName="video" />
     //              <TogglableIcon style={style.sensorIcon} iconName="airplane"  />
     //              <TogglableIcon style={style.sensorIcon} isOn={true} iconName="microphone"  />
     //            </Paper>
    var sensorPanel = <Paper style={style.sensors}>
                  <TogglableIcon style={style.sensorIcon} isOn={true} iconName="battery-charging-60" />
                  <div style={style.sensorBox}>
                    <Slider max={100} min={0} step={1} value={100} onChange={this._onBatteryChange} />
                  </div>
                </Paper> ;
            //     <Tab label="Create" >
            //   <Paper style={style.paperCenter}>
            //     <TextField ref="liveName" floatingLabelText="Test Name" /><br />
            //     <FlatButton
            //         style={style.button}
            //         label="Save"
            //         linkButton={true}
            //         primary={true} />

            //   </Paper>
            // </Tab>
            // <Tab label="APK List" >
            //   <Paper style={style.paper}>
            //     <Toolbar style={style.toolbar}>
            //       <ToolbarGroup style={style.toolbargroup1}>
            //         <IconButton iconClassName="mdi mdi-cloud-upload" tooltip="Upload APK file"/>
            //       </ToolbarGroup>
            //       <ToolbarGroup style={style.toolbargroup2}>
            //         <IconButton iconClassName="mdi mdi-delete" tooltip="Delete selected"/>
            //       </ToolbarGroup>
            //     </Toolbar>
            //     <List style={style.list} listItems={apks} onItemTap={this._onItemTap} />
            //   </Paper>
            // </Tab>
    return (
      <div>
        <h2>Live</h2>


          <Tabs>
            <Tab label="Live Battery"  >
              <Paper style={style.paperLive}>
                <div>
                  <iframe style={style.iframe} src="http://localhost:3000/vnc_auto_goby.html?host=10.2.1.106&port=5909" width="800" height="600" frameBorder="0" scrolling="no">Browser not compatible.</iframe>
                </div>
                {sensorPanel}
              </Paper>
            </Tab>
            <Tab label="Live Sensors"  >
              <Paper style={style.paperLive}>
                <div>
                  <iframe style={style.iframe} src="http://localhost:3000/vnc_auto_goby.html?host=10.2.1.106&port=5901" width="800" height="600" frameBorder="0" scrolling="no">Browser not compatible.</iframe>
                </div>
                <Paper style={style.sensors}>
                  <TogglableIcon style={style.sensorIconRotation} isOn={true} iconName="screen-rotation" onClick={this._onRotationChange} />
                  {this.state.rotation}
                  <TogglableIcon style={style.sensorIcon} isOn={true} iconName="map-marker"  />
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
