'use strict';

// Vendor
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
// const debug = require('debug')('AiC:Views:ProjectWrapper');
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';

// APP
import AuthActions from 'app/actions/auth';
import ProjectActions from 'app/actions/project';
import PollingStore from 'app/stores/polling';
import AuthRequired from 'app/components/shared/auth-required';

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
		AuthActions.tryLogout(false);
	}

	render() {
		let iconLeft;
		if (this.state.lastPage === '/projects') {
			iconLeft = <FontIcon title="Projects" className="mdi mdi-menu" style={{color: 'white', padding: 12}}/>;
			// iconLeft = (<IconMenu
			// 	iconButtonElement={<IconButton tooltipPosition="bottom-right" tooltip="Project actions" title="Project actions"><FontIcon className="mdi mdi-menu" color="white" style={{color: 'white'}}/></IconButton>}
			// 	targetOrigin={{horizontal: 'right', vertical: 'top'}}
			// 	anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			// 	>
			// 	<MenuItem primaryText="Create new project"/>
			// 	<MenuItem primaryText="Delete selected"/>
			// </IconMenu>);
		} else {
			iconLeft = <IconButton tooltipPosition="bottom-right" tooltip="Back to projects" title="Back to projects" onClick={this.handleOnLeftIconButtonTouchTap} iconClassName="mdi mdi-arrow-left-bold"/>;
		}
		return (
			<div>
				<AppBar
					className="appBarMain"
					title={this.state.title}
					zDepth={0}
					iconElementLeft={iconLeft}
					iconElementRight={<IconButton tooltipPosition="bottom-left" tooltip="Logout" title="Logout" onClick={this.handleOnRightIconButtonTouchTap} iconClassName="mdi mdi-logout"/>}
					/>
				{this.props.children}
			</div>
		);
	}

	updateTitle(nextProps) {
		// const thisPage = this.context.router.getCurrentPath();
		const thisPage = nextProps.location.pathname;
		if (this.state.lastPage !== thisPage) {
			if (nextProps.params.hasOwnProperty('projectId')) {
				ProjectActions.getNameById(nextProps.params.projectId)
				.then(res => {
					this.setState({title: res});
				});
			} else if (thisPage === '/projects') {
				this.setState({title: 'Projects'});
			}
			this.setState({lastPage: thisPage});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.updateTitle(nextProps);
	}

	componentWillMount() {
		super.componentWillMount();
		this.updateTitle(this.props);
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
