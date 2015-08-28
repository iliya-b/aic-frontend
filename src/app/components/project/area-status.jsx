'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing } = mui.Styles;
var { FontIcon, Paper } = mui;

// APP
var GobyStores = require('goby/stores');
var GobyActions = require('goby/actions');
var LiveBoxStatus = require('goby/components/project/live-box-status.jsx');
var AppUtils = require('goby/components/shared/app-utils.jsx');

var loadedStore;
var loadedActions;

var AreaStatus = class extends React.Component{

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this.state = {};
    if (this.props.typeName){
      loadedStore = GobyStores[ AppUtils.capitalize(this.props.typeName) + 'Store'];
      loadedActions = GobyActions[ AppUtils.capitalize(this.props.typeName) + 'Actions'];
    }
  }

  render() {
    var boxes;
    var boxesTags;
    var styles = {
      boxes: {
        textAlign: 'center',
        paddingBottom: Spacing.desktopGutter + 'px',
      }
    };

    if (this.state.hasOwnProperty(this.props.typeName)) {
      boxesTags = this.state[this.props.typeName].boxes.map(function (item, index) {
        return item.enabled ? <LiveBoxStatus key={index} typeName={item.typeName} status={item.status} isFirst={item.isFirst} isLast={item.isLast} objectName={item.objectName} /> : null;
      });
    }

    return  <div style={styles.boxes}>
              {boxesTags}
            </div>
  }

  _onStateChange( state ){
    this.setState( state );
  }

  componentDidMount() {
    this.unsubscribe = loadedStore.listen( this._onStateChange );
    loadedActions.loadState();
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

AreaStatus.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = AreaStatus;