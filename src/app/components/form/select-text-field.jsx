/* global document */
'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import DropUpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Chip from 'material-ui/Chip';
import MenuItemApp from './menu-item-app';

const debug = require('debug')('AiC:Component:Form:SelectTextField');

// Inspired by http://jedwatson.github.io/react-select/ but in material design

const SelectTextField = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItems: [],
			itemsOpen: false,
			filterValue: '',
			focusMenuItem: -1
		};
		this.clickOnItems = [];
		this.clickAll = [];
		this.availableRenderedCount = -1;
		this.mappedItems = [];
	}

	getFocusedItem = () => {
		return this.state.focusMenuItem === -1 && this.lastRenderedItems.length ? 0 : this.state.focusMenuItem;
	}

	changeSelection(newSelection) {
		this.setState({selectedItems: newSelection});
		if (this.props.onChange) {
			this.props.onChange(newSelection);
		}
	}

	handleAddItem = item => {
		const newSelection = this.state.selectedItems.slice();
		newSelection.push(item);
		this.changeSelection(newSelection);
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
	}

	handleClickItem = e => {
		this.clickOnItems = e.timeStamp;
		debug('handleClickItem', e, e.timeStamp, e.currentTarget);
		this.handleAddItem(e.currentTarget.dataset.itemValue);
	}

	handleRemoveItem = e => {
		debug('handleRemoveItem', e, e.timeStamp, e.currentTarget, e.target);
		this.clickOnItems = e.timeStamp;
		const newSelection = this.state.selectedItems.slice();
		newSelection.splice(newSelection.indexOf(e.currentTarget.dataset.itemValue), 1);
		this.changeSelection(newSelection);
	}

	handleResetItems = e => {
		this.clickOnItems = e.timeStamp;
		this.changeSelection([]);
	}

	handleCheckClicks = () => {
		setTimeout(() => {
			if (this.clickOnItems === this.clickAll) {
				debug('click in');
			} else if (this.state.itemsOpen) {
				this.setState({itemsOpen: false});
			}
		}, 100);
	}

	handleClickAway = e => {
		debug('handleClickAway', e, e.timeStamp, e.currentTarget);
		this.clickAll = e.timeStamp;
		this.handleCheckClicks();
	}

	handleToogleItems = e => {
		this.clickOnItems = e.timeStamp;
		this.setState({itemsOpen: !this.state.itemsOpen});
	}

	handleTextClick = e => {
		debug('handleTextClick', e);
		this.clickOnItems = e.timeStamp;
		// this.setState({itemsOpen: true});
	}

	handleTextChange = e => {
		debug('handleTextChange', e);
		this.setState({filterValue: e.target.value, focusMenuItem: -1});
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
	}

	handleTextFocus = e => {
		debug('handleTextFocus', e);
		if (!this.state.itemsOpen) {
			this.setState({itemsOpen: true, focusMenuItem: -1});
			setTimeout(() => {
				this.refInput.focus();
			}, 100);
		}
		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
	}

	handleTextBlur = e => {
		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
	}

	handleTextKeyDown = e => {
		debug('handleTextKeyDown', e.keyCode);
		const focusedItem = this.getFocusedItem();

		if (e.keyCode === 13) {
			// ENTER
			debug('enter in');
			let nextFocusIndex;
			if (focusedItem === -1) {
				return;
			} else if (this.availableRenderedCount > (focusedItem + 1)) {
				nextFocusIndex = focusedItem;
			} else if (this.availableRenderedCount > 1) {
				nextFocusIndex = focusedItem - 1;
			} else {
				nextFocusIndex = -1;
			}
			this.setState({focusMenuItem: nextFocusIndex});
			this.handleAddItem(this.lastRenderedItems[focusedItem]);
			debug('enter out');
		} else if (e.keyCode === 38) {
			// UP
			if (focusedItem > 0) {
				this.setState({focusMenuItem: focusedItem - 1});
			} else if (focusedItem === -1) {
				this.setState({focusMenuItem: this.availableRenderedCount});
			}
		} else if (e.keyCode === 40) {
			// DOWN
			if ((focusedItem + 1) < this.availableRenderedCount) {
				this.setState({focusMenuItem: focusedItem + 1});
			}
		} else if (e.keyCode === 8) {
			// BACKSPACE
			if (this.state.filterValue === '' && this.state.selectedItems.length) {
				const newSelection = this.state.selectedItems.slice();
				newSelection.splice(newSelection.length - 1, 1);
				this.changeSelection(newSelection);
			}
		}
		setTimeout(() => {
			this.refInput.focus();
		}, 100);
	}

	handleMenuOver = e => {
		debug('handleMenuOver', e.currentTarget.dataset.itemIndex, e.currentTarget.dataset.itemValue);
		this.setState({focusMenuItem: parseInt(e.currentTarget.dataset.itemIndex, 10)});
	}

	setRefInput = c => {
		this.refInput = c;
	}

	render() {
		debug('render');
		const {
			style,
			iconStyle,
			items, // eslint-disable-line no-unused-vars
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

		const styleIconDown = {
			fill: accentColor,
			position: 'absolute',
			right: -2,
			top: -2
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
			// position: 'absolute'
		};

		const styleMenu = {
			position: 'absolute',
			marginTop: -8,
			width: styleRoot.width,
			zIndex: 5000
		};

		// const styleCenterWrapper = {
		// 	display: 'table-cell',
		// 	verticalAlign: 'middle'
		// };

		const selectedRendered = this.state.selectedItems
			.map(a => this.mappedItems[this.indexItems[a]])
			.map(this.renderSelected);

		const inputValue = this.state.filterValue ? this.state.filterValue : false;

		this.lastRenderedItems = this.mappedItems
			.filter(a => this.state.selectedItems.indexOf(a.value) === -1)
			.filter(a => !inputValue || (inputValue && a.label.toLowerCase().startsWith(inputValue)));

		const availableRendered = this.lastRenderedItems.map(this.renderList);

		this.availableRenderedCount = availableRendered.length;

		const showResetButton = this.state.selectedItems.length > 0;
		const showItems = this.availableRenderedCount > 0;

		const iconDrop = this.state.itemsOpen ? <DropUpArrow/> : <DropDownArrow/>;

		const styleWrapperButtons = {
			display: 'table-cell',
			verticalAlign: 'middle'
		};

		const styleWrapperSelectedNText = {
			display: 'table-cell',
			width: `calc(${styleRoot.width}px - ${(showResetButton ? 20 : 0) + (showItems ? 20 : 0)}px)`
		};

		return (
			<div style={Object.assign({}, styleRoot, style)} {...others}>
				<div>
					<div style={styleWrapperSelectedNText}>
						{selectedRendered}
						<TextField
							ref={this.setRefInput}
							onClick={this.handleTextClick}
							onChange={this.handleTextChange}
							onFocus={this.handleTextFocus}
							onBlur={this.handleTextBlur}
							onKeyDown={this.handleTextKeyDown}
							underlineShow={false}
							hintText={hintText}
							style={{width: 'auto', float: 'left'}}
							/>
					</div>
					{showResetButton && <div style={styleWrapperButtons}><IconButton onClick={this.handleResetItems} style={styleIconBt} iconStyle={Object.assign({}, styleIconClose, iconStyle)}>
						<NavigationClose/>
					</IconButton></div>}
					{showItems && <div style={styleWrapperButtons}><IconButton onClick={this.handleToogleItems} tooltip="SVG Icon" style={styleIconBt} iconStyle={Object.assign({}, styleIconDown, iconStyle)}>
						{iconDrop}
					</IconButton></div>}
				</div>
				<TextFieldUnderline focus={this.state.itemsOpen} style={{position: 'relative'}} muiTheme={this.context.muiTheme}/>
				{showItems && this.state.itemsOpen && <Paper style={styleMenu} ref={this.setRefMenu}>
					{availableRendered}
				</Paper>}
			</div>
		);
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClickAway);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickAway);
	}

	componentWillReceiveProps(nextProps) {
		this.indexItems = {};
		this.mappedItems = nextProps.items.map((a, i) => {
			const transformedItem = 'value' in a ? a : {value: a, label: a};
			this.indexItems[transformedItem.value] = i;
			return transformedItem;
		});
	}

	renderSelected = s => {
		const fn = () => {};
		const styleChip = {
			margin: '0 5px 5px 0',
			float: 'left'
		};

		const styleChipLabel = {
			// TODO change hardcoded value
			maxWidth: 300 - 90,
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		};
		return (
			<Chip
				key={s.value}
				onRequestDelete={fn}
				style={styleChip}
				labelStyle={styleChipLabel}
				data-item-value={s.value}
				onClick={this.handleRemoveItem}
				>
				{s.label}
			</Chip>
		);
	}

	renderList = (a, i) => {
		const styleMenuLabel = {
			// TODO change hardcoded value
			width: 300,
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		};
		const focusedItem = this.getFocusedItem();
		return (
			<MenuItemApp
				desktop
				style={Object.assign({}, styleMenuLabel, i === focusedItem ? {background: 'rgba(0, 0, 0, 0.098)'} : {})}
				onClick={this.handleClickItem}
				onMouseOver={this.handleMenuOver}
				onMouseOut={this.handleMenuOut}
				data-item-value={a.value}
				data-item-index={i}
				key={a.value}
				primaryText={a.label}
				/>
		);
	}
};

SelectTextField.contextTypes = {
	muiTheme: React.PropTypes.object
};

SelectTextField.defaultProps = {
	items: []
};

SelectTextField.propTypes = {
	iconStyle: React.PropTypes.object,
	style: React.PropTypes.object,
	items: React.PropTypes.array,
	onFocus: React.PropTypes.func,
	onBlur: React.PropTypes.func,
	onChange: React.PropTypes.func,
	hintText: React.PropTypes.string
};

module.exports = SelectTextField;
