'use strict';

// Vendor
import React from 'react';

// APP
import FullWidthSection from 'app/components/shared/full-width-section';
import MachineIcon from 'app/components/project/machine-icon';

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
				maxWidth: '800px'
			},
			h1: {
				color: '#fff',
				fontSize: '56px',
				display: 'inline-block',
				verticalAlign: 'top'
			}
		};

		return (
			<FullWidthSection style={styles.root}>
				<div style={styles.tagline}>
					<MachineIcon color="white" shadowColor="rgb(45, 139, 203)" status={MachineIcon.QUESTION} xbigIcon/>
					<h1 style={styles.h1}>404 Page not found.</h1>
				</div>
			</FullWidthSection>
		);
	}

};

NotFound.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = NotFound;
