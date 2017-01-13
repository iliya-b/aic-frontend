'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import IconButton from 'material-ui/IconButton';
import {capimelize} from 'app/libs/helpers';
import TitleIcon from 'app/components/icon/title-icon';
import IconList from 'app/components/icon/icon-list';

// APP
const ToolbarEditFile = class extends React.Component {

	render() {
		const styleSeparator = {
			margin: '0 5px 0 0px',
			borderRight: '1px solid white',
			backgroundColor: 'rgba(0, 0, 0, 0.2)'
		};
		const styleIcon = {
			margin: '4px 22px 0 -18px'
		};
		const styleButtons = {marginTop: 5};
		const styleToolbar = {justifyContent: 'initial'};

		const dirt = this.props.isDirty;

		const buttons = [];
		const onClick = {};

		if (this.props.onClickSaveFile) {
			buttons.push({
				id: 'save',
				tooltip: dirt ? 'Save changes' : 'File saved',
				tooltipPosition: 'top-center',
				fontIcon: dirt ? 'mdi mdi-content-save' : 'mdi mdi-check',
				disabled: !dirt
			});
			onClick.save = this.props.onClickSaveFile;
		}
		const iconListProps = {
			buttons,
			style: styleButtons,
			onClick,
			iconClassNamePrefix: 'btTest',
			selectedId: null,
			raised: true
		};
		const renderedButtons = buttons.length ? <IconList {...iconListProps}/> : null;

		return (
			<Toolbar style={Object.assign(this.props.style || {}, styleToolbar)}>
				<IconButton style={styleIcon} title="Back to list" tooltip="Back to list" tooltipPosition="top-center" onClick={this.props.onClickBack}>
					<TitleIcon className="mdi mdi-arrow-left-bold"/>
				</IconButton>
				<ToolbarGroup firstChild lastChild>
					<ToolbarTitle className={`txt${capimelize(this.props.title)}Title`} text={this.props.title}/>
					{renderedButtons !== null && <ToolbarSeparator style={styleSeparator}/>}
					{renderedButtons}
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
	onClickSaveFile: React.PropTypes.func,
	title: React.PropTypes.string.isRequired,
	onClickBack: React.PropTypes.func,
	isDirty: React.PropTypes.bool,
	isSaving: React.PropTypes.bool
};

module.exports = ToolbarEditFile;
