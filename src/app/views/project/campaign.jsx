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
  Tabs,
  Tab,
  CircularProgress,
  FontIcon,
  RaisedButton } = mui;

// APP
var { APKSelectionDialog,
      APKTestSelectionDialog,
      DeviceSelectionDialog,
      ObjectList,
      AreaStatus,
      AppUtils,
      TestResultsBox } = require('goby/components');

var { CampaignStore } = require('goby/stores');
var { CampaignActions } = require('goby/actions');

var ProjectCampaign = class extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      res: '',
      device: null,
      apk: [],
      apkTest: [],
      errorMessage: ''
    };

    this._onDeviceSelectClick = this._onDeviceSelectClick.bind(this);
    this._onAPKSelectClick = this._onAPKSelectClick.bind(this);
    this._onAPKTestSelectClick = this._onAPKTestSelectClick.bind(this);
    this._onLaunchCampaignSubmit = this._onLaunchCampaignSubmit.bind(this);
    this._onLauchAnotherCampaignSubmit = this._onLauchAnotherCampaignSubmit.bind(this);
    this._onDeviceSelect = this._onDeviceSelect.bind(this);
    this._onAPKSelect = this._onAPKSelect.bind(this);
    this._onAPKTestSelect = this._onAPKTestSelect.bind(this);
    // this.getLauchFieldsDisable = this.getLauchFieldsDisable.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
  }

  render() {
    var style = {
      paperCenter: {
        textAlign: 'center',
        padding: Spacing.desktopGutter
      },
      error: {
        icon: {
          color: this.context.muiTheme.palette.errorColor,
          fontSize: '50px',
          float: 'left',
        },
        message: {
          color: this.context.muiTheme.palette.errorColor,
        },
        status: {
          display: 'none',
        },
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

        <AreaStatus typeName='campaign' />

        {this.state && this.state.campaign && this.state.campaign.status === 'CAMPAIGN_STATUS_PREPARING' ? (

        <div>
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

                <div>
                  <FlatButton
                    label="Launch campaign"
                    onClick={this._onLaunchCampaignSubmit}
                    linkButton={true}
                    primary={true} />
                  <br />
                  <TextField ref="instanceName" floatingLabelText="Device Name" value={this.state.device ? this.state.device.name : ''} disabled={true}  /><br />
                  <TextField ref="instanceId" floatingLabelText="Device ID" value={this.state.device ? this.state.device.id : ''} disabled={true} /><br />
                  {apksRendered}
                  {apksTestRendered}
                  <TextField ref="ProjectId" floatingLabelText="Project ID" value={''} disabled={true} /><br />
                </div>

            </Paper>
          </Tab>
        </Tabs>

        <DeviceSelectionDialog projectId={null} onSelect={this._onDeviceSelect} ref="deviceDialog" />
        <APKSelectionDialog projectId={null} onSelect={this._onAPKSelect} ref="APKDialog" />
        <APKTestSelectionDialog projectId={null} onSelect={this._onAPKTestSelect} ref="APKTestDialog" />
        </div>
        ) : null } {/* CAMPAIGN_STATUS_PREPARING */}


        {/* Campaign failed */}
        {this.state && this.state.campaign && this.state.campaign.status.substr(-6) === 'FAILED' ? (
        <Paper style={style.paperCenter}>

            <span style={style.error.icon} className='mdi mdi-android' />
            <p style={style.error.status}>{this.state.campaign.status}</p>
            <p style={style.error.message}>{this.state.campaign.message}</p>

        </Paper>
        ) : null}


        {/* Campaign results received */}
        {this.state && this.state.campaign && (this.state.campaign.status === 'CAMPAIGN_STATUS_RESULTED') ? (
        <Paper style={style.paperCenter}>

            <p>Campaign successfully ran.</p>

            <TestResultsBox results={this.state.campaign.results} />

            <FlatButton
              label="Start new campaign"
              primary={true}
              onClick={this._onLauchAnotherCampaignSubmit} />

        </Paper>
        ) : null}

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

  _onLaunchCampaignSubmit(){

    var projectId = this.state.campaign.projectId;
    var instanceId = this.state.device.id;
    var instanceName = this.state.device.name;

    var APKIds = this.state.apk.map(function (item) {
      return item.apkId;
    });
    var APKTestIds = this.state.apkTest.map(function (item) {
      return item.apkId;
    });

    CampaignActions.create(projectId, instanceId, instanceName, APKIds, APKTestIds);

  }

  _onLauchAnotherCampaignSubmit(){
    // this.setState({campaign: CAMPAIGN_NOT_STARTED});
  }

  // getLauchFieldsDisable(){
  //   return this.state.campaign == CAMPAIGN_STARTED;
  // }

  _onStateChange( state ){
    this.setState( state );
  }

  componentDidMount() {
    var projectId = AppUtils.getProjectIdFromRouter(this.context.router);
    this.unsubscribe = CampaignStore.listen( this._onStateChange );
    CampaignActions.setProjectId(projectId);
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};


ProjectCampaign.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectCampaign;
