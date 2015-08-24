'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing } = mui.Styles;
var { FontIcon, Paper } = mui;

// APP
var { LiveStore } = require('goby/stores');
var { LiveActions } = require('goby/actions');
var LiveBoxStatus = require('goby/components/project/live-box-status.jsx');
var AppUtils = require('goby/components/shared/app-utils.jsx');

var LiveStatus = class extends React.Component{

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this.state = {};
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

    if (this.state.hasOwnProperty('live')) {
      boxesTags = this.state.live.boxes.map(function (item, index) {
        return item.enabled ? <LiveBoxStatus key={index} typeName={item.typeName} status={item.status} isFirst={item.isFirst} isLast={item.isLast} /> : null;
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
    this.unsubscribe = LiveStore.listen( this._onStateChange );
    LiveActions.loadState();
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

LiveStatus.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = LiveStatus;