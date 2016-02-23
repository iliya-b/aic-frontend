'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {FontIcon} = mui;

// Vendors
const deepExtend = require('deep-extend');

const MachineIcon = class extends React.Component {

  render() {
    const {
      status,
      style,
      bigIcon,
    } = this.props;

    let colorIcon;
    let colorAndro;
    let statusClassName;

    switch (status) {
      case MachineIcon.DISABLED:
        colorIcon = this.context.muiTheme.palette.disabledColor;
        colorAndro = this.context.muiTheme.palette.disabledColor;
        statusClassName = 'mdi mdi-block-helper';
        break;
      case MachineIcon.ERROR:
        colorIcon = this.context.muiTheme.palette.errorColor;
        colorAndro = this.context.muiTheme.palette.errorColor;
        statusClassName = 'mdi mdi-close';
        break;
      case MachineIcon.LOADING:
        colorIcon = this.context.muiTheme.palette.primary1Color;
        colorAndro = this.context.muiTheme.palette.primary1Color;
        statusClassName = 'mdi mdi-reload';
        break;
      case MachineIcon.SUCCESS:
        colorIcon = this.context.muiTheme.palette.accent1Color;
        colorAndro = this.context.muiTheme.palette.accent1Color;
        statusClassName = 'mdi mdi-check';
        break;
      case MachineIcon.WARNING:
        colorIcon = this.context.muiTheme.palette.warnColor;
        colorAndro = this.context.muiTheme.palette.warnColor;
        statusClassName = 'mdi mdi-alert';
        break;
      case MachineIcon.INFO:
        colorIcon = this.context.muiTheme.palette.primary1Color;
        colorAndro = this.context.muiTheme.palette.primary1Color;
        statusClassName = 'mdi mdi-information';
        break;
      default:
        colorIcon = this.context.muiTheme.palette.accent1Color;
        colorAndro = this.context.muiTheme.palette.primary1Color;
        statusClassName = '';
        break;
    }

    let styles = {
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
      status: {
        color: colorIcon,
        position: 'absolute',
        top: 15,
        left: 15,
        textShadow: '-1px -1px #FFFFFF,1px -1px #FFFFFF,-1px 1px #FFFFFF,1px 1px #FFFFFF',
        animation: (status === MachineIcon.LOADING ? 'liveIconRotate 3s linear infinite' : 'initial'),
        fontSize: '20px',
      },
    };

    if (bigIcon) {
      const bigStyles = {
        root: {
          width: 53,
          height: 53,
          lineHeight: '59px',
        },
        andro: {
          fontSize: '46px',
          top: 4,
        },
        status: {
          fontSize: '25px',
          top: 23,
          left: 23,
        },
      };
      styles = deepExtend(styles, bigStyles);
    }

    if (status === MachineIcon.DISABLED) {
      styles.status.fontSize = bigIcon ? '19px' : '15px';
      styles.status.top = bigIcon ? 23 : 17;
      styles.status.left = bigIcon ? 26 : 17;
    }

    styles.root = deepExtend(styles.root, style);

    return <div style={styles.root}>
      <FontIcon className="mdi mdi-android" style={styles.andro} />
      <FontIcon className={statusClassName} style={styles.status} />
    </div>;
  }

};

MachineIcon.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func,
};

MachineIcon.DISABLED = 'disabled';
MachineIcon.ERROR = 'error';
MachineIcon.LOADING = 'loading';
MachineIcon.SUCCESS = 'success';
MachineIcon.WARNING = 'warning';
MachineIcon.INFO = 'info';

module.exports = MachineIcon;
