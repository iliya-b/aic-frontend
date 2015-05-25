var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;
var ThemeManager = new mui.Styles.ThemeManager();
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var GobyPalette = require('../shared/goby-palette.jsx');

var {
  Checkbox,
  ClearFix,
  DatePicker,
  Dialog,
  DropDownMenu,
  FlatButton,
  FloatingActionButton,
  LeftNav,
  MenuItem,
  Paper,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Snackbar,
  Slider,
  Tabs,
  Tab,
  TextField,
  Toggle} = mui;

var Main = React.createClass({

  _onThemeClick() {
    this.context.router.transitionTo('theme-test');
  },
  _onHomeClick() {
    this.context.router.transitionTo('home');
  },

  componentWillMount() {
    ThemeManager.setPalette(GobyPalette);
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {

    return (
      <div>
        <p>Welcome to AiC!</p>
        <a>Testing theme</a>
        <FlatButton label="Home" primary={true}  onClick={this._onHomeClick} />
        <FlatButton label="Test Theme" primary={true}  onClick={this._onThemeClick} />
        <RouteHandler />
      </div>
    );
  }

});

Main.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Main;
