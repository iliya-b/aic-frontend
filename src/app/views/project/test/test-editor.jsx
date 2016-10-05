/* global URLSearchParams */
'use strict';

import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import ToolbarEditFile from 'app/components/toolbar/toolbar-edit-file';
import TestActions from 'app/actions/test';
import Gateway from 'app/libs/gateway';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LabeledSpan from 'app/components/form/labeled-span';
import 'brace/theme/github';
import 'app/libs/mode-aicdsl';

const debug = require('debug')('AiC:Views:TestEditor');

let projectId = null;
let testId = null;

const TestEditor = class extends React.Component {

	constructor(props) {
		super(props);
		let count = 0;
		this.state = {
			contents: 'Loading...',
			filename: 'test123.aicdsl',
			issues: {},
			notes: [],
			file: 'Loading...'
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
	}

	handleFilenameChange = e => {
		this.setState({filename: e});
	}

	render() {
		return (
			<div>
				<ToolbarEditFile
					title="Test Editor"
					icon="mdi mdi-puzzle"
					/>
				<AceEditor
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
			// return 'Edited test file: ' + this.props.params.testId;
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
