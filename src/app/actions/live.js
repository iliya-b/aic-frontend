'use strict';

// Reflux
const Reflux = require('reflux');

// Vendor
const debuggerGoby = require('debug')('AiC:Live:Actions');

// APP
const BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
const LiveActions = Reflux.createActions({
  setProjectId: {children: ['completed', 'failure']},
  loadState: {},
  loadInfo: {children: ['completed', 'failure']},
  setState: {},
  liveReset: {},
  setDelayedRotation: {},
  socketMessage: {},
  logMessage: {},
  start: {children: ['completed', 'failure']},
  stop: {children: ['completed', 'failure']},
  liveCheck: {children: ['completed', 'failure']},
  liveStart: {children: ['completed', 'failure']},
  liveConnect: {children: ['completed', 'failure']},
  liveStop: {asyncResult: true},
  setSensorBattery: {asyncResult: true},
  setSensorAccelerometer: {asyncResult: true},
  setSensorLocation: {asyncResult: true},
  recordStart: {asyncResult: true},
  recordStop: {asyncResult: true},
  screenshot: {asyncResult: true},
});

// Listeners for asynchronous Backend API calls

LiveActions.setProjectId.listen(function () {
  LiveActions.tryLoadNoVNC(res => {
    if (res.success) {
      this.completed();
    } else {
      this.failure(res.errorMessage);
    }
  });
});

LiveActions.start.listen(function () {
  debuggerGoby('start called');
  BackendAPI.liveStart()
  .then(res => {
    debuggerGoby('start back');
    debuggerGoby(arguments);
    if (res.hasOwnProperty('avm_id')) {
      this.completed(res);
    } else {
      this.failure('It was not possible to start live session.');
    }
  });
});

LiveActions.stop.listen(function (avmId) {
  debuggerGoby('stop called');
  BackendAPI.liveStop(avmId)
  .then(() => {
    debuggerGoby('stop back');
    debuggerGoby(arguments);
  })
  .catch(() => {
    debuggerGoby('stop back catch');
    debuggerGoby(arguments);
  });
  // [undefined, "nocontent", Object]0: undefined1: "nocontent"2: Objectabort: (a)always: ()complete: ()done: ()error: ()fail: ()getAllResponseHeaders: ()getResponseHeader: (a)overrideMimeType: (a)pipe: ()progress: ()promise: (a)readyState: 4responseText: ""setRequestHeader: (a,b)state: ()status: 204statusCode: (a)statusText: "No Content"success: ()then: ()__proto__: Objectcallee: (...)get callee: ThrowTypeError()set callee: ThrowTypeError()caller: (...)get caller: ThrowTypeError()set caller: ThrowTypeError()length: 3Symbol(Symbol.iterator): values()__proto__: Object
  // [Object, "error", "Not Found"] +1ms
  // .then(res => {
  //   debuggerGoby('stop back');
  //   debuggerGoby(res);
  //   if (res.hasOwnProperty('avm_id')) {
  //     this.completed(res);
  //   } else {
  //     this.failure('It was not possible to stop live session.');
  //   }
  // });
});

LiveActions.loadInfo.listen(function (avmId) {
  debuggerGoby('load info called');
  BackendAPI.liveList()
  .then(res => {
    debuggerGoby('back');
    if (res.hasOwnProperty('avms')) {
      const avmInfo = res.avms.filter(currentValue => {
        return currentValue.avm_id === avmId;
      });
      if (avmInfo.length) {
        this.completed(avmInfo[0]);
      } else {
        this.failure('It was not possible to find live session.');
      }
    } else {
      this.failure('It was not possible to list live sessions.');
    }
  });
});

LiveActions.liveCheck.listen(function () {
  var token = '';
  BackendAPI.liveCheck(token, (res) => {
    if ( res.hasOwnProperty('token') ) {
      var WebsocketActions = require('goby/actions/websocket.js');
      WebsocketActions.connect(res.token, 'live');
    }else{
      this.failure('It was not possible to check for a live session.');
    }
    // this.completed( res.error !== 'not-found' );
  });
});

// Out of date, now it is done by websocket message
// BUT it should be reversed when websocket turn to be only notification
// LiveActions.liveStart.listen(function () {
//   var token = '';
//   BackendAPI.liveStart(token, (res) => {
//     console.log(res);
//     if (res.hasOwnProperty('responseJSON') ) {
//       res = res.responseJSON;
//     }
//     console.log(res);
//     if (res.hasOwnProperty('vncip') && res.hasOwnProperty('vncport') ) {
//       this.completed( res.vncip, res.vncport );
//     }else{
//       if ( res.hasOwnProperty('error') && res.error.hasOwnProperty('message')  ) {
//         this.failure( res.error.message );
//       }else{
//         this.failure( 'Error on the create session request.' );
//       }
//     }
//   });
// });

