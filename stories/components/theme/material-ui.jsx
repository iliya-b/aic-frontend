// TODO: snack and dialog open

import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {themeDecorator} from 'stories/_helpers';
import {
	Checkbox,
	DatePicker,
	Dialog,
	DropDownMenu,
	FlatButton,
	FloatingActionButton,
	RadioButton,
	RadioButtonGroup,
	RaisedButton,
	Snackbar,
	Slider,
	TextField,
	Toggle,
	Menu,
	MenuItem
} from 'material-ui';

const menuItems = [
	{payload: '1', text: 'Never'},
	{payload: '2', text: 'Every Night'},
	{payload: '3', text: 'Weeknights'},
	{payload: '4', text: 'Weekends'},
	{payload: '5', text: 'Weekly'}
];
const menuItemsRendered = menuItems.map(i => <MenuItem key={i.payload} value={i.payload} primaryText={i.text}/>);

const styleGroup = {
	float: 'left',
	width: '33%',
	marginTop: '16px',
	padding: '0 50px',
	boxSizing: 'border-box'
};
const styleGroupSlider = {
	marginTop: '0px',
	width: '100%',
	clear: 'both'
};
const styleContainer = {
	marginBottom: '16px',
	minHeight: '24px',
	textAlign: 'left'
};
const styleContainerCentered = {
	textAlign: 'center',
	marginBottom: '16px',
	minHeight: '24px'
};
const styleTextfield = {
	width: '100%'
};
const styleSlider = {
	marginTop: '0px',
	marginBottom: '0px'
};
const styleMenu = {
	position: 'relative',
	float: 'left'
};

let isDialogOpen = false;
const openDialog = () => {
	isDialogOpen = true;
};
const closeDialog = () => {
	isDialogOpen = false;
};

let isSnackBarOpen = false;
const OpenSnackBar = () => {
	isSnackBarOpen = true;
};
const closeSnackBar = () => {
	isSnackBarOpen = false;
};

const standardActions = [
	<FlatButton key="1" label="Cancel" onClick={closeDialog}/>,
	<FlatButton key="2" primary label="Submit" onClick={closeDialog}/>
];

storiesOf('Theme', module)
	.addDecorator(themeDecorator)
	.add('MaterialUI', () => (
		<div>
			<div style={styleGroup}>
				<div style={styleContainerCentered}>
					<FloatingActionButton iconClassName="mdi mdi-star" disabled/>
				</div>
				<div style={styleContainerCentered}>
					<FloatingActionButton iconClassName="mdi mdi-star" disabled={false}/>
				</div>
				<div style={styleContainerCentered}>
					<FloatingActionButton iconClassName="mdi mdi-star" disabled={false} secondary/>
				</div>
				<div style={styleContainerCentered}>
					<RaisedButton label="Secondary" secondary/>
				</div>
				<div style={styleContainerCentered}>
					<RaisedButton label="Primary" primary/>
				</div>
				<div style={styleContainerCentered}>
					<RaisedButton label="Default"/>
				</div>
				<div style={styleContainerCentered}>
					<FlatButton label="Secondary" secondary/>
				</div>
				<div style={styleContainerCentered}>
					<FlatButton label="Primary" primary/>
				</div>
				<div style={styleContainerCentered}>
					<FlatButton label="Default"/>
				</div>
			</div>

			<div style={styleGroup}>
				<div style={styleContainer}>
					<Checkbox name="checkboxName1" value="checkboxValue1" label="checkbox"/>
					<Checkbox name="checkboxName2" value="checkboxValue2" label="disabled checkbox" disabled/>
				</div>
				<div style={styleContainer}>
					<RadioButtonGroup name="shipSpeed" defaultSelected="usd">
						<RadioButton value="usd" label="USD"/>
						<RadioButton value="euro" label="Euro"/>
						<RadioButton value="mxn" label="MXN" disabled/>
					</RadioButtonGroup>
				</div>
				<div style={styleContainer}>
					<Toggle name="toggleName1" value="toggleValue1" label="toggle"/>
					<Toggle name="toggleName2" value="toggleValue2" label="disabled toggle" defaultToggled disabled/>
				</div>
				<div style={styleContainer}>

					<Menu style={styleMenu}>
						<MenuItem primaryText="Maps"/>
						<MenuItem primaryText="Books"/>
						<MenuItem primaryText="Flights"/>
						<MenuItem primaryText="Apps"/>
					</Menu>
				</div>
			</div>

			<div style={Object.assign(styleGroup, {marginTop: 0})}>
				<div style={styleContainer}>
					<TextField
						style={styleTextfield}
						hintText="TextField"
						/>
				</div>
				<div style={styleContainer}>
					<DatePicker
						hintText="Landscape Dialog"
						mode="landscape"
						style={{width: '100%'}}
						/>
				</div>
				<div style={styleContainer}>
					<DropDownMenu style={{width: '100%'}}>
						{menuItemsRendered}
					</DropDownMenu>
				</div>
			</div>

			<div style={styleGroupSlider}>
				<Slider style={styleSlider} name="slider2" defaultValue={0.5}/>
			</div>

			<div style={styleGroup}>
				<div style={styleContainerCentered}>
					<FlatButton label="View Dialog" onClick={openDialog}/>
					<Dialog open={isDialogOpen} title="Dialog With Standard Actions" actions={standardActions}>
						The actions in this window are created from the json that&#39;s passed in.
					</Dialog>
				</div>
			</div>

			<div style={styleGroup}>
				<div style={styleContainerCentered}>
					<FlatButton
						onTouchTap={OpenSnackBar}
						label="View Snackbar"
						/>
					<Snackbar message="This is a snackbar" action="Got It!" open={isSnackBarOpen} onRequestClose={closeSnackBar}/>
				</div>
			</div>
		</div>
	));
