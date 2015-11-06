'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing } = mui.Styles;
var { CardActions,
      RaisedButton, } = mui;

// APP
var { AppUtils,
      MachineCardLive } = require('goby/components');
var { LiveStore } = require('goby/stores');
var { LiveActions } = require('goby/actions');

var LiveList = class extends React.Component{

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this.state = {};
  }

  // _onItemTap(index, e) {
  //   // e.preventDefault();
  //   this.context.router.transitionTo('live-session', { projectId: 'fooproject',
  //                                                      androId: 'test'} );
  // }



  render() {

    var avmsRendered = this.state.live && this.state.live.avms && this.state.live.avms.length ? this.state.live.avms.map(function(currentValue, index) { return <MachineCardLive {...currentValue} key={index} />; } ) : '';

    return  <div>

              <h2>Live Sessions</h2>

              <CardActions>

              <RaisedButton linkButton={true} href="/" primary={true} label="Start new session" />

              </CardActions>

              {avmsRendered}

            </div>;

  }

  _onStateChange( state ){
    this.setState( state );
  }

  componentDidMount() {
    // console.log('componentDidMount');
    var projectId = AppUtils.getProjectIdFromRouter(this.context.router);
    this.unsubscribe = LiveStore.listen( this._onStateChange );
    LiveActions.liveReset();
    LiveActions.setProjectId(projectId);
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

LiveList.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
  appConfig: React.PropTypes.object
};

module.exports = LiveList;
