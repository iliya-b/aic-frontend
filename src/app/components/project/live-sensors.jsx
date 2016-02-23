'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing } = mui.Styles;
var {
  FlatButton,
  Paper,
  TextField,
  Slider} = mui;

// APP
var TogglableIcon = require('app/components/shared/togglable-icon.jsx');
var { LiveStore } = require('app/stores');
var { LiveActions } = require('app/actions');

var LiveSensors = class extends React.Component{

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this._onBatteryChange = this._onBatteryChange.bind(this);
    this._onRotationChange = this._onRotationChange.bind(this);
    this._onLocationSubmit = this._onLocationSubmit.bind(this);
    this._onRecordStart = this._onRecordStart.bind(this);
    this._onRecordStop = this._onRecordStop.bind(this);
    this._onScreenshot = this._onScreenshot.bind(this);
    this.state = {};
  }

  render() {
    var style = {
      sensors: {
        padding: Spacing.desktopGutter/2,
        marginTop: '20px',
      },
      sensorIcon: {
        fontSize: '64px',
        padding: (Spacing.desktopGutter/2)+'px',
      },
      sensorBox: {
        width: '687px',
        padding: '10px',
        boxSizing: 'border-box',
        position: 'absolute',
        display: 'inline-block',
      },
      sensorIconRotationHorizontal: {
        fontSize: '64px',
        padding: (Spacing.desktopGutter/2)+'px',
        transform: 'rotate(-45deg)',
      },
      sensorIconRotationVertical: {
        fontSize: '64px',
        padding: (Spacing.desktopGutter/2)+'px',
        transform: 'rotate(45deg)',
      },
      sensorIconRotation: {},
    };

    style.sensorIconRotation = !this.state.live ? style.sensorIcon :
                                this.state.live.screen.rotation === 'horizontal' ? style.sensorIconRotationHorizontal :
                                this.state.live.screen.rotation === 'vertical' ? style.sensorIconRotationVertical :
                                style.sensorIcon;

    return  this.state.live ? (
            <Paper style={style.sensors}>

              <TogglableIcon style={style.sensorIcon} isOn={true} iconName="battery-charging-60" />
              <div style={style.sensorBox}>
                <Slider name='battery' max={100} min={0} step={1} value={this.state.live.battery} onChange={this._onBatteryChange} />
              </div> <br />
              <TogglableIcon style={style.sensorIconRotation} isOn={true} iconName="screen-rotation" onClick={this._onRotationChange} />
              <span>{this.state.live ? this.state.live.screen.rotation : ''}</span>
              <br />
              <TogglableIcon style={style.sensorIcon} isOn={true} iconName="map-marker"  />
              <TextField ref="lat" floatingLabelText="latitude" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur} />
              <TextField ref="lon" floatingLabelText="longitude" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur} />
              <FlatButton
                label="Submit"
                title="Submit"
                href='#'
                primary={true}
                onClick={this._onLocationSubmit} />
              <br />
              {false ? (
              <div>
              <TogglableIcon style={style.sensorIcon} isOn={true} iconName="file-video"  />
              <FlatButton
                label="Start recording"
                title="Start recording"
                href='#'
                primary={true}
                disabled={this.state.live.recording}
                onClick={this._onRecordStart} />
              <FlatButton
                label="Stop recording"
                title="Stop recording"
                href='#'
                primary={true}
                disabled={!this.state.live.recording}
                onClick={this._onRecordStop} />
              <br />
              <TogglableIcon style={style.sensorIcon} isOn={true} iconName="file-image"  />
              <FlatButton
                label="Take screen shot"
                title="Take screen shot"
                href='#'
                primary={true}
                disabled={this.state.live.recording}
                onClick={this._onScreenshot} />
              </div> ) : null }

            </Paper>
            ) : null ;
  }

  _onBatteryChange(e, value) {
    e.preventDefault();
    var intValue = parseInt(value);
    LiveActions.setSensorBattery(this.props.avmId, value);
  }

  _onRotationChange(e) {
    e.preventDefault();
    var newRotationName = this.state.live.rotationSets[this.state.live.screen.rotation].next;
    var newRotationValue = this.state.live.rotationSets[newRotationName];
    LiveActions.setSensorAccelerometer(this.state.projectId, newRotationValue.x, newRotationValue.y, newRotationValue.z, newRotationName );

    setTimeout(function(){
      LiveActions.setDelayedRotation();
    }, 1500);

    // setTimeout(function(){
    //   // console.log(Live.getRotation() );
    //   if(this.state.live.screen.rotation === 'horizontal'){
    //     // console.log('h');
    //     $('#novnciframe').css('width','800px').css('height','600px');
    //   }else if(this.state.live.screen.rotation === 'vertical'){
    //     // console.log('v');
    //     $('#novnciframe').css('width','600px').css('height','800px');
    //   }
    // }, 1500);
  }

  _onLocationSubmit(e) {
    e.preventDefault();
    var lat = this.refs.lat.getValue();
    var lon = this.refs.lon.getValue();
    LiveActions.setSensorLocation(this.state.projectId, lat, lon);
  }

  _onRecordStart(e) {
    e.preventDefault();
    LiveActions.recordStart(this.state.projectId);
  }

  _onRecordStop(e) {
    e.preventDefault();
    LiveActions.recordStop(this.state.projectId, this.state.live.recordingFileName );
  }

  _onScreenshot(e) {
    e.preventDefault();
    LiveActions.screenshot(this.state.projectId);
  }

  _onStateChange( state ){
    this.setState( state );
  }

  componentDidMount() {
    this.unsubscribe = LiveStore.listen( this._onStateChange );
    LiveActions.loadState();
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

LiveSensors.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = LiveSensors;