'use strict';

// React
const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// Material design
const mui = require('material-ui');
const {
	Toolbar,
	ToolbarGroup,
	IconButton
} = mui;

// APP
const {
	List,
	APKUploadDialog,
	AppUtils
} = require('app/components');
const {APKStore} = require('app/stores');
const {APKActions} = require('app/actions');

let projectId = null;

const ProjectApkList = class extends React.Component {

	constructor(props) {
		super(props);
		this._onUploadClick = this._onUploadClick.bind(this);
		this._onDeleteClick = this._onDeleteClick.bind(this);
		this._onItemCheck = this._onItemCheck.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
		this.state = {apks: [], itemsToDelete: [], deleteClicked: false};
	}

	render() {
		const style = {
			toolbar: {
				paddingLeft: '10px'
			},
			toolbargroup1: {
				paddingTop: '3px',
				float: 'left'
			},
			toolbargroup2: {
				paddingRight: '6px',
				float: 'right'
			},
			paper: {
				textAlign: 'center',
				padding: '20px'
			},
			iconDelete: {
				color: this.state.deleteClicked ? 'rgba(0,0,0,0.3)' : 'rgba(0, 0, 0, 0.87)'
			}
		};
		return (
			<div>
				<h2>APK List</h2>
				<Toolbar style={style.toolbar}>
					<ToolbarGroup style={style.toolbargroup1}>
						<IconButton onTouchTap={this._onUploadClick} ref="upload" iconClassName="mdi mdi-cloud-upload" tooltip="Upload APK file" title="Upload APK file" />
					</ToolbarGroup>
					<ReactCSSTransitionGroup transitionName="showHideTransition">
						{this.state.itemsToDelete && this.state.itemsToDelete.length > 0 ? (
						<ToolbarGroup style={style.toolbargroup2} key="deleteItems">
							<IconButton iconStyle={style.iconDelete} onTouchTap={this._onDeleteClick} iconClassName="mdi mdi-delete" tooltip="Delete selected" title="Delete selected" />
						</ToolbarGroup>
						) : ''}
					</ReactCSSTransitionGroup>
				</Toolbar>

				<APKUploadDialog ref="uploadDialog" reload={this.reloadList} />

				{this.state.apks && this.state.apks.length > 0 ? (
				<List style={style.list} listItems={this.state.apks} onCheck={this._onItemCheck} />
				) : null}
			</div>
		);
	}

	_onUploadClick() {
		this.refs.uploadDialog.show();
	}

	_onDeleteClick() {
		// Avoid multiple clicks
		// TODO: Can be changed with disabled button on the new version of
		// material ui
		if (this.state.deleteClicked === false) {
			this.setState({deleteClicked: true});
			APKActions.deleteSelected(this.state.itemsToDelete);
		}
	}

	_onItemCheck(evt, index) {
		const apkId = this.state.apks[index].id;
		APKActions.toggleDelete(apkId);
	}

	reloadList() {
		APKActions.load(projectId);
	}

	_onStateChange(state) {
		this.setState(state);
		switch (this.state.status) {
			case 'reloadList':
				this.reloadList();
				break;
			case 'deleteFinished':
				this.setState({deleteClicked: false});
				break;
			default:
				break;
		}
	}

	componentDidMount() {
		projectId = AppUtils.getProjectIdFromRouter(this.context.router);
		this.unsubscribe = APKStore.listen(this._onStateChange);
		this.reloadList();
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

ProjectApkList.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = ProjectApkList;
