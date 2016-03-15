'use strict';

// React
const React = require('react');

// Material design
const Menu = require('material-ui/lib/menus/menu');
const MenuItem = require('material-ui/lib/menus/menu-item');

// APP
const ProjectStore = require('app/stores/project');
const ProjectActions = require('app/actions/project');

const ProjectList = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			projects: []
		};
		this.handleItemTap = this.handleItemTap.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
	}

	handleItemTap(index, e) {
		e.preventDefault();
		this.context.router.push(`/projects/${this.state.projects[index].id}`);
	}

	render() {
		const menusItems = this.state.projects.map(function (item, index) {
			const handleClick = this.handleItemTap.bind(this, index);
			return (
				<MenuItem
					key={index}
					primaryText={item.name}
					path={item.path}
					onClick={handleClick}
					title={item.name}
					href="#"
					/>
			);
		}, this);
		return (
			<div style={{position: 'initial'}}>
				<Menu style={{position: 'initial'}} zDepth={0}>
					{menusItems}
				</Menu>
			</div>
		);
	}

	_onStateChange(state) {
		this.setState(state);
	}

	componentDidMount() {
		this.unsubscribe = ProjectStore.listen(this._onStateChange);
		ProjectActions.list();
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

ProjectList.contextTypes = {
	router: React.PropTypes.object
};

module.exports = ProjectList;
