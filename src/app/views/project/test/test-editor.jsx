/* global URLSearchParams */
/* global File */
'use strict';

import React from 'react';
import AceEditor from 'react-ace';
import ToolbarEditFile from 'app/components/toolbar/toolbar-edit-file';
import TestActions from 'app/actions/test';
import Gateway from 'app/libs/gateway';
import DialogTestSaved from 'app/components/dialog/dialog-test-saved';
import 'brace/theme/github';
import 'app/libs/mode-aicdsl';

const debug = require('debug')('AiC:Views:TestEditor');

let projectId = null;
let testId = null;

const TestEditor = class extends React.Component {

	constructor(props) {
		super(props);
		const filename = 'newfile.aic';
		this.state = {
			contents: '',
			// TODO: information is repeated, really needed two times?
			metadata: {filename},
			filename,
			issues: {},
			notes: [],
			saving: false,
			isSaveFileVisible: false
		};
	}

	handleCreateFile = () => {
		const rawData = new URLSearchParams();
		rawData.append('fullText', this.state.contents);
		Gateway.xtext.update({resourceId: this.state.filename, rawData});
	}

	handleUpdateFile = () => {
		Gateway.xtext.validate({resourceId: this.state.filename}).then(data => {
			this.setState({issues: data});
		});
	}

	handleContentsChange = e => {
		this.setState({contents: e});
		this.handleCreateFile();
		this.handleUpdateFile();
		if (!this.state.isSaveFileVisible) {
			const newState = Object.assign({}, this.state);
			newState.isSaveFileVisible = true;
			this.setState(newState);
		}
	}

	handleFilenameChange = e => {
		const newState = Object.assign({}, this.state);
		newState.filename = e.target.value;
		this.setState(newState);
		if (!this.state.isSaveFileVisible) {
			const newState = Object.assign({}, this.state);
			newState.isSaveFileVisible = true;
			this.setState(newState);
		}
	}

	handleSaveFile = () => {
		debug(this.state.filename, this.state.metadata.filename);
		if (this.props.params.testId === 'create' || this.state.filename !== this.state.metadata.filename) {
			const file = this.makeAsFile(this.state.contents);
			const filesArray = Array({projectId, file, progress: event => TestActions.uploadProgress(file, event)});
			TestActions.upload(filesArray, {includeRequest: true});
		} else {
			const filename = this.state.filename;
			const file = this.makeAsFile(this.state.contents);
			TestActions.update({projectId, file, filename, testId}, {includeRequest: true});
		}
		const newState = Object.assign({}, this.state);
		newState.isSaveFileVisible = false;
		newState.saving = true;
		this.setState(newState);
	}

	makeAsFile = s => {
		const d = new Date();
		return new File([s], this.state.filename, {type: 'text/plain', lastModified: d});
	}

	handleCloseDialog = () => {
		const newState = Object.assign({}, this.state);
		newState.saving = false;
		this.setState(newState);
	}

	render() {
		return (
			<div>
				<ToolbarEditFile
					title="Test Editor"
					icon="mdi mdi-puzzle"
					saveFileVisible={this.state.isSaveFileVisible}
					onClickSaveFile={this.handleSaveFile}
					/>
				<br/><input type="text" name="Filemame" placeholder={this.state.filename} onChange={this.handleFilenameChange}/><br/>
				<br/>
				<AceEditor
					id="test-editor"
					mode="aicdsl"
					theme="github"
					annotations={this.state.issues}
					onChange={this.handleContentsChange}
					name="Test-Editor"
					editorProps={{$blockScrolling: true}}
					value={this.state.contents}
					/>
				<DialogTestSaved open={this.state.saving} onRequestClose={this.handleCloseDialog}/>
			</div>
		);
	}

	isEdit() {
		if (this.props.params.testId === 'create') {
			return false;
		}
		return true;
	}

	importFile() {
		projectId = this.props.params.projectId;
		testId = this.props.params.testId;
		if (this.isEdit()) {
			TestActions.download({projectId, testId}).then(data => this.setState({contents: data}));
			// TestActions.show({projectId, testId}).then(data => this.setState({metadata: data}));
		}
	}

	componentDidMount() {
		TestActions.initiate();
		this.importFile();
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
