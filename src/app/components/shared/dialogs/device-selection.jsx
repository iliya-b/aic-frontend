'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {Dialog,
			FlatButton} = mui;

// APP
const ObjectList = require('app/components/shared/object-list/object-list');
const {CampaignStore} = require('app/stores');
const {CampaignActions} = require('app/actions');

const DeviceSelectionDialog = class extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			devices: [],
			selectedIndex: null
		};

		this._onCancel = this._onCancel.bind(this);
		this._onItemClick = this._onItemClick.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
	}

	render() {
		const {
			// style,
			...other
		} = this.props;

		const styles = {
			objectlist: {
				maxHeight: '200px',
				overflowY: 'auto'
			}
		};

		const actions = [
			<FlatButton
				key="cancel"
				label="Cancel"
				title="Cancel"
				secondary
				onClick={this._onCancel}
				/>,
			<FlatButton
				key="submit"
				label="Select"
				title="Select"
				primary
				onClick={this._onSubmit}
				/>
		];

		return (
			<Dialog title="Device Selection" actions={actions} {...other} ref="dialogIn" >
				<div>
					{this.state.devices.length > 0 ? (
						<ObjectList selectedIndex={this.state.selectedIndex} style={styles.objectlist} objectListItems={this.state.devices} onItemTap={this._onItemClick} />
					) : ''}
				</div>
			</Dialog>
			);
	}

	show() {
		this.refs.dialogIn.show();
	}

	_onItemClick(e, index) {
		this.setState({selectedIndex: index});
	}

	_onCancel(e) {
		e.preventDefault();
		this.refs.dialogIn.dismiss();
	}

	_onSubmit(e) {
		e.preventDefault();
		this.props.onSelect(this.state.devices[this.state.selectedIndex]);
		this.refs.dialogIn.dismiss();
	}

	_onStateChange(state) {
		if (state.hasOwnProperty('availableDevices')) {
			this.setState({devices: state.availableDevices.map(item => {
				return {key: item.id, id: item.id, text: item.name, name: item.name};
			})});
		}
	}

	componentWillMount() {
		this.unsubscribe = CampaignStore.listen(this._onStateChange);
		CampaignActions.loadDevices();
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

DeviceSelectionDialog.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

DeviceSelectionDialog.propTypes = {
	onSelect: React.PropTypes.func
};

module.exports = DeviceSelectionDialog;
