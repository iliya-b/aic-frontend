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

var ProjectSettings = React.createClass({

  render: function() {
    var style = {
      paper: {
        textAlign: 'center',
        padding: '20px'
      }
    };
    return (
      <div>
        <h2>Update Project</h2>
        <Paper style={style.paper}>
          <TextField ref="projectName" hintText="Project Name"/><br/>
          <TextField ref="projectDescription" hintText="Project Description (Multiline)" multiLine={true} /><br/>
          <FlatButton
            label="Update"
            linkButton={true}
            primary={true} />
        </Paper>

        <h2>Delete Project</h2>
        <Paper style={style.paper}>
          <FlatButton
            label="Delete this project"
            linkButton={true}
            primary={true} />
        </Paper>

      </div>
    );
  },

});

ProjectSettings.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectSettings;
