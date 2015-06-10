var React = require('react');

var mui = require('material-ui');

var { Dialog, FlatButton } = mui;
var { APKTest } = require('../../../stores/');

var ObjectList = require('../../shared/object-list/object-list.jsx');

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

  getProjectId() {
    return this.props.projectId;
  }

  componentWillMount() {
    APKTest.getAll( this.getProjectId(), (res) => {
      var apks = [];
      if (res !== undefined && res.length > 0){
        apks = res.map(function (item) {
          return { key: item.id, id: item.id, text: item.name, name: item.name };
        });
      }
      this.setState({apks: apks});
    });
  }

};

APKTestSelectionDialog.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = APKTestSelectionDialog;
