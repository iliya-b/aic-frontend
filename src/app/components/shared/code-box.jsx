'use strict';

// Vendor
const React = require('react');

// APP
const CodeBox = class extends React.Component {

	render() {
		let styles = {fontFamily: 'Roboto Mono', lineHeight: '12px', fontSize: '12px', overflowX: 'auto'};

		styles = Object.assign(styles, this.props.style);

		return (
			<pre style={styles}>
				{this.props.children}
			</pre>
		);
	}

};

CodeBox.propTypes = {
	children: React.PropTypes.node,
	style: React.PropTypes.object
};

module.exports = CodeBox;
