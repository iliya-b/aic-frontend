'use strict';

import React from 'react';
import {isEqual} from 'app/libs/helpers';

const debug = require('debug')('AiC:Components:Panel:PanelSessionScreen');

const PanelSessionScreen = class extends React.Component {
	render() {
		debug('render');

		const calcWidth = this.props.scale * this.props.width;
		const calcHeight = this.props.scale * this.props.height;

		const style = {
			iframeHorizontal: {
				overflow: 'hidden',
				width: calcWidth,
				height: calcHeight,
				margin: 'auto'
			},
			iframeVertical: {
				overflow: 'hidden',
				width: calcHeight,
				height: calcWidth,
				margin: 'auto'
			},
			audio: {
				display: 'none',
				paddingTop: 20,
				textAlign: 'center'
			}
		};
		const styleRoot = {
			overflow: 'auto'
		};

		style.iframeRotation = this.props.rotation === '0' ? style.iframeHorizontal : style.iframeVertical;

		return (
			<div style={Object.assign(styleRoot, this.props.style)}>
				<div style={style.iframeRotation}>
					<canvas id="noVNC_canvas">
							Canvas not supported.
					</canvas>
				</div>
				<div style={style.audio}>
					<audio id="gobyVMAudio" controls>
						Your browser does not support the <code>audio</code> element.
					</audio>
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.rotation !== this.props.rotation ||
			!isEqual(nextProps.style, this.props.style) ||
			nextProps.scale !== this.props.scale;
	}
};

PanelSessionScreen.defaultProps = {
	rotation: '0',
	width: 800,
	height: 600,
	scale: 1,
	style: {}
};

PanelSessionScreen.propTypes = {
	rotation: React.PropTypes.string,
	width: React.PropTypes.number,
	height: React.PropTypes.number,
	scale: React.PropTypes.number,
	style: React.PropTypes.object
};

module.exports = PanelSessionScreen;
