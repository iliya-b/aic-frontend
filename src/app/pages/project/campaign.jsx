var React = require('react');

var mui = require('material-ui');
var { Spacing } = mui.Styles;

var { APKSelectionDialog,
      DeviceSelectionDialog } = require('../../components/');

var { Test, APK } = require('../../stores/');

var {
  FlatButton,
  Paper,
  TextField,
  Tabs,
  Tab } = mui;

var projectId;

var ProjectCampaign = class extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      res: '',
      device: null,
      apk: null,
    };

    this._onDeviceSelectClick = this._onDeviceSelectClick.bind(this);
    this._onAPKSelectClick = this._onAPKSelectClick.bind(this);
    this._onLauchCampaignSubmit = this._onLauchCampaignSubmit.bind(this);
    this._onDeviceSelect = this._onDeviceSelect.bind(this);
    this._onAPKSelect = this._onAPKSelect.bind(this);
    // this._onAPKTestSelect = this._onAPKTestSelect.bind(this);
  }

  render() {
    var style = {
      paperCenter: {
        textAlign: 'center',
        padding: Spacing.desktopGutter
      },
    };

    return (
      <div>
        <h2>Campaign</h2>

        <Tabs>
          <Tab label="Device" >
            <Paper style={style.paperCenter}>
              {this.state.device ? (
              <div>
                <TextField floatingLabelText="Device Name" value={this.state.device.name} disabled={true} /><br />
                <TextField floatingLabelText="Device ID" value={this.state.device.id} disabled={true} /><br />
              </div>
              ) : null }
              <FlatButton
                label="Select a device"
                onTouchTap={this._onDeviceSelectClick}
                linkButton={true}
                primary={true} />
            </Paper>
          </Tab>
          <Tab label="APK" >
            <Paper style={style.paperCenter}>
              {this.state.apk ? (
              <div>
                <TextField floatingLabelText="APK Name" value={this.state.apk.name} disabled={true} /><br />
                <TextField floatingLabelText="APK ID" value={this.state.apk.id} disabled={true} /><br />
              </div>
              ) : null }
              <FlatButton
                label="Select an APK"
                onTouchTap={this._onAPKSelectClick}
                linkButton={true}
                primary={true} />
            </Paper>
          </Tab>
          <Tab label="Launch" >
            <Paper style={style.paperCenter}>
              <FlatButton
                label="Launch campaign"
                onTouchTap={this._onLauchCampaignSubmit}
                linkButton={true}
                primary={true} />
                <br />
                <TextField ref="instanceName" floatingLabelText="Device Name" value={this.state.device ? this.state.device.name : ''}  /><br />
                <TextField ref="instanceId" floatingLabelText="Device ID" value={this.state.device ? this.state.device.id : ''} /><br />
                <TextField ref="APKId" floatingLabelText="APK ID" value={this.state.apk ? this.state.apk.id : ''} /><br />
                <TextField ref="ProjectId" floatingLabelText="Project ID" value={projectId ? projectId: ''} /><br />
                <p>{this.state.res}</p>
            </Paper>
          </Tab>
        </Tabs>

        <DeviceSelectionDialog projectId={projectId} onSelect={this._onDeviceSelect} ref="deviceDialog" />
        <APKSelectionDialog projectId={projectId} onSelect={this._onAPKSelect} ref="APKDialog" />

      </div>
    );
  }

  _onDeviceSelectClick() {
    this.refs.deviceDialog.show();
  }

  _onAPKSelectClick() {
    this.refs.APKDialog.show();
  }

  _onDeviceSelect(selectedDevice) {
    this.setState({ device: selectedDevice });
  }

  _onAPKSelect(selectedAPK) {
    this.setState({ apk: selectedAPK });
  }

  _onLauchCampaignSubmit(){
    var instanceName = this.refs.instanceName.getValue();
    var instanceId = this.refs.instanceId.getValue();
    var APKId = this.refs.APKId.getValue();
    var ProjectId = this.refs.ProjectId.getValue();
    Test.create(ProjectId, instanceId, instanceName, APKId, (res) => {
      this.setState({res: res});
    });
  }

  componentWillMount() {
    projectId = this.getProjectId();
    if (projectId !== null) {
    } else {
      // something really wrong happened
      // TODO: treat error
    }
  }

  getProjectId() {
    var routerParams = this.context.router.getCurrentParams();
    if (routerParams.hasOwnProperty('projectId')) {
      return routerParams.projectId;
    } else {
      return null;
    }
  }

};

ProjectCampaign.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectCampaign;
