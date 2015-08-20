var React = require('react');
var mui = require('material-ui');

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
  Toggle} = mui;

var Menu = require('material-ui/lib/menus/menu.js');
var MenuItem = require('material-ui/lib/menus/menu-item.js');

var {StylePropable, StyleResizable} = mui.Mixins;

var Typography = mui.Styles.Typography;

var ThemeManager = new mui.Styles.ThemeManager();

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
      }
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

        return (
            <div>
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