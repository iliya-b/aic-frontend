'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog, FlatButton } = mui;

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
      selectedIndex: null,
    };

    this._onCancel = this._onCancel.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
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
        <div>
          {this.state.apks.length > 0 ? (
            <ObjectList selectedIndex={this.state.selectedIndex} style={styles.objectlist} objectListItems={this.state.apks} onItemTap={this._onItemClick} />
          ) : '' }
        </div>
      </Dialog>
      );
  }

  show(){
    this.refs.dialogIn.show();
  }

  _onItemClick(e, index) {
    this.setState({selectedIndex: index});
  }

  _onCancel() {
    this.refs.dialogIn.dismiss();
  }

  _onSubmit() {
    this.props.onSelect(this.state.apks[this.state.selectedIndex]);
    this.refs.dialogIn.dismiss();
  }

  reloadList(){
    APKTestActions.load(projectId);
  }

  _onStateChange( state ){
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
