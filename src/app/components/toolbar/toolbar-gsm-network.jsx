'use strict';

// Vendor
import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

// APP
// TODO: Change to a single place, I think this repeats at app/libs/backend-api.js
const GSMNetwork = ['umts', 'lte', 'gprs', 'gsm', 'hspa', 'edge', 'cdma', 'evdo', 'hsdpa', 'hsupa', 'full'];

const ToolbarGSMNetwork = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: null};
		this.handleChange = (event, index, value) => {
			this.setState({value});
		};
		this.handleClick = e => {
			const payload = {
				type: this.state.value
			};
			this.props.onChange(e, 'network', payload);
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
		GSMNetwork.forEach(v => {
			items.push(<MenuItem value={v} key={v} primaryText={v}/>);
		});
		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-radio-tower" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectField className="inputLiveGSMNetwork" style={styles.items} maxHeight={300} value={this.state.value} onChange={this.handleChange}>
					{items}
				</SelectField>
				<RaisedButton
					className="btLiveGSMNetworkSubmit"
					label="Submit"
					title="Submit"
					href="#"
					secondary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
			</Paper>
		);
	}
};

ToolbarGSMNetwork.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

ToolbarGSMNetwork.propTypes = {
	style: React.PropTypes.object,
	onChange: React.PropTypes.func
};

module.exports = ToolbarGSMNetwork;
