/* jshint unused: false */
const React = require('react');

const mui = require('material-ui');
const {FontIcon, Toggle, Checkbox, LinearProgress} = mui;
const {Transitions} = mui.Styles;

const Types = {
	LINK: 'LINK',
	SUBHEADER: 'SUBHEADER',
	NESTED: 'NESTED'
};

const ObjectListItem = React.createClass({

	contextTypes: {
		muiTheme: React.PropTypes.object
	},

	propTypes: {
		index: React.PropTypes.number.isRequired,
		className: React.PropTypes.string,
		iconClassName: React.PropTypes.string,
		iconRightClassName: React.PropTypes.string,
		iconStyle: React.PropTypes.object,
		iconRightStyle: React.PropTypes.object,
		attribute: React.PropTypes.string,
		number: React.PropTypes.string,
		data: React.PropTypes.string,
		toggle: React.PropTypes.bool,
		check: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		onTouchTap: React.PropTypes.func,
		onClick: React.PropTypes.func,
		onToggle: React.PropTypes.func,
		onCheck: React.PropTypes.func,
		selected: React.PropTypes.bool,
		onMouseOver: React.PropTypes.func,
		onMouseOut: React.PropTypes.func,
		checkbox: React.PropTypes.bool,
		children: React.PropTypes.object,
		label: React.PropTypes.string,
		style: React.PropTypes.object,
		title: React.PropTypes.string,
		href: React.PropTypes.string,
		progress: React.PropTypes.number,
		errorText: React.PropTypes.string
	},

	statics: {
		Types
	},

	getDefaultProps() {
		return {
			toggle: false,
			checkbox: false,
			disabled: false
		};
	},

	getInitialState() {
		return {
			hovered: false
		};
	},

	getTheme() {
		return this.context.muiTheme.component.menuItem;
	},

	getSpacing() {
		return this.context.muiTheme.spacing;
	},

	getStyles() {
		const styles = {
			root: {
				userSelect: 'none',
				cursor: 'pointer',
				lineHeight: `${this.getTheme().height}px`,
				paddingLeft: this.getTheme().padding,
				paddingRight: this.getTheme().padding,
				color: this.context.muiTheme.palette.textColor
			},
			number: {
				float: 'right',
				width: 24,
				textAlign: 'center'
			},
			attribute: {
				float: 'right'
			},
			iconRight: {
				lineHeight: `${this.getTheme().height}px`,
				float: 'right'
			},
			icon: {
				float: 'left',
				lineHeight: `${this.getTheme().height}px`,
				marginRight: this.getSpacing().desktopGutter
			},
			data: {
				display: 'block',
				paddingLeft: this.getSpacing().desktopGutter * 2,
				lineHeight: `${this.getTheme().dataHeight}px`,
				height: `${this.getTheme().dataHeight}px`,
				verticalAlign: 'top',
				top: -12,
				position: 'relative',
				fontWeight: 300,
				color: this.context.muiTheme.palette.textColor
			},
			toggle: {
				marginTop: ((this.getTheme().height - this.context.muiTheme.component.radioButton.size) / 2),
				float: 'right',
				width: 42
			},
			checkbox: {
				marginTop: ((this.getTheme().height - this.context.muiTheme.component.radioButton.size) / 2),
				float: 'right',
				width: 42
			},
			rootWhenHovered: {
				backgroundColor: this.getTheme().hoverColor
			},
			rootWhenSelected: {
				color: this.getTheme().selectedTextColor
			},
			rootWhenDisabled: {
				cursor: 'default',
				color: this.context.muiTheme.palette.disabledColor
			},
			error: {
				color: this.context.muiTheme.palette.errorColor,
				fontSize: '12px',
				lineHeight: '12px',
				transition: Transitions.easeOut(),
				marginTop: '-10px'
			}
		};
		return styles;
	},

	render() {
		let icon;
		let data;
		let iconRight;
		let attribute;
		let number;
		let toggleElement;
		let checkboxElement;
		let progressElement;
		let childrenElements;
		const {
				toggle,
				checkbox,
				onClick,
				onToggle,
				onCheck,
				onMouseOver,
				onMouseOut,
				children,
				label,
				style,
				title,
				href,
				progress,
				...other} = this.props;

		const styles = this.getStyles();

		if (this.props.iconClassName) {
			icon = <FontIcon style={Object.assign(styles.icon, this.props.iconStyle)} className={this.props.iconClassName} />;
		}
		if (this.props.iconRightClassName) {
			iconRight = <FontIcon style={Object.assign(styles.iconRight, this.props.iconRightStyle)} className={this.props.iconRightClassName} />;
		}
		if (this.props.data) {
			data = <span style={Object.assign(styles.data)}>{this.props.data}</span>;
		}
		if (this.props.number !== undefined) {
			number = <span style={Object.assign(styles.number)}>{this.props.number}</span>;
		}
		if (this.props.attribute !== undefined) {
			attribute = <span style={Object.assign(styles.style)}>{this.props.attribute}</span>;
		}
		if (this.props.toggle) {
			toggleElement = <Toggle {...other} onToggle={this._handleToggle} style={styles.toggle}/>;
		}
		if (this.props.checkbox) {
			checkboxElement = <Checkbox {...other} onCheck={this._handleCheck} style={styles.checkbox}/>;
		}
		if (this.props.progress !== undefined && this.props.progress !== false) {
			progressElement = <LinearProgress mode="determinate" value={progress} />;
		}
		if (this.props.children) {
			childrenElements = <a title={title} href={href}>{this.props.children}</a>;
		}

		const errorTextElement = this.props.errorText ? (
			<div style={styles.error}>{this.props.errorText}</div>
		) : null;

		return (
			<div
				key={this.props.index}
				className={this.props.className}
				onTouchTap={this._handleTouchTap}
				onClick={this._handleOnClick}
				onMouseOver={this._handleMouseOver}
				onMouseOut={this._handleMouseOut}
				style={Object.assign(
					styles.root,
					this.props.selected && styles.rootWhenSelected,
					(this.state.hovered && !this.props.disabled) && styles.rootWhenHovered,
					this.props.style,
					this.props.disabled && styles.rootWhenDisabled)}
				>

				{icon}
				{childrenElements}
				{data}
				{attribute}
				{number}
				{toggleElement}
				{checkboxElement}
				{iconRight}
				{progressElement}
				{errorTextElement}

			</div>
		);
	},

	_handleTouchTap(e) {
		if (!this.props.disabled && this.props.onTouchTap) {
			this.props.onTouchTap(e, this.props.index);
		}
	},

	_handleOnClick(e) {
		if (!this.props.disabled && this.props.onClick) {
			this.props.onClick(e, this.props.index);
		}
	},

	_handleToggle(e, toggled) {
		if (!this.props.disabled && this.props.onToggle) {
			this.props.onToggle(e, this.props.index, toggled);
		}
	},

	_handleCheck(e, checked) {
		if (!this.props.disabled && this.props.onCheck) {
			this.props.onCheck(e, this.props.index, checked);
		}
	},

	_handleMouseOver(e) {
		this.setState({hovered: true});
		if (!this.props.disabled && this.props.onMouseOver) {
			this.props.onMouseOver(e);
		}
	},

	_handleMouseOut(e) {
		this.setState({hovered: false});
		if (!this.props.disabled && this.props.onMouseOut) {
			this.props.onMouseOut(e);
		}
	}

});

module.exports = ObjectListItem;
