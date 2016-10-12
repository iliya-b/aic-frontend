'use strict';

// Vendor
import React from 'react';
import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';

// APP
const TableTestFiles = class extends React.Component {

	render() {
		const classNameType = this.props.type ? `tb${this.props.type}` : '';
		const list = this.props.list.map((v, i) => {
			const classNameRow = classNameType ? `${classNameType}Row` : '';
			const classNameRowI = classNameRow ? `${classNameRow}${i}` : '';
			const classNameRowId = classNameRow ? `${classNameRow}Id ${classNameRow}Id${i}` : '';
			const classNameRowFilename = classNameRow ? `${classNameRow}Filename ${classNameRow}Filename${i}` : '';
			const classNameRowStatus = classNameRow ? `${classNameRow}Status ${classNameRow}Status${i}` : '';
			const classNameRowDescription = classNameRow ? `${classNameRow}Description ${classNameRow}Description${i}` : '';
			return (
				<TableRow key={v.id} selected={this.props.selected.indexOf(i) !== -1} className={`tbFilesRow tbFilesRow${i} ${classNameRow} ${classNameRowI}`}>
					<TableRowColumn className={`tbFilesRowId tbFilesRowId${i} ${classNameRowId}`}>{v.id}</TableRowColumn>
					<TableRowColumn className={`tbFilesRowId tbFilesRowId${i} ${classNameRowFilename}`}>{v.filename}</TableRowColumn>
					<TableRowColumn className={`tbFilesRowId tbFilesRowId${i} ${classNameRowDescription}`}>Description</TableRowColumn>
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
						<TableHeaderColumn className={`tbFilesHeaderDescription ${classNameType ? `${classNameType}HeaderDescription` : ''}`}>Description</TableHeaderColumn>
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

TableTestFiles.propTypes = {
	style: React.PropTypes.object,
	list: React.PropTypes.array,
	onRowSelection: React.PropTypes.func,
	selected: React.PropTypes.array,
	type: React.PropTypes.string
};

TableTestFiles.defaultProps = {
	selected: [],
	list: []
};

module.exports = TableTestFiles;
