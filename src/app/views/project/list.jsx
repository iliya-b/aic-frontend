'use strict';

// React
var React = require('react');

// Material design
var Menu = require('material-ui/lib/menus/menu.js');
var MenuItem = require('material-ui/lib/menus/menu-item.js');

// APP
var { ObjectList,
      AppUtils } = require('app/components');
var { ProjectStore } = require('app/stores');
var { ProjectActions } = require('app/actions');

var ProjectList = class extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      projects: []
    };
    this._onItemTap = this._onItemTap.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
  }

  _onItemTap(index, e) {
    e.preventDefault();
    this.context.router.transitionTo('project-page', {projectId: this.state.projects[index].id} );
  }


  render() {
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
  }

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
