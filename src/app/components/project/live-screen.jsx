'use strict';

// React
var React = require('react');

// APP
var { LiveStore } = require('app/stores');
var { LiveActions } = require('app/actions');

var LiveScreen = class extends React.Component{

  constructor(props) {
    super(props);
    this._onStateChange = this._onStateChange.bind(this);
    this.state = {};
  }

  render() {
    var style = {
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
        width: '0px',
      },
      audio: {
        paddingTop: 20,
        textAlign: 'center',
      },
    };

    // var vncUrl = '';
    if (this.state.hasOwnProperty('live') && this.state.live.status === 'LIVE_STATUS_CONNECTED' ) {
      style.iframeRotation =  this.state.live.delayedRotation === 'horizontal' ? style.iframeHorizontal :
                              this.state.live.delayedRotation === 'vertical' ? style.iframeVertical :
                              {};

      // vncUrl = "/vnc_auto_goby.html?host=" + this.state.live.screen.ip + "&port=" + this.state.live.screen.port ;
      // style.iframeRotation.display = this.state.live.status === 'LIVE_STATUS_CONNECTED' ? 'initial' : 'none';
    }

    return  <div>
              <div style={style.iframeRotation}>
                {/*
                <iframe id="novnciframe" style={style.iframeRotation}
                  src={vncUrl}
                  frameBorder="0" scrolling="no">
                  Browser not compatible.
                </iframe>
                */}
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
  }

  _onStateChange( state ){
    this.setState( state );
  }

  componentDidMount() {
    this.unsubscribe = LiveStore.listen( this._onStateChange );
    LiveActions.loadState();
  }

  componentWillUnmount() {
    // Subscribe and unsubscribe because we don't want to use the mixins
    this.unsubscribe();
  }

};

LiveScreen.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = LiveScreen;