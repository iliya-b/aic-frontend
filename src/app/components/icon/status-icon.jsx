'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {deepAssign} from 'app/libs/helpers';
import FireSVG from 'app/components/icon/fire';
import Tooltip from 'material-ui/internal/Tooltip';

// const StatusIcon = (this.props, context) => {
const StatusIcon = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {tooltipOpen: false};
	}

	handleOpenTooltip = () => {
		this.setState({tooltipOpen: true});
	}

	handleCloseTooltip = () => {
		this.setState({tooltipOpen: false});
	}

	render() {
		const {
			status,
			style,
			size,
			icon,
			tooltip,
			tooltipPosition
		} = this.props;

		let colorIcon;
		let colorAndro;
		let statusClassName;
		let iconStatus;

		switch (status) {
			case StatusIcon.DISABLED:
				colorIcon = this.context.muiTheme.palette.disabledColor;
				colorAndro = this.context.muiTheme.palette.disabledColor;
				statusClassName = 'mdi mdi-block-helper';
				break;
			case StatusIcon.SERVERERROR:
				colorIcon = this.context.muiTheme.palette.errorColor;
				colorAndro = this.context.muiTheme.palette.errorColor;
				statusClassName = 'mdi mdi-fire';
				break;
			case StatusIcon.ERROR:
				colorIcon = this.context.muiTheme.palette.errorColor;
				colorAndro = this.context.muiTheme.palette.errorColor;
				statusClassName = 'mdi mdi-close';
				break;
			case StatusIcon.LOADING:
				colorIcon = this.context.muiTheme.palette.primary1Color;
				colorAndro = this.context.muiTheme.palette.primary1Color;
				statusClassName = 'mdi mdi-reload';
				break;
			case StatusIcon.SUCCESS:
				colorIcon = this.context.muiTheme.palette.accent1Color;
				colorAndro = this.context.muiTheme.palette.accent1Color;
				statusClassName = 'mdi mdi-check';
				break;
			case StatusIcon.WARNING:
				colorIcon = this.context.muiTheme.palette.warnColor;
				colorAndro = this.context.muiTheme.palette.warnColor;
				statusClassName = 'mdi mdi-alert';
				break;
			case StatusIcon.INFO:
				colorIcon = this.context.muiTheme.palette.primary1Color;
				colorAndro = this.context.muiTheme.palette.primary1Color;
				statusClassName = 'mdi mdi-information';
				break;
			case StatusIcon.QUESTION:
				colorIcon = this.props.color || this.context.muiTheme.palette.primary1Color;
				colorAndro = this.props.color || this.context.muiTheme.palette.primary1Color;
				statusClassName = 'mdi mdi-help';
				break;
			case StatusIcon.START:
				colorIcon = this.context.muiTheme.palette.primary1Color;
				colorAndro = this.context.muiTheme.palette.primary1Color;
				statusClassName = 'mdi mdi-play';
				break;
			default:
				colorIcon = this.context.muiTheme.palette.accent1Color;
				colorAndro = this.context.muiTheme.palette.primary1Color;
				statusClassName = '';
				break;
		}

		const shadowColor = this.props.shadowColor || '#FFFFFF';
		const shadowSize = size === StatusIcon.BIGGER ? '2' : '1';

		let styles = {
			root: {
				width: 40,
				backgroundColor: 'transparent',
				height: 40,
				display: 'inline-block',
				position: 'relative'
			},
			andro: {
				color: colorAndro,
				fontSize: '31px',
				top: 5,
				left: 3,
				position: 'absolute'
			},
			cloud: {
				color: 'transparent'
			},
			status: {
				color: colorIcon,
				position: 'absolute',
				top: 15,
				left: 15,
				textShadow: `-${shadowSize}px -${shadowSize}px ${shadowColor},${shadowSize}px -${shadowSize}px ${shadowColor},-${shadowSize}px ${shadowSize}px ${shadowColor},${shadowSize}px ${shadowSize}px ${shadowColor}`,
				animation: (status === StatusIcon.LOADING ? 'liveIconRotate 3s linear infinite' : 'initial'),
				fontSize: '20px'
			}
		};

		if (size === StatusIcon.BIG) {
			const bigStyles = {
				root: {
					width: 53,
					height: 53,
					lineHeight: '59px'
				},
				andro: {
					fontSize: 46,
					top: 4
				},
				status: {
					fontSize: '25px',
					top: 23,
					left: 23
				}
			};
			styles = deepAssign(styles, bigStyles);
		}

		if (size === StatusIcon.BIGGER) {
			const xbigStyles = {
				root: {
					width: 135,
					height: 115
				},
				andro: {
					fontSize: 110,
					top: 4
				},
				status: {
					fontSize: 83,
					height: 83,
					width: 70,
					top: 39,
					left: 38
				}
			};
			styles = deepAssign(styles, xbigStyles);
		}

		// iconAndro = <FontIcon className="mdi mdi-android" style={styles.andro}/>;
		iconStatus = <FontIcon className={statusClassName} style={styles.status}/>;

		if (status === StatusIcon.DISABLED && size !== StatusIcon.BIGGER) {
			styles.status.fontSize = size === StatusIcon.BIG ? '19px' : '15px';
			styles.status.top = size === StatusIcon.BIG ? 23 : 17;
			styles.status.left = size === StatusIcon.BIG ? 26 : 17;
		}

		if (status === StatusIcon.SERVERERROR) {
			// Android
			styles.andro.fill = styles.andro.color;
			styles.andro.width = styles.andro.fontSize;
			styles.andro.height = styles.andro.fontSize + (size === StatusIcon.BIGGER ? 7 : 2);
			// iconAndro = <DroidDevilSVG style={styles.andro}/>;
			// Status
			styles.status.fill = 'url(#FireGradient)';
			styles.status.stroke = 'white';
			iconStatus = <FireSVG style={styles.status}/>;
		}

		const iconStyleMerged = deepAssign({}, icon.props.style, styles.andro);
		const iconItem = React.cloneElement(icon, {style: iconStyleMerged});

		styles.root = deepAssign(styles.root, style);

	// style={{cursor: 'default'}} tooltip={tooltip}

		const tooltipPositionSplitted = tooltipPosition ? tooltipPosition.split('-') : ['', ''];
		const tooltipElement = tooltip ? (
			<Tooltip
				label={tooltip}
				show={this.state.tooltipOpen}
				verticalPosition={tooltipPositionSplitted[0]}
				horizontalPosition={tooltipPositionSplitted[1]}
				/>
		) : null;

		return (<div style={styles.root} onMouseOver={this.handleOpenTooltip} onMouseOut={this.handleCloseTooltip}>
			{iconItem}
			{iconStatus}
			{tooltipElement}
		</div>);
	}
};

