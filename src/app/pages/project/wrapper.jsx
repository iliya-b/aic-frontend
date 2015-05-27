var React = require('react');

var mui = require('material-ui');
var { AppBar } = mui;

var Router = require('react-router');
var { RouteHandler, State } = Router;

var { Auth, RequireAuthComponent } = require('../../stores/auth.jsx');

// var ProjectWrapper = RequireAuth( class extends React.Component {
var ProjectWrapper = class extends RequireAuthComponent {

  constructor (props) {
    super(props);
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
    this._onRightIconButtonTouchTap = this._onRightIconButtonTouchTap.bind(this);
  }

  _onLeftIconButtonTouchTap() {
    this.context.router.transitionTo('projects');
  }

  _onRightIconButtonTouchTap() {
    Auth.logout();
    Auth.requireAuth(this.context.router);
  }

  render() {
    console.log(this);
    console.log(this.context);
    var routerParams = this.context.router.getCurrentParams();
    console.log(routerParams);
    var title = routerParams.hasOwnProperty('projectId') ? routerParams.projectId :
                this.context.router.isActive('project-list') ? 'Projects' : '';
    // var title = '';
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

// });
};

// ProjectWrapper.mixins = [ State ];

// ProjectWrapper.contextTypes = {
//   router: React.PropTypes.func.isRequired
// }

ProjectWrapper.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = ProjectWrapper;
