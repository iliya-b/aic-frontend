'use strict';

import React from 'react';

const chatTotalLen = 106;
const chatTotalSteps = 100;
const chartPercStep = chatTotalLen / chatTotalSteps;
const getStrokeOffset = progressI => ((chatTotalSteps - progressI) * chartPercStep);
const getStyleProgressAnimated = p => ({
	stroke: p.color,
	strokeDashoffset: `${getStrokeOffset(p.progress)}`,
	WebkitAnimation: `show${p.progress} 2s`,
	animation: `show${p.progress}' 2s`
});

const getStyleProgressNormal = p => ({
	stroke: p.color,
	strokeDashoffset: `${getStrokeOffset(p.progress)}`
});

const AvatarProgress = props => {
	const {
		style,
		icon,
		progress,
		backgroundColor,
		children,
		animation,
		...other
	} = props;

	const styleOuter = {
		fill: 'transparent',
		strokeWidth: '5px',
		strokeDasharray: '106px',
		transition: 'stroke-dashoffset 1s',
		WebkitAnimationPlayState: 'running',
		MozTransform: 'rotate(-89deg) translateX(-190px)'
	};
	const styleOuterBG = {
		fill: 'transparent',
		stroke: backgroundColor,
		strokeWidth: '5px',
		strokeDasharray: '106px',
		transition: 'stroke-dashoffset 1s',
		WebkitAnimationPlayState: 'running',
		MozTransform: 'rotate(-89deg) translateX(-190px)'
	};
	const styleFigcaption = {
		width: '30px',
		height: '30px',
		border: '5px solid transparent',
		borderRadius: '30px'
	};
	const styleSvg = {
		position: 'absolute',
		top: 0,
		left: 0
	};
	const styleChart = {
		position: 'relative',
		display: 'inline-block',
		/* So it can be override by props style */
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		marginBottom: 0
	};

	const styleIcon = {
		margin: '3px'
	};

	const iconElement = icon ? React.cloneElement(icon, {
		style: Object.assign(styleIcon, icon.props.style)
	}) : null;

	const circles = progress
		.map((p, i) => {
			const styleMerged = Object.assign(animation ? getStyleProgressAnimated(p) : getStyleProgressNormal(p), styleOuter);
			return <circle key={i} style={styleMerged} cx="170" cy="20" r="17" transform="rotate(-90, 95, 95)"/>;
		});

	return (
		<figure className="chart" data-percent={progress} style={Object.assign(styleChart, style)} {...other}>
			<svg width="40" height="40" style={styleSvg}>
				<circle style={styleOuterBG} cx="170" cy="20" r="17" transform="rotate(-90, 95, 95)"/>
				{circles}
			</svg>
			<figcaption style={styleFigcaption}>
				{iconElement}
				{children}
			</figcaption>
		</figure>
	);
};

AvatarProgress.propTypes = {
	children: React.PropTypes.object,
	style: React.PropTypes.object,
	icon: React.PropTypes.node,
	progress: React.PropTypes.array,
	backgroundColor: React.PropTypes.string,
	animation: React.PropTypes.bool
};

module.exports = AvatarProgress;
