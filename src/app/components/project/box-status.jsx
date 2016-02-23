'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { FontIcon, Paper } = mui;

// APP
var AppUtils = require('app/components/shared/app-utils.jsx');

var BoxStatus = class extends React.Component{

  render() {
    var {
      typeName,
      status,
      subStatus,
      isLast,
      isFirst,
      objectName,
      ...other
    } = this.props;

    var message;
    var statusIcons;
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

    objectName = objectName ? objectName : 'session';
    iconsNMessages = {
      'success': 'mdi mdi-check',
      'fail': 'mdi mdi-close',
      'search': {
                  'success': 'Session found',
                  'not-found': 'Session not found',
                  'fail': 'Search failed',
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
                      'className': ( status === 'success' ? 'mdi mdi-check' :
                                     status === 'fail' ? 'mdi mdi-close' :
                                     status === 'not-found' ? 'mdi mdi-help' :
                                     'mdi mdi-magnify' ) ,
                      'style': {
                        color: colorIcon, //( status === 'not-found' ? this.context.muiTheme.palette.errorColor  : colorIcon) ,
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
                  'success': AppUtils.capitalize(objectName) + ' created',
                  'fail': AppUtils.capitalize(objectName) + ' not created',
                  '': 'Creating new ' + objectName,
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
      'prepare': {
                  'success': 'Campaign ready',
                  'fail': 'Prepare failed',
                  '': 'Preparing campaign',
                  'icons':[{
                      'className': 'mdi mdi-android',
                      'style': {
                        color: colorAndro,
                        fontSize: '15px',
                        position: 'absolute',
                        top: '22px',
                        left: '27px',
                      },
                    },{
                      'className': 'mdi mdi-cellphone-android',
                      'style': {
                        color: colorAndro,
                        fontSize: '35px',
                        position: 'absolute',
                        top: '13px',
                        left: '17px',
                      },
                    },{
                      'className': 'mdi mdi-file',
                      'style': {
                        color: colorAndro,
                        fontSize: '35px',
                        position: 'absolute',
                        top: '13px',
                        left: '48px',
                      },
                    },{
                      'className': ( status === 'success' ? 'mdi mdi-check' : ( status === 'fail' || status === 'not-found' ) ? 'mdi mdi-close' : 'mdi mdi-magnify' ) ,
                      'style': {
                        color: ( status === 'not-found' ? this.context.muiTheme.palette.errorColor  : colorIcon) ,
                        fontSize: '30px',
                        position: 'absolute',
                        top: (status === 'doing' ? '18px' : '18px'),
                        left: (status === 'doing' ? '39px' : '36px'),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        animation: ( status === 'doing' ? 'liveIconMagnify 5s linear infinite' : 'initial'),
                      },
                    }],
                },
      'run': {
                  'success': 'Tests finished',
                  'fail': 'Tests failed to run',
                  '': 'Running tests',
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
                      'className': ( status === 'success' ? 'mdi mdi-check' : ( status === 'fail' || status === 'not-found' ) ? 'mdi mdi-close' : 'mdi mdi-settings' ) ,
                      'style': {
                        color: ( status === 'not-found' ? this.context.muiTheme.palette.errorColor  : colorIcon) ,
                        fontSize: '30px',
                        position: 'absolute',
                        top: (status === 'doing' || status === 'disable' ? '24px' : '11px'),
                        left: (status === 'doing' || status === 'disable' ? '46px' : '46px'),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        animation: ( status === 'doing' ? 'liveIconRotate 5s linear infinite' : 'initial'),
                      },
                    }],
                },
      'result': {
                  'success': 'Results downloaded',
                  'fail': 'Results not downloaded',
                  '': 'Downloading results',
                  'icons': [{
                      'className': 'mdi mdi-file',
                      'style': {
                        color: colorAndro,
                        fontSize: '43px',
                        top: '11px',
                        left: ( status === 'doing' ? '48px' : '30px' ),
                        position: 'absolute',
                      },
                    },{
                      'className': 'mdi mdi-android',
                      'style': {
                        color: ( status === 'doing' ? colorAndro : '#FFFFFF' ),
                        position: 'absolute',
                        top: ( status === 'doing' ? '20px' : '23px' ),
                        left: ( status === 'doing' ? '30px' : '39px' ),
                        textShadow: ( status === 'doing' ? '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF' : '' ),
                        animation: ( status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
                        fontSize: '23px',
                      },
                    },{
                      'className':  ( status === 'success' ? 'mdi mdi-check' : status === 'fail' ? 'mdi mdi-close' : 'mdi mdi-plus' ) ,
                      'style': {
                        color: colorIcon,
                        position: 'absolute',
                        top: ( status === 'doing' ? '14px' : '25px' ),
                        left: ( status === 'doing' ? '37px' : '50px' ),
                        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
                        animation: ( status === 'doing' ? 'liveIconJumpy 3s linear infinite' : 'initial'),
                        fontSize: '30px'
                      },
                    }],
                },
    };

    if ( typeName in iconsNMessages ){
      statusFound = status in iconsNMessages[typeName] ? status : '';
      message = iconsNMessages[typeName][statusFound];
      statusIcons = iconsNMessages[typeName]['icons'] === undefined ? null :
                      iconsNMessages[typeName]['icons'].map(function (item, index) {
                        return  <span style={item.style} className={item.className} key={index} />
                      })  ;
    }

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

BoxStatus.contextTypes = {
  muiTheme: React.PropTypes.object
}

module.exports = BoxStatus;