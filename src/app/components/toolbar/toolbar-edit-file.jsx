'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {capimelize} from 'app/libs/helpers';

// APP
const ToolbarEditFile = class extends React.Component {

	render() {
		const styles = {
			toolbar: {
				justifyContent: 'initial'
			},
			button: {
				marginTop: 5
			},
			separator: {
				margin: '0 5px 0 0px'
			},
			icon: {
				cursor: 'default',
				margin: '16px 36px 0px -6px',
				width: 25
			}
		};

		const buttons = [];
		if (this.props.deleteFileVisible) {
			buttons.push(
				<IconButton title="Delete file" className="btDeleteSelected" key={5} style={styles.button} onClick={this.props.onClickDeleteFile}>
					<FontIcon className="mdi mdi-delete" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
				</IconButton>
			);
		}

		if (this.props.saveFileVisible) {
			buttons.push(
				<IconButton title="Save file" className="btSaveSelected" key={5} style={styles.button} onClick={this.props.onClickSaveFile}>
					<FontIcon className="mdi mdi-settings" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.87)"/>
				</IconButton>
			);
		}

		return (
			<Toolbar style={Object.assign(this.props.style || {}, styles.toolbar)}>
				<FontIcon style={styles.icon} className="mdi mdi-pencil" color="rgba(0, 0, 0, 0.4)" hoverColor="rgba(0, 0, 0, 0.4)"/>
				<ToolbarGroup firstChild lastChild>
					<ToolbarTitle className={`txt${capimelize(this.props.title)}Title`} text={this.props.title} style={styles.title}/>
					<ToolbarSeparator style={styles.separator}/>
					{buttons}
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarEditFile.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarEditFile.propTypes = {
	style: React.PropTypes.object,
	onClickDeleteFile: React.PropTypes.func,
	deleteFileVisible: React.PropTypes.bool,
	onClickSaveFile: React.PropTypes.func,
	saveFileVisible: React.PropTypes.bool,
	icon: React.PropTypes.string,
	title: React.PropTypes.string.isRequired
};

module.exports = ToolbarEditFile;
