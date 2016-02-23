'use strict';

// React
const React = require('react');

// Material UI
const mui = require('material-ui');
const {Spacing} = mui.Styles;

const {
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
  FontIcon,
} = mui;

const Menu = require('material-ui/lib/menus/menu.js');
const MenuItem = require('material-ui/lib/menus/menu-item.js');

const {StylePropable} = mui.Mixins;

const Typography = mui.Styles.Typography;
const ThemeManager = new mui.Styles.ThemeManager();

// APP

const {
  BoxStatus,
  SessionEndedDialog,
  TestResultsBox,
  AvatarProgress,
  LogBox,
  LogBoxRow,
  AppUtils,
  MachineCardLive,
  InfoBox,
} = require('app/components');

// var logBoxRef = Array.apply(0, Array(8)).map(function (v, i) { return { message: 'Message ' + i , time: i }; });
const logBoxRef = [
  {time: AppUtils.getDate(), message: 'Stack creation scheduled'},
  {time: AppUtils.getDate(), message: 'Stack retrieval or creation finished'},
  {time: AppUtils.getDate(), message: 'Docker creation scheduled.'},
  {time: AppUtils.getDate(), message: 'Docker created and ready.'},
];

const ThemesPage = class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isThemeDark: false,
      // logbox: [],
      logbox: logBoxRef,
    };
  }

  getStyles() {
    const canvasColor = ThemeManager.getCurrentTheme().palette.canvasColor;
    const styles = {
      group: {
        float: 'left',
        width: '33%',
        marginTop: '16px',
        padding: '0 50px',
        boxSizing: 'border-box',
      },
      groupSlider: {
        marginTop: '0px',
        width: '100%',
      },
      container: {
        marginBottom: '16px',
        minHeight: '24px',
        textAlign: 'left',
      },
      containerCentered: {
        textAlign: 'center',
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
        marginBottom: '0px',
      },
      codeExample: {
        backgroundColor: canvasColor,
        marginBottom: '32px',
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
      },
      menu: {
        position: 'relative',
        float: 'left',
      },
      avatarProgressAndro: {
        color: '#7ABF27',
        foregroundColor: '#0DCAC9',
        backgroundColor: '#A2A2A2',
      },
    };

    styles.containerCentered = StylePropable.mergeStyles(styles.container, styles.containerCentered);
    styles.groupSlider = StylePropable.mergeStyles(styles.group, styles.groupSlider);

    return styles;
  }

  render() {
    const styles = this.getStyles();
    const menuItems = [
       {payload: '1', text: 'Never'},
       {payload: '2', text: 'Every Night'},
       {payload: '3', text: 'Weeknights'},
       {payload: '4', text: 'Weekends'},
       {payload: '5', text: 'Weekly'},
    ];
    const standardActions = [
      {text: 'Cancel'},
      {text: 'Submit', onClick: this._onDialogSubmit},
    ];
    const menuItemsNav = [
      {route: 'get-started', text: 'Get Started'},
      {route: 'customization', text: 'Customization'},
      {route: 'component', text: 'Component'},
      {text: 'Resources'},
      {
        payload: 'https://github.com/callemall/material-ui',
        text: 'GitHub',
      },
      {
        text: 'Disabled',
        disabled: true,
      },
      {
        // type: MenuItem.Types.LINK,
        payload: 'https://www.google.com',
        text: 'Disabled Link',
        disabled: true,
      },
    ];

    const allStatus = ['doing', 'success', 'fail', 'disable'];
    const allCampaignTypes = ['prepare', 'create', 'run', 'result'];
    const allLiveTypes = ['search', 'create', 'load', 'connect', 'close'];

    const boxesLive = allStatus.map(function (itemStatus, indexStatus) {
      const boxes = this.map((itemBox, indexBox, arrayBox) => {
        return <BoxStatus key={indexBox} objectName={'session'} typeName={itemBox} status={itemStatus} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox + 1)} />;
      });
      return <div key={indexStatus}>{boxes}</div>;
    }, allLiveTypes);

    const boxesCampaign = allStatus.map(function (itemStatus, indexStatus) {
      const boxes = this.map((itemBox, indexBox, arrayBox) => {
        return <BoxStatus key={indexBox} objectName={'campaign'} typeName={itemBox} status={itemStatus} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox + 1)} />;
      });
      return <div key={indexStatus}>{boxes}</div>;
    }, allCampaignTypes);

    const boxesLogBox = <div>
      {allCampaignTypes.map((itemBox, indexBox, arrayBox) => {
        return <BoxStatus key={indexBox} objectName={'campaign'} typeName={itemBox} status={'success'} isFirst={indexBox === 0} isLast={arrayBox.length === (indexBox + 1)} />;
      })}
    </div>;

    const logBoxRows = this.state && this.state.logbox ? this.state.logbox.map((v, i) => {
      return <LogBoxRow key={i} time={v.time}>{v.message}</LogBoxRow>;
    }) : null;

    const results = [{'properties':[],'testCases':[{'className':'com.zenika.aic.core.libs.ParserTest','name':'testAndroidTestCaseSetupProperly'},{'className':'com.zenika.aic.core.libs.ParserTest','name':'testApplicationTestCaseSetUpProperly'},{'className':'com.zenika.aic.demo.sensor.BatteryTestCase','name':'testUS1','failure':{'message':'Battery level not found','type':'junit.framework.AssertionFailedError','content':'junit.framework.AssertionFailedError: Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java:50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:73)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS1(BatteryTestCase.java:36)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java:515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java:118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java:124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\r\r\n\r'}},{'className':'com.zenika.aic.demo.sensor.BatteryTestCase','name':'testUS2','failure':{'message':'Battery level not found','type':'junit.framework.AssertionFailedError','content':'junit.framework.AssertionFailedError: Battery level not found\r\r\n\tat junit.framework.Assert.fail(Assert.java:50)\r\r\n\tat junit.framework.Assert.assertTrue(Assert.java:20)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.setLevel(BatteryTestCase.java:82)\r\r\n\tat com.zenika.aic.demo.sensor.BatteryTestCase.testUS2(BatteryTestCase.java:40)\r\r\n\tat java.lang.reflect.Method.invokeNative(Native Method)\r\r\n\tat java.lang.reflect.Method.invoke(Method.java:515)\r\r\n\tat android.test.InstrumentationTestCase.runMethod(InstrumentationTestCase.java:214)\r\r\n\tat android.test.InstrumentationTestCase.runTest(InstrumentationTestCase.java:199)\r\r\n\tat junit.framework.TestCase.runBare(TestCase.java:134)\r\r\n\tat junit.framework.TestResult$1.protect(TestResult.java:115)\r\r\n\tat junit.framework.TestResult.runProtected(TestResult.java:133)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestResult.runProtected(DelegatingTestResult.java:90)\r\r\n\tat junit.framework.TestResult.run(TestResult.java:118)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestResult.run(AndroidTestResult.java:49)\r\r\n\tat junit.framework.TestCase.run(TestCase.java:124)\r\r\n\tat android.support.test.internal.runner.junit3.NonLeakyTestSuite$NonLeakyTest.run(NonLeakyTestSuite.java:63)\r\r\n\tat junit.framework.TestSuite.runTest(TestSuite.java:243)\r\r\n\tat junit.framework.TestSuite.run(TestSuite.java:238)\r\r\n\tat android.support.test.internal.runner.junit3.DelegatingTestSuite.run(DelegatingTestSuite.java:103)\r\r\n\tat android.support.test.internal.runner.junit3.AndroidTestSuite.run(AndroidTestSuite.java:63)\r\r\n\tat android.support.test.internal.runner.junit3.JUnit38ClassRunner.run(JUnit38ClassRunner.java:90)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:128)\r\r\n\tat org.junit.runners.Suite.runChild(Suite.java:24)\r\r\n\tat org.junit.runners.ParentRunner$3.run(ParentRunner.java:231)\r\r\n\tat org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:60)\r\r\n\tat org.junit.runners.ParentRunner.runChildren(ParentRunner.java:229)\r\r\n\tat org.junit.runners.ParentRunner.access$000(ParentRunner.java:50)\r\r\n\tat org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:222)\r\r\n\tat org.junit.runners.ParentRunner.run(ParentRunner.java:300)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:157)\r\r\n\tat org.junit.runner.JUnitCore.run(JUnitCore.java:136)\r\r\n\tat android.support.test.runner.AndroidJUnitRunner.onStart(AndroidJUnitRunner.java:270)\r\r\n\tat android.app.Instrumentation$InstrumentationThread.run(Instrumentation.java:1701)\r\r\n\r'}}],'time':'0.0','name':'APK test'}];

    const avms = [
      {
        'avm_novnc_host': '127.0.0.1',
        'avm_owner': 'marco',
        'avm_id': 'jHLGWPeRSVyVzyCpWRsEjg',
        'avm_status': 'READY',
        'avm_novnc_port': '5909',
      },
      {
        'avm_novnc_host': '127.0.0.1',
        'avm_owner': 'marco',
        'avm_id': 'sijEK9O9T962JYWOuUzHHg',
        'avm_status': 'READY',
        'avm_novnc_port': '5946',
      },
      {
        'avm_novnc_host': '127.0.0.1',
        'avm_owner': 'marco',
        'avm_id': 'sijEK9O9T962JYWOuUzHHg',
        'avm_status': 'CREATING',
        'avm_novnc_port': '5946',
      },
      {
        'avm_novnc_host': '127.0.0.1',
        'avm_owner': 'marco',
        'avm_id': 'sijEK9O9T962JYWOuUzHHg',
        'avm_status': 'CREATE_FAILED',
        'avm_novnc_port': '5946',
        'avm_status_reason': 'Resource CREATE failed: OverLimit: VolumeLimitExceeded: \nMaximum number of volumes allowed (50) exceeded (HTTP 413) \n(Request-ID: req-2896fb29-7db3-4b0c-8a96-1554e6dc5f39)',
      },
    ];

    const avmsRendered = avms.map((currentValue, index) => {
      return <MachineCardLive {...currentValue} key={index} />;
    });

    const infoStylesTypes = [InfoBox.STYLE_BIG, ''];
    const infoBoxesTypes = [InfoBox.ERROR, InfoBox.SUCCESS, InfoBox.LOADING, InfoBox.WARNING, InfoBox.INFO, InfoBox.DISABLED, ''];
    const infoShowIcon = [true, false];

    let infoValues = infoShowIcon.map(showIcon => {
      return [].concat.apply([], infoStylesTypes.map(styleType => {
        return infoBoxesTypes.map(boxType => {
          return {
            children: `${boxType} message.`,
            boxType,
            styleType,
            showIcon,
          };
        });
      }));
    });

    infoValues = [].concat.apply([], infoValues);

    const infoBoxes = infoValues.map((infoProps, infoIndex) => {
      return <InfoBox style={{margin: '10px'}} key={infoIndex} {...infoProps} />;
    });

    return (
        <div>
        <ClearFix>
          <RaisedButton linkButton={true} href={'/'} secondary={true} label={'Back to Home'} />
        </ClearFix>

        <ClearFix>

          <div style={styles.group}>
            <div style={styles.containerCentered}>
              <FloatingActionButton iconClassName='mdi mdi-star' disabled={true}/>
            </div>
            <div style={styles.containerCentered}>
              <FloatingActionButton iconClassName='mdi mdi-star' disabled={false}/>
            </div>
             <div style={styles.containerCentered}>
              <FloatingActionButton iconClassName='mdi mdi-star' disabled={false}  secondary={true} />
            </div>
            <div style={styles.containerCentered}>
              <RaisedButton label='Secondary' secondary={true} />
            </div>
            <div style={styles.containerCentered}>
              <RaisedButton label='Primary' primary={true}/>
            </div>
            <div style={styles.containerCentered}>
              <RaisedButton label='Default'/>
            </div>
            <div style={styles.containerCentered}>
              <FlatButton label='Secondary' secondary={true} />
            </div>
            <div style={styles.containerCentered}>
              <FlatButton label='Primary' primary={true}/>
            </div>
            <div style={styles.containerCentered}>
              <FlatButton label='Default'/>
            </div>
          </div>

          <div style={styles.group}>
            <div style={styles.container}>
              <Checkbox
                name='checkboxName1'
                value='checkboxValue1'
                label='checkbox' />
              <Checkbox
                name='checkboxName2'
                value='checkboxValue2'
                label='disabled checkbox'
                disabled={true} />
            </div>
            <div style={styles.container}>
              <RadioButtonGroup
                name='shipSpeed'
                defaultSelected='usd'>
                  <RadioButton
                    value='usd'
                    label='USD' />
                  <RadioButton
                    value='euro'
                    label='Euro'
                    defaultChecked={true} />
                 <RadioButton
                    value='mxn'
                    label='MXN'
                    disabled={true}/>
              </RadioButtonGroup>
            </div>
            <div style={styles.container}>
              <Toggle
                name='toggleName1'
                value='toggleValue1'
                label='toggle' />
              <Toggle
                name='toggleName2'
                value='toggleValue2'
                label='disabled toggle'
                defaultToggled={true}
                disabled={true} />
            </div>
            <div style={styles.container}>

              <Menu style={styles.menu}>
                <MenuItem primaryText='Maps' />
                <MenuItem primaryText='Books' />
                <MenuItem primaryText='Flights' />
                <MenuItem primaryText='Apps' />
              </Menu>
            </div>
          </div>

          <div style={StylePropable.mergeStyles(styles.group, {marginTop: 0})}>
            <div style={styles.container}>
              <TextField
                style={styles.textfield}
                hintText='TextField'/>
            </div>
            <div style={styles.container}>
              <DatePicker
                hintText='Landscape Dialog'
                mode='landscape'
                style={{width: '100%'}}/>
            </div>
            <div style={styles.container}>
              <DropDownMenu menuItems={menuItems} style={{width: '100%'}}/>
           </div>
          </div>

          <div style={styles.groupSlider}>
            <Slider style={styles.slider} name='slider2' defaultValue={0.5} />
          </div>

          <div style={styles.group}>
            <div style={styles.containerCentered}>
              <FlatButton label='View Dialog' onTouchTap={this.handleTouchTapDialog} />
              <Dialog ref='dialog' title='Dialog With Standard Actions' actions={standardActions}>
                The actions in this window are created from the json that&#39;s passed in.
              </Dialog>
            </div>
          </div>

          <div style={styles.group}>
            <div style={styles.containerCentered}>
              <FlatButton
                  onTouchTap={this.handleClickNav}
                  label='View LeftNav' />
              <LeftNav ref='leftNav' docked={false} menuItems={menuItemsNav} />
            </div>
          </div>

          <div style={styles.group}>
            <div style={styles.containerCentered}>
              <FlatButton
                onTouchTap={this.handleClickSnackbar}
                label='View Snackbar' />
              <Snackbar
                ref='snackbar'
                message='This is a snackbar'
                action='Got It!'
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

          <RaisedButton label='Session Ended Dialog' ref='btSessionEnded' primary={true} onClick={this.handleClickSessionEnded} />
          <SessionEndedDialog ref='sessionEndedDialog' />

        </ClearFix>

        <ClearFix>
        <AvatarProgress
          progress={0}
          icon={<FontIcon className="mdi mdi-android" />}
          color={styles.avatarProgressAndro.color}
          backgroundColor={styles.avatarProgressAndro.backgroundColor}
          foregroundColor={styles.avatarProgressAndro.foregroundColor} />

        <AvatarProgress
          style={{marginLeft: '10px'}}
          progress={12}
          icon={<FontIcon className="mdi mdi-android" />}
          color={styles.avatarProgressAndro.color}
          backgroundColor={styles.avatarProgressAndro.backgroundColor}
          foregroundColor={styles.avatarProgressAndro.foregroundColor} />

        <AvatarProgress
          style={{marginLeft: '10px'}}
          progress={25}
          icon={<FontIcon className="mdi mdi-android" />}
          color={styles.avatarProgressAndro.color}
          backgroundColor={styles.avatarProgressAndro.backgroundColor}
          foregroundColor={styles.avatarProgressAndro.foregroundColor} />

        <AvatarProgress
          style={{marginLeft: '10px'}}
          progress={50}
          icon={<FontIcon className="mdi mdi-android" />}
          color={styles.avatarProgressAndro.color}
          backgroundColor={styles.avatarProgressAndro.backgroundColor}
          foregroundColor={styles.avatarProgressAndro.foregroundColor} />

        <AvatarProgress
          style={{marginLeft: '10px'}}
          progress={75}
          icon={<FontIcon className="mdi mdi-android" />}
          color={styles.avatarProgressAndro.color}
          backgroundColor={styles.avatarProgressAndro.backgroundColor}
          foregroundColor={styles.avatarProgressAndro.foregroundColor} />

        <AvatarProgress
          style={{marginLeft: '10px'}}
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
            label='Start new campaign'
            primary={true} />
          </div>

        </Paper>

        </ClearFix>

        <ClearFix>

        <Paper style={styles.spacing} zDepth={0} >

          <FlatButton
            label='Add log line'
            primary={true}
            onClick={this.addLogBox} />

          <h2>LogBox</h2>

          {boxesLogBox} <br />
          <div style={{width: '547px'}}>
          <LogBox>
          {logBoxRows}
          </LogBox>
          </div>

        </Paper>

        </ClearFix>

        <ClearFix>

          <h2>Live Sessions</h2>

          {avmsRendered}

        </ClearFix>

        <ClearFix>

          <h2>Info Boxes</h2>

          {infoBoxes}

        </ClearFix>

        </div>
        );
  }

  addLogBox(e) {
    console.log(arguments);
    e.preventDefault();
    const n = (this.state.logbox.length % logBoxRef.length) + 1;
    this.setState({logbox: logBoxRef.slice(0, n)});
  }

  // Toggles between light and dark themes
  onTabChange() {
    if (this.state.isThemeDark) {
      ThemeManager.setTheme(ThemeManager.types.LIGHT);
    } else {
      ThemeManager.setTheme(ThemeManager.types.DARK);
    }
    this.setState({isThemeDark: !this.state.isThemeDark});
  }

  handleClickSessionEnded() {
    this.refs.sessionEndedDialog.show();
  }

  handleAction() {
    this.refs.snackbar.dismiss();
  }

  handleClickNav() {
    this.refs.leftNav.toggle();
  }

  handleClickSnackbar() {
    this.refs.snackbar.show();
  }

  handleTouchTapDialog() {
    this.refs.dialog.show();
  }

};

ThemesPage.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
};

module.exports = ThemesPage;
