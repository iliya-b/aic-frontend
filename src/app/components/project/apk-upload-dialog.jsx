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
        paddingRight: '6px',
        float: 'right',
      },
      objectlist: {
        maxHeight: '200px',
        overflowY: 'auto',
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
                <IconButton onTouchTap={this._onUploadClick} ref="upload" iconClassName="mdi mdi-broom" tooltip="Clean finished files"/>
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
    var filesInfo = files.map(function (file) {
      return {
        key: file.name,
        text: file.name,
        size: file.size,
        iconRightClassName: 'mdi mdi-upload',
        progress: 0,
      };
    });
    var updatedFiles = this.state.files.concat(filesInfo);
    this.setState({files: updatedFiles});
    var projectId = this.getProjectId();
    if (projectId !== null) {
      APK.uploadFiles(projectId, files, (res) => {
        console.log('res uploadfiles');
        console.log(res);
        // if(res.file_uploaded){

        //   this.props.reload();
        // }else if(res.file_uploaded === false){

        // }else if(res.file_progress){

        // }else{
        //   // ????
        // }
      });
    } else {
      // something really wrong happened
      // TODO: treat error
    }
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


