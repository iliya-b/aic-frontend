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
var { AuthActions } = require('goby/actions');
var { Project } = require('goby/stores');

var ProjectWrapper = class extends React.Component {

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
    AuthActions.logout(false);
    // AuthActions.redirectDisconnected(this.context.router);
  }

  render() {
    return (
      <div>
        <AppBar
            onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
            title={this.state.title}
            zDepth={0}
            iconElementRight={<IconButton title="Logout" onClick={this._onRightIconButtonTouchTap} iconClassName="mdi mdi-logout"></IconButton>} />
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
