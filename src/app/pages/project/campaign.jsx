var React = require('react');

var mui = require('material-ui');
var { Spacing } = mui.Styles;

var { APKSelectionDialog,
      APKTestSelectionDialog,
      DeviceSelectionDialog } = require('../../components/');

var { Test } = require('../../stores/');

var {
  FlatButton,
  Paper,
  TextField,
  Tabs,
  Tab,
  CircularProgress,
  FontIcon } = mui;

var projectId;

var CAMPAIGN_NOT_STARTED = "CAMPAIGN_NOT_STARTED";
    CAMPAIGN_STARTED     = "CAMPAIGN_STARTED";
    CAMPAIGN_ERROR       = "CAMPAIGN_ERROR";
    CAMPAIGN_SUCCESS     = "CAMPAIGN_SUCCESS";

var ProjectCampaign = class extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      res: '',
      device: null,
      apk: null,
      apkTest: null,
      campaign: CAMPAIGN_NOT_STARTED,
      errorMessage: ''
    };

    this._onDeviceSelectClick = this._onDeviceSelectClick.bind(this);
    this._onAPKSelectClick = this._onAPKSelectClick.bind(this);
    this._onAPKTestSelectClick = this._onAPKTestSelectClick.bind(this);
    this._onLauchCampaignSubmit = this._onLauchCampaignSubmit.bind(this);
    this._onLauchAnotherCampaignSubmit = this._onLauchAnotherCampaignSubmit.bind(this);
    this._onDeviceSelect = this._onDeviceSelect.bind(this);
    this._onAPKSelect = this._onAPKSelect.bind(this);
    this._onAPKTestSelect = this._onAPKTestSelect.bind(this);
    this.getLauchFieldsDisable = this.getLauchFieldsDisable.bind(this);

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
          <Tab label="APK Test" >
            <Paper style={style.paperCenter}>
              {this.state.apkTest ? (
              <div>
                <TextField floatingLabelText="APK Test Name" value={this.state.apkTest.name} disabled={true} /><br />
                <TextField floatingLabelText="APK Test ID" value={this.state.apkTest.id} disabled={true} /><br />
              </div>
              ) : null }
              <FlatButton
                label="Select an APK Test"
                onTouchTap={this._onAPKTestSelectClick}
                linkButton={true}
                primary={true} />
            </Paper>
          </Tab>
          <Tab label="Launch" >
            <Paper style={style.paperCenter}>

              {this.state.campaign == CAMPAIGN_NOT_STARTED ? (
                <div>
                  <FlatButton
                    label="Launch campaign"
                    onTouchTap={this._onLauchCampaignSubmit}
                    linkButton={true}
                    primary={true}
                    disabled={this.getLauchFieldsDisable()} />
                  <br />
                  <TextField ref="instanceName" floatingLabelText="Device Name" value={this.state.device ? this.state.device.name : ''} disabled={this.getLauchFieldsDisable()}  /><br />
                  <TextField ref="instanceId" floatingLabelText="Device ID" value={this.state.device ? this.state.device.id : ''} disabled={this.getLauchFieldsDisable()} /><br />
                  <TextField ref="APKId" floatingLabelText="APK ID" value={this.state.apk ? this.state.apk.id : ''} disabled={this.getLauchFieldsDisable()} /><br />
                  <TextField ref="TestId" floatingLabelText="APK Test ID" value={this.state.apkTest ? this.state.apkTest.id : ''} disabled={this.getLauchFieldsDisable()} /><br />
                  <TextField ref="ProjectId" floatingLabelText="Project ID" value={projectId ? projectId: ''} disabled={this.getLauchFieldsDisable()} /><br />
                </div>
              ) : null }
              {this.state.campaign == CAMPAIGN_STARTED ? (
                <div>
                  <p>Executing Campaign</p>
                  <small>(This process can take several minutes)</small>
                  <br />
                  <CircularProgress mode="indeterminate" />
                </div>
              ) : null }
              {(this.state.campaign == CAMPAIGN_SUCCESS ||
                this.state.campaign == CAMPAIGN_ERROR) ? (
                <div>
                  <br />
                  {this.state.campaign == CAMPAIGN_SUCCESS ? (
                      <div style={{fontSize:'36px', color: 'green'}}>
                        <FontIcon className="mdi mdi-check" style={{fontSize:'36px'}} />
                        <span>Campaign successfully run</span>
                      </div>
                    ) : null }
                  {this.state.campaign == CAMPAIGN_ERROR ? (
                      <div style={{fontSize:'36px', color: 'red'}}>
                        <FontIcon className="mdi mdi-close" style={{fontSize:'36px'}} />
                        <span>Error: {this.state.errorMessage}</span>
                      </div>
                  ) : null }
                  <br />
                  <br />

                  <Paper style={{padding:'10px 20px 20px 20px'}}>
                  <h2>Results</h2>
                  <p>{this.state.res}</p>
                  </Paper>
                  <br />
                  <FlatButton
                      label="Start another campaign"
                      onTouchTap={this._onLauchAnotherCampaignSubmit}
                      linkButton={true}
                      primary={true} />

                </div>
              ) : null }


            </Paper>
          </Tab>
        </Tabs>

        <DeviceSelectionDialog projectId={projectId} onSelect={this._onDeviceSelect} ref="deviceDialog" />
        <APKSelectionDialog projectId={projectId} onSelect={this._onAPKSelect} ref="APKDialog" />
        <APKTestSelectionDialog projectId={projectId} onSelect={this._onAPKTestSelect} ref="APKTestDialog" />

      </div>
    );
  }

  _onDeviceSelectClick() {
    this.refs.deviceDialog.show();
  }

  _onAPKSelectClick() {
    this.refs.APKDialog.show();
  }

  _onAPKTestSelectClick() {
    this.refs.APKTestDialog.show();
  }

  _onDeviceSelect(selectedDevice) {
    this.setState({ device: selectedDevice });
  }

  _onAPKSelect(selectedAPK) {
    this.setState({ apk: selectedAPK });
  }

  _onAPKTestSelect(selectedAPK) {
    this.setState({ apkTest: selectedAPK });
  }

  _onLauchCampaignSubmit(){
    this.setState({campaign: CAMPAIGN_STARTED});
    var instanceName = this.refs.instanceName.getValue();
    var instanceId = this.refs.instanceId.getValue();
    var APKId = this.refs.APKId.getValue();
    var TestId = this.refs.TestId.getValue();
    var ProjectId = this.refs.ProjectId.getValue();
    Test.create(ProjectId, instanceId, instanceName, APKId, TestId, (res) => {
      if(res.error){
        this.setState({res: res.results, campaign: CAMPAIGN_ERROR, errorMessage: res.errorMessage });
      }else{
        this.setState({res: res.results, campaign: CAMPAIGN_SUCCESS});
      }
    });
  }

  _onLauchAnotherCampaignSubmit(){
    this.setState({campaign: CAMPAIGN_NOT_STARTED});
  }

  getLauchFieldsDisable(){
    return this.state.campaign == CAMPAIGN_STARTED;
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
