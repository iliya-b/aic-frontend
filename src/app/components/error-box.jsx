var React = require('react');

var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var ErrorBox = React.createClass({

  mixins: [StylePropable],

  render: function() {

    var {
      style,
      ...other
    } = this.props;

    var styles = {
      div: {
        color: this.context.muiTheme.palette.errorColor
      }
    }

    var content = this.props.children;

    return (
      <div
        style={this.mergeAndPrefix(
          styles.div,
          style)}
        {...other}>
        {content}
      </div>
      );
  }
});

ErrorBox.contextTypes = {
  muiTheme: React.PropTypes.object
}

module.exports = ErrorBox;