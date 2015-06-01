var React = require('react');

var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var { Dialog, TextField, FlatButton } = mui;
var { APK } = require('../../stores/');

var InfoBox = require('../shared/info-box.jsx');
var AppUtils = require('../shared/app-utils.jsx');

var Dropzone = require('react-dropzone');

var APKUploadDialog = class extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      loginError: false,
      loginErrorMessage: '',
      blockFields: false,
      loginSuccess: false,
      userName: '',
      loginEmailError: '',
      loginPasswordError: '',
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onDrop = this._onDrop.bind(this);
  }

  render() {

    var {
      style,
      ...other
    } = this.props;

    var content = this.props.children;

    var successBox = <InfoBox boxType={InfoBox.SUCCESS}>New user <strong>{this.state.userName}</strong> successfully registered.</InfoBox>;
    var errorBox = this.state.loginError ? ( <InfoBox boxType={InfoBox.ERROR}>{this.state.loginErrorMessage}</InfoBox>) : '';

    var styles = {
      submit: {
        display: this.state.loginSuccess ? 'none' : 'auto'
      }
    };

    var loginActions = [
      <FlatButton
        key="loginActionCancel"
        label={this.state.loginSuccess ? 'Close' : 'Cancel'}
        secondary={true}
        onTouchTap={this._onCancel} />,
      <FlatButton
        key="loginActionSubmit"
        label="Submit"
        primary={true}
        onTouchTap={this._onSubmit}
        style={styles.submit} />
    ];


    return (
      <Dialog title="APK Upload" actions={loginActions} {...other} ref="dialogIn">
        {this.state.loginSuccess ? successBox : (
          <div>
            {errorBox}
            <Dropzone onDrop={this._onDrop} size={150} >
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
        )}
      </Dialog>
      );
  }

  show(){
    this.setState({ loginError: false,
      loginErrorMessage: '',
      blockFields: false,
      loginSuccess: false,
      userName: '',
      loginEmailError: '',
      loginPasswordError: '',
      });
    this.refs.dialogIn.show();
  }

  _onDrop(files){
    console.log('Received files: ', files);
    var routerParams = this.context.router.getCurrentParams();
    if (routerParams.hasOwnProperty('projectId')){
      APK.uploadFiles(routerParams.projectId, files, (res) => {
        console.log('res ondrop');
        console.log(res);
      });
    }
  }

  _onSubmit(e) {
    e.preventDefault();
  }

  _onCancel(e) {
    this.refs.dialogIn.dismiss();
  }

};

APKUploadDialog.mixins = [StylePropable];

APKUploadDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = APKUploadDialog;


