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
	APKTestUploadDialog,
	AppUtils
} = require('app/components');
const {APKTestStore} = require('app/stores');
const {APKTestActions} = require('app/actions');

const ProjectApkTestList = class extends React.Component {

	constructor(props) {
		super(props);
		this._onUploadClick = this._onUploadClick.bind(this);
		this._onDeleteClick = this._onDeleteClick.bind(this);
		this._onItemCheck = this._onItemCheck.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
		this.reloadList = this.reloadList.bind(this);

		this.state = {apks: [], itemsToDelete: [], deleteClicked: false};
	}

	render() {
		const style = {
			toolbar: {
				// width: '512px',
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
			list: {
				// width: '500px'
			}

		};
		return (
			<div>
				<h2>APK Test List</h2>
				<Toolbar style={style.toolbar}>
					<ToolbarGroup style={style.toolbargroup1}>
						<IconButton onTouchTap={this._onUploadClick} ref="upload" iconClassName="mdi mdi-cloud-upload" tooltip="Upload APK file" title="Upload APK file" />
					</ToolbarGroup>
					<ReactCSSTransitionGroup transitionName="showHideTransition">
						{this.state.itemsToDelete.length > 0 ? (
						<ToolbarGroup style={style.toolbargroup2} key="deleteItems">
							<IconButton onTouchTap={this._onDeleteClick} iconClassName="mdi mdi-delete" tooltip="Delete selected" title="Delete selected" />
						</ToolbarGroup>
						) : ''}
					</ReactCSSTransitionGroup>
				</Toolbar>
				<APKTestUploadDialog ref="uploadDialog" reload={this.reloadList} />

				{this.state.apks && this.state.apks.length > 0 ? (
				<List style={style.list} listItems={this.state.apks} onItemTap={this._onItemTap} onCheck={this._onItemCheck} />
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
			APKTestActions.deleteSelected(this.state.itemsToDelete);
		}
	}

	_onItemCheck(evt, index) {
		const apkId = this.state.apks[index].id;
		APKTestActions.toggleDelete(apkId);
	}

	reloadList() {
		APKTestActions.load(this.state.projectId);
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
		const projectId = AppUtils.getProjectIdFromRouter(this.context.router);
		this.unsubscribe = APKTestStore.listen(this._onStateChange);
		APKTestActions.setProjectId(projectId);
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

ProjectApkTestList.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = ProjectApkTestList;
