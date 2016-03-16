'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {
	FontIcon,
	Paper
} = mui;

function getIconNameByStatus(status, defaultIcon, type) {
	if (status === 'success') {
		return 'mdi mdi-check';
	}
	if (status === 'fail') {
		return 'mdi mdi-close';
	}
	if (status === 'not-found-help' && type === 'not-found') {
		return 'mdi mdi-help';
	}
	if (status === 'not-found-close' && type === 'not-found') {
		return 'mdi mdi-close';
	}
	return defaultIcon;
}

// APP
const AppUtils = require('app/components/shared/app-utils');

const BoxStatus = class extends React.Component {

	render() {
		const {
			typeName,
			status,
			isFirst
		} = this.props;

		let message;
		let statusIcons;

		let colorIcon = this.context.muiTheme.palette.accent1Color;
		let colorMessage = this.context.muiTheme.palette.primary1Color;
		let colorAndro = this.context.muiTheme.palette.primary1Color;
		if (status === 'disable') {
			colorIcon = this.context.muiTheme.palette.disabledColor;
			colorMessage = this.context.muiTheme.palette.disabledColor;
			colorAndro = this.context.muiTheme.palette.disabledColor;
		} else if (status === 'fail') {
			colorIcon = this.context.muiTheme.palette.errorColor;
			colorMessage = this.context.muiTheme.palette.errorColor;
		} else if (status === 'success') {
			colorMessage = this.context.muiTheme.palette.accent1Color;
		}
		const styles = {
			wrapper: {
				display: 'inline-block'
			},
			box: {
				width: '100px',
				height: '100px',
				display: 'inline-block',
				overflow: 'hidden',
				float: 'left'
			},
			message: {
				color: colorMessage,
				fontSize: '12px',
				textAlign: 'center',
				padding: '0 3px'
			},
			icon: {
				color: colorIcon
			},
			iconDivider: {
				color: colorAndro,
				animation: (status === 'doing' ? 'transitionHide 0.5s linear infinite alternate' : 'initial'),
				padding: '40px 13px 36px 12px',
				float: 'left'
			},
			iconBox: {
				width: '100px',
				height: '50px',
				display: 'inline-block',
				position: 'relative'
			},
			messageBox: {
				display: 'flex',
				width: '100px',
				height: '50px',
				alignItems: 'center',
				justifyContent: 'center'
			}
		};

		const objectName = this.props.objectName ? this.props.objectName : 'session';
		const iconsNMessages = {
			success: 'mdi mdi-check',
			fail: 'mdi mdi-close',
			search: {
				'success': 'Session found',
				'not-found': 'Session not found',
				'fail': 'Search failed',
				'': 'Searching for session',
				'icons': [{
					className: 'mdi mdi-android',
					style: {
						color: colorAndro,
						fontSize: '35px',
						position: 'absolute',
						top: '13px',
						left: '32px'
					}
				}, {
					className: getIconNameByStatus(status, 'mdi mdi-magnify', 'not-found-help'),
					style: {
						color: colorIcon,
						fontSize: '30px',
						position: 'absolute',
						top: (status === 'doing' ? '18px' : '11px'),
						left: (status === 'doing' ? '39px' : '46px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						animation: (status === 'doing' ? 'liveIconMagnify 5s linear infinite' : 'initial')
					}
				}]
			},
			create: {
				'success': `${AppUtils.capitalize(objectName)} created`,
				'fail': `${AppUtils.capitalize(objectName)} not created`,
				'': `Creating new ${objectName}`,
				'icons': [{
					className: 'mdi mdi-cloud',
					style: {
						color: colorAndro,
						fontSize: '40px',
						top: '11px',
						left: (status === 'doing' ? '48px' : '42px'),
						position: 'absolute'
					}
				}, {
					className: 'mdi mdi-android',
					style: {
						color: colorAndro,
						position: 'absolute',
						top: '20px',
						left: (status === 'doing' ? '30px' : '20px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						animation: (status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
						fontSize: '22px'
					}
				}, {
					className: getIconNameByStatus(status, 'mdi mdi-plus'),
					style: {
						color: colorIcon,
						position: 'absolute',
						top: '14px',
						left: (status === 'doing' ? '37px' : '27px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						animation: (status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
						fontSize: '30px'
					}
				}]
			},
			connect: {
				'success': 'Session connected',
				'fail': 'Session not connected',
				'': 'Connecting to session',
				'icons': [{
					className: 'mdi mdi-desktop-mac',
					style: {
						color: colorAndro,
						fontSize: '40px',
						top: '11px',
						left: (status === 'doing' ? '51px' : '42px'),
						position: 'absolute'
					}
				}, {
					className: 'mdi mdi-android',
					style: {
						color: colorAndro,
						fontSize: '22px',
						position: 'absolute',
						top: '18px',
						left: (status === 'doing' ? '8px' : '19px')
					}
				}, {
					className: getIconNameByStatus(status, 'mdi mdi-arrow-right'),
					style: {
						color: colorIcon,
						fontSize: ((status === 'doing' || status === 'disable') ? '20px' : '30px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						position: 'absolute',
						top: '14px',
						left: (status === 'doing' ? '29px' : '29px'),
						animation: (status === 'doing' ? 'liveIconSides 5s ease-in-out infinite' : 'initial')
					}
				}]
			},
			open: {
				'success': 'Session opened',
				'fail': 'Session not opened',
				'': 'Opening session'
			},
			close: {
				'success': 'Session closed',
				'fail': 'Session not closed',
				'': 'Closing session',
				'icons': [{
					className: 'mdi mdi-cloud',
					style: {
						color: colorAndro,
						fontSize: '30px',
						top: '18px',
						left: '18px',
						position: 'absolute',
						display: (status === 'doing' ? 'initial' : 'none')
					}
				}, {
					className: 'mdi mdi-delete',
					style: {
						color: colorAndro,
						fontSize: '30px',
						position: 'absolute',
						top: '18px',
						left: (status === 'doing' ? '58px' : '47px')
					}
				}, {
					className: 'mdi mdi-android',
					style: {
						color: colorAndro,
						position: 'absolute',
						top: '20px',
						left: (status === 'doing' ? '40px' : '27px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						animation: (status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
						fontSize: '22px'
					}
				}, {
					className: getIconNameByStatus(status, 'mdi mdi-minus'),
					style: {
						color: (status === 'doing' ? this.context.muiTheme.palette.errorColor : colorIcon),
						position: 'absolute',
						top: '14px',
						left: (status === 'doing' ? '47px' : '35px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						animation: (status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
						fontSize: '30px'
					}
				}]
			},
			load: {
				'success': 'Session loaded',
				'fail': 'Session not loaded',
				'': 'Loading session',
				'icons': [{
					className: 'mdi mdi-cloud',
					style: {
						color: colorAndro,
						fontSize: '40px',
						top: '11px',
						left: (status === 'doing' ? '42px' : '42px'),
						position: 'absolute'
					}
				}, {
					className: 'mdi mdi-android',
					style: {
						color: colorAndro,
						position: 'absolute',
						top: '20px',
						left: (status === 'doing' ? '20px' : '20px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						fontSize: '22px'
					}
				}, {
					className: getIconNameByStatus(status, 'mdi mdi-reload'),
					style: {
						color: colorIcon,
						position: 'absolute',
						top: '14px',
						left: (status === 'doing' ? '27px' : '27px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						animation: (status === 'doing' ? 'liveIconRotate 3s linear infinite' : 'initial'),
						fontSize: '30px'
					}
				}]
			},
			ready: {
				'success': 'Session ready',
				'fail': 'Session not ready',
				'': 'Preparing session'
			},
			prepare: {
				'success': 'Campaign ready',
				'fail': 'Prepare failed',
				'': 'Preparing campaign',
				'icons': [{
					className: 'mdi mdi-android',
					style: {
						color: colorAndro,
						fontSize: '15px',
						position: 'absolute',
						top: '22px',
						left: '27px'
					}
				}, {
					className: 'mdi mdi-cellphone-android',
					style: {
						color: colorAndro,
						fontSize: '35px',
						position: 'absolute',
						top: '13px',
						left: '17px'
					}
				}, {
					className: 'mdi mdi-file',
					style: {
						color: colorAndro,
						fontSize: '35px',
						position: 'absolute',
						top: '13px',
						left: '48px'
					}
				}, {
					className: getIconNameByStatus(status, 'mdi mdi-magnify', 'not-found-close'),
					style: {
						color: (status === 'not-found' ? this.context.muiTheme.palette.errorColor : colorIcon),
						fontSize: '30px',
						position: 'absolute',
						top: (status === 'doing' ? '18px' : '18px'),
						left: (status === 'doing' ? '39px' : '36px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						animation: (status === 'doing' ? 'liveIconMagnify 5s linear infinite' : 'initial')
					}
				}]
			},
			run: {
				'success': 'Tests finished',
				'fail': 'Tests failed to run',
				'': 'Running tests',
				'icons': [{
					className: 'mdi mdi-android',
					style: {
						color: colorAndro,
						fontSize: '35px',
						position: 'absolute',
						top: '13px',
						left: '32px'
					}
				}, {
					className: getIconNameByStatus(status, 'mdi mdi-settings', 'not-found-close'),
					style: {
						color: (status === 'not-found' ? this.context.muiTheme.palette.errorColor : colorIcon),
						fontSize: '30px',
						position: 'absolute',
						top: (status === 'doing' || status === 'disable' ? '24px' : '11px'),
						left: (status === 'doing' || status === 'disable' ? '46px' : '46px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						animation: (status === 'doing' ? 'liveIconRotate 5s linear infinite' : 'initial')
					}
				}]
			},
			result: {
				'success': 'Results downloaded',
				'fail': 'Results not downloaded',
				'': 'Downloading results',
				'icons': [{
					className: 'mdi mdi-file',
					style: {
						color: colorAndro,
						fontSize: '43px',
						top: '11px',
						left: (status === 'doing' ? '48px' : '30px'),
						position: 'absolute'
					}
				}, {
					className: 'mdi mdi-android',
					style: {
						color: (status === 'doing' ? colorAndro : '#FFFFFF'),
						position: 'absolute',
						top: (status === 'doing' ? '20px' : '23px'),
						left: (status === 'doing' ? '30px' : '39px'),
						textShadow: (status === 'doing' ? '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF' : ''),
						animation: (status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
						fontSize: '23px'
					}
				}, {
					className: getIconNameByStatus(status, 'mdi mdi-plus'),
					style: {
						color: colorIcon,
						position: 'absolute',
						top: (status === 'doing' ? '14px' : '25px'),
						left: (status === 'doing' ? '37px' : '50px'),
						textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
						animation: (status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
						fontSize: '30px'
					}
				}]
			}
		};

		if (typeName in iconsNMessages) {
			const statusFound = status in iconsNMessages[typeName] ? status : '';
			message = iconsNMessages[typeName][statusFound];
			statusIcons = iconsNMessages[typeName].icons === undefined ? null :
											iconsNMessages[typeName].icons.map((item, index) => {
												return <span style={item.style} className={item.className} key={index}/>;
											});
		}

		return (<div style={styles.wrapper}>

			{isFirst ? null : (

				<FontIcon
					style={styles.iconDivider}
					className="mdi mdi-dots-horizontal"
					/>

			)}

			<Paper style={styles.box}>

				<div style={styles.iconBox}>
				{statusIcons}
				</div>

				<div style={styles.messageBox}>
					<p style={styles.message}>{message}</p>
				</div>
			</Paper>

		</div>);
	}
};

BoxStatus.contextTypes = {
	muiTheme: React.PropTypes.object
};

BoxStatus.propTypes = {
	typeName: React.PropTypes.string,
	status: React.PropTypes.string,
	subStatus: React.PropTypes.string,
	isLast: React.PropTypes.bool,
	isFirst: React.PropTypes.bool,
	objectName: React.PropTypes.string
};

module.exports = BoxStatus;
