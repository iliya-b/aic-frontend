'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var AvatarProgress = class extends React.Component{

  render() {

    var {
      backgroundColor,
      color,
      icon,
      size,
      progress,
      src,
      style,
      ...other,
    } = this.props;


    var styles = {
      root: {
        height: size,
        width: size,
        userSelect: 'none',
        borderRadius: '50%',
        display: 'inline-block',
      },
      outer: {
        fill: 'transparent',
        stroke: 'red',
        strokeWidth: '20',
        strokeDasharray: '537',
        transition: 'stroke-dashoffset 1s',
        WebkitAnimationPlayState: 'running',
        MozTransform: 'rotate(-89deg) translateX(-190px)',
      },
      figcaption: {
        padding: '50px 25px',
        width: '100px',
        height: '50px',
        border: '20px solid #3ABB57',
        borderRadius: '100px',
        lineHeight: '50px',
      },
      svg: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      chart: {
        position: 'relative',
        display: 'inline-block',
        color: '#999',
        fontSize: '20px',
        textAlign: 'center',
      },
    };

    styles.root = StylePropable.mergeStyles(styles.root, {
      backgroundColor: backgroundColor,
      textAlign: 'center',
      lineHeight: size + 'px',
      fontSize: size / 2 + 4,
      color: color,
    }, style);

    const styleIcon = {
      margin: 8,
    };

    const iconElement = icon ? React.cloneElement(icon, {
      color: color,
      style: StylePropable.mergeStyles(styleIcon, icon.props.style),
    }) : null;

    // <div {...other} style={styles.root} >
    // </div>

    // <circle style={styles.outer} className="outer" cx="95" cy="95" r="85" transform="rotate(-90, 95, 95)"/>

    return  <div>
            <figure className="chart" data-percent={progress} style={styles.chart}>
              <svg width="200" height="200" style={styles.svg}>
                <circle style={styles.outer} className="outer" cx="50" cy="50" r="45" transform="rotate(-90, 95, 95)"/>
              </svg>
             <figcaption style={styles.figcaption}>
                {iconElement}
                {this.props.children}
              </figcaption>
            </figure>
            <div {...other} style={styles.root} >
              {iconElement}
                {this.props.children}
            </div>
            </div>
  }

};

AvatarProgress.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = AvatarProgress;