StatusIcon.DISABLED = 'disabled';
StatusIcon.ERROR = 'error';
StatusIcon.LOADING = 'loading';
StatusIcon.SUCCESS = 'success';
StatusIcon.WARNING = 'warning';
StatusIcon.INFO = 'info';
StatusIcon.SERVERERROR = 'serverError';
StatusIcon.QUESTION = 'question';
StatusIcon.START = 'start';

StatusIcon.STATUS_LIST = [StatusIcon.DISABLED,
	StatusIcon.ERROR,
	StatusIcon.LOADING,
	StatusIcon.SUCCESS,
	StatusIcon.WARNING,
	StatusIcon.INFO,
	StatusIcon.SERVERERROR,
	StatusIcon.QUESTION,
	StatusIcon.START];

StatusIcon.NORMAL = 'normal';
StatusIcon.BIG = 'big';
StatusIcon.BIGGER = 'bigger';

StatusIcon.SIZE_LIST = [StatusIcon.NORMAL,
	StatusIcon.BIG,
	StatusIcon.BIGGER];

StatusIcon.contextTypes = {
	muiTheme: React.PropTypes.object
};

StatusIcon.propTypes = {
	style: React.PropTypes.object,
	status: React.PropTypes.oneOf(StatusIcon.STATUS_LIST),
	size: React.PropTypes.oneOf(StatusIcon.SIZE_LIST),
	color: React.PropTypes.string,
	shadowColor: React.PropTypes.string,
	icon: React.PropTypes.node,
	tooltip: React.PropTypes.string,
	tooltipPosition: React.PropTypes.string
};

StatusIcon.defaultProps = {
	tooltipPosition: 'bottom-center'
};

module.exports = StatusIcon;
