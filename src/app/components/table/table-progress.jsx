'use strict';

// Vendor
import React from 'react';
import Table from 'material-ui/Table/Table';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';
import LinearProgress from 'material-ui/LinearProgress';

// APP
const TableProgress = class extends React.Component {

	render() {
		const list = this.props.list.map((v, i) => {
			return (
				<TableRow key={i}>
					<TableRowColumn>{v.name}</TableRowColumn>
					<TableRowColumn><LinearProgress mode="determinate" value={v.progress} color={this.context.muiTheme.palette.accent1Color}/></TableRowColumn>
				</TableRow>
			);
		});

		return (
			<Table className="tbProgress" style={this.props.style}>
				<TableBody displayRowCheckbox={false}>
					{list}
				</TableBody>
			</Table>
		);
	}

};

TableProgress.contextTypes = {
	muiTheme: React.PropTypes.object
};

TableProgress.propTypes = {
	style: React.PropTypes.object,
	list: React.PropTypes.array,
	onRowSelection: React.PropTypes.func,
	selected: React.PropTypes.array
};

TableProgress.defaultProps = {
	selected: [],
	list: []
};

module.exports = TableProgress;
