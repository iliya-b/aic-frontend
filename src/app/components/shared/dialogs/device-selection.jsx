var React = require('react');

var mui = require('material-ui');

var { Dialog, FlatButton} = mui;
var { Test } = require('../../../stores/');

var ObjectList = require('../../shared/object-list/object-list.jsx');

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

  _onCancel() {
    this.refs.dialogIn.dismiss();
  }

  _onSubmit() {
    this.props.onSelect(this.state.devices[this.state.selectedIndex]);
    this.refs.dialogIn.dismiss();
  }

  getProjectId() {
    this.props.projectId;
  }

  componentWillMount() {
    Test.getAll( (res) => {
      var instances = res.map(function (item) {
        return { key: item.id, id: item.id, text: item.name, name: item.name };
      });
      this.setState({devices: instances});
    });
  }

};

DeviceSelectionDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = DeviceSelectionDialog;


