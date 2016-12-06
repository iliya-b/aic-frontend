'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import ToolbarFileUpload from 'app/components/toolbar/toolbar-file-upload';
import TableTestFiles from 'app/components/table/table-test-files';
import TableProgress from 'app/components/table/table-progress';
import Dropzone from 'app/components/shared/dropzone';
import TestActions from 'app/actions/test';
import TestStore from 'app/stores/test';

const debug = require('debug')('AiC:Views:TestManager');

let projectId = null;

const TestManager = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogUploadTestOpen: false,
			textEditorOpen: false,
			testsTableVisible: true,
			selectFileIndexes: []
		};
	}

	onChange = editorState => this.setState({editorState})
	handleClickUploadOpen = () => this.setState({dialogUploadTestOpen: true})
	handleClickUploadClose = () => this.setState({dialogUploadTestOpen: false})

	handleDeleteSelected = () => {
		debug('handleDeleteSelected');
		const testsToDelete = this.state.selectFileIndexes.map(i => {
			return {projectId, testId: this.state.test.tests[i].id};
		});
		const newState = Object.assign({}, this.state);
		newState.selectFileIndexes = [];
		this.setState(newState);
		TestActions.delete(testsToDelete, {includeRequest: true});
	}

	handleDropFiles = files => {
		const filesArray = files.map(file => {
			return {projectId, file, progress: event => TestActions.uploadProgress(file, event)};
		});
		TestActions.upload(filesArray, {includeRequest: true});
	}

	handleSelectFiles = fileIndexes => {
		let finalFileIndexes;

		if (fileIndexes === 'all') {
			finalFileIndexes = this.state.test.tests.map((v, i) => {
				return i;
			});
		} else if (fileIndexes === 'none') {
			finalFileIndexes = [];
		} else {
			finalFileIndexes = fileIndexes;
		}

		const newState = Object.assign({}, this.state);
		newState.selectFileIndexes = finalFileIndexes;
		this.setState(newState);
	}

	handleStateChange = newState => {
		const mergedState = Object.assign({}, this.state, newState);
		debug('handleStateChange', newState, mergedState);
		switch (mergedState.test.status) {
			case 'initCompleted':
			case 'uploadCompleted':
			case 'deleteCompleted':
			case 'compileCompleted':
				TestActions.list({projectId});
				break;
			default:
				break;
		}
		this.setState(mergedState);
	}

	handleClickCreateFile = () => {
		this.context.router.push(`/projects/${projectId}/tests/create/editor`);
	}

	handleEnterEditFile = testId => {
		this.context.router.push(`/projects/${projectId}/tests/${testId}/editor`);
	}

	handleClickInformationFile = () => {
		debug('handleClickInformationFile');
		const testId = this.getSelectedId();
		this.context.router.push(`/projects/${projectId}/tests/${testId}`);
	}

	handleClickEditFile = () => {
		const testId = this.getSelectedId();
		this.handleEnterEditFile(testId);
	}

	getSelectedId = () => {
		return this.state.test.tests[this.state.selectFileIndexes[0]].id;
	}

	handleClickCompileFile = () => {
		const testId = this.getSelectedId();
		TestActions.compile({projectId, testId});
	}

	render() {
		const styles = {
			dropzone: {
				style: {
					width: '100%',
					lineHeight: '100px',
					borderWidth: 2,
					borderColor: '#666',
					borderStyle: 'dashed',
					borderRadius: 5,
					textAlign: 'center',
					boxSizing: 'border-box'
				},
				activeStyle: {
					borderStyle: 'solid',
					backgroundColor: '#eee'
				}
			},
			noTests: {
				padding: 20,
				textAlign: 'center'
			}
		};

		let uploadDropzone = null;
		if (this.state.dialogUploadTestOpen) {
			uploadDropzone = (
				<div>
					<Dropzone
						onDrop={this.handleDropFiles}
						style={styles.dropzone.style}
						activeStyle={styles.dropzone.activeStyle}
						id="fieldTestUpload"
						name="fieldTestUpload"
						title="fieldTestUpload"
						>
						<div>You can drop some files here, or click to select files to upload.</div>
					</Dropzone>
					<TableProgress
						list={this.state.test ? this.state.test.uploadingTests : []}
						/>
				</div>
			);
		}

		let table;
		if (this.state.test && this.state.test.tests && this.state.test.tests.length) {
			table = (
				<TableTestFiles
					onRowSelection={this.handleSelectFiles}
					list={this.state.test.tests}
					selected={this.state.selectFileIndexes}
					type="Tests"
					key="1"
					/>
			);
		} else if (this.state.test && this.state.test.status === 'listCompleted') {
			table = (
				<Paper className="txtTestManagerListInfo" style={styles.noTests}>
					No files found.
				</Paper>
			);
		} else {
			table = (
				<Paper className="txtTestManagerListInfo" style={styles.noTests}>
					Loading files...
				</Paper>
			);
		}

		return (
			<div>
				<ToolbarFileUpload
					title="Test Manager"
					icon="mdi mdi-pencil"
					uploadOpenVisible={!this.state.dialogUploadTestOpen}
					uploadCloseVisible={this.state.dialogUploadTestOpen}
					deleteFileVisible={this.state.selectFileIndexes.length > 0}
					editFileVisible={this.state.selectFileIndexes.length === 1}
					compileFileVisible={this.state.selectFileIndexes.length === 1}
					informationVisible={this.state.selectFileIndexes.length === 1}
					createFileVisible
					onClickUploadOpen={this.handleClickUploadOpen}
					onClickUploadClose={this.handleClickUploadClose}
					onClickDeleteFile={this.handleDeleteSelected}
					onClickCreateFile={this.handleClickCreateFile}
					onClickEditFile={this.handleClickEditFile}
					onClickCompileFile={this.handleClickCompileFile}
					onClickInformationFile={this.handleClickInformationFile}
					/>
				{uploadDropzone}
				{table}
			</div>
		);
	}

	componentDidMount() {
		projectId = this.props.params.projectId;
		this.unsubscribe = TestStore.listen(this.handleStateChange);
		TestActions.initiate();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
};

TestManager.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

TestManager.propTypes = {
	params: React.PropTypes.object
};

module.exports = TestManager;
