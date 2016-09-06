'use strict';

import React from 'react';

const debug = require('debug')('AiC:Components:Panel:PanelSessionScreen');

const PanelSessionScreen = class extends React.Component {
	render() {
		debug('render');

		const style = {
			root: {
				paddingBottom: 10
			},
			iframeHorizontal: {
				overflow: 'hidden',
				width: this.props.width,
				height: this.props.height,
				margin: 'auto'
			},
			iframeVertical: {
				overflow: 'hidden',
				width: this.props.height,
				height: this.props.width,
				margin: 'auto'
			},
			audio: {
				display: 'none',
				paddingTop: 20,
				textAlign: 'center'
			}
		};

		const maxWidthHeight = Math.max(this.props.width, this.props.height);

		style.iframeRotation = this.props.rotation === '0' ? style.iframeHorizontal : style.iframeVertical;

		return (
			<div style={style.root}>
				<div style={style.iframeRotation}>
					<canvas id="noVNC_canvas" data-x={maxWidthHeight} width={maxWidthHeight} height={maxWidthHeight}>
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
		return nextProps.rotation !== this.props.rotation;
	}
};

PanelSessionScreen.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

PanelSessionScreen.defaultProps = {
	rotation: '0',
	width: 800,
	height: 600
};

PanelSessionScreen.propTypes = {
	rotation: React.PropTypes.string,
	width: React.PropTypes.number,
	height: React.PropTypes.number
};

module.exports = PanelSessionScreen;
