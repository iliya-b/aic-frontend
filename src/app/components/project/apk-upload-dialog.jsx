'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {Dialog, FlatButton, Toolbar, ToolbarGroup, IconButton} = mui;

// Vendors
// const Dropzone = require('react-dropzone');

// APP
const ObjectList = require('app/components/shared/object-list/object-list');
const Dropzone = require('app/components/shared/goby-dropzone');
const AppUtils = require('app/components/shared/app-utils');
const {APKUploadStore} = require('app/stores');
const {APKUploadActions} = require('app/actions');

const APKUploadDialog = class extends React.Component {

	constructor(props) {
		super(props);

		this.state = null;

		this._onCancel = this._onCancel.bind(this);
		this._onDrop = this._onDrop.bind(this);
		this._onCleanClick = this._onCleanClick.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
	}

	render() {
		const {
			// style,
			...other
		} = this.props;

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
			toolbargroup: {
				paddingTop: '3px',
				float: 'left'
			},
			objectlist: {
				maxHeight: '200px',
				overflowY: 'auto'
			},
			cleanButton: {
				marginLeft: '-14px'
			}
		};

		const loginActions = [
			<FlatButton
				key="loginActionCancel"
				label="Close"
				title="Close"
				href="#"
				secondary
				onClick={this._onCancel}
				/>
		];

		return (
			<Dialog title="APK Upload" actions={loginActions} {...other} ref="dialogIn" >
				<div>
				<form>
					{this.state && this.state.files && this.state.files.length > 0 ? (
						<div>
						<Toolbar style={styles.toolbar}>
							<ToolbarGroup style={styles.toolbargroup}>
								<IconButton style={styles.cleanButton} onTouchTap={this._onCleanClick} ref="upload" iconClassName="mdi mdi-broom" tooltip="Clean finished files" title="Clean finished files" />
							</ToolbarGroup>
						</Toolbar>
						<ObjectList style={styles.objectlist} objectListItems={this.state.files} />
						</div>
					) : ''}
					<Dropzone onDrop={this._onDrop} style={styles.dropzone.style} activeStyle={styles.dropzone.activeStyle} id="fieldAPKUpload" name="fieldAPKUpload" title="fieldAPKUpload">
						<div>Try dropping some files here, or click to select files to upload.</div>
					</Dropzone>
				</form>
				</div>
			</Dialog>
			);
	}

	show() {
		this.refs.dialogIn.show();
	}

	_onDrop(files) {
		APKUploadActions.drop(this.state.projectId, files);
	}

	_onCleanClick() {
		APKUploadActions.clean();
	}

	_onCancel(e) {
		e.preventDefault();
		this.refs.dialogIn.dismiss();
	}

	_onStateChange(newState) {
		if (newState.hasOwnProperty('shouldReloadAPKList') && newState.shouldReloadAPKList === true) {
			this.props.reload();
		}
		this.setState(newState);
	}

	componentDidMount() {
		const projectId = AppUtils.getProjectIdFromRouter(this.context.router);
		APKUploadActions.setProjectId(projectId);
		this.unsubscribe = APKUploadStore.listen(this._onStateChange);
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

APKUploadDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

APKUploadDialog.propTypes = {
	reload: React.PropTypes.func
};

module.exports = APKUploadDialog;
