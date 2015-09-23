'use strict';

// React
var React = require('react');

var CodeBox = class extends React.Component{

  render() {
    return  <pre style={{ fontFamily: 'Roboto Mono', lineHeight: '12px', fontSize: '12px', overflowX: 'auto' }}>
              {this.props.children}
            </pre>
  }

};

module.exports = CodeBox;