LiveActions.liveConnect.listen(function (vmhost, vmport) {
  // TODO: audio vmport must be informed

  LiveActions.tryConnection( vmhost, vmport, (res) => {
    if (res.success) {
      this.completed();
      // LiveActions.tryAudioConnection( vmhost, vmport+1000, (res) => {
      //   // TODO: Promise all
      //   if (res.success) {
      //     this.completed();
      //   }else{
      //     this.failure(res.errorMessage);
      //   }
      //   return false;
      // } );
    }else{
      this.failure(res.errorMessage);
    }
  } );
});

LiveActions.liveStop.listen(function (avmId) {
  var WebsocketActions = require('goby/actions/websocket.js');
  WebsocketActions.close();
  if (window.rfb) {
    window.rfb.disconnect();
  }
  BackendAPI.liveStop(avmId, (res) => {
    this.completed( res );
  });
  // TODO: Call disconnect from noNVC if connected before

  LiveActions.stopAudioConnection();
});

LiveActions.setSensorBattery.listen(function (projectId, value) {
  var token = '';
  BackendAPI.sensorBattery(token, projectId, value, (res) => {
    this.completed( res );
  });
});

LiveActions.setSensorAccelerometer.listen(function (projectId, x, y, z) {
  var token = '';
  BackendAPI.sensorAccelerometer(token, projectId, x, y, z, (res) => {
    this.completed( res );
  });
});

LiveActions.setSensorLocation.listen(function (projectId, lat, lon) {
  var token = '';
  BackendAPI.sensorLocation(token, projectId, lat, lon, (res) => {
    this.completed( res );
  });
});

LiveActions.recordStart.listen(function (projectId) {
  var token = '';
  var filename = LiveActions.createVideoName();
  BackendAPI.recordingStart(token, projectId, filename, (res) => {
    res.filename = filename;
    this.completed( res );
  });
});

LiveActions.recordStop.listen(function (projectId, filename) {
  var token = '';
  BackendAPI.recordingStop(token, projectId, filename, (res) => {
    this.completed( res );
  });
});

LiveActions.screenshot.listen(function (projectId, filename) {
  var token = '';
  var filename = LiveActions.createImageName();
  BackendAPI.screenshot(token, projectId, filename, (res) => {
    this.completed( res );
  });
});

LiveActions.createFileName = function (beginWith, endWith) {
  return beginWith + Date.now() + endWith;
};

LiveActions.createVideoName = function () {
  return this.createFileName('video','.mp4');
};

LiveActions.createImageName = function () {
  return this.createFileName('snap','.bmp');
};

window.onscriptsload = function () {
  var updateState = function (rfb, state, oldstate, msg) {
    console.log('rfb updateState');
    console.log(arguments);
    if (state === 'normal') {
      window.AiClive.completed = true;
      LiveActions.logMessage('noVNC utils loaded.');
      LiveActions.liveConnect.completed();
    }
  };
  try {
    LiveActions.logMessage('Creating noVNC client.');
    window.rfb = new RFB({'target':$D('noVNC_canvas'),'onUpdateState':  updateState});
  } catch (exc) {
    window.AiClive.completed = true;
    LiveActions.logMessage('Unable to create noVNC client.');
    LiveActions.liveConnect.failure('Unable to create noVNC client (' + exc + ').');
  }
  LiveActions.tryWebsocket();
};

LiveActions.tryWebsocket = function () {

  try {
    LiveActions.logMessage('Connecting to VNC session.');
    window.AiClive.socket = new WebSocket('ws://' + window.AiClive.host + ':' + window.AiClive.port, 'base64');
    window.AiClive.socket.onerror=function(){
      console.log('socket test on error');
      console.log(arguments);
      console.log(LiveActions);
      if (window.AiClive.errorCount >= window.AiClive.maxTries){
        window.AiClive.completed = true;
        LiveActions.logMessage('Unable to connect session (websockify error).');
        LiveActions.liveConnect.failure('Unable to connect session (websockify error).');
      }else{
        window.AiClive.errorCount += 1;
        setTimeout(function () {
          LiveActions.tryWebsocket();
        },2000*window.AiClive.errorCount);
      }
    };
    window.AiClive.socket.onopen = function (event) {
        console.log('socket test on open');
        console.log(LiveActions);
        window.AiClive.socket.close();
        window.rfb.connect(window.AiClive.host , window.AiClive.port, window.AiClive.password, window.AiClive.path);
    };
    window.AiClive.socket.onclose = function (event) {
        console.log('socket test on close');
    };

  } catch (exc) {
    // ignore errors
  }

};

