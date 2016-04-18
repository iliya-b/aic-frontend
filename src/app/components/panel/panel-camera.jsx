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
const PanelCamera = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: this.props.fileList.length ? this.props.fileList[0].id : null};
		this.handleChange = (event, index, value) => {
			this.setState({value});
		};
		// this.handleClick = e => {
		// 	props.onClick(e, this.state.value);
		// };
		this.handleClick = e => {
			this.props.onClick(e, {file_id: this.state.value}); // eslint-disable-line camelcase
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
		this.props.fileList.forEach(file => {
			items.push(<MenuItem value={file.id} key={file.id} primaryText={file.filename}/>);
		});
		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-camera" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectField className="inputLiveCameraFilename" style={styles.items} maxHeight={300} value={this.state.value} onChange={this.handleChange}>
					{items}
				</SelectField>
				<RaisedButton
					className="btLiveCameraSubmit"
					label="Send"
					title="Send"
					href="#"
					primary
					onClick={this.handleClick}
					style={styles.buttonSubmit}
					/>
			</Paper>
		);
	}
};

PanelCamera.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

PanelCamera.propTypes = {
	style: React.PropTypes.object,
	onClick: React.PropTypes.func,
	fileList: React.PropTypes.array
};

module.exports = PanelCamera;
