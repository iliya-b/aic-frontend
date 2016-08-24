'use strict';

import React from 'react';
import LiveStore from 'app/stores/live';
import LiveActions from 'app/actions/live';

const debug = require('debug')('AiC:Components:Project:LiveScreen');

const LiveScreen = class extends React.Component {
	constructor(props) {
		super(props);
		this._onStateChange = this._onStateChange.bind(this);
		this.state = {};
	}

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
				height: '800px'
			},
			iframeRotation: {
				display: 'none',
				height: '0px',
				width: '0px'
			},
			audio: {
				paddingTop: 20,
				textAlign: 'center'
			}
		};

		// const vncUrl = '';
		// TODO: if
		if ('live' in this.state && this.state.live.status === 'LIVE_STATUS_CONNECTED') {
			if (this.state.live.delayedRotation === 'horizontal') {
				style.iframeRotation = style.iframeHorizontal;
			} else if (this.state.live.delayedRotation === 'vertical') {
				style.iframeRotation = style.iframeVertical;
			} else {
				style.iframeRotation = {};
			}
			// vncUrl = "/vnc_auto_goby.html?host=" + this.state.live.screen.ip + "&port=" + this.state.live.screen.port ;
			// style.iframeRotation.display = this.state.live.status === 'LIVE_STATUS_CONNECTED' ? 'initial' : 'none';
		}

		const audioEnabled = false;

		return (<div>
			<div style={style.iframeRotation}>
				<canvas id="noVNC_canvas">
						Canvas not supported.
				</canvas>
			</div>
			{audioEnabled ? (
				<div style={style.audio}>
					<audio id="gobyVMAudio" controls>
						Your browser does not support the <code>audio</code> element.
					</audio>
				</div>
			)	: null}
		</div>);
	}

	_onStateChange(state) {
		if (!this.state.live) {
			debug('setting state');
			this.setState(state);
		}
	}

	componentDidMount() {
		this.unsubscribe = LiveStore.listen(this._onStateChange);
		LiveActions.loadState();
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

LiveScreen.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

module.exports = LiveScreen;
