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
    return (
      <div>

      <Tabs>
        <Tab label="Update Project" >
          <div>
            <TextField ref="projectName" hintText="Project Name"/><br/>
            <TextField ref="projectDescription" hintText="Project Description (Multiline)" multiLine={true} /><br/>
            <FlatButton
              label="Update"
              linkButton={true}
              primary={true} />
          </div>
        </Tab>
        <Tab label="Delete Project" >
          <div>
            <FlatButton
              label="Delete this project"
              linkButton={true}
              primary={true} />
          </div>
        </Tab>
      </Tabs>

      </div>
    );
  },

});

ProjectSettings.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectSettings;
