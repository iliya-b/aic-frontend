/* global URLSearchParams */
/* global File */
'use strict';

import React from 'react';
import AceEditor from 'react-ace';
import ToolbarEditFile from 'app/components/toolbar/toolbar-edit-file';
import TestActions from 'app/actions/test';
import Gateway from 'app/libs/gateway';
import 'brace/theme/github';
import 'app/libs/mode-aicdsl';

const debug = require('debug')('AiC:Views:TestEditor');

let projectId = null;
let testId = null;

const TestEditor = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			contents: '',
			filename: 'test123.aicdsl',
			issues: {},
			notes: [],
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
		this.setState({filename: e});
	}

	handleSaveFile = () => {
		const file = this.makeAsFile(this.state.contents);
		const filesArray = Array({projectId, file, progress: event => TestActions.uploadProgress(file, event)});
		TestActions.upload(filesArray, {includeRequest: true});

		const newState = Object.assign({}, this.state);
		newState.isSaveFileVisible = false;
		this.setState(newState);
	}

	makeAsFile = s => {
		const d = new Date();
		return new File([s], this.state.filename, {type: 'text/plain', lastModified: d});
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
				<AceEditor
					id="TE"
					mode="aicdsl"
					theme="github"
					annotations={this.state.issues}
					onChange={this.handleContentsChange}
					name="Test-Editor"
					editorProps={{$blockScrolling: true}}
					value={this.state.contents}
					/>
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
