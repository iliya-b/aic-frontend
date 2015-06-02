var React = require('react');

var mui = require('material-ui');

var { List, APKUploadDialog } = require('../../components/');

var { Toolbar, ToolbarGroup, IconButton } = mui;

var { APK } = require('../../stores/');

var ProjectApkList = class extends React.Component {

  constructor(props) {
    super(props);
    this._onUploadClick = this._onUploadClick.bind(this);
    this.reloadList = this.reloadList.bind(this);
    // this._onDeleteClick = this._onDeleteClick.bind(this);

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
        float: 'right'
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
          <ToolbarGroup style={style.toolbargroup2}>
            <IconButton iconClassName="mdi mdi-delete" tooltip="Delete selected"/>
          </ToolbarGroup>
        </Toolbar>
        <APKUploadDialog ref="uploadDialog" reload={this.reloadList} />
        <List style={style.list} listItems={this.state.apks} onItemTap={this._onItemTap}  onCheck={this._onItemCheck} />
      </div>
    );
  }

  _onUploadClick() {
    this.refs.uploadDialog.show();
  }

  _onItemTap() { /*e, index, menuItem*/

  }

  _onItemCheck(e, index, menuItem) {
    console.log(e);
    console.log(index);
    console.log(menuItem);
  }

  componentDidMount() {
    this.reloadList();
  }

  reloadList(){
    APK.getAll( (res) => {
      this.setState({apks: res});
    });
  }

};

ProjectApkList.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
}

module.exports = ProjectApkList;
