var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var mui = require('material-ui');

var { List, APKUploadDialog } = require('../../components/');

var { Toolbar, ToolbarGroup, IconButton } = mui;

var { APK } = require('../../stores/');

var projectId = null;

var ProjectApkList = class extends React.Component {

  constructor(props) {
    super(props);
    this._onUploadClick = this._onUploadClick.bind(this);
    this.reloadList = this.reloadList.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);

    this._onItemCheck = this._onItemCheck.bind(this);

    this.state = {
      apks: [],
      toDelete: []
    };
  }

  render() {
    var style = {
      toolbar: {
        // width: '512px',
        paddingLeft: '10px',
      },
      toolbargroup1: {
        paddingTop: '3px',
        float: 'left'
      },
      toolbargroup2: {
        paddingRight: '6px',
        float: 'right',
      },
      list: {
        // width: '500px'
      }

    };
    return (
      <div>
        <h2>APK List</h2>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup style={style.toolbargroup1}>
            <IconButton onTouchTap={this._onUploadClick} ref="upload" iconClassName="mdi mdi-cloud-upload" tooltip="Upload APK file"/>
          </ToolbarGroup>
          <ReactCSSTransitionGroup transitionName="showHideTransition">
            {this.state.toDelete.length > 0 ? (
            <ToolbarGroup style={style.toolbargroup2} key='deleteItems'>
              <IconButton onTouchTap={this._onDeleteClick} iconClassName="mdi mdi-delete" tooltip="Delete selected"/>
            </ToolbarGroup>
            ) : ''}
          </ReactCSSTransitionGroup>
        </Toolbar>
        <APKUploadDialog ref="uploadDialog" reload={this.reloadList} />

        {this.state.apks.length > 0 ? (
        <List style={style.list} listItems={this.state.apks} onItemTap={this._onItemTap}  onCheck={this._onItemCheck} />
        ) : null }
      </div>
    );
  }

  _onUploadClick() {
    this.refs.uploadDialog.show();
  }

  _onDeleteClick() {
    // console.log('deleting');
    // console.log(this.state.toDelete);

    var indexToDelete = this.state.toDelete;
    this.setState({toDelete: []});
    var apks = this.state.apks;

    var apksToDelete = indexToDelete.map(function (index) {
      return apks[index];
    }).map(function (apk) {
      return apk.apkId;
    });

    APK.removeByIds( apksToDelete, (res) => {
      if(res.apks_deleted){
        this.reloadList();
      }else{
        console.log('error when deleting apk'); // TODO: error control
      }
    });
  }

  _onItemTap() { /*e, index, menuItem*/

  }

  _onItemCheck(e, index, menuItem) {
    var newToDelete = this.state.toDelete;
    if (menuItem === true) {
      // item checked
      newToDelete.push(index);
    } else if (menuItem === false) {
      // item unchecked
      newToDelete = newToDelete.filter( function (item) {
        return item !== index;
      });
    }
    this.setState({toDelete: newToDelete});
    this.render();
    // console.log(e);
    // console.log(index);
    // console.log(menuItem);
  }

  componentDidMount() {
    projectId = this.getProjectId();
    if (projectId !== null) {
    } else {
      // something really wrong happened
      // TODO: treat error
    }
    this.reloadList();
  }

  reloadList(){
    // console.log('reloading list:' + projectId);
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

ProjectApkList.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectApkList;
