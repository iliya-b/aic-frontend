var React = require('react');

var mui = require('material-ui');
var { StylePropable } = mui.Mixins;

var InfoBox = React.createClass({

  mixins: [StylePropable],

  render: function() {

    var {
      style,
      boxType,
      ...other
    } = this.props;

    var styles = {
      div: {
        color:  boxType == InfoBox.ERROR ? this.context.muiTheme.palette.errorColor :
                boxType == InfoBox.SUCCESS ? this.context.muiTheme.palette.successColor :
                this.context.muiTheme.palette.textColor
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

InfoBox.contextTypes = {
  muiTheme: React.PropTypes.object
}

InfoBox.ERROR = 'error';
InfoBox.SUCCESS = 'success';

module.exports = InfoBox;