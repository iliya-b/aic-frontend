'use strict';

// Vendor
const React = require('react');

// APP
const AvatarProgress = class extends React.Component {

	render() {
		const {
			backgroundColor,
			foregroundColor,
			color,
			icon,
			size,
			progress,
			style
		} = this.props;

		const styles = {
			root: {
				height: size,
				width: size,
				userSelect: 'none',
				borderRadius: '50%',
				display: 'inline-block'
			},
			outer: {
				fill: 'transparent',
				stroke: foregroundColor,
				strokeWidth: '5px',
				strokeDasharray: '106px',
				transition: 'stroke-dashoffset 1s',
				WebkitAnimationPlayState: 'running',
				MozTransform: 'rotate(-89deg) translateX(-190px)'
			},
			outerBG: {
				fill: 'transparent',
				stroke: backgroundColor,
				strokeWidth: '5px',
				strokeDasharray: '106px',
				transition: 'stroke-dashoffset 1s',
				WebkitAnimationPlayState: 'running',
				MozTransform: 'rotate(-89deg) translateX(-190px)'
			},
			figcaption: {
				width: '30px',
				height: '30px',
				border: '5px solid transparent',
				borderRadius: '30px'
			},
			svg: {
				position: 'absolute',
				top: 0,
				left: 0
			},
			chart: {
				position: 'relative',
				display: 'inline-block',
				/* So it can be override by props styles */
				marginLeft: 0,
				marginRight: 0,
				marginTop: 0,
				marginBottom: 0
			}
		};

		styles.root = Object.assign(styles.root, {
			backgroundColor,
			textAlign: 'center',
			lineHeight: `${size}px`,
			fontSize: (size / 2) + 4,
			color
		}, style);

		const styleIcon = {
			margin: '3px'
		};

		const iconElement = icon ? React.cloneElement(icon, {
			color,
			style: Object.assign(styleIcon, icon.props.style)
		}) : null;

		return (
			<figure className="chart" data-percent={progress} style={Object.assign(styles.chart, style)}>
				<svg width="40" height="40" style={styles.svg}>
					<circle style={styles.outerBG} cx="170" cy="20" r="17" transform="rotate(-90, 95, 95)"/>
					<circle style={styles.outer} className="outer" cx="170" cy="20" r="17" transform="rotate(-90, 95, 95)"/>
				</svg>
				<figcaption style={styles.figcaption}>
					{iconElement}
					{this.props.children}
				</figcaption>
			</figure>
		);
	}

};

AvatarProgress.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

AvatarProgress.propTypes = {
	children: React.PropTypes.object,
	style: React.PropTypes.object,
	backgroundColor: React.PropTypes.string,
	foregroundColor: React.PropTypes.string,
	color: React.PropTypes.string,
	icon: React.PropTypes.node,
	size: React.PropTypes.string,
	progress: React.PropTypes.number
};

module.exports = AvatarProgress;
