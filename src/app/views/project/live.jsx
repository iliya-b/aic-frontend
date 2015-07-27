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

var projectId = null;

var ProjectLive = React.createClass({

  mixins: [StylePropable, StyleResizable],

  getInitialState: function() {
    return {
      rotation: 'horizontal',
      recording: false,
      recordingFileName: '',
    };
  },

  _onBatteryChange(e, value) {
    var intValue = parseInt(value);
    Live.setBattery(projectId, intValue, function (res) {
      console.log(res);
    });
  },

  _onRotationChange() {
    Live.flipRotation( projectId, res => {
      console.log(res);
      this.setState({rotation: Live.getRotation()});
      setTimeout(function(){
        // console.log(Live.getRotation() );
        if(Live.getRotation() == 'horizontal'){
          // console.log('h');
          $('#novnciframe').css('width','800px').css('height','600px');
        }else if(Live.getRotation() == 'vertical'){
          // console.log('v');
          $('#novnciframe').css('width','600px').css('height','800px');
        }
      }, 1500);
    });
  },

  _onLocationSubmit(){
    var lat = this.refs.lat.getValue();
    var lon = this.refs.lon.getValue();
    Live.setLocation( projectId, lat, lon, res => {
      console.log(res);
    });
  },

  _onRecordStart(){
    this.setState({recording: true});
    Live.recordingStart( projectId, res => {
      this.setState({recordingFileName: res.filename});
      console.log(res);
    });
  },

  _onRecordStop(){
    this.setState({recording: false});
    Live.recordingStop( projectId, this.state.recordingFileName, res => {
      console.log(res);
    });
  },

  _onScreenshot(){
    Live.screenshot( projectId, res => {
      console.log(res);
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
      iframe: {
        overflow: 'hidden'
      },
      iframeHorizontal: {
        width: '800px',
        height: '600px'
      },
      iframeVertical: {
        width: '600px',
        height: '800px'
      }
    };
    style.sensorIconRotation = this.state.rotation == 'horizontal' ? this.mergeStyles(style.sensorIcon, style.sensorIconRotationHorizontal) :
                               this.state.rotation == 'vertical' ? this.mergeStyles(style.sensorIcon, style.sensorIconRotationVertical) :
                               style.sensorIcon;
    // style.iframeRotation = this.state.rotation == 'horizontal' ? this.mergeStyles(style.iframe, style.iframeHorizontal) :
    //                        this.state.rotation == 'vertical' ? this.mergeStyles(style.iframe, style.iframeVertical) :
    //                        style.iframe;
    style.iframeRotation = this.mergeStyles(style.iframe, style.iframeHorizontal) ;
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
// <br />
//                   <TogglableIcon style={style.sensorIcon} isOn={true} iconName="map-marker"  />
//                   <TextField ref="lat" floatingLabelText="latitude" />
//                   <TextField ref="lon" floatingLabelText="longitude" />
//                   <FlatButton
//                     label="Submit"
//                     primary={true}
//                     onTouchTap={this._onLocationSubmit} />
    return (
      <div>
        <h2>Live</h2>


          <Tabs initialSelectedIndex={1}>
            <Tab label="Live"  >
              <Paper style={style.paperLive}>
                <div>
                  <iframe id="novnciframe" style={style.iframeRotation} src="/vnc_auto_goby.html?host=10.2.1.106&port=5909" frameBorder="0" scrolling="no">Browser not compatible.</iframe>
                </div>

                <Paper style={style.sensors}>
                  <TogglableIcon style={style.sensorIcon} isOn={true} iconName="battery-charging-60" />
                  <div style={style.sensorBox}>
                    <Slider max={100} min={0} step={1} value={100} onChange={this._onBatteryChange} />
                  </div> <br />
                  <TogglableIcon style={style.sensorIconRotation} isOn={true} iconName="screen-rotation" onClick={this._onRotationChange} />
                  <span>{this.state.rotation}</span>
                  <br />
                  <TogglableIcon style={style.sensorIcon} isOn={true} iconName="map-marker"  />
                  <TextField ref="lat" floatingLabelText="latitude" />
                  <TextField ref="lon" floatingLabelText="longitude" />
                  <FlatButton
                    label="Submit"
                    primary={true}
                    onTouchTap={this._onLocationSubmit} />
                  <br />
                  <TogglableIcon style={style.sensorIcon} isOn={true} iconName="file-video"  />
                  <FlatButton
                    label="Start recording"
                    primary={true}
                    disabled={this.state.recording}
                    onTouchTap={this._onRecordStart} />
                  <FlatButton
                    label="Stop recording"
                    primary={true}
                    disabled={!this.state.recording}
                    onTouchTap={this._onRecordStop} />
                  <br />
                  <TogglableIcon style={style.sensorIcon} isOn={true} iconName="file-image"  />
                  <FlatButton
                    label="Take screen shot"
                    primary={true}
                    disabled={this.state.recording}
                    onTouchTap={this._onScreenshot} />
                </Paper>

              </Paper>
            </Tab>

          </Tabs>

      </div>
    );
  },

  componentDidMount() {
    projectId = this.getProjectId();
    if (projectId !== null) {
    } else {
      // something really wrong happened
      // TODO: treat error
    }
  },

  getProjectId() {
    var routerParams = this.context.router.getCurrentParams();
    if (routerParams.hasOwnProperty('projectId')) {
      return routerParams.projectId;
    } else {
      return null;
    }
  },

});

ProjectLive.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectLive;
