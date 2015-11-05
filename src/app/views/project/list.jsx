'use strict';

// React
var React = require('react');

// Material design
var Menu = require('material-ui/lib/menus/menu.js');
var MenuItem = require('material-ui/lib/menus/menu-item.js');

// APP
var { ObjectList,
      AppUtils } = require('goby/components');
var { ProjectStore } = require('goby/stores');
var { ProjectActions } = require('goby/actions');

var ProjectList = class extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      projects: []
    };
    this._onItemTap = this._onItemTap.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
  }

  // _onItemTap(e, index, menuItem) { // version with ObjectList
  _onItemTap(index, e) {
    // console.log(index);
    // console.log(menuItem);
    // console.log(arguments);
    e.preventDefault();
    this.context.router.transitionTo('project-page', {projectId: this.getProjects()[index].id} );
  }

  getProjects(){
    return this.state.projects; //.map(function(v){return AppUtils.extend( v, {title: v.text, href: '#'} ) });
  }

  render() {
    // <Menu menuItems={this.getProjects()} onItemTap={this._onItemTap} />
    var menusItems = this.state.projects.map(function (item, index) {
      return <MenuItem key={index} primaryText={item.name}
        path={item.path} onClick={this._onItemTap.bind(this, index)}
        title={item.name} href='#' />
    }, this);
    return  <div style={{position: 'initial'}}>
              <Menu style={{position: 'initial'}} zDepth={0}>
                {menusItems}
              </Menu>
            </div>;
      /*<div>
        <ObjectList objectListItems={this.getProjects()} zDepth={0} onItemTap={this._onItemTap} />
      </div>*/
  }

  // componentDidMount() {
  //   // var projects = [
  //   //      { projectId: 'project1', text: 'Project1' },
  //   //      { projectId: 'project2', text: 'Project2' },
  //   //      { projectId: 'project3', text: 'Project3' }
  //   //   ];
  //   // this.setState({projects: projects});
  //   Project.getAll( (res) => {
  //     this.setState({projects: res});
  //   });
  //   // this.forceUpdate();
  //   // console.log('passing did mount');
  // }

  _onStateChange( state ){
    this.setState( state );
  }

  componentDidMount() {
    this.unsubscribe = ProjectStore.listen( this._onStateChange );
    ProjectActions.list();
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

ProjectList.contextTypes = {
  router: React.PropTypes.func
};

module.exports = ProjectList;
