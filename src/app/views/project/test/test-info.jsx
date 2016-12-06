'use strict';

import React from 'react';
import ToolbarEditFile from 'app/components/toolbar/toolbar-edit-file';
import TestActions from 'app/actions/test';
import TestStore from 'app/stores/test';
import LabeledSpan from 'app/components/form/labeled-span';
import CodeBox from 'app/components/shared/code-box';
import AppPalette from 'app/configs/app-palette';

// const debug = require('debug')('AiC:Views:TestInfo');

let projectId;

const TestInfo = class extends React.Component {

	// constructor(props) {
	// 	super(props);
	// }

	handleBack = () => {
		this.context.router.push(`/projects/${projectId}/tests/`);
	}

	// handleCreateFile = () => {
	// 	const rawData = new URLSearchParams();
	// 	rawData.append('fullText', this.state.contents);
	// 	Gateway.xtext.update({resourceId: this.state.filename, rawData});
	// }

	// handleUpdateFile = () => {
	// 	Gateway.xtext.validate({resourceId: this.state.filename}).then(data => {
	// 		this.setState({issues: data});
	// 	});
	// }

	// handleContentsChange = e => {
	// 	this.setState({contents: e});
	// 	this.handleCreateFile();
	// 	this.handleUpdateFile();
	// 	if (!this.state.isSaveFileVisible) {
	// 		const newState = Object.assign({}, this.state);
	// 		newState.isSaveFileVisible = true;
	// 		this.setState(newState);
	// 	}
	// }

	// handleFilenameChange = e => {
	// 	const newState = Object.assign({}, this.state);
	// 	newState.filename = e.target.value;
	// 	this.setState(newState);
	// 	if (!this.state.isSaveFileVisible) {
	// 		const newState = Object.assign({}, this.state);
	// 		newState.isSaveFileVisible = true;
	// 		this.setState(newState);
	// 	}
	// }

	// handleSaveFile = () => {
	// 	debug(this.state.filename, this.state.metadata.filename);
	// 	if (this.props.params.testId === 'create' || this.state.filename !== this.state.metadata.filename) {
	// 		const file = this.makeAsFile(this.state.contents);
	// 		const filesArray = Array({projectId, file, progress: event => TestActions.uploadProgress(file, event)});
	// 		TestActions.upload(filesArray, {includeRequest: true});
	// 	} else {
	// 		const filename = this.state.filename;
	// 		const file = this.makeAsFile(this.state.contents);
	// 		TestActions.update({projectId, file, filename, testId}, {includeRequest: true});
	// 	}
	// 	const newState = Object.assign({}, this.state);
	// 	newState.isSaveFileVisible = false;
	// 	newState.saving = true;
	// 	this.setState(newState);
	// }

	// makeAsFile = s => {
	// 	const d = new Date();
	// 	return new File([s], this.state.filename, {type: 'text/plain', lastModified: d});
	// }

	render() {
		if (this.state && this.state.test && this.state.test.editor) {
			const hasError = this.state.test.editor.metadata.apk_status === 'ERROR' && this.state.test.editor.metadata.apk_status_reason;
			return (
				<div>
					<ToolbarEditFile
						title="Test Details"
						onClickBack={this.handleBack}
						/>
					<br/><br/>

					<LabeledSpan label="filename" value={this.state.test.editor.metadata.filename}/>
					<br/><br/>

					<LabeledSpan label="contents"/>
					<CodeBox style={{overflowY: 'hidden', marginTop: 0}}>{this.state.test.editor.contents}</CodeBox><br/>

					{hasError && (
						<div>
							<LabeledSpan label="APK Status Reason"/>
							<CodeBox style={{overflowY: 'hidden', color: AppPalette.errorColor, marginTop: 0}}>{this.state.test.editor.metadata.apk_status_reason}</CodeBox>
						</div>
					)}
				</div>
			);
		}
		return <div>Loading</div>;
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	componentDidMount() {
		projectId = this.props.params.projectId;
		const testId = this.props.params.testId;
		this.unsubscribe = TestStore.listen(this.handleStateChange);
		TestActions.initiate();
		TestActions.loadFile(projectId, testId);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
};

TestInfo.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

TestInfo.propTypes = {
	params: React.PropTypes.object
};

module.exports = TestInfo;
