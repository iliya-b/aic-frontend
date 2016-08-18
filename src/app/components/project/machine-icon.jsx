'use strict';

// Vendor
import React from 'react';
import FontIcon from 'material-ui/FontIcon';
// TODO: remove deepExtend, we don't need it, Object.assign is sufficient for our needs
import deepExtend from 'deep-extend';

// APP
import DroidDevilSVG from 'app/components/icon/droid-devil';
import FireSVG from 'app/components/icon/fire';

const MachineIcon = class extends React.Component {

	render() {
		const {
			status,
			style,
			bigIcon,
			xbigIcon
		} = this.props;

		let colorIcon;
		let colorAndro;
		let statusClassName;
		let iconAndro;
		let iconStatus;

		switch (status) {
			case MachineIcon.DISABLED:
				colorIcon = this.context.muiTheme.palette.disabledColor;
				colorAndro = this.context.muiTheme.palette.disabledColor;
				statusClassName = 'mdi mdi-block-helper';
				break;
			case MachineIcon.SERVERERROR:
				colorIcon = this.context.muiTheme.palette.errorColor;
				colorAndro = this.context.muiTheme.palette.errorColor;
				statusClassName = 'mdi mdi-fire';
				break;
			case MachineIcon.ERROR:
				colorIcon = this.context.muiTheme.palette.errorColor;
				colorAndro = this.context.muiTheme.palette.errorColor;
				statusClassName = 'mdi mdi-close';
				break;
			case MachineIcon.LOADING:
				colorIcon = this.context.muiTheme.palette.primary1Color;
				colorAndro = this.context.muiTheme.palette.primary1Color;
				statusClassName = 'mdi mdi-reload';
				break;
			case MachineIcon.SUCCESS:
				colorIcon = this.context.muiTheme.palette.accent1Color;
				colorAndro = this.context.muiTheme.palette.accent1Color;
				statusClassName = 'mdi mdi-check';
				break;
			case MachineIcon.WARNING:
				colorIcon = this.context.muiTheme.palette.warnColor;
				colorAndro = this.context.muiTheme.palette.warnColor;
				statusClassName = 'mdi mdi-alert';
				break;
			case MachineIcon.INFO:
				colorIcon = this.context.muiTheme.palette.primary1Color;
				colorAndro = this.context.muiTheme.palette.primary1Color;
				statusClassName = 'mdi mdi-information';
				break;
			case MachineIcon.QUESTION:
				colorIcon = this.props.color || this.context.muiTheme.palette.primary1Color;
				colorAndro = this.props.color || this.context.muiTheme.palette.primary1Color;
				statusClassName = 'mdi mdi-help';
				break;
			case MachineIcon.START:
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
		const shadowSize = xbigIcon ? '2' : '1';

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
				animation: (status === MachineIcon.LOADING ? 'liveIconRotate 3s linear infinite' : 'initial'),
				fontSize: '20px'
			}
		};

		if (bigIcon) {
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
			styles = deepExtend(styles, bigStyles);
		}

		if (xbigIcon) {
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
			styles = deepExtend(styles, xbigStyles);
		}

		iconAndro = <FontIcon className="mdi mdi-android" style={styles.andro}/>;
		iconStatus = <FontIcon className={statusClassName} style={styles.status}/>;

		if (status === MachineIcon.DISABLED && !xbigIcon) {
			styles.status.fontSize = (bigIcon || xbigIcon) ? '19px' : '15px';
			styles.status.top = (bigIcon || xbigIcon) ? 23 : 17;
			styles.status.left = (bigIcon || xbigIcon) ? 26 : 17;
		}

		if (status === MachineIcon.SERVERERROR) {
			// Android
			styles.andro.fill = styles.andro.color;
			styles.andro.width = styles.andro.fontSize;
			styles.andro.height = styles.andro.fontSize + (xbigIcon ? 7 : 2);
			iconAndro = <DroidDevilSVG style={styles.andro}/>;
			// Status
			styles.status.fill = 'url(#FireGradient)';
			styles.status.stroke = 'white';
			iconStatus = <FireSVG style={styles.status}/>;
		}

		styles.root = deepExtend(styles.root, style);

		return (<div style={styles.root}>
			{iconAndro}
			{iconStatus}
		</div>);
	}

};

MachineIcon.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

MachineIcon.propTypes = {
	status: React.PropTypes.string,
	style: React.PropTypes.object,
	bigIcon: React.PropTypes.bool,
	xbigIcon: React.PropTypes.bool,
	color: React.PropTypes.string,
	shadowColor: React.PropTypes.string
};

MachineIcon.DISABLED = 'disabled';
MachineIcon.ERROR = 'error';
MachineIcon.LOADING = 'loading';
MachineIcon.SUCCESS = 'success';
MachineIcon.WARNING = 'warning';
MachineIcon.INFO = 'info';
MachineIcon.SERVERERROR = 'serverError';
MachineIcon.QUESTION = 'question';
MachineIcon.START = 'start';

module.exports = MachineIcon;
