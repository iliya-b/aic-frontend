'use strict';

import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import SelectTextField from 'app/components/form/select-text-field';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ListItemStatus from 'app/components/list/list-item-status';

const debug = require('debug')('AiC:Components:Toolbar:PanelMonkeyRunner');

const PanelMonkeyRunner = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: null};
		this.setRefEventCount = c => {
			this.eventCount = c;
		};
		this.setRefThrottle = c => {
			this.throttle = c;
		};
		this.handleChange = value => {
			this.setState({value});
		};
		this.handleClick = e => {
			debug('handleClick', this, e);
			if (this.state.value !== null) {
				this.props.onClick(e, [this.state.value], parseInt(this.eventCount.getValue(), 10), parseInt(this.throttle.getValue(), 10));
			}
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
			itemsInputSmall: {
				float: 'left',
				width: 150
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
		this.props.packageList.forEach((packageName, index) => {
			items.push(<MenuItem value={packageName} key={index} primaryText={packageName}/>);
		});

		let monkeyCallsRendered = null;
		if (this.props.monkeyCalls) {
			const monkeyCallsFiltered = this.props.monkeyCalls
				.filter(mcall => {
					return mcall.endTime ? (Date.now() - mcall.endTime) < 30000 : true;
				})
				.map(mcall => ({
					id: mcall.id,
					icon: mcall.status,
					label: mcall.label
				}));

			monkeyCallsRendered = <ListItemStatus style={{clear: 'both', display: 'block', marginLeft: 48}} items={monkeyCallsFiltered}/>;
		}

		// <SelectField className="inputLiveAPKInstallFilename" style={styles.items} labelStyle={styles.labelStyle} maxHeight={300} value={this.state.value} onChange={this.handleChange}>
		// 			{items}
		// 		</SelectField>

		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-panda" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectTextField
					onChange={this.handleChange}
					hintText="Select application"
					onFocus={this.props.onInputFocus}
					onBlur={this.props.onInputBlur}
					style={{float: 'left'}}
					items={this.props.packageList}
					/>
				<TextField name="fieldLiveMonkeyRunnerEventCount" style={styles.itemsInputSmall} ref={this.setRefEventCount} hintText="event count" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<TextField name="fieldLiveMonkeyRunnerThrottle" style={styles.itemsInputSmall} ref={this.setRefThrottle} hintText="throttle (in ms)" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
				<RaisedButton
					className="btLiveMonkeyRunnerRun"
					label="Run"
					title="Run"
					primary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
				<br/>
				{monkeyCallsRendered}
			</Paper>
		);
	}
};

PanelMonkeyRunner.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

PanelMonkeyRunner.propTypes = {
	style: React.PropTypes.object,
	onClick: React.PropTypes.func,
	packageList: React.PropTypes.array.isRequired,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func,
	monkeyCalls: React.PropTypes.array
};

module.exports = PanelMonkeyRunner;
