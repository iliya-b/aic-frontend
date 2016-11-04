'use strict';

import React from 'react';
import ProjectStore from 'app/stores/project';
import ProjectActions from 'app/actions/project';
import LabeledSpan from 'app/components/form/labeled-span';
import timeHumanize from 'app/libs/time-humanize';

let projectId;
const vmtime2Euros = 0.00001;

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
			const styleLabel = {width: '100%'};
			return (
				<div>
					<LabeledSpan style={styleLabel} label="ID" value={project.projectId}/><br/><br/>
					<LabeledSpan style={styleLabel} label="Name" value={project.projectName}/><br/><br/>
					<LabeledSpan style={styleLabel} label="Status" value={project.status}/><br/><br/>
					{project.statusReason && <div><LabeledSpan style={styleLabel} label="Status Message" value={project.statusReason}/><br/><br/></div>}
					<LabeledSpan style={styleLabel} label="Last Status Update" value={project.statusTs}/><br/><br/>
					<LabeledSpan style={styleLabel} label="Total Machines Used" value={project.countAvms}/><br/><br/>
					<LabeledSpan style={styleLabel} label="Total Machines Uptime" value={timeHumanize(project.sumAvmsUptime)}/><br/><br/>
					<LabeledSpan style={styleLabel} label="Total Machines Uptime (seconds)" value={Math.round(project.sumAvmsUptime)}/><br/><br/>
					<LabeledSpan style={styleLabel} label={`Total in Euros (1 second = € ${vmtime2Euros})`} value={Math.round(project.sumAvmsUptime * vmtime2Euros)}/><br/><br/>
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
