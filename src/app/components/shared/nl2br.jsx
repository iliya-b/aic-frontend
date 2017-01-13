'use strict';

// React
const React = require('react');

const Nl2Br = class extends React.Component {

	render() {
		return (
			<div>
				{this.props.children.split('\n').map((item, i) => {
					return (
						<span key={i}>
							{item}
							<br/>
						</span>
					);
				})}
			</div>
		);
	}
};

Nl2Br.propTypes = {
	children: React.PropTypes.string
};

module.exports = Nl2Br;
