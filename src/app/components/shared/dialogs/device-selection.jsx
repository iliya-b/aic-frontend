'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Dialog,
      FlatButton } = mui;

// APP
var ObjectList = require('app/components/shared/object-list/object-list.jsx');
var { CampaignStore } = require('app/stores');
var { CampaignActions } = require('app/actions');

var DeviceSelectionDialog = class extends React.Component{

  constructor (props) {
    super(props);

    this.state = {
      devices: [],
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
        title='Cancel'
        secondary={true}
        onClick={this._onCancel} />,
      <FlatButton
        key="submit"
        label="Select"
        title="Select"
        primary={true}
        onClick={this._onSubmit} />
    ];

    return (
      <Dialog title="Device Selection" actions={actions} {...other} ref="dialogIn" >
        <div>
          {this.state.devices.length > 0 ? (
            <ObjectList selectedIndex={this.state.selectedIndex} style={styles.objectlist} objectListItems={this.state.devices} onItemTap={this._onItemClick} />
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

  _onCancel(e) {
    e.preventDefault();
    this.refs.dialogIn.dismiss();
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.onSelect(this.state.devices[this.state.selectedIndex]);
    this.refs.dialogIn.dismiss();
  }

  _onStateChange( state ){
    if ( state.hasOwnProperty('availableDevices') ) {
      this.setState( { devices : state.availableDevices.map(function (item) {
          return { key: item.id, id: item.id, text: item.name, name: item.name };
        }) } );
    }
  }

  componentWillMount() {
    this.unsubscribe = CampaignStore.listen( this._onStateChange );
    CampaignActions.loadDevices();
  }

  componentWillUnmount() {
    this.unsubscribe(); // Subscribe and unsubscribe because we don't want to use the mixins
  }

};

DeviceSelectionDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = DeviceSelectionDialog;


