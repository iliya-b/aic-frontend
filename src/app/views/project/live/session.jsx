'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing } = mui.Styles;
var { Tabs, Tab, Paper, FlatButton, CircularProgress } = mui;

// APP
var { AppUtils,
      LiveScreen,
      LiveSensors,
      AreaStatus,
      LogBox,
      LogBoxRow } = require('goby/components');
var { LiveStore } = require('goby/stores');
var { LiveActions } = require('goby/actions');

var LiveSession = class extends React.Component{

  constructor(props) {
    super(props);
  }


  render() {

    return  <div>

              <h2>Live Session</h2>

              machine

            </div>;

  }

};

LiveSession.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
  appConfig: React.PropTypes.object
};

module.exports = LiveSession;
