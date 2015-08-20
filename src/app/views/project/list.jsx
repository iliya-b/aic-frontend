var React = require('react');

// var mui = require('material-ui');
// var { Menu } = mui;
var ObjectList = require('goby/components/shared/object-list/object-list.jsx');
var { Project } = require('../../stores/');

var ProjectList = class extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      projects: []
    };
    this._onItemTap = this._onItemTap.bind(this);
    // console.log('passing cons');
  }

  _onItemTap(e, index, menuItem) {
    // console.log(index);
    // console.log(menuItem);
    this.context.router.transitionTo('project-page', {projectId: menuItem.id} );
  }

  getProjects(){
    return this.state.projects;
  }

  render() {
    // <Menu menuItems={this.getProjects()} onItemTap={this._onItemTap} />
    return (
      <div>
        <ObjectList objectListItems={this.getProjects()} zDepth={0} onItemTap={this._onItemTap} />
      </div>
    );
  }

  componentDidMount() {
    // var projects = [
    //      { projectId: 'project1', text: 'Project1' },
    //      { projectId: 'project2', text: 'Project2' },
    //      { projectId: 'project3', text: 'Project3' }
    //   ];
    // this.setState({projects: projects});
    Project.getAll( (res) => {
      this.setState({projects: res});
    });
    // this.forceUpdate();
    // console.log('passing did mount');
  }

};

ProjectList.contextTypes = {
  router: React.PropTypes.func
};

module.exports = ProjectList;
