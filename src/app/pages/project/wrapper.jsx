var React = require('react');

var mui = require('material-ui');
var AppBar = mui.AppBar;

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var ProjectWrapper = React.createClass({

  _onLeftIconButtonTouchTap() {
    this.context.router.transitionTo('projects');
  },

  _onRightIconButtonTouchTap() {
    this.context.router.transitionTo('home');
  },

  render: function() {

    return (
      <div>
        <AppBar
            onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
            onRightIconButtonTouchTap={this._onRightIconButtonTouchTap}
            title="Projects"
            zDepth={0}
            iconClassNameRight="fa fa-sign-out" />
        <RouteHandler />
      </div>
    );
  }

});

ProjectWrapper.contextTypes = {
  router: React.PropTypes.func
}

module.exports = ProjectWrapper;
