'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { AppBar,
      IconButton } = mui;

// Router
var Router = require('react-router');
var { RouteHandler } = Router;

// APP
var LiveList = require('./list.jsx');

var LiveWrapper = class extends React.Component {

  render() {

    var params = this.context.router.getCurrentParams();

    var list = !params.hasOwnProperty('androId') ?  <LiveList /> : null;

    return <div>
      {list}
      <RouteHandler />
    </div>;
  }

};

LiveWrapper.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = LiveWrapper;
