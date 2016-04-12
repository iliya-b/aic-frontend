'use strict';

// Vendor
const React = require('react');
const debug = require('debug')('AiC:Components:Panel:PanelSessionScreen');

// APP
const PanelSessionScreen = class extends React.Component {
	render() {
		debug('render');

		const style = {
			iframeHorizontal: {
				overflow: 'hidden',
				width: '800px',
				height: '600px'
			},
			iframeVertical: {
				overflow: 'hidden',
				width: '600px',
				height: '800px',
				margin: 'auto'
			},
			audio: {
				paddingTop: 20,
				textAlign: 'center'
			}
		};

		style.iframeRotation = this.props.rotation === "0" ? style.iframeHorizontal : style.iframeVertical;

		return (
			<div>
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
		return nextProps.rotation !== this.props.rotation;
	}
};

PanelSessionScreen.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

PanelSessionScreen.propTypes = {
	rotation: React.PropTypes.string
};

module.exports = PanelSessionScreen;
