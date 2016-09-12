'use strict';

import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
// import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ListItemStatus from 'app/components/list/list-item-status';
import SelectTextField from 'app/components/form/select-text-field';

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
				minHeight: 56
			},
			icon: {
				margin: '15px 10px 0 10px',
				float: 'left'
			},
			buttonSubmit: {
				float: 'left',
				marginTop: 10,
				marginLeft: 15
			},
			labelStyle: {
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				height: 56
			}
		};
		// TODO: should check all other panels for the style presence
		if (this.props.style) {
			styles.paper = Object.assign({}, this.props.style, styles.paper);
		}

		const items = [];
		const filenames = {};
		this.props.apkList.forEach(apk => {
			items.push(<MenuItem value={apk.id} key={apk.id} primaryText={apk.filename}/>);
			filenames[apk.id] = apk.filename;
		});

		let apkInstalledRendered = null;
		const iconStatusMapping = {
			ERROR: 'ERROR',
			INSTALLING: 'LOADING',
			SUCCESS: 'SUCCESS'
		};

		if (this.props.apkInstalled) {
			const apkInstalledFiltered = this.props.apkInstalled
				.filter(apk => {
					return apk.endTime ? (Date.now() - apk.endTime) < 30000 : true;
				})
				.map(apk => ({
					id: apk.refId,
					icon: iconStatusMapping[apk.status],
					label: filenames[apk.apkId]
				}));

			apkInstalledRendered = <ListItemStatus style={{clear: 'both', display: 'block', marginLeft: 48}} items={apkInstalledFiltered}/>;
		}

		// <SelectField className="inputLiveAPKInstallFilename" style={styles.items} labelStyle={styles.labelStyle} maxHeight={300} value={this.state.value} onChange={this.handleChange}>
		//			{items}
		//		</SelectField>
		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-puzzle" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectTextField items={this.props.apkList.map(a => a.filename)}/>
				<RaisedButton
					className="btLiveAPKInstallSubmit"
					label="Install"
					title="Install"
					primary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
				<br/>
				{apkInstalledRendered}
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
	apkList: React.PropTypes.arrayOf(React.PropTypes.shape({
		filename: React.PropTypes.string,
		id: React.PropTypes.string
	})).isRequired,
	apkInstalled: React.PropTypes.arrayOf(React.PropTypes.shape({
		endTime: React.PropTypes.object,
		refId: React.PropTypes.string,
		status: React.PropTypes.string,
		apkId: React.PropTypes.string
	}))
};

module.exports = PanelAPKInstall;
