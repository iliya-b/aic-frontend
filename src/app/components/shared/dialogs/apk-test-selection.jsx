'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog, FlatButton, Table, Paper } = mui;

// APP
var ObjectList = require('goby/components/shared/object-list/object-list.jsx');
var AppUtils = require('goby/components/shared/app-utils.jsx');
var { APKTestStore } = require('goby/stores');
var { APKTestActions } = require('goby/actions');

var projectId = null;

var APKTestSelectionDialog = class extends React.Component{

  constructor (props) {
    super(props);

    this.state = {
      apks: [],
      apksData: [],
      selectedIndex: null,
    };

    this._onCancel = this._onCancel.bind(this);
    this._onRowSelection = this._onRowSelection.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onStateChange = this._onStateChange.bind(this);

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
      <Dialog title="APK Test Selection" actions={actions} {...other} ref="dialogIn" >
        <Paper>
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

  _onRowSelection(selectedRows) {
    this.setState({selectedIndex: selectedRows});
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
    APKTestActions.load(projectId);
  }

  _onStateChange( state ){
    state.apksData = state.apks.map(function (item) {
      return { name: { content: item.name }, apkId:item.apkId, selected: item.checked };
    });
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
    this.unsubscribe = APKTestStore.listen( this._onStateChange );
    this.reloadList();
  }

};

APKTestSelectionDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = APKTestSelectionDialog;
