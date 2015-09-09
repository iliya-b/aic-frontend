'use strict';

// React
var React = require('react');

// Material UI
var mui = require('material-ui');
var { Spacing } = mui.Styles;

var {
  Checkbox,
  ClearFix,
  DatePicker,
  Dialog,
  DropDownMenu,
  FlatButton,
  FloatingActionButton,
  LeftNav,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Snackbar,
  Slider,
  TextField,
  Toggle,
  Paper,
  FontIcon} = mui;

var Menu = require('material-ui/lib/menus/menu.js');
var MenuItem = require('material-ui/lib/menus/menu-item.js');

var {StylePropable, StyleResizable} = mui.Mixins;

var Typography = mui.Styles.Typography;
var ThemeManager = new mui.Styles.ThemeManager();

// APP

var { BoxStatus,
      SessionEndedDialog,
      TestResultsBox,
      AvatarProgress } = require('goby/components');

var ThemesPage = React.createClass({

  mixins: [StylePropable, StyleResizable],

  getInitialState: function() {
    return {
      isThemeDark: false
    };
  },


  getStyles: function() {
    var canvasColor = ThemeManager.getCurrentTheme().palette.canvasColor;
    var styles = {
      group: {
        float: 'left',
        width: '100%',
        marginTop: '16px',
        padding: '0 50px',
        boxSizing: 'border-box'
      },
      groupSlider: {
        marginTop: '0px',
        width: '100%'
      },
      container: {
        marginBottom: '16px',
        minHeight: '24px',
        textAlign: 'left'
      },
      containerCentered: {
        textAlign: 'center'
      },
      paper: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px',
      },
      center: {
        textAlign: 'center',
      },
      spacing: {
        padding: Spacing.desktopGutter,
      },
      textfield: {
        width: '100%',
      },
      slider: {
        marginTop: '0px',
        marginBottom: '0px'
      },
      codeExample: {
        backgroundColor: canvasColor,
        marginBottom: '32px'
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack
      },
      menu: {
        position: 'relative',
        float: 'left'
      },
      avatarProgressAndro: {
        color: '#7ABF27',
        foregroundColor: '#0DCAC9',
        backgroundColor: '#A2A2A2',
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.group.width = '33%';
    }

    styles.containerCentered = this.mergeStyles(styles.container, styles.containerCentered);
    styles.groupSlider = this.mergeStyles(styles.group, styles.groupSlider);

    return styles;
  },

    render: function() {

    var styles = this.getStyles();
    var menuItems = [
       { payload: '1', text: 'Never' },
       { payload: '2', text: 'Every Night' },
       { payload: '3', text: 'Weeknights' },
       { payload: '4', text: 'Weekends' },
       { payload: '5', text: 'Weekly' },
    ];
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit }
    ];
    var menuItemsNav = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'component', text: 'Component' },
      {
        // type: MenuItem.Types.SUBHEADER,
        text: 'Resources'
      },
      {
         // type: MenuItem.Types.LINK,
         payload: 'https://github.com/callemall/material-ui',
         text: 'GitHub'
      },
      {
         text: 'Disabled',
         disabled: true
      },
      {
         // type: MenuItem.Types.LINK,
         payload: 'https://www.google.com',
         text: 'Disabled Link',
         disabled: true
      },
    ];

    var allStatus = [ 'doing', 'success', 'fail', 'disable' ];
    var allCampaignTypes = [ 'prepare', 'create', 'run', 'result' ];
    var allLiveTypes = [ 'search', 'create', 'load', 'connect', 'close' ];

    var boxesLive = allStatus.map(function(itemStatus, indexStatus){
      var boxes = this.map(function(itemBox, indexBox, arrayBox){
        return <BoxStatus key={indexBox} objectName='session' typeName={itemBox} status={itemStatus} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox+1)} />
      });
      return <div key={indexStatus}>{boxes}</div>;
    }, allLiveTypes);

    var boxesCampaign = allStatus.map(function(itemStatus, indexStatus){
      var boxes = this.map(function(itemBox, indexBox, arrayBox){
        return <BoxStatus key={indexBox} objectName='campaign' typeName={itemBox} status={itemStatus} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox+1)} />
      });
      return <div key={indexStatus}>{boxes}</div>;
    }, allCampaignTypes);


    var results = [{"properties":[],"testCases":[{"className":"com.zenika.aic.core.libs.ParserTest","name":"testAndroidTestCaseSetupProperly"},{"className":"com.zenika.aic.core.libs.ParserTest","name":"testApplicationTestCaseSetUpProperly"},{"className":"com.zenika.aic.demo.sensor.BatteryTestCase","name":"testUS1","failure":{"message":"Battery level not found","type":"junit.framework.AssertionFailedError","content":"junit.framework.AssertionFailedError: Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java:50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:73)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java:515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java:118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java:124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\r\r\n\r"}},{"className":"com.zenika.aic.demo.sensor.BatteryTestCase","name":"testUS2","failure":{"message":"Battery level not found","type":"junit.framework.AssertionFailedError","content":"junit.framework.AssertionFailedError: Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java:50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java:40)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java:515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java:118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java:124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\r\r\n\r"}}],"time":"0.0","name":"APK test"}];

        return (
            <div>
            <ClearFix>
              <RaisedButton linkButton={true} href="/" secondary={true} label="Back to Home" />
            </ClearFix>

            <ClearFix>


              <div style={styles.group}>
                <div style={styles.containerCentered}>
                  <FloatingActionButton iconClassName="mdi mdi-star" disabled={true}/>
                </div>
                <div style={styles.containerCentered}>
                  <FloatingActionButton iconClassName="mdi mdi-star" disabled={false}/>
                </div>
                 <div style={styles.containerCentered}>
                  <FloatingActionButton iconClassName="mdi mdi-star" disabled={false}  secondary={true} />
                </div>
                <div style={styles.containerCentered}>
                  <RaisedButton label="Secondary" secondary={true} />
                </div>
                <div style={styles.containerCentered}>
                  <RaisedButton label="Primary"  primary={true}/>
                </div>
                <div style={styles.containerCentered}>
                  <RaisedButton label="Default"/>
                </div>
                <div style={styles.containerCentered}>
                  <FlatButton label="Secondary" secondary={true} />
                </div>
                <div style={styles.containerCentered}>
                  <FlatButton label="Primary"  primary={true}/>
                </div>
                <div style={styles.containerCentered}>
                  <FlatButton label="Default"/>
                </div>
              </div>

              <div style={styles.group}>
                <div style={styles.container}>
                  <Checkbox
                    name="checkboxName1"
                    value="checkboxValue1"
                    label="checkbox" />
                  <Checkbox
                    name="checkboxName2"
                    value="checkboxValue2"
                    label="disabled checkbox"
                    disabled={true} />
                </div>
                <div style={styles.container}>
                  <RadioButtonGroup
                    name="shipSpeed"
                    defaultSelected="usd">
                      <RadioButton
                        value="usd"
                        label="USD" />
                      <RadioButton
                        value="euro"
                        label="Euro"
                        defaultChecked={true} />
                     <RadioButton
                        value="mxn"
                        label="MXN"
                        disabled={true}/>
                  </RadioButtonGroup>
                </div>
                <div style={styles.container}>
                  <Toggle
                    name="toggleName1"
                    value="toggleValue1"
                    label="toggle" />
                  <Toggle
                    name="toggleName2"
                    value="toggleValue2"
                    label="disabled toggle"
                    defaultToggled={true}
                    disabled={true} />
                </div>
                <div style={styles.container}>

                  <Menu style={styles.menu}>
                    <MenuItem primaryText="Maps" />
                    <MenuItem primaryText="Books" />
                    <MenuItem primaryText="Flights" />
                    <MenuItem primaryText="Apps" />
                  </Menu>
                </div>
              </div>

              <div style={this.mergeStyles(styles.group, {marginTop: 0})}>
                <div style={styles.container}>
                  <TextField
                    style={styles.textfield}
                    hintText="TextField"/>
                </div>
                <div style={styles.container}>
                  <DatePicker
                    hintText="Landscape Dialog"
                    mode="landscape"
                    style={{width: '100%'}}/>
                </div>
                <div style={styles.container}>
                  <DropDownMenu menuItems={menuItems} style={{width: '100%'}}/>
               </div>
              </div>

              <div style={styles.groupSlider}>
                <Slider style={styles.slider} name="slider2" defaultValue={0.5} />
              </div>

              <div style={styles.group}>
                <div style={styles.containerCentered}>
                  <FlatButton label="View Dialog" onTouchTap={this.handleTouchTapDialog} />
                  <Dialog ref="dialog" title="Dialog With Standard Actions" actions={standardActions}>
                    The actions in this window are created from the json that&#39;s passed in.
                  </Dialog>
                </div>
              </div>

              <div style={styles.group}>
                <div style={styles.containerCentered}>
                  <FlatButton
                      onTouchTap={this.handleClickNav}
                      label="View LeftNav" />
                  <LeftNav ref="leftNav" docked={false} menuItems={menuItemsNav} />
                </div>
              </div>

              <div style={styles.group}>
                <div style={styles.containerCentered}>
                  <FlatButton
                    onTouchTap={this.handleClickSnackbar}
                    label="View Snackbar" />
                  <Snackbar
                    ref="snackbar"
                    message="This is a snackbar"
                    action="Got It!"
                    onActionTouchTap={this.handleAction}/>
                </div>
              </div>
          </ClearFix>

            <ClearFix>
              <h2>Status for live</h2>
              {boxesLive}
            </ClearFix>

            <ClearFix>
              <h2>Status for campaign</h2>
              {boxesCampaign}
            </ClearFix>

            <ClearFix>

              <RaisedButton label="Session Ended Dialog" ref="btSessionEnded" primary={true} onClick={this.handleClickSessionEnded} />
              <SessionEndedDialog ref="sessionEndedDialog" />

            </ClearFix>

            <ClearFix>
            <AvatarProgress
              progress={0}
              icon={<FontIcon className="mdi mdi-android" />}
              color={styles.avatarProgressAndro.color}
              backgroundColor={styles.avatarProgressAndro.backgroundColor}
              foregroundColor={styles.avatarProgressAndro.foregroundColor} />

            <AvatarProgress
              style={{marginLeft:'10px'}}
              progress={12}
              icon={<FontIcon className="mdi mdi-android" />}
              color={styles.avatarProgressAndro.color}
              backgroundColor={styles.avatarProgressAndro.backgroundColor}
              foregroundColor={styles.avatarProgressAndro.foregroundColor} />

            <AvatarProgress
              style={{marginLeft:'10px'}}
              progress={25}
              icon={<FontIcon className="mdi mdi-android" />}
              color={styles.avatarProgressAndro.color}
              backgroundColor={styles.avatarProgressAndro.backgroundColor}
              foregroundColor={styles.avatarProgressAndro.foregroundColor} />

            <AvatarProgress
              style={{marginLeft:'10px'}}
              progress={50}
              icon={<FontIcon className="mdi mdi-android" />}
              color={styles.avatarProgressAndro.color}
              backgroundColor={styles.avatarProgressAndro.backgroundColor}
              foregroundColor={styles.avatarProgressAndro.foregroundColor} />

            <AvatarProgress
              style={{marginLeft:'10px'}}
              progress={75}
              icon={<FontIcon className="mdi mdi-android" />}
              color={styles.avatarProgressAndro.color}
              backgroundColor={styles.avatarProgressAndro.backgroundColor}
              foregroundColor={styles.avatarProgressAndro.foregroundColor} />

            <AvatarProgress
              style={{marginLeft:'10px'}}
              progress={100}
              icon={<FontIcon className="mdi mdi-android" />}
              color={styles.avatarProgressAndro.color}
              backgroundColor={styles.avatarProgressAndro.backgroundColor}
              foregroundColor={styles.avatarProgressAndro.foregroundColor} />

            </ClearFix>

            <ClearFix>

            <Paper style={styles.spacing}>

              <h2>Results</h2>

              <TestResultsBox results={results} />

              <br />

              <div style={styles.center} >
              <FlatButton
                label="Start new campaign"
                primary={true} />
              </div>

            </Paper>

            </ClearFix>



            </div>
        );
    },

  // Toggles between light and dark themes
  onTabChange: function() {
    if (this.state.isThemeDark) {
      ThemeManager.setTheme(ThemeManager.types.LIGHT);
    } else {
      ThemeManager.setTheme(ThemeManager.types.DARK);
    }
    this.setState({isThemeDark: !this.state.isThemeDark});
  },

  handleClickSessionEnded: function() {
    this.refs.sessionEndedDialog.show();
  },

  handleAction: function() {
    this.refs.snackbar.dismiss();
  },

  handleClickNav: function() {
    this.refs.leftNav.toggle();
  },

  handleClickSnackbar: function() {
    this.refs.snackbar.show();
  },

  handleTouchTapDialog: function() {
    this.refs.dialog.show();
  }
});

module.exports = ThemesPage;