var React = require('react');

var mui = require('material-ui');
var { AppBar, Menu } = mui;

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var ProjectList = React.createClass({

  _onItemTap(e, index, menuItem) {
    console.log(index);
    console.log(menuItem);
    this.context.router.transitionTo('project-page', {projectId: menuItem.projectId} );
  },

  render: function() {
    var projects = [
       { projectId: 'project1', text: 'Project1' },
       { projectId: 'project2', text: 'Project2'},
       { projectId: 'project3', text: 'Project3' }
    ];
    return (
      <div>
        <Menu menuItems={projects} onItemTap={this._onItemTap} />
      </div>
    );
  }

});

ProjectList.contextTypes = {
  router: React.PropTypes.func
}

module.exports = ProjectList;
