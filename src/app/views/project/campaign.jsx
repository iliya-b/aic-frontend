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
      center: {
        textAlign: 'center',
      },
      spacing: {
        padding: Spacing.desktopGutter,
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
      infoArea: {

        paddingBottom: Spacing.desktopGutter + 'px',
      }
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

    var results = [{"properties":[],"testCases":[{"className":"com.zenika.aic.core.libs.ParserTest","name":"testAndroidTestCaseSetupProperly"},{"className":"com.zenika.aic.core.libs.ParserTest","name":"testApplicationTestCaseSetUpProperly"},{"className":"com.zenika.aic.demo.sensor.BatteryTestCase","name":"testUS1","failure":{"message":"Battery level not found","type":"junit.framework.AssertionFailedError","content":"junit.framework.AssertionFailedError: Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java:50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:73)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java:515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java:118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java:124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\r\r\n\r"}},{"className":"com.zenika.aic.demo.sensor.BatteryTestCase","name":"testUS2","failure":{"message":"Battery level not found","type":"junit.framework.AssertionFailedError","content":"junit.framework.AssertionFailedError: Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java:50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java:40)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java:515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java:118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java:124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\r\r\n\r"}}],"time":"0.0","name":"APK test"}];

    return (
      <div>

        <AreaStatus typeName='campaign' />

        {/* Debugging */}
        {this.context.appConfig.debug ? (
        <div>
          <Paper style={style.paperCenter}>

            <h3>Debug</h3>

            <FlatButton
                label="Set Results"
                title="Set Results"
                primary={true}
                onTouchTap={this._onStateChange.bind(this, { campaign: {status: 'CAMPAIGN_STATUS_RESULTED', results: results} } )} />

          </Paper>
          <br />
        </div>
        ) : null}

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
                title="Select a device"
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
                title="Select an APK"
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
                title="Select an APK Test"
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
                    title="Launch campaign"
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
        <Paper style={style.spacing} zDepth={0}>

          <h2>Results</h2>

          <TestResultsBox results={this.state.campaign.results} />

          <br />

          <div style={style.center} >
            <FlatButton
              label="Start new campaign"
              title="Start new campaign"
              primary={true}
              onClick={this._onLauchAnotherCampaignSubmit} />
          </div>

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
    CampaignActions.restart();
  }

  _onStateChange( state ){
    this.setState( state );
  }

  componentDidMount() {
    var projectId = AppUtils.getProjectIdFromRouter(this.context.router);
    this.unsubscribe = CampaignStore.listen( this._onStateChange );
    CampaignActions.reset();
    CampaignActions.setProjectId(projectId);
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};


ProjectCampaign.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
  appConfig: React.PropTypes.object
}

module.exports = ProjectCampaign;
