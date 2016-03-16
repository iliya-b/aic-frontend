'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

// APP
const PanelAPKInstall = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: this.props.apkList.length ? this.props.apkList[0].id : null};
		this.handleChange = (event, index, value) => {
			this.setState({value});
		};
		this.handleClick = e => {
			props.onClick(e, this.state.value);
		};
	}

	render() {
		const styles = {
			separator: {
				margin: '0 15px 0 0px',
				float: 'left'
			},
			items: {
				float: 'left'
			},
			paper: {
				height: 56
			},
			icon: {
				margin: '15px 10px 0 10px',
				float: 'left'
			},
			buttonSubmit: {
				float: 'left',
				marginTop: 10,
				marginLeft: 15
			}
		};
		// TODO: should check all other panels for the style presence
		if (this.props.style) {
			styles.paper = Object.assign({}, this.props.style, styles.paper);
		}

		const items = [];
		this.props.apkList.forEach(apk => {
			items.push(<MenuItem value={apk.id} key={apk.id} primaryText={apk.filename}/>);
		});
		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-file-send" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectField className="inputLiveAPKInstallFilename" style={styles.items} maxHeight={300} value={this.state.value} onChange={this.handleChange}>
					{items}
				</SelectField>
				<RaisedButton
					className="btLiveAPKInstallSubmit"
					label="Install"
					title="Install"
					href="#"
					secondary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
			</Paper>
		);
	}
};

PanelAPKInstall.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

PanelAPKInstall.propTypes = {
	style: React.PropTypes.object,
	onClick: React.PropTypes.func,
	apkList: React.PropTypes.array
};

module.exports = PanelAPKInstall;
