var React = require('react');

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var { FullWidthSection } = require('../../components/');

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
    var contentWidth = (64 * 6) + 'px';
    var style = {
      paper: {
        textAlign: 'center',
        padding: Spacing.desktopGutter
      },
      paperContent: {
        textAlign: 'left',
        width: contentWidth,
        display: 'inline-block'
      },
      field: {
        width: '100%'
      },
      divButton: {
        paddingTop: Spacing.desktopGutter,
        textAlign: 'center',
      }
    };
    return (
      <div>
        <h2>Update Project</h2>
        <Paper style={style.paper}>
          <div style={style.paperContent}>
          <TextField style={style.field} ref="projectName" floatingLabelText="Name"  hintText="Project Name"/><br/>
          <TextField style={style.field} ref="projectDescription" floatingLabelText="Description" hintText="Project Description (Multiline)" multiLine={true} /><br/>
          <div style={style.divButton}>
            <FlatButton
              label="Update"
              linkButton={true}
              primary={true} />
          </div>
          </div>
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
