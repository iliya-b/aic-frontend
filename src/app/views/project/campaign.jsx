var React = require('react');

var mui = require('material-ui');
var { Spacing } = mui.Styles;

var { APKSelectionDialog,
      APKTestSelectionDialog,
      DeviceSelectionDialog,
      ObjectList } = require('../../components/');

var { Test } = require('../../stores/');

var {
  FlatButton,
  Paper,
  TextField,
  Tabs,
  Tab,
  CircularProgress,
  FontIcon,
  RaisedButton } = mui;

var projectId;

var CAMPAIGN_NOT_STARTED = "CAMPAIGN_NOT_STARTED";
var CAMPAIGN_STARTED     = "CAMPAIGN_STARTED";
var CAMPAIGN_ERROR       = "CAMPAIGN_ERROR";
var CAMPAIGN_SUCCESS     = "CAMPAIGN_SUCCESS";

var ProjectCampaign = class extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      res: '',
      device: null,
      apk: [],
      apkTest: [],
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
    // this.getLauchFieldsDisable = this.getLauchFieldsDisable.bind(this);

  }

  render() {
    var style = {
      paperCenter: {
        textAlign: 'center',
        padding: Spacing.desktopGutter
      },
    };

    var results = (this.state.res && this.state.res.length > 0) ? this.state.res.map(function (item) {
      return <li>{item}</li>;
    }) : null;

    var apksRendered = this.state.apk ? this.state.apk.map(function (item, index) {
      return <div key={index}>
                <TextField floatingLabelText="APK Name" value={item.name} disabled={true} /><br />
                <TextField floatingLabelText="APK ID" value={item.id} disabled={true} /><br />
              </div>
    }) : null;

    var apksTestRendered = this.state.apkTest ? this.state.apkTest.map(function (item, index) {
      return <div key={index}>
                <TextField floatingLabelText="APK Test Name" value={item.name} disabled={true} /><br />
                <TextField floatingLabelText="APK Test ID" value={item.id} disabled={true} /><br />
              </div>
    }) : null;

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
              {apksRendered}
              <FlatButton
                label="Select an APK"
                onTouchTap={this._onAPKSelectClick}
                linkButton={true}
                primary={true} />
            </Paper>
          </Tab>
          <Tab label="APK Test" >
            <Paper style={style.paperCenter}>
              {apksTestRendered}
              <FlatButton
                label="Select an APK Test"
                onTouchTap={this._onAPKTestSelectClick}
                linkButton={true}
                primary={true} />
            </Paper>
          </Tab>
          <Tab label="Launch" >
            <Paper style={style.paperCenter}>

              {this.state.campaign === CAMPAIGN_NOT_STARTED ? (
                <div>

                  {this.state.campaign !== CAMPAIGN_STARTED ?
                    <FlatButton
                    label="Launch campaign"
                    onClick={this._onLauchCampaignSubmit}
                    linkButton={true}
                    primary={true} /> : null }
                  <br />
                  <TextField ref="instanceName" floatingLabelText="Device Name" value={this.state.device ? this.state.device.name : ''} disabled={true}  /><br />
                  <TextField ref="instanceId" floatingLabelText="Device ID" value={this.state.device ? this.state.device.id : ''} disabled={true} /><br />
                  {apksRendered}
                  {apksTestRendered}
                  <TextField ref="ProjectId" floatingLabelText="Project ID" value={projectId ? projectId: ''} disabled={true} /><br />
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
                        <FontIcon className="mdi mdi-close" style={{fontSize:'36px', color: 'red'}} />
                        <span>Error: {this.state.errorMessage}</span>
                      </div>
                  ) : null }
                  <br />
                  <br />

                  <Paper style={{padding:'10px 20px 20px 20px'}}>
                    <h2>Results</h2>
                    <ul style={{textAlign: 'left', listStyle: 'none'}}>{results}</ul>
                  </Paper>
                  <br />
                  <FlatButton
                      label="Start another campaign"
                      onClick={this._onLauchAnotherCampaignSubmit}
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

    var APKIds = this.state.apk.map(function (item) {
      return item.apkId;
    });
    var TestIds = this.state.apkTest.map(function (item) {
      return item.apkId;
    });

    var ProjectId = this.refs.ProjectId.getValue();
    Test.create(ProjectId, instanceId, instanceName, APKIds, TestIds, (res) => {
      var resultsFlatten;
      if(res && res.hasOwnProperty('results')){
        if(Array.isArray(res.results)){
          resultsFlatten = [].concat.apply([],res.results);
        }else{
          resultsFlatten = res.results;
        }
        this.setState({res: resultsFlatten, campaign: CAMPAIGN_SUCCESS});
      }else{
        if(res && res.hasOwnProperty('errorMessage')){
          this.setState({res: [], campaign: CAMPAIGN_ERROR, errorMessage: res.errorMessage });
        }else{
          this.setState({res: [], campaign: CAMPAIGN_ERROR, errorMessage: 'Error: no response or badly formatted.' });
        }
      }
    });
  }

  _onLauchAnotherCampaignSubmit(){
    this.setState({campaign: CAMPAIGN_NOT_STARTED});
  }

  // getLauchFieldsDisable(){
  //   return this.state.campaign == CAMPAIGN_STARTED;
  // }

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
