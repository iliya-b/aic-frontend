'use strict';

import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import ToolbarEditFile from 'app/components/toolbar/toolbar-edit-file';
import 'brace/theme/github';
import 'app/libs/mode-aicdsl';

const debug = require('debug')('AiC:Views:TestEditor');

const TestEditor = class extends React.Component {

	render() {
		return (
			<div>
				<ToolbarEditFile
					title="Test Editor"
					icon="mdi mdi-puzzle"
					/>
				<AceEditor
					mode="aicdsl"
					theme="github"
					onChange={onChange}
					name="Test-Editor"
					editorProps={{$blockScrolling: true}}
					/>
			</div>
		);
	}
};

function onChange(newValue) {
	console.log('change', newValue);
}

TestEditor.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

TestEditor.propTypes = {
	params: React.PropTypes.object
};

module.exports = TestEditor;
