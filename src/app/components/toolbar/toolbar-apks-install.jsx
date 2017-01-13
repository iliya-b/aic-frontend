'use strict';

import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import PanelProgress from 'app/components/panel/panel-progress';
import SelectTextField from 'app/components/form/select-text-field';

const PanelAPKInstall = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {apkSelection: []};
	}

	handleChange = apkSelection => {
		this.setState({apkSelection});
	}

	handleClick = e => {
		this.state.apkSelection.forEach(a => this.props.onClick(e, a));
		this.refSelection.selectionRemoveAll();
	}

	setRefSelection = c => {
		this.refSelection = c;
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

		const filenames = {};
		this.props.apkList.forEach(apk => {
			filenames[apk.id] = apk.filename;
		});

		let apkInstalledRendered = null;
		if (this.props.apkInstalled && this.props.apkInstalled.length) {
			const apkInstalledFiltered = this.props.apkInstalled
				.map(apk => ({
					id: apk.refId,
					children: filenames[apk.apkId],
					status: apk.status
				}));

			// apkInstalledRendered = <ListItemStatus style={{clear: 'both', display: 'block', marginLeft: 48}} items={apkInstalledFiltered}/>;
			apkInstalledRendered = <PanelProgress type="apk" animation={false} style={{clear: 'both', display: 'block', margin: 10}} items={apkInstalledFiltered}/>;
		}

		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-puzzle"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectTextField
					ref={this.setRefSelection}
					name="inputLiveAPKInstallFilename"
					onChange={this.handleChange}
					hintText="Select APK"
					onFocus={this.props.onInputFocus}
					onBlur={this.props.onInputBlur}
					style={{float: 'left', marginTop: 5}}
					items={this.props.apkList.map(a => {
						return {value: a.id, label: a.filename};
					})}
					multiple
					/>
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
				<div style={{clear: 'both', height: 1, marginTop: -1}}/>
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
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
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
