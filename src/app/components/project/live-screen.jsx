'use strict';

// React
var React = require('react');

// APP
var { LiveStore } = require('goby/stores');
var { LiveActions } = require('goby/actions');

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
      iframeRotation: {},
    };

    var vncUrl = '';
    if (this.state.hasOwnProperty('live')) {
      style.iframeRotation =  this.state.live.delayedRotation === 'horizontal' ? style.iframeHorizontal :
                              this.state.live.delayedRotation === 'vertical' ? style.iframeVertical :
                              {};

      vncUrl = "/vnc_auto_goby.html?host=" + this.state.live.screen.ip + "&port=" + this.state.live.screen.port ;
    }
    return  <div>
              {/*
              <iframe id="novnciframe" style={style.iframeRotation}
                src={vncUrl}
                frameBorder="0" scrolling="no">
                Browser not compatible.
              </iframe>
              */}
              <canvas id="noVNC_canvas" width="640px" height="20px">
                  Canvas not supported.
              </canvas>

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