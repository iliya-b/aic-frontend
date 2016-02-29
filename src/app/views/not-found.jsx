'use strict';

// React
const React = require('react');

// APP
const {FullWidthSection} = require('app/components');

const NotFound = class extends React.Component {

	render() {
		const palette = this.context.muiTheme.palette;
		const styles = {
			root: {
				backgroundColor: palette.logo1Color,
				overflow: 'hidden'
			},
			tagline: {
				margin: '32px auto 0 auto',
				textAlign: 'center',
				maxWidth: '575px'
			},
			h1: {
				color: '#fff',
				fontSize: '56px'
			}
		};

		return (
			<FullWidthSection style={styles.root}>
					<div style={styles.tagline}>
						<h1 style={styles.h1}>404 Page not found.</h1>
					</div>
			</FullWidthSection>
		);
	}

};

NotFound.contextTypes = {
	router: React.PropTypes.func,
	muiTheme: React.PropTypes.object
};

module.exports = NotFound;
