'use strict';

// React
const React = require('react');

// APP
const GobyStores = require('app/stores');
const GobyActions = require('app/actions');
const BoxStatus = require('app/components/project/box-status');
const AppUtils = require('app/components/shared/app-utils');

let loadedStore;
let loadedActions;

const AreaStatus = class extends React.Component {

	constructor(props) {
		super(props);
		this._onStateChange = this._onStateChange.bind(this);
		this.state = {};
		if (this.props.typeName) {
			loadedStore = GobyStores[`${AppUtils.capitalize(this.props.typeName)}Store`];
			loadedActions = GobyActions[`${AppUtils.capitalize(this.props.typeName)}Actions`];
		}
	}

	render() {
		let boxesTags;

		if (this.state.hasOwnProperty(this.props.typeName)) {
			boxesTags = this.state[this.props.typeName].boxes.map((item, index) => {
				return item.enabled ? <BoxStatus key={index} typeName={item.typeName} status={item.status} isFirst={item.isFirst} isLast={item.isLast} objectName={item.objectName}/> : null;
			});
		}

		return (<div style={this.props.style}>
			{boxesTags}
		</div>);
	}

	_onStateChange(state) {
		this.setState(state);
	}

	componentDidMount() {
		this.unsubscribe = loadedStore.listen(this._onStateChange);
		loadedActions.loadState();
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

AreaStatus.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

AreaStatus.propTypes = {
	typeName: React.PropTypes.string,
	style: React.PropTypes.object
};

module.exports = AreaStatus;
