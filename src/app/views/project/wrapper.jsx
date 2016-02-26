'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
	AppBar,
	IconButton
} = mui;

// Router
const Router = require('react-router');
const {RouteHandler} = Router;

// APP
const {AuthActions} = require('app/actions');
const {ProjectActions} = require('app/actions');
const {PollingStore} = require('app/stores');
const {AuthRequired} = require('app/components');

// const ProjectWrapper = class extends React.Component {
const ProjectWrapper = class extends AuthRequired {

	constructor(props) {
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
					iconElementRight={<IconButton title="Logout" onClick={this._onRightIconButtonTouchTap} iconClassName="mdi mdi-logout" />}
					/>
				<RouteHandler />
			</div>
		);
	}

	updateTitle() {
		const thisPage = this.context.router.getCurrentPath();
		if (this.state.lastPage !== thisPage) {
			const routerParams = this.context.router.getCurrentParams();
			if (routerParams.hasOwnProperty('projectId')) {
				ProjectActions.getNameById(routerParams.projectId)
				.then(res => {
					this.setState({title: res});
				});
			} else if (this.context.router.isActive('project-list')) {
				this.setState({title: 'Projects'});
			}
			this.setState({lastPage: thisPage});
		}
	}

	componentWillReceiveProps() {
		this.updateTitle();
	}

	componentWillMount() {
		super.componentWillMount();
		this.updateTitle();
		this.unsubscribe = PollingStore.listen(this._onStateChange);
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
		super.componentWillUnmount();
	}

};

ProjectWrapper.contextTypes = {
	router: React.PropTypes.func.isRequired
};

module.exports = ProjectWrapper;
