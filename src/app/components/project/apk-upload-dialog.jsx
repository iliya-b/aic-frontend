'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog, FlatButton, Toolbar, ToolbarGroup, IconButton } = mui;

// Vendors
// var Dropzone = require('react-dropzone');

// APP
var ObjectList = require('goby/components/shared/object-list/object-list.jsx');
var Dropzone = require('goby/components/shared/goby-dropzone.jsx');
var AppUtils = require('goby/components/shared/app-utils.jsx');
var { APKUploadStore } = require('goby/stores');
var { APKUploadActions } = require('goby/actions');

var APKUploadDialog = class extends React.Component{

  constructor (props) {
    super(props);

    this.state = null;

    this._onCancel = this._onCancel.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onCleanClick = this._onCleanClick.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
    this.testing = this.testing.bind(this);
    this.testingdrop = this.testingdrop.bind(this);
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
        title='Close'
        href='#'
        secondary={true}
        onClick={this._onCancel} />,
    ];

    return (
      <Dialog title="APK Upload" actions={loginActions} {...other} ref="dialogIn" >
        <div>
        <form>
          {this.state && this.state.files && this.state.files.length > 0 ? (
            <div>
            <Toolbar style={styles.toolbar}>
              <ToolbarGroup style={styles.toolbargroup}>
                <IconButton style={styles.cleanButton} onTouchTap={this._onCleanClick} ref="upload" iconClassName="mdi mdi-broom" tooltip="Clean finished files" title="Clean finished files" />
              </ToolbarGroup>
            </Toolbar>
            <ObjectList style={styles.objectlist} objectListItems={this.state.files} />
            </div>
          ) : '' }
          <Dropzone onDrop={this._onDrop} style={styles.dropzone} id="fieldAPKUpload" name="fieldAPKUpload" title="fieldAPKUpload">
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          <input name='testing' onChange={this.testing} />
          <input title='xtesting' type='file' name='xtesting' onChange={this.testing} />
          <button title='bttest'  name='bttest' type='button' onClick={this.testingdrop} >bttest</button>
          <div style={{border:'1px solid red'}}>
          {this.state ? this.state.log : null}
          </div>
        </form>
        </div>
      </Dialog>
      );
  }

  show(){
    this.refs.dialogIn.show();
  }

  _onDrop(files){
    this.setState({ log: (this.state && this.state.log ? this.state.log : '') + 'droping ' });
    APKUploadActions.drop(this.state.projectId, files);
  }

  testing(){
    this.setState({ log: (this.state && this.state.log ? this.state.log : '') + 'testonChange ' });
  }

  testingdrop(){
    var filesNames = '';
    var a = document.querySelector('input[name="xtesting"]').files;
    for (var i = a.length - 1; i >= 0; i--) {
      filesNames = filesNames + a[i].name;
    };
    this.setState({ log: (this.state && this.state.log ? this.state.log : '') + 'button(files: ' + filesNames + ', val' + document.querySelector('input[name="xtesting"]').value + ') ' });
  }

  _onCleanClick() {
    APKUploadActions.clean();
  }

  _onCancel(e) {
    e.preventDefault();
    this.refs.dialogIn.dismiss();
  }

  _onStateChange( newState ){
    if ( newState.hasOwnProperty('shouldReloadAPKList') && newState.shouldReloadAPKList === true ) {
      this.props.reload();
    }
    this.setState( newState );
  }

  componentDidMount() {
    var projectId = AppUtils.getProjectIdFromRouter(this.context.router);
    APKUploadActions.setProjectId(projectId);
    this.unsubscribe = APKUploadStore.listen( this._onStateChange );
  }

  componentWillUnmount() {
    this.unsubscribe(); // Subscribe and unsubscribe because we don't want to use the mixins
  }

};

APKUploadDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = APKUploadDialog;


