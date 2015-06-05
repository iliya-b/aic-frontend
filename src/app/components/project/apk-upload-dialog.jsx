var React = require('react');

var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var { Dialog, FlatButton, Toolbar, ToolbarGroup, IconButton } = mui;
var { APK } = require('../../stores/');

var Dropzone = require('react-dropzone');

var ObjectList = require('../shared/object-list/object-list.jsx');

var APKUploadDialog = class extends React.Component{

  constructor (props) {
    super(props);

    this.state = {
      files: []
    };

    this._onCancel = this._onCancel.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onCleanClick = this._onCleanClick.bind(this);
  }

  render() {

    var {
      // style,
      ...other
    } = this.props;

    var styles = {
      dropzone: {
        width: '100%'
      },
      toolbargroup: {
        paddingTop: '3px',
        float: 'left'
      },
      objectlist: {
        maxHeight: '200px',
        overflowY: 'auto',
      },
      cleanButton: {
        marginLeft: '-14px'
      }
    };

    var loginActions = [
      <FlatButton
        key="loginActionCancel"
        label='Close'
        secondary={true}
        onTouchTap={this._onCancel} />,
    ];


    return (
      <Dialog title="APK Upload" actions={loginActions} {...other} ref="dialogIn" >
        <div>
          {this.state.files.length > 0 ? (
            <div>
            <Toolbar style={styles.toolbar}>
              <ToolbarGroup style={styles.toolbargroup}>
                <IconButton style={styles.cleanButton} onTouchTap={this._onCleanClick} ref="upload" iconClassName="mdi mdi-broom" tooltip="Clean finished files"/>
              </ToolbarGroup>
            </Toolbar>
            <ObjectList style={styles.objectlist} objectListItems={this.state.files} />
            </div>
          ) : '' }
          <Dropzone onDrop={this._onDrop} style={styles.dropzone} >
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </div>
      </Dialog>
      );
  }

  show(){
    this.refs.dialogIn.show();
  }

  _onDrop(files){
    console.log('Received files: ', files);
    var filesInfo = APK.convertToListItems(files);
    var updatedFiles = this.state.files.concat(filesInfo);
    this.setState({files: updatedFiles});
    var projectId = this.getProjectId();
    if (projectId !== null) {
      APK.uploadFiles(projectId, files, (res) => {
        updatedFiles = this.state.files;
        console.log('res uploadfiles');
        console.log(res);
        if (res.hasOwnProperty('progress')){
          updatedFiles = APK.listUpdate(updatedFiles, {id: res.apkId, progress: res.progress });
          this.setState({files: updatedFiles});
        } else if (res.hasOwnProperty('completed')){
          updatedFiles = APK.listUpdate(updatedFiles, {id: res.apkId, iconRightClassName: 'mdi mdi-check', progress: false, completed: true});
          this.setState({files: updatedFiles});
          this.props.reload();
        } else if (res.hasOwnProperty('error') && res.error === true){
          updatedFiles = APK.listUpdate(updatedFiles, {id: res.apkId, iconRightClassName: 'mdi mdi-close', progress: false, error: true, errorText: res.errorMessage});
          console.log(updatedFiles);
          this.setState({files: updatedFiles});
        } else {
          // TODO treatment
        }
      });
    } else {
      // something really wrong happened
      // TODO: treat error
    }
  }

  _onCleanClick() {
    var updatedFiles = APK.listClean(this.state.files);
    this.setState({files: updatedFiles});
  }

  _onCancel() {
    this.refs.dialogIn.dismiss();
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

APKUploadDialog.mixins = [StylePropable];

APKUploadDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = APKUploadDialog;


