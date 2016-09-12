'use strict';

import React from 'react';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectTextField from 'app/components/form/select-text-field';

const PanelCamera = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: null};
		this.handleChange = value => {
			this.setState({value});
		};
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

		return (
			<Paper style={styles.paper} zDepth={1}>
				<FontIcon style={styles.icon} className="mdi mdi-camera" color="rgba(0, 0, 0, 0.4)"/>
				<ToolbarSeparator style={styles.separator}/>
				<SelectTextField
					name="inputLiveCameraFilename"
					onChange={this.handleChange}
					hintText="Select file"
					onFocus={this.props.onInputFocus}
					onBlur={this.props.onInputBlur}
					style={{float: 'left'}}
					items={this.props.fileList.map(a => ({value: a.id, label: a.filename}))}
					/>
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
	fileList: React.PropTypes.arrayOf(React.PropTypes.shape({
		filename: React.PropTypes.string,
		id: React.PropTypes.string
	})).isRequired,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func
};

module.exports = PanelCamera;
