var React = require('react');

var mui = require('material-ui');
var { AppBar } = mui;

var Router = require('react-router');
var { RouteHandler } = Router;

var { Auth, RequireAuthComponent, Project } = require('../../stores/');

// var ProjectWrapper = RequireAuth( class extends React.Component {
var ProjectWrapper = class extends RequireAuthComponent {

  constructor (props) {
    super(props);
    this.state = {
      lastPage: false,
      title: ''
    };
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
    return (
      <div>
        <AppBar
            onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
            onRightIconButtonTouchTap={this._onRightIconButtonTouchTap}
            title={this.state.title}
            zDepth={0}
            iconClassNameRight="mdi mdi-logout" />
        <RouteHandler />
      </div>
    );
  }

  updateTitle(){
    var thisPage = this.context.router.getCurrentPath();
    if(this.state.lastPage !== thisPage){
      var routerParams = this.context.router.getCurrentParams();
      if (routerParams.hasOwnProperty('projectId')) {
        Project.getNameById(routerParams.projectId, (res) => {
          this.setState( {title: res} );
        });
      }else if( this.context.router.isActive('project-list') ){
        this.setState( {title: 'Projects'} );
      }
      this.setState( {lastPage: thisPage} );
    }
  }

  componentWillReceiveProps(){
    this.updateTitle();
  }

  componentWillMount(){
    this.updateTitle();
  }

};

ProjectWrapper.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = ProjectWrapper;
