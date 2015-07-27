var React = require('react');

var mui = require('material-ui');
var { Spacing } = mui.Styles;

var { List } = require('../../components/');

var { Test, APK } = require('../../stores/');

var {
  FlatButton,
  Paper,
  TextField} = mui;

var projectId;

var ProjectTests = class extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      instances: [],
      apks: [],
      res: ''
    };

    this._onTestSubmit = this._onTestSubmit.bind(this);
  }

  render() {
    var style = {
      paperCenter: {
        textAlign: 'center',
        padding: Spacing.desktopGutter
      },
      paper: {
        padding: Spacing.desktopGutter
      },
      paperLive: {
        padding: Spacing.desktopGutter,
        minHeight: (600 + Spacing.desktopGutter*2) + 'px'
      },
      toolbargroup1: {
        paddingTop: '3px',
        float: 'left'
      },
      toolbargroup2: {
        paddingRight: '6px',
        float: 'right'
      },
      device: {
        position: 'absolute',
        fontSize: '600px',
        // color: this.context.muiTheme.palette.primary1Color,
        color: this.context.muiTheme.palette.disabledColor,
        margin: '0 -100px'
      },
      button: {
        paddingTop: Spacing.desktopGutter
      },
      sensors: {
        padding: Spacing.desktopGutter/2,
        marginLeft: '423px'
      },
      sensorIcon: {
        fontSize: '64px',
        padding: (Spacing.desktopGutter/2)+'px'
      }
    };

    // var tableInstances = <table>
    //   {this.state.instances.map(function (instance) {
    //     (<tr>
    //       <td>{instance.id}</td>
    //       <td>{instance.name}</td>
    //     </tr>
    //     )
    //   })}
    //   </table>;
    // var tableAPKs = <table>
    //   {this.state.apks.map(function (apk) {
    //       (<tr>
    //         <td>{apk.id}</td>
    //         <td>{apk.name}</td>
    //       </tr>
    //       )
    //     })}
    //   </table>;
    return (
      <div>
        <h2>Tests</h2>

        APKs
        <List style={style.list} listItems={this.state.apks}  />
        Instances
        <List style={style.list} listItems={this.state.instances}  />

        Create
        <Paper>
          <TextField ref="instanceName" floatingLabelText="Test Name"  /><br />
          <TextField ref="instanceId" floatingLabelText="Instance ID" /><br />
          <TextField ref="APKId" floatingLabelText="APK ID"  /><br />
          <TextField ref="ProjectId" floatingLabelText="Project ID"  /><br />
          <FlatButton
            key="testActionSubmit"
            label="Submit"
            primary={true}
            onTouchTap={this._onTestSubmit} />
        </Paper>

        Result
        <Paper>
        {this.state.res}
        </Paper>

      </div>
    );
  }

  _onTestSubmit(){
    var instanceName = this.refs.instanceName.getValue();
    var instanceId = this.refs.instanceId.getValue();
    var APKId = this.refs.APKId.getValue();
    var ProjectId = this.refs.ProjectId.getValue();
    Test.create(ProjectId, instanceId, instanceName, APKId, (res) => {
      this.setState({res: res});
    });
  }

  componentDidMount() {
    projectId = this.getProjectId();
    if (projectId !== null) {
    } else {
      // something really wrong happened
      // TODO: treat error
    }
    this.reloadData();
  }

  reloadData(){
    // console.log('reloading list:' + projectId);
    Test.getAll( (res) => {
      var instances = [];
      if (res !== undefined && res.length > 0){
        instances = res.map(function (item) {
          return { key: item.id,   text: item.name };
        });
      }
      this.setState({instances: instances});
    });
    APK.getAll( projectId, (res) => {
      this.setState({apks: res});
    });
  }

  getProjectId() {
    var routerParams = this.context.router.getCurrentParams();
    if (routerParams.hasOwnProperty('projectId')) {
      return routerParams.projectId;
    } else {
      return null;
    }
  }

};

ProjectTests.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectTests;
