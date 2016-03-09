'use strict';

// Vendor
import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

// APP
const TableAPK = class extends React.Component {

	render() {
		const list = this.props.list.map((v, i) => {
			return (
				<TableRow key={v.id} selected={this.props.selected.indexOf(i) !== -1}>
					<TableRowColumn>{v.id}</TableRowColumn>
					<TableRowColumn>{v.filename}</TableRowColumn>
					<TableRowColumn>{v.status}</TableRowColumn>
				</TableRow>
			);
		});

		return (
			<Table style={this.props.style} multiSelectable onRowSelection={this.props.onRowSelection}>
				<TableHeader>
					<TableRow>
						<TableHeaderColumn>ID</TableHeaderColumn>
						<TableHeaderColumn>Filename</TableHeaderColumn>
						<TableHeaderColumn>Status</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody deselectOnClickaway={false}>
					{list}
				</TableBody>
			</Table>
		);
	}

};

TableAPK.propTypes = {
	style: React.PropTypes.object,
	list: React.PropTypes.array,
	onRowSelection: React.PropTypes.func,
	selected: React.PropTypes.array
};

module.exports = TableAPK;
