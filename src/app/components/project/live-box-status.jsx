'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { FontIcon, Paper } = mui;

var LiveBoxStatus = class extends React.Component{

  render() {
    var {
      typeName,
      status,
      subStatus,
      isLast,
      isFirst,
      ...other
    } = this.props;

    var message;
    var colorIcon = (status === 'disable' ? this.context.muiTheme.palette.disabledColor :
                     status === 'fail' ? this.context.muiTheme.palette.errorColor :
                     this.context.muiTheme.palette.accent1Color );
    var colorMessage = (status === 'disable' ? this.context.muiTheme.palette.disabledColor :
                        status === 'fail' ? this.context.muiTheme.palette.errorColor :
                        status === 'success' ? this.context.muiTheme.palette.accent1Color :
                        this.context.muiTheme.palette.primary1Color );
    var colorAndro = (status === 'disable' ? this.context.muiTheme.palette.disabledColor :
                      this.context.muiTheme.palette.primary1Color );
    var iconsNMessages = {};
    var statusFound;
    var styles = {
      wrapper: {
        display:'inline-block',
      },
      box: {
        width: '100px',
        height: '100px',
        display: 'inline-block',
        overflow: 'hidden',
        float: 'left',
      },
      message: {
        color: colorMessage,
        fontSize: '12px',
        textAlign: 'center',
        padding: '0 3px',
      },
      icon: {
        color: colorIcon,
      },
      iconDivider: {
        color: colorAndro,
        animation: ( status === 'doing' ? 'transitionHide 0.5s linear infinite alternate' : 'initial'),
        padding: '40px 13px 36px 12px',
        float: 'left',
      },
      iconBox: {
        width: '100px',
        height: '50px',
        display: 'inline-block',
        position: 'relative',
      },
      messageBox: {
        display: 'flex',
        width: '100px',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };

    iconsNMessages = {
      'success': 'mdi mdi-check',
      'fail': 'mdi mdi-close',
      'search': {
                  'success': 'Session found',
                  'fail': 'Session not found',
                  '': 'Searching for session',
                  'icons':[{
                      'className': 'mdi mdi-android',
                      'style': {
                        color: colorAndro,
                        fontSize: '35px',
                        position: 'absolute',
                        top: '13px',
                        left: '32px',
                      },
                    },{
                      'className': ( status === 'success' ? 'mdi mdi-check' : status === 'fail' ? 'mdi mdi-close' : 'mdi mdi-magnify' ) ,
                      'style': {
                        color: colorIcon,
                        fontSize: '30px',
                        position: 'absolute',
                        top: (status === 'doing' ? '18px' : '11px'),
                        left: (status === 'doing' ? '39px' : '46px'),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        animation: ( status === 'doing' ? 'liveIconMagnify 5s linear infinite' : 'initial'),
                      },
                    }],
                },
      'create': {
                  'success': 'Session created',
                  'fail': 'Session not created',
                  '': 'Creating new session',
                  'icons': [{
                      'className': 'mdi mdi-cloud',
                      'style': {
                        color: colorAndro,
                        fontSize: '40px',
                        top: '11px',
                        left: ( status === 'doing' ? '48px' : '42px' ),
                        position: 'absolute',
                      },
                    },{
                      'className': 'mdi mdi-android',
                      'style': {
                        color: colorAndro,
                        position: 'absolute',
                        top: '20px',
                        left: ( status === 'doing' ? '30px' : '20px' ),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        animation: ( status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
                        fontSize: '22px',
                      },
                    },{
                      'className':  ( status === 'success' ? 'mdi mdi-check' : status === 'fail' ? 'mdi mdi-close' : 'mdi mdi-plus' ) ,
                      'style': {
                        color: colorIcon,
                        position: 'absolute',
                        top: '14px',
                        left: ( status === 'doing' ? '37px' : '27px' ),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        animation: ( status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
                        fontSize: '30px'
                      },
                    }],
                },
      'connect': {
                  'success': 'Session connected',
                  'fail': 'Session not connected',
                  '': 'Connecting to session',
                  'icons': [{
                    'className': 'mdi mdi-desktop-mac',
                    'style': {
                        color: colorAndro,
                        fontSize: '40px',
                        top: '11px',
                        left: ( status === 'doing' ? '51px' : '42px' ),
                        position: 'absolute',
                      },
                  },{
                    'className': 'mdi mdi-android',
                    'style': {
                        color: colorAndro,
                        fontSize: '22px',
                        position: 'absolute',
                        top: '18px',
                        left: ( status === 'doing' ? '8px' : '19px' ),
                      },
                  },{
                    'className': ( status === 'success' ? 'mdi mdi-check' : status === 'fail' ? 'mdi mdi-close' : 'mdi mdi-arrow-right' ) ,
                    'style': {
                        color: colorIcon,
                        fontSize: ( (status === 'doing' || status === 'disable') ? '20px' : '30px' ),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        position: 'absolute',
                        top: '14px',
                        left: ( status === 'doing' ? '29px' : '29px' ),
                        animation: ( status === 'doing' ? 'liveIconSides 5s ease-in-out infinite' : 'initial'),
                      },
                  }],
                },
      'open': {
                  'success': 'Session opened',
                  'fail': 'Session not opened',
                  '': 'Opening session',
                },
      'close': {
                  'success': 'Session closed' ,
                  'fail': 'Session not closed' ,
                  '': 'Closing session',
                  'icons': [{
                      'className': 'mdi mdi-cloud',
                      'style': {
                        color: colorAndro,
                        fontSize: '30px',
                        top: '18px',
                        left: '18px',
                        position: 'absolute',
                        display: ( status === 'doing' ? 'initial' : 'none' ),
                      },
                    },{
                    'className': 'mdi mdi-delete',
                    'style': {
                        color: colorAndro,
                        fontSize: '30px',
                        position: 'absolute',
                        top: '18px',
                        left: ( status === 'doing' ? '58px' : '47px' ),
                      },
                    },{
                      'className': 'mdi mdi-android',
                      'style': {
                        color: colorAndro,
                        position: 'absolute',
                        top: '20px',
                        left: ( status === 'doing' ? '40px' : '27px' ),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        animation: ( status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
                        fontSize: '22px',
                      },
                    },{
                      'className':  ( status === 'success' ? 'mdi mdi-check' : status === 'fail' ? 'mdi mdi-close' : 'mdi mdi-minus' ) ,
                      'style': {
                        color: ( status === 'doing' ? this.context.muiTheme.palette.errorColor  : colorIcon) ,
                        position: 'absolute',
                        top: '14px',
                        left: ( status === 'doing' ? '47px' : '35px' ),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        animation: ( status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
                        fontSize: '30px'
                      },
                    }]
                },
      'load': {
                  'success': 'Session loaded' ,
                  'fail': 'Session not loaded' ,
                  '': 'Loading session',
                  'icons': [{
                      'className': 'mdi mdi-cloud',
                      'style': {
                        color: colorAndro,
                        fontSize: '40px',
                        top: '11px',
                        left: ( status === 'doing' ? '42px' : '42px' ),
                        position: 'absolute',
                      },
                    },{
                      'className': 'mdi mdi-android',
                      'style': {
                        color: colorAndro,
                        position: 'absolute',
                        top: '20px',
                        left: ( status === 'doing' ? '20px' : '20px' ),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        fontSize: '22px',
                      },
                    },{
                      'className':  ( status === 'success' ? 'mdi mdi-check' : status === 'fail' ? 'mdi mdi-close' : 'mdi mdi-reload' ) ,
                      'style': {
                        color: colorIcon,
                        position: 'absolute',
                        top: '14px',
                        left: ( status === 'doing' ? '27px' : '27px' ),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        animation: ( status === 'doing' ? 'liveIconRotate 3s linear infinite' : 'initial'),
                        fontSize: '30px'
                      },
                    }],
                },
      'ready': {
                  'success': 'Session ready' ,
                  'fail': 'Session not ready' ,
                  '': 'Preparing session',
                },
    };

    statusFound = status in iconsNMessages[typeName] ? status : '';
    message = iconsNMessages[typeName][statusFound];

    var statusIcons = iconsNMessages[typeName]['icons'] === undefined ? null :
                      iconsNMessages[typeName]['icons'].map(function (item, index) {
                        return  <span style={item.style} className={item.className} key={index} />
                      })  ;

    return  <div style={styles.wrapper}>

              {!isFirst ? (

                  <FontIcon
                    style={styles.iconDivider}
                    className="mdi mdi-dots-horizontal" />

              ) : null}

              <Paper style={styles.box}>

                <div style={styles.iconBox}>
                {statusIcons}
                </div>

                <div style={styles.messageBox}>
                  <p style={styles.message}>{message}</p>
                </div>
              </Paper>

            </div>
  }


};

LiveBoxStatus.contextTypes = {
  muiTheme: React.PropTypes.object
}

module.exports = LiveBoxStatus;