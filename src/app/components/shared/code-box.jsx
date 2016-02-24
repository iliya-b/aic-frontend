'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {StylePropable} = mui.Mixins;

const CodeBox = class extends React.Component {

	render() {
		let styles = {fontFamily: 'Roboto Mono', lineHeight: '12px', fontSize: '12px', overflowX: 'auto'};

		styles = StylePropable.mergeStyles(styles, this.props.style);

		return (
			<pre style={styles}>
				{this.props.children}
			</pre>
		);
	}

};

CodeBox.propTypes = {
	children: React.PropTypes.object,
	style: React.PropTypes.object
};

module.exports = CodeBox;
