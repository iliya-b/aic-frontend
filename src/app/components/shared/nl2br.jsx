'use strict';

// React
var React = require('react');

var Nl2Br = class extends React.Component{

  render() {
    return  <div>
              {this.props.children.split("\n").map(function(item) {
                return (
                  <span>
                    {item}
                    <br/>
                  </span>
                )
              })}
            </div>
  }

};

module.exports = Nl2Br;