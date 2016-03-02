'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
	AppBar,
	IconButton
} = mui;

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
		this.handleOnLeftIconButtonTouchTap = this.handleOnLeftIconButtonTouchTap.bind(this);
		this.handleOnRightIconButtonTouchTap = this.handleOnRightIconButtonTouchTap.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
	}

	handleOnLeftIconButtonTouchTap() {
		this.context.router.push('/projects');
	}

	handleOnRightIconButtonTouchTap() {
		AuthActions.logout(false);
		// AuthActions.redirectDisconnected(this.context.router);
	}

	render() {
		return (
			<div>
				<AppBar
					onLeftIconButtonTouchTap={this.handleOnLeftIconButtonTouchTap}
					title={this.state.title}
					zDepth={0}
					iconElementRight={<IconButton title="Logout" onClick={this.handleOnRightIconButtonTouchTap} iconClassName="mdi mdi-logout"/>}
					/>
				{this.props.children}
			</div>
		);
	}

	updateTitle() {
		// const thisPage = this.context.router.getCurrentPath();
		const thisPage = this.props.location.pathname;
		if (this.state.lastPage !== thisPage) {
			// const routerParams = this.context.router.getCurrentParams();
			const routerParams = this.props.location.query;
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
	router: React.PropTypes.object.isRequired
};

module.exports = ProjectWrapper;
