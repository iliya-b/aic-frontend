'use strict';

// Vendors
import React from 'react';
import Paper from 'material-ui/Paper';
const debug = require('debug')('AiC:Views:APKManager');

// APP
import ToolbarFileUpload from 'app/components/toolbar/toolbar-file-upload';
import TableFiles from 'app/components/table/table-files';
import TableProgress from 'app/components/table/table-progress';
import Dropzone from 'app/components/shared/dropzone';
import APKActions from 'app/actions/apk';
import APKStore from 'app/stores/apk';

let projectId = null;

const APKManager = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogUploadAPKOpen: false,
			selectFileIndexes: []
		};
		this.handleClickUploadOpen = this.toogleDialogUploadAPK.bind(this, true);
		this.handleClickUploadClose = this.toogleDialogUploadAPK.bind(this, false);
		this.handleDropFiles = files => {
			const filesArray = files.map(file => {
				return {projectId, file, progress: event => APKActions.uploadProgress(file, event)};
			});
			APKActions.upload(filesArray);
		};
		this.handleDeleteSelected = () => {
			debug('handleDeleteSelected');
			const apksToDelete = this.state.selectFileIndexes.map(i => {
				return {projectId, apkId: this.state.apk.apks[i].id};
			});
			const newState = Object.assign({}, this.state);
			newState.selectFileIndexes = [];
			this.setState(newState);
			APKActions.delete(apksToDelete);
		};
		this.handleSelectFiles = this.handleSelectFiles.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
	}

	toogleDialogUploadAPK(open) {
		const newState = Object.assign({}, this.state);
		newState.dialogUploadAPKOpen = open;
		this.setState(newState);
	}

	handleSelectFiles(fileIndexes) {
		let finalFileIndexes;

		if (fileIndexes === 'all') {
			finalFileIndexes = this.state.apk.apks.map((v, i) => {
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

	handleStateChange(newState) {
		const mergedState = Object.assign({}, this.state, newState);
		debug('handleStateChange', newState, mergedState);
		switch (mergedState.apk.status) {
			case 'initCompleted':
			case 'uploadCompleted':
			case 'deleteCompleted':
				APKActions.list({projectId});
				break;
			default:
				break;
		}
		this.setState(mergedState);
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
			noAPKs: {
				padding: 20,
				textAlign: 'center'
			}
		};

		let uploadDropzone = null;
		if (this.state.dialogUploadAPKOpen) {
			uploadDropzone = (
				<div>
					<Dropzone onDrop={this.handleDropFiles} style={styles.dropzone.style} activeStyle={styles.dropzone.activeStyle} id="fieldAPKUpload" name="fieldAPKUpload" title="fieldAPKUpload">
						<div>You can drop some files here, or click to select files to upload.</div>
					</Dropzone>
					<TableProgress
						list={this.state.apk ? this.state.apk.uploadingApks : []}
						/>
				</div>
			);
		}

		let table;
		if (this.state.apk && this.state.apk.apks && this.state.apk.apks.length) {
			table = (
				<TableFiles
					onRowSelection={this.handleSelectFiles}
					list={this.state.apk.apks}
					selected={this.state.selectFileIndexes}
					type="APKs"
					/>
			);
		} else if (this.state.apk && this.state.apk.status === 'listCompleted') {
			table = (
				<Paper className="txtAPKManagerListInfo" style={styles.noAPKs}>
					No files found.
				</Paper>
			);
		} else {
			table = (
				<Paper className="txtAPKManagerListInfo" style={styles.noAPKs}>
					Loading files...
				</Paper>
			);
		}

		return (
			<div>
				<ToolbarFileUpload
					title="APK Manager"
					icon="mdi mdi-puzzle"
					uploadOpenVisible={!this.state.dialogUploadAPKOpen}
					uploadCloseVisible={this.state.dialogUploadAPKOpen}
					deleteFileVisible={this.state.selectFileIndexes.length > 0}
					onClickUploadOpen={this.handleClickUploadOpen}
					onClickUploadClose={this.handleClickUploadClose}
					onClickDeleteFile={this.handleDeleteSelected}
					/>
				{uploadDropzone}
				{table}
			</div>
		);
	}

	componentDidMount() {
		projectId = this.props.params.projectId;
		this.unsubscribe = APKStore.listen(this.handleStateChange);
		APKActions.initiate();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
};

APKManager.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

APKManager.propTypes = {
	params: React.PropTypes.object
};

module.exports = APKManager;
