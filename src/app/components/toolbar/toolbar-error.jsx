'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

// APP
const ToolbarError = class extends React.Component {

	render() {
		const styles = {
			button: {
				marginTop: 5,
				float: 'left'
			},
			separator: {
				margin: '0 5px 0 0px'
			}
		};
		return (
			<Toolbar style={this.props.style}>
				<ToolbarGroup firstChild lastChild>
					<IconButton style={styles.button}>
						<FontIcon className="mdi mdi-cancel" color="rgba(0, 0, 0, 0.4)"/>
					</IconButton>
					<ToolbarTitle text="Error" style={styles.title}/>
				</ToolbarGroup>
			</Toolbar>
		);
	}
};

ToolbarError.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarError.propTypes = {
	style: React.PropTypes.object
};

module.exports = ToolbarError;
