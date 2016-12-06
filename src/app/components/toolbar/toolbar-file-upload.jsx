'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import {capimelize} from 'app/libs/helpers';
import TitleIcon from 'app/components/icon/title-icon';
import IconButtonApp from 'app/components/icon/icon-button-app';

// APP
const ToolbarFileUpload = class extends React.Component {

	render() {
		const styles = {
			toolbar: {
				justifyContent: 'initial'
			},
			button: {
				marginTop: 5
			},
			separator: {
				margin: '0 5px 0 0px',
				borderRight: '1px solid white',
				backgroundColor: 'rgba(0, 0, 0, 0.2)'
			},
			icon: {
				cursor: 'default',
				margin: '16px 36px 0px -6px',
				width: 25
			}
		};

		const buttons = [];
		if (this.props.uploadOpenVisible) {
			buttons.push(
				<IconButtonApp raised title="Upload file" className="btUploadOpen" key={1} style={styles.button} onClick={this.props.onClickUploadOpen} iconClassName="mdi mdi-cloud-upload"/>
				// <IconButton title="Upload file" className="btUploadOpen" key={1} style={styles.button} onClick={this.props.onClickUploadOpen}>
				// 	<FontIcon className="mdi mdi-cloud-upload" hoverColor="rgba(0, 0, 0, 0.87)"/>
				// </IconButton>
			);
		}
		if (this.props.uploadCloseVisible) {
			buttons.push(
				<IconButtonApp raised title="Close upload" className="btUploadClose" key={2} style={styles.button} onClick={this.props.onClickUploadClose} iconClassName="mdi mdi-close-circle"/>
				// <IconButton title="Close upload" className="btUploadClose" key={2} style={styles.button} onClick={this.props.onClickUploadClose}>
				// 	<FontIcon className="mdi mdi-close-circle" hoverColor="rgba(0, 0, 0, 0.87)"/>
				// </IconButton>
			);
		}
		if (this.props.createFileVisible) {
			buttons.push(
				<IconButtonApp raised title="Create file" className="btCreateFile" key={3} style={styles.button} onClick={this.props.onClickCreateFile} iconClassName="mdi mdi-plus"/>
				// <IconButton title="Create file" className="btCreateFile" key={3} style={styles.button} onClick={this.props.onClickCreateFile}>
				//	<FontIcon className="mdi mdi-plus" hoverColor="rgba(0, 0, 0, 0.87)"/>
				// </IconButton>
			);
		}
		if (this.props.editFileVisible) {
			buttons.push(
				<IconButtonApp raised title="Edit selected file" className="btEditSelected" key={4} style={styles.button} onClick={this.props.onClickEditFile} iconClassName="mdi mdi-pencil"/>
				// <IconButton title="Edit selected file" className="btEditSelected" key={4} style={styles.button} onClick={this.props.onClickEditFile}>
				// 	<FontIcon className="mdi mdi-pencil" hoverColor="rgba(0, 0, 0, 0.87)"/>
				// </IconButton>
			);
		}
		if (this.props.deleteFileVisible) {
			buttons.push(
				<IconButtonApp raised title="Delete selected files" className="btDeleteSelected" key={5} style={styles.button} onClick={this.props.onClickDeleteFile} iconClassName="mdi mdi-delete"/>
				// <IconButton title="Delete selected files" className="btDeleteSelected" key={5} style={styles.button} onClick={this.props.onClickDeleteFile}>
				// 	<FontIcon className="mdi mdi-delete" hoverColor="rgba(0, 0, 0, 0.87)"/>
				// </IconButton>
			);
		}
		if (this.props.compileFileVisible) {
			buttons.push(
				<IconButtonApp raised title="Compile selected file" className="btCompileSelected" key={6} style={styles.button} onClick={this.props.onClickCompileFile} iconClassName="mdi mdi-settings-box"/>
				// <IconButton title="Compile selected file" className="btCompileSelected" key={6} style={styles.button} onClick={this.props.onClickCompileFile}>
				// 	<FontIcon className="mdi mdi-settings-box" hoverColor="rgba(0, 0, 0, 0.87)"/>
				// </IconButton>
			);
		}
		if (this.props.informationVisible) {
			buttons.push(
				<IconButtonApp raised title="Information about selected file" className="btInformationSelected" key={7} style={styles.button} onClick={this.props.onClickInformationFile} iconClassName="mdi mdi-information"/>
				// <IconButton title="Compile selected file" className="btCompileSelected" key={6} style={styles.button} onClick={this.props.onClickCompileFile}>
				// 	<FontIcon className="mdi mdi-settings-box" hoverColor="rgba(0, 0, 0, 0.87)"/>
				// </IconButton>
			);
		}

		return (
			<Toolbar style={Object.assign(this.props.style || {}, styles.toolbar)}>
				<TitleIcon style={styles.icon} className={this.props.icon}/>
				<ToolbarGroup firstChild lastChild>
					<ToolbarTitle className={`txt${capimelize(this.props.title)}Title`} text={this.props.title} style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{buttons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarFileUpload.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarFileUpload.propTypes = {
	style: React.PropTypes.object,
	onClickUploadOpen: React.PropTypes.func,
	onClickUploadClose: React.PropTypes.func,
	onClickDeleteFile: React.PropTypes.func,
	onClickCreateFile: React.PropTypes.func,
	onClickEditFile: React.PropTypes.func,
	onClickCompileFile: React.PropTypes.func,
	onClickInformationFile: React.PropTypes.func,
	uploadOpenVisible: React.PropTypes.bool,
	uploadCloseVisible: React.PropTypes.bool,
	deleteFileVisible: React.PropTypes.bool,
	createFileVisible: React.PropTypes.bool,
	editFileVisible: React.PropTypes.bool,
	compileFileVisible: React.PropTypes.bool,
	informationVisible: React.PropTypes.bool,
	icon: React.PropTypes.string,
	title: React.PropTypes.string.isRequired
};

module.exports = ToolbarFileUpload;
