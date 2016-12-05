'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import AceEditor from 'react-ace';
import ToolbarEditFile from 'app/components/toolbar/toolbar-edit-file';
import TestActions from 'app/actions/test';
import TestStore from 'app/stores/test';
import 'brace/theme/github';
import 'app/libs/mode-aicdsl';

const debug = require('debug')('AiC:Views:TestEditor');

let projectId;

const TestEditor = class extends React.Component {

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

	handleSaveFile = () => {
		const filename = this.state.test.editor.metadata.filename;
		const contents = this.state.test.editor.contents;
		const testId = this.state.test.editor.testId;
		TestActions.handleSaveTest(testId, projectId, filename, contents);
	}

	render() {
		if (this.state && this.state.test && this.state.test.editor) {
			return (
				<div>
					<ToolbarEditFile
						title="Test Editor"
						onClickSaveFile={this.handleSaveFile}
						onClickBack={this.handleBack}
						isDirty={this.state.test.editor.isDirty}
						isSaving={this.state.test.editor.isSaving}
						/>
					<br/>
					<TextField
						name="testEditorFilename"
						floatingLabelFixed
						floatingLabelText="filename"
						onChange={TestActions.handleFilenameChange}
						value={this.state.test.editor.metadata.filename}
						/>
					<br/>
					<br/>
					<AceEditor
						id="test-editor"
						mode="aicdsl"
						theme="github"
						annotations={this.state.test.editor.issues}
						onChange={TestActions.handleContentsChange}
						name="Test-Editor"
						editorProps={{$blockScrolling: true}}
						value={this.state.test.editor.contents}
						/>
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

TestEditor.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

TestEditor.propTypes = {
	params: React.PropTypes.object
};

module.exports = TestEditor;
