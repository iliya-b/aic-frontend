'use strict';

import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import PanelLiveTestResults from 'app/components/panel/panel-live-test-results';
import SelectTextField from 'app/components/form/select-text-field';

const PanelTests = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {selectedPackage: null};
	}

	handleChange = selectedPackage => {
		this.setState({selectedPackage});
	}

	handleClick = () => {
		this.props.onTestRun({package: this.state.selectedPackage});
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

		// const filenames = {};
		// this.props.apkList.forEach(apk => {
		// 	filenames[apk.id] = apk.filename;
		// });

		// let testRunsRendered = null;
		// if (this.props.apkInstalled && this.props.apkInstalled.length) {
		// 	const apkInstalledFiltered = this.props.apkInstalled
		// 		.map(apk => ({
		// 			id: apk.refId,
		// 			children: filenames[apk.apkId],
		// 			status: apk.status
		// 		}));

		// 	// testRunsRendered = <ListItemStatus style={{clear: 'both', display: 'block', marginLeft: 48}} items={apkInstalledFiltered}/>;
		// 	testRunsRendered = <PanelProgress type="apk" animation={false} style={{clear: 'both', display: 'block', margin: 10}} items={apkInstalledFiltered}/>;
		// }

		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-settings"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectTextField
					ref={this.setRefSelection}
					name="inputLiveAPKInstallFilename"
					onChange={this.handleChange}
					hintText="Select Package"
					onFocus={this.props.onInputFocus}
					onBlur={this.props.onInputBlur}
					style={{float: 'left', marginTop: 5}}
					items={this.props.testPackages.map(a => {
						return {value: a, label: a};
					})}
					/>
				<RaisedButton
					className="btLiveAPKInstallSubmit"
					label="Run Test"
					title="Run Test"
					primary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
				<br/>
				{this.props.testRuns.length > 0 && <PanelLiveTestResults style={{clear: 'both', display: 'block', margin: 10}} items={this.props.testRuns}/>}
				<div style={{clear: 'both', height: 1, marginTop: -1}}/>
			</Paper>
		);
	}
};

PanelTests.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

PanelTests.defaultProps = {
	testPackages: [],
	testRuns: []
};

PanelTests.propTypes = {
	style: React.PropTypes.object,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
	testPackages: React.PropTypes.array,
	testRuns: React.PropTypes.array,
	onTestRun: React.PropTypes.func
};

module.exports = PanelTests;
