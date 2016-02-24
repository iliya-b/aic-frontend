'use strict';

// React
const React = require('react');

// Router
const Router = require('react-router');
const {RouteHandler} = Router;

// APP
const LiveList = require('./list');

const LiveWrapper = class extends React.Component {

	render() {
		const params = this.context.router.getCurrentParams();

		const list = params.hasOwnProperty('androId') ? null : <LiveList />;

		return (
			<div>
				{list}
				<RouteHandler />
			</div>
		);
	}

};

LiveWrapper.contextTypes = {
	router: React.PropTypes.func.isRequired
};

module.exports = LiveWrapper;
