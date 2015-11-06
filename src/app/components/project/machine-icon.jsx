'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { FontIcon } = mui;

var MachineIcon = class extends React.Component{

  render() {

    var status = this.props.status;

    var colorIcon = (status === 'disable' ? this.context.muiTheme.palette.disabledColor :
                     status === 'doing' ? this.context.muiTheme.palette.primary1Color :
                     status === 'fail' ? this.context.muiTheme.palette.errorColor :
                     this.context.muiTheme.palette.accent1Color );
    var colorMessage = (status === 'disable' ? this.context.muiTheme.palette.disabledColor :
                        status === 'fail' ? this.context.muiTheme.palette.errorColor :
                        status === 'success' ? this.context.muiTheme.palette.accent1Color :
                        this.context.muiTheme.palette.primary1Color );
    var colorAndro = (status === 'disable' ? this.context.muiTheme.palette.disabledColor :
                      status === 'fail' ? this.context.muiTheme.palette.errorColor :
                      status === 'doing' ? this.context.muiTheme.palette.primary1Color :
                      status === 'success' ? this.context.muiTheme.palette.accent1Color :
                      this.context.muiTheme.palette.primary1Color );

    // var colorAndro = (status === 'disable' ? this.context.muiTheme.palette.disabledColor :
    //                   this.context.muiTheme.palette.primary1Color );

    var statusClassName = ( status === 'success' ? 'mdi mdi-check' : status === 'fail' ? 'mdi mdi-close' : 'mdi mdi-reload' );

    var styles = {
      root: {
        width: 40,
        backgroundColor: 'transparent',
        height: 40,
        display: 'inline-block',
        position: 'relative',
      },
      andro: {
        color: colorAndro,
        fontSize: '31px',
        top: 5,
        left: 3,
        position: 'absolute',
      },
      cloud: {
        color: 'transparent',
      },
      status:{
        color: colorIcon,
        position: 'absolute',
        top: 15,
        left: 15, //( status === 'doing' ? '27px' : '27px' ),
        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
        animation: ( status === 'doing' ? 'liveIconRotate 3s linear infinite' : 'initial'),
        fontSize: '20px',
      },
    };

    return <div style={styles.root}>
      <FontIcon className="mdi mdi-cloud" style={styles.cloud} />
      <FontIcon className="mdi mdi-android" style={styles.andro} />
      <FontIcon className={statusClassName} style={styles.status} />
    </div>;

  }

};

MachineIcon.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = MachineIcon;