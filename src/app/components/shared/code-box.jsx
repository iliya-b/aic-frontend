'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var CodeBox = class extends React.Component{

  render() {

    var styles = { fontFamily: 'Roboto Mono', lineHeight: '12px', fontSize: '12px', overflowX: 'auto' };

    styles = StylePropable.mergeStyles( styles, this.props.style );

    return  <pre style={styles}>
              {this.props.children}
            </pre>
  }

};

module.exports = CodeBox;