LiveActions.tryConnection = function ( vmhost, vmport, cb ) {

  window.INCLUDE_URI = '/noVNC/'; // This is noVNC dependent
  // FIXME: probably not the best way to set global var.
  window.AiClive = {
    host: vmhost,
    port: vmport,
    password: '',
    path: 'websockify',
    socket: null,
    maxTries: 3, /* first try instantly, second on +2s, third on +4s... +6 */
    errorCount: 0,
    timeout: 15000,
    completed: false,
    timeoutcb: null,
  };

  LiveActions.logMessage('Loading noVNC utils.');
  // Load supporting scripts
  // Util.load_scripts(['webutil.js', 'base64.js', 'websock.js', 'des.js',
  //                    'keysymdef.js', 'keyboard.js', 'input.js', 'display.js',
  //                    'rfb.js', 'keysym.js']);

  Util.load_scripts(["webutil.js", "base64.js", "websock.js", "des.js",
                           "keysymdef.js", "keyboard.js", "input.js", "display.js",
                           "inflator.js", "rfb.js", "keysym.js"]);
  // When finished will call onscriptsload
  setTimeout(function () {
    if ( !window.AiClive.completed ){
      window.AiClive.completed = true;
      LiveActions.logMessage('noVNC utils load failed.');
      LiveActions.liveConnect.failure('Unable to connect session (timeout error).');
    }
  }, window.AiClive.timeout);
};

LiveActions.tryLoadNoVNC = function( cb ) {
  LiveActions.logMessage('Loading noVNC core.');
  $.getScript( '/noVNC/util.js' )
  .done(function() {
    if(typeof Util !== 'undefined'){
      LiveActions.logMessage('noVNC core loaded.');
      cb( { success: true } );
    }else{
      LiveActions.logMessage('noVNC core load failed.');
      cb( { success: false, errorMessage: 'Failed to set noVNC core.' } );
    }
  })
  .fail(function() {
    LiveActions.logMessage('noVNC core load failed.');
    cb( { success: false, errorMessage: 'Failed to load noVNC core.' } );
  });
};

LiveActions.tryAudioConnection =  function( audiohost, audioport, cb ) {
  var gobyVMAudio = document.getElementById('gobyVMAudio');
  gobyVMAudio.tries = 0;
  gobyVMAudio.maxTries = 4;
  gobyVMAudio.addEventListener('error', function(e) {
    console.log('audio error:', arguments);
    // audio playback failed - show a message saying why
    // to get the source of the audio element use $(this).src
    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
        console.log('You aborted the video playback.');
        break;
     case e.target.error.MEDIA_ERR_NETWORK:
        console.log('A network error caused the audio download to fail.');
        break;
     case e.target.error.MEDIA_ERR_DECODE:
        console.log('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
        break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        console.log('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
        gobyVMAudio.tries += 1;
        if(gobyVMAudio.tries < gobyVMAudio.maxTries){
          console.log('audio trying again in',2000*gobyVMAudio.tries);
          setTimeout(function(){
            console.log('audio setting src', gobyVMAudio.src + gobyVMAudio.tries);
            gobyVMAudio.src = gobyVMAudio.src + gobyVMAudio.tries;
            gobyVMAudio.play();
          },2000*gobyVMAudio.tries);
        }else{
          console.log('audio max tries reached.');
        }
        break;
     default:
        console.log('An unknown error occurred.');
        break;
    }
  }, false);
  // gobyVMAudio.addEventListener('canplay', function(ev) {
  //   console.log('audio canplay:', arguments);
  //   if( gobyVMAudio.duration == 0 || gobyVMAudio.paused ){
  //     console.log('audio canplay not pause');
  //     gobyVMAudio.play();
  //   }
  // }, false);
  // FIXME: put url parser
  var audioURL = 'http://' + audiohost+ ':' + audioport + '/test.webm?uid=' + Date.now();
  console.log('setting audio url', audioURL);
  gobyVMAudio.src = audioURL;
  gobyVMAudio.play();
  cb({success: true, errorMessage: ''});
};

LiveActions.stopAudioConnection = function(){
  var gobyVMAudio = document.getElementById('gobyVMAudio');
  console.log(gobyVMAudio);
  if(gobyVMAudio){
    gobyVMAudio.pause();
    gobyVMAudio.src = '';
  }
};

module.exports = LiveActions;
