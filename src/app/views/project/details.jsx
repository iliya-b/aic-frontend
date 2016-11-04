'use strict';

import React from 'react';
import ProjectStore from 'app/stores/project';
import ProjectActions from 'app/actions/project';
import LabeledSpan from 'app/components/form/labeled-span';

let projectId;

const ProjectDetails = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}
	// State handler
	handleStateChange = state => {
		this.setState(state);
	}

	render() {
		if (this.state.project && this.state.project.status === 'loaded') {
			const project = this.state.project.project;
			return (
				<div>
					<LabeledSpan label="ID" value={project.projectId}/><br/><br/>
					<LabeledSpan label="Name" value={project.projectName}/><br/><br/>
					<LabeledSpan label="Status" value={project.status}/><br/><br/>
					{project.statusReason && <div><LabeledSpan label="Status Message" value={project.statusReason}/><br/><br/></div>}
					<LabeledSpan label="Last Status Update" value={project.statusTs}/><br/><br/>
				</div>
			);
		}
		return <div>loading...</div>;
	}

	componentDidMount() {
		projectId = this.props.params.projectId;
		this.unsubscribe = ProjectStore.listen(this.handleStateChange);
		ProjectActions.load({projectId});
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

ProjectDetails.propTypes = {
	params: React.PropTypes.object
};

module.exports = ProjectDetails;
