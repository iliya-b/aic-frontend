'use strict';

// Vendor
import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

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
