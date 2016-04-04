'use strict';

// Vendors
import React from 'react';
import Paper from 'material-ui/lib/paper';
const debug = require('debug')('AiC:Views:CameraAssets');

// APP
import ToolbarFileUpload from 'app/components/toolbar/toolbar-file-upload';
import TableFiles from 'app/components/table/table-files';
import TableProgress from 'app/components/table/table-progress';
import Dropzone from 'app/components/shared/dropzone';
import CameraActions from 'app/actions/camera';
import CameraStore from 'app/stores/camera';

let projectId = null;

const CameraAssets = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogUploadAPKOpen: false,
			selectFileIndexes: []
		};
		this.handleClickUploadOpen = this.toogleDialogUploadAPK.bind(this, true);
		this.handleClickUploadClose = this.toogleDialogUploadAPK.bind(this, false);
		this.handleDropFiles = files => {
			CameraActions.upload(projectId, files);
		};
		this.handleDeleteSelected = () => {
			debug('handleDeleteSelected');
			const apksToDelete = this.state.selectFileIndexes.map(i => {
				return this.state.camera.files[i].id;
			});
			const newState = Object.assign({}, this.state);
			newState.selectFileIndexes = [];
			this.setState(newState);
			CameraActions.delete(projectId, apksToDelete);
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
			finalFileIndexes = this.state.camera.files.map((v, i) => {
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
		switch (mergedState.camera.status) {
			case 'initCompleted':
			case 'uploadCompleted':
			case 'deleteCompleted':
				CameraActions.list(projectId);
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
						list={this.state.camera ? this.state.camera.uploadingFiles : []}
						/>
				</div>
			);
		}

		let table;
		if (this.state.camera && this.state.camera.files && this.state.camera.files.length) {
			table = (
				<TableFiles
					onRowSelection={this.handleSelectFiles}
					list={this.state.camera.files}
					selected={this.state.selectFileIndexes}
					type="CameraAssets"
					/>
			);
		} else if (this.state.camera && this.state.camera.status === 'listCompleted') {
			table = (
				<Paper style={styles.noAPKs}>
					No files found.
				</Paper>
			);
		} else {
			table = (
				<Paper style={styles.noAPKs}>
					Loading files...
				</Paper>
			);
		}

		return (
			<div>
				<ToolbarFileUpload
					title="Camera Assets"
					icon="mdi mdi-camera"
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
		this.unsubscribe = CameraStore.listen(this.handleStateChange);
		CameraActions.initiate();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
};

CameraAssets.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

CameraAssets.propTypes = {
	params: React.PropTypes.object
};

module.exports = CameraAssets;
