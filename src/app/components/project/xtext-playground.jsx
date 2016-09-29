/* global URLSearchParams */
'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Gateway from 'app/libs/gateway';
import LabeledSpan from 'app/components/form/labeled-span';

const XtextPlayground = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			contents: '',
			filename: 'test123.aicdsl',
			issues: {}
		};
	}

	handleCreateFile = () => {
		const rawData = new URLSearchParams();
		rawData.append('fullText', this.state.contents);
		Gateway.xtext.update({resourceId: this.state.filename, rawData});
	}

	handleUpdateFile = () => {
		Gateway.xtext.validate({resourceId: this.state.filename}).then(data => {
			this.setState({issues: data});
		});
	}

	handleContentsChange = e => {
		this.setState({contents: e.currentTarget.value});
	}

	handleFilenameChange = e => {
		this.setState({filename: e.currentTarget.value});
	}

	render() {
		const styleLabels = {};
		return (
			<Paper style={{padding: 10}}>
				<h2>Testing Xtext</h2>
				<RaisedButton style={{marginRight: 10}} primary onClick={this.handleCreateFile}>Update</RaisedButton>
				<RaisedButton primary onClick={this.handleUpdateFile}>Check</RaisedButton>
				<br/><br/>
				<LabeledSpan label="contents" off style={styleLabels}/><br/>
				<textarea onChange={this.handleContentsChange} value={this.state.contents}/>
				<br/><br/>
				<LabeledSpan label="filename" off style={styleLabels}/><br/>
				<input onChange={this.handleFilenameChange} value={this.state.filename}/>
				<br/><br/>
				<LabeledSpan label="issues" off style={styleLabels}/><br/>
				<div>{JSON.stringify(this.state.issues)}</div>
			</Paper>
		);
	}
};

XtextPlayground.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = XtextPlayground;

