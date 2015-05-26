var React = require('react');

var mui = require('material-ui');
var { AppBar } = mui;

var Router = require('react-router');
var { RouteHandler, State } = Router;

var ProjectWrapper = React.createClass({

  mixins: [ State ],

  _onLeftIconButtonTouchTap() {
    this.context.router.transitionTo('projects');
  },

  _onRightIconButtonTouchTap() {
    this.context.router.transitionTo('home');
  },

  render: function() {
    var routerParams = this.getParams();
    // console.log(routerParams);
    var title = routerParams.hasOwnProperty('projectId') ? routerParams.projectId :
                this.context.router.isActive('project-list') ? 'Projects' : '';
    return (
      <div>
        <AppBar
            onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
            onRightIconButtonTouchTap={this._onRightIconButtonTouchTap}
            title={title}
            zDepth={0}
            iconClassNameRight="mdi mdi-logout" />
        <RouteHandler />
      </div>
    );
  }

});

ProjectWrapper.contextTypes = {
  router: React.PropTypes.func
}

module.exports = ProjectWrapper;
