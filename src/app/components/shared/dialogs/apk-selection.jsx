'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog, FlatButton, Table, Paper } = mui;

// APP
var ObjectList = require('goby/components/shared/object-list/object-list.jsx');
var AppUtils = require('goby/components/shared/app-utils.jsx');
var { APKStore } = require('goby/stores');
var { APKActions } = require('goby/actions');

var projectId = null;

var APKSelectionDialog = class extends React.Component{

  constructor (props) {
    super(props);

    this.state = {
      apks: [],
      apksData: [],
      selectedIndex: null,
    };

    this._onCancel = this._onCancel.bind(this);
    // this._onItemClick = this._onItemClick.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
    this._onRowSelection = this._onRowSelection.bind(this);

  }

  render() {

    var {
      // style,
      ...other
    } = this.props;

    var styles = {
      objectlist: {
        maxHeight: '200px',
        overflowY: 'auto',
      },
    };

    var actions = [
      <FlatButton
        key="cancel"
        label='Cancel'
        secondary={true}
        onTouchTap={this._onCancel} />,
      <FlatButton
        key="submit"
        label="Select"
        primary={true}
        onTouchTap={this._onSubmit} />
    ];

    return (
      <Dialog title="APK Selection" actions={actions} {...other} ref="dialogIn" >
        <Paper>
          {/*this.state.apks.length > 0 ? (
            <ObjectList selectedIndex={this.state.selectedIndex} style={styles.objectlist} objectListItems={this.state.apks} onItemTap={this._onItemClick} />
          ) : '' */}
          <Table
            height="100%"
            columnOrder={['name']}
            rowData={this.state.apksData}
            showRowHover={true}
            selectable={true}
            multiSelectable={true}
            canSelectAll={true}
            deselectOnClickaway={false}
            onRowSelection={this._onRowSelection} />
        </Paper>
      </Dialog>
      );
  }

  show(){
    this.refs.dialogIn.show();
    this.setState( { selectedIndex: [] } ); // FIXME: Previous selection
  }

  // _onItemClick(e, index) {
  //   this.setState({selectedIndex: index});
  // }

  // _onItemClick(e, index) {
  //   this.setState({selectedIndex: index});
  // }

  _onRowSelection(selectedRows) {
    // console.log(selectedRows);
    this.setState( { selectedIndex: selectedRows } );
  }

  _onCancel() {
    this.refs.dialogIn.dismiss();
  }

  _onSubmit() {
    this.props.onSelect( this.state.apks.filter(function (item, index) {
      return this.state.selectedIndex.indexOf(index) > -1;
    }, this) );
    this.refs.dialogIn.dismiss();
  }

  reloadList(){
    APKActions.load(projectId);
  }

  _onStateChange( state ){

    state.apksData = state.apks.map(function (item) {
      return { name: { content: item.name }, apkId:item.apkId, selected: item.checked };
    });

    // console.log(state);
    this.setState( state );
    switch(this.state.status){
      case 'reloadList':
        this.reloadList();
        break;
      default:
        break;
    }
  }

  componentWillMount() {
    projectId = AppUtils.getProjectIdFromRouter(this.context.router);
    this.unsubscribe = APKStore.listen( this._onStateChange );
    this.reloadList();
  }

};

APKSelectionDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = APKSelectionDialog;
