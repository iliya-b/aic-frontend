'use strict';

// Vendors
import React from 'react';
import Paper from 'material-ui/lib/paper';

// APP
import ToolbarAPK from 'app/components/toolbar/toolbar-apk';
import TableAPK from 'app/components/table/table-apk';
import Dropzone from 'app/components/shared/dropzone';

// const apkList = [
// 	{
// 		id: 'abc',
// 		filename: 'def',
// 		status: 'uploaded'
// 	},
// 	{
// 		id: '123',
// 		filename: '456',
// 		status: 'sending'
// 	}
// ];

const apkList = [];

const APKManager = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogUploadAPKOpen: false,
			selectFileIndexes: []
		};
		this.handleClickUploadOpen = this.toogleDialogUploadAPK.bind(this, true);
		this.handleClickUploadClose = this.toogleDialogUploadAPK.bind(this, false);
		this.handleDropFiles = () => {};
		this.handleDeleteSelected = () => {};
		this.handleSelectFiles = this.handleSelectFiles.bind(this);
	}

	toogleDialogUploadAPK(open) {
		this.setState({dialogUploadAPKOpen: open});
	}

	handleSelectFiles(fileIndexes) {
		let finalFileIndexes;

		if (fileIndexes === 'all') {
			finalFileIndexes = apkList.map((v, i) => {
				return i;
			});
		} else if (fileIndexes === 'none') {
			finalFileIndexes = [];
		} else {
			finalFileIndexes = fileIndexes;
		}

		this.setState({selectFileIndexes: finalFileIndexes});
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
				<Dropzone onDrop={this.handleDropFiles} style={styles.dropzone.style} activeStyle={styles.dropzone.activeStyle} id="fieldAPKUpload" name="fieldAPKUpload" title="fieldAPKUpload">
					<div>You can drop some files here, or click to select files to upload.</div>
				</Dropzone>
			);
		}

		let table;
		if (apkList.length) {
			table = (
				<TableAPK
					onRowSelection={this.handleSelectFiles}
					list={apkList}
					selected={this.state.selectFileIndexes}
					/>
			);
		} else {
			table = (
				<Paper style={styles.noAPKs}>
					No files found.
				</Paper>
			);
		}

		return (
			<div>
				<ToolbarAPK
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
};

APKManager.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = APKManager;
