'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Chip from 'material-ui/Chip';

const debug = require('debug')('AiC:Component:Form:MultiTextField');

const MultiTextField = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItems: [],
			isFocus: false,
			inputSize: 0
		};
	}

	selectionChange(newSelection) {
		this.setState({selectedItems: newSelection});
		if (this.props.onChange) {
			this.props.onChange(newSelection);
		}
	}

	selectionAdd = item => {
		const newSelection = this.state.selectedItems.slice();
		newSelection.push(item);
		this.selectionChange(newSelection);
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
	}

	selectionRemove = item => {
		const newSelection = this.state.selectedItems.slice();
		newSelection.splice(newSelection.indexOf(item), 1);
		this.selectionChange(newSelection);
	}

	selectionRemoveAll = () => {
		this.selectionChange([]);
	}

	handleRemoveItem = e => {
		debug('handleRemoveItem', e, e.timeStamp, e.currentTarget, e.target);
		this.selectionRemove(e.currentTarget.dataset.itemValue);
	}

	handleResetItems = () => {
		this.selectionRemoveAll();
	}

	handleWrapperClick = e => {
		debug('handleWrapperClick', e.timeStamp, e);
		this.handleTextFocus(e);
	}

	handleTextFocus = e => {
		debug('handleTextFocus', e.timeStamp, e);
		if (!this.state.isFocus) {
			this.setState({isFocus: true});
		}
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
	}

	handleTextBlur = e => {
		if (this.state.isFocus) {
			this.setState({isFocus: false});
		}
		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
	}

	itemExists = item => {
		return !this.state.selectedItems.every(i => i !== item);
	}

	handleTextKeyDown = e => {
		debug('handleTextKeyDown', e.keyCode);
		if (e.keyCode === 13) {
			// ENTER
			debug('enter in', this.refInput);
			const inputValue = this.refInput.getValue().trim();
			const exists = this.itemExists(inputValue);
			if (inputValue && !exists) {
				this.selectionAdd(inputValue);
				this.refInput.input.value = '';
			}
			debug('enter out');
		} else if (e.keyCode === 8) {
			// BACKSPACE
			const inputValue = this.refInput.getValue().trim();
			if (inputValue === '' && this.state.selectedItems.length) {
				const itemToRemove = this.state.selectedItems[this.state.selectedItems.length - 1];
				this.selectionRemove(itemToRemove);
			}
		}
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
	}

	handleTextChange = () => {
		let inputSize = this.state.inputSize;
		const inputValue = this.refInput ? this.refInput.getValue() : '';
		if (inputValue && inputValue.length) {
			inputSize = inputValue.length;
		} else if (this.props.hintText && this.props.hintText.length) {
			inputSize = this.props.hintText.length;
		}
		if (inputSize !== this.state.inputSize) {
			this.setState({inputSize});
		}
	}

	setRefInput = c => {
		this.refInput = c;
	}

	render() {
		debug('render');
		const {
			style,
			iconStyle,
			hintText,
			onBlur, // eslint-disable-line no-unused-vars
			onFocus, // eslint-disable-line no-unused-vars
			...others
		} = this.props;
		// const palette = context.muiTheme.baseTheme.palette;
		const accentColor = this.context.muiTheme.dropDownMenu.accentColor;
		const styleIconClose = {
			fill: accentColor,
			position: 'absolute',
			right: 3,
			top: 3,
			width: 14,
			height: 14
		};
		const styleRoot = {
			position: 'relative',
			width: 300
		};
		const styleIconBt = {
			width: 20,
			height: 20,
			border: 0,
			padding: 0
		};

		const selectedRendered = this.state.selectedItems
			.map(this.renderSelected);

		const showResetButton = this.state.selectedItems.length > 0;

		const styleWrapperButtons = {
			display: 'table-cell',
			verticalAlign: 'middle',
			width: 20
		};

		const styleWrapperSelectedNText = {
			cursor: 'text',
			width: '100%',
			display: 'inline-block'
		};

		const styleWrapperControls = {
			display: 'table',
			width: '100%',
			tableLayout: 'fixed'
		};

		return (
			<div style={Object.assign({}, styleRoot, style)} {...others}>
				<div style={styleWrapperControls}>
					<div style={styleWrapperSelectedNText} onClick={this.handleWrapperClick}>
						{selectedRendered}
						<TextField
							name={`${this.props.name}Input`}
							ref={this.setRefInput}
							onChange={this.handleTextChange}
							onFocus={this.handleTextFocus}
							onBlur={this.handleTextBlur}
							onKeyDown={this.handleTextKeyDown}
							underlineShow={false}
							hintText={hintText}
							style={{maxWidth: '100%', float: 'left', width: 'initial', overflow: 'hidden'}}
							inputStyle={{width: 'initial'}}
							size={this.state.inputSize}
							/>
					</div>
					{showResetButton && <div style={styleWrapperButtons}><IconButton onClick={this.handleResetItems} style={styleIconBt} iconStyle={Object.assign({}, styleIconClose, iconStyle)}>
						<NavigationClose/>
					</IconButton></div>}
				</div>
				<div style={{position: 'relative', marginTop: -4}}><TextFieldUnderline focus={this.state.isFocus} muiTheme={this.context.muiTheme}/></div>
			</div>
		);
	}

	renderSelected = s => {
		const fn = () => {};
		const styleChip = {
			margin: '0 5px 5px 0',
			float: 'left',
			maxWidth: '100%'
		};

		const styleChipLabel = {
			maxWidth: 'calc(100% - 44px)',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		};
		return (
			<Chip
				key={s}
				onRequestDelete={fn}
				style={styleChip}
				labelStyle={styleChipLabel}
				data-item-value={s}
				onClick={this.handleRemoveItem}
				title={s}
				>
				{s}
			</Chip>
		);
	}
};

MultiTextField.contextTypes = {
	muiTheme: React.PropTypes.object
};

MultiTextField.propTypes = {
	style: React.PropTypes.object,
	iconStyle: React.PropTypes.object,
	menuStyle: React.PropTypes.object,
	onFocus: React.PropTypes.func,
	onBlur: React.PropTypes.func,
	onChange: React.PropTypes.func,
	hintText: React.PropTypes.string,
	name: React.PropTypes.string
};

module.exports = MultiTextField;
