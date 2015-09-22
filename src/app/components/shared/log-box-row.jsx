'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing,
      Colors } = mui.Styles;

// var { Spacing } = mui.Styles;
// var {
//   Paper,
//   Table,
//   TableHeader,
//   TableHeaderColumn,
//   TableBody,
//   TableRow,
//   TableRowColumn } = mui;

// APP
var GobyPalette = require('goby/configs/goby-palette.jsx');

var LogBoxRow = class extends React.Component{

  render() {
    var style = {
      root: {
        backgroundColor: this.props.style.backgroundColor || '#fff',
        color: this.props.style.color || GobyPalette.primary1Color,
        // fontFamily: this.context.muiTheme.contentFontFamily,
        fontSize: '14px',
        padding: Spacing.desktopGutterMini/2,
      },
      time: {
        color: this.props.style.time ? this.props.style.time.color : GobyPalette.secondary1Color ,
      }
    };

    var time = <time style={style.time}>[{this.props.time}]</time>;

    return  <div style={style.root}>
              {time}{this.props.children}
            </div>
  }

};

LogBoxRow.contextTypes = {
  muiTheme: React.PropTypes.object,
}

module.exports = LogBoxRow;