'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog,
      FlatButton,
      Table,
      TableHeader,
      TableHeaderColumn,
      TableBody,
      TableRow,
      TableRowColumn,
      Paper } = mui;

// APP
var ObjectList = require('app/components/shared/object-list/object-list.jsx');
var AppUtils = require('app/components/shared/app-utils.jsx');
var { APKStore } = require('app/stores');
var { APKActions } = require('app/actions');

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
        title='Cancel'
        href='#'
        secondary={true}
        onClick={this._onCancel} />,
      <FlatButton
        key="submit"
        label="Select"
        title="Select"
        href='#'
        primary={true}
        onClick={this._onSubmit} />
    ];

    var rows = this.state.apksData.map(function (item, index) {
      var isSelected = this.state.selectedIndex ? this.state.selectedIndex.indexOf(index) > -1 : false ;
      return  <TableRow key={index} selected={isSelected}>
                <TableRowColumn>{item.name.content}</TableRowColumn>
              </TableRow>;
    }, this);

    return (
      <Dialog title="APK Selection" actions={actions} {...other} ref="dialogIn" >
        <Paper>
          <Table
            height="50vh"
            showRowHover={true}
            selectable={true}
            multiSelectable={true}
            canSelectAll={true}
            deselectOnClickaway={false}
            onRowSelection={this._onRowSelection}>
            <TableBody></TableBody>
            <TableBody>
            {rows}
            </TableBody>
          </Table>
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

  _onCancel(e) {
    e.preventDefault();
    this.refs.dialogIn.dismiss();
  }

  _onSubmit(e) {
    e.preventDefault();
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

  componentWillUnmount() {
    this.unsubscribe(); // Subscribe and unsubscribe because we don't want to use the mixins
  }

};

APKSelectionDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = APKSelectionDialog;
