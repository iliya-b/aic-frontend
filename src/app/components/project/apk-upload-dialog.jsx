var React = require('react');

var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var { Dialog, FlatButton } = mui;
var { APK } = require('../../stores/');

var Dropzone = require('react-dropzone');

var APKUploadDialog = class extends React.Component{

  constructor (props) {
    super(props);
    this._onCancel = this._onCancel.bind(this);
    this._onDrop = this._onDrop.bind(this);
  }

  render() {

    var {
      // style,
      ...other
    } = this.props;

    // var styles = {
    //   root:{}
    // };

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
          <Dropzone onDrop={this._onDrop} size={150} >
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
    var routerParams = this.context.router.getCurrentParams();
    if (routerParams.hasOwnProperty('projectId')){
      APK.uploadFiles(routerParams.projectId, files, (res) => {
        console.log('res ondrop');
        console.log(res);
        if(res.file_uploaded){
          this.props.reload();
        }
      });
    }
  }

  _onCancel() {
    this.refs.dialogIn.dismiss();
  }

};

APKUploadDialog.mixins = [StylePropable];

APKUploadDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = APKUploadDialog;


