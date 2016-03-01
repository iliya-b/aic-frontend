'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {Dialog,
			FlatButton,
			Table,
			TableBody,
			TableRow,
			TableRowColumn,
			Paper} = mui;

// APP
const AppUtils = require('app/components/shared/app-utils');
const {APKTestStore} = require('app/stores');
const {APKTestActions} = require('app/actions');

let projectId = null;

const APKTestSelectionDialog = class extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			apks: [],
			apksData: [],
			selectedIndex: null
		};

		this._onCancel = this._onCancel.bind(this);
		this._onRowSelection = this._onRowSelection.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
	}

	render() {
		const {
			// style,
			...other
		} = this.props;

		// const styles = {
		// 	objectlist: {
		// 		maxHeight: '200px',
		// 		overflowY: 'auto'
		// 	}
		// };

		const actions = [
			<FlatButton
				key="cancel"
				label="Cancel"
				title="Cancel"
				href="#"
				secondary
				onClick={this._onCancel}
				/>,
			<FlatButton
				key="submit"
				label="Select"
				title="Select"
				href="#"
				primary
				onClick={this._onSubmit}
				/>
		];

		const rows = this.state.apksData.map(function (item, index) {
			const isSelected = this.state.selectedIndex ? this.state.selectedIndex.indexOf(index) > -1 : false;
			return (
				<TableRow key={index} selected={isSelected}>
					<TableRowColumn>{item.name.content}</TableRowColumn>
				</TableRow>
			);
		}, this);

		return (
			<Dialog title="APK Test Selection" actions={actions} {...other} ref="dialogIn" >
				<Paper>
					<Table
						height="50vh"
						showRowHover
						selectable
						multiSelectable
						canSelectAll
						deselectOnClickaway={false}
						onRowSelection={this._onRowSelection}
						>
						<TableBody />
						<TableBody>
						{rows}
						</TableBody>
					</Table>
				</Paper>
			</Dialog>
			);
	}

	show() {
		this.refs.dialogIn.show();
		this.setState({selectedIndex: []});
		// TODO: Previous selection
	}

	_onRowSelection(selectedRows) {
		this.setState({selectedIndex: selectedRows});
	}

	_onCancel(e) {
		e.preventDefault();
		this.refs.dialogIn.dismiss();
	}

	_onSubmit(e) {
		e.preventDefault();
		this.props.onSelect(this.state.apks.filter(function (item, index) {
			return this.state.selectedIndex.indexOf(index) > -1;
		}, this));
		this.refs.dialogIn.dismiss();
	}

	reloadList() {
		APKTestActions.load(projectId);
	}

	_onStateChange(state) {
		state.apksData = state.apks.map(function (item, index) {
			const isSelected = this.state.selectedIndex ? this.state.selectedIndex.indexOf(index) > -1 : false;
			return {name: {content: item.name}, apkId: item.apkId, selected: isSelected};
		}, this);
		this.setState(state);
		switch (this.state.status) {
			case 'reloadList':
				this.reloadList();
				break;
			default:
				break;
		}
	}

	componentWillMount() {
		projectId = AppUtils.getProjectIdFromRouter(this.context.router);
		this.unsubscribe = APKTestStore.listen(this._onStateChange);
		this.reloadList();
	}

	componentWillUnmount() {
		this.unsubscribe();
		// Subscribe and unsubscribe because we don't want to use the mixins
	}

};

APKTestSelectionDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

APKTestSelectionDialog.propTypes = {
	onSelect: React.PropTypes.func
};

module.exports = APKTestSelectionDialog;
