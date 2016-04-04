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
const TableFiles = class extends React.Component {

	render() {
		const classNameType = this.props.type ? `tb${this.props.type}` : '';
		const list = this.props.list.map((v, i) => {
			const classNameRow = classNameType ? `${classNameType}Row` : '';
			const classNameRowI = classNameRow ? `${classNameRow}${i}` : '';
			const classNameRowId = classNameRow ? `${classNameRow}Id ${classNameRow}Id${i}` : '';
			const classNameRowFilename = classNameRow ? `${classNameRow}Filename ${classNameRow}Filename${i}` : '';
			const classNameRowStatus = classNameRow ? `${classNameRow}Status ${classNameRow}Status${i}` : '';
			return (
				<TableRow key={v.id} selected={this.props.selected.indexOf(i) !== -1} className={`tbFilesRow tbFilesRow${i} ${classNameRow} ${classNameRowI}`}>
					<TableRowColumn className={`tbFilesRowId tbFilesRowId${i} ${classNameRowId}`}>{v.id}</TableRowColumn>
					<TableRowColumn className={`tbFilesRowId tbFilesRowId${i} ${classNameRowFilename}`}>{v.filename}</TableRowColumn>
					<TableRowColumn className={`tbFilesRowId tbFilesRowId${i} ${classNameRowStatus}`}>{v.status}</TableRowColumn>
				</TableRow>
			);
		});

		return (
			<Table className={`tbFiles ${classNameType}`} style={this.props.style} multiSelectable onRowSelection={this.props.onRowSelection}>
				<TableHeader>
					<TableRow className={`tbFilesHeader ${classNameType ? `${classNameType}Header` : ''}`}>
						<TableHeaderColumn className={`tbFilesHeaderId ${classNameType ? `${classNameType}HeaderId` : ''}`}>ID</TableHeaderColumn>
						<TableHeaderColumn className={`tbFilesHeaderFilename ${classNameType ? `${classNameType}HeaderFilename` : ''}`}>Filename</TableHeaderColumn>
						<TableHeaderColumn className={`tbFilesHeaderStatus ${classNameType ? `${classNameType}HeaderStatus` : ''}`}>Status</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody deselectOnClickaway={false}>
					{list}
				</TableBody>
			</Table>
		);
	}

};

TableFiles.propTypes = {
	style: React.PropTypes.object,
	list: React.PropTypes.array,
	onRowSelection: React.PropTypes.func,
	selected: React.PropTypes.array,
	type: React.PropTypes.string
};

TableFiles.defaultProps = {
	selected: [],
	list: []
};

module.exports = TableFiles;
