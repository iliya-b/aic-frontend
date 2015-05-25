var React = require('react');

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var FullWidthSection = require('../../components/full-width-section.jsx');

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

var ProjectPage = React.createClass({

  render: function() {
    var { projectId } = this.context.router.getCurrentParams();
    return (
      <div>ProjectPage - {projectId}</div>
    );
  },

});

ProjectPage.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectPage;
