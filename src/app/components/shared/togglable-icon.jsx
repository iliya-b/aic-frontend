var React = require('react');

var mui = require('material-ui');
var { FontIcon } = mui;
var { StylePropable } = mui.Mixins;

var TogglableIcon = React.createClass({

  mixins: [StylePropable],

  render: function() {

    var {
      iconName,
      style,
      isOn,
      ...other
    } = this.props;

    var styles = {
      icon: {
        color: (isOn ? this.context.muiTheme.palette.accent1Color : this.context.muiTheme.palette.disabledColor)
      }
    }

    var iconClassName = "mdi mdi-" + iconName + (isOn ? '' : '-off');

    return (
      <FontIcon
        style={this.mergeAndPrefix(
          styles.icon,
          style)}
        {...other}
        className={iconClassName}  />
      );
  }
});

TogglableIcon.contextTypes = {
  muiTheme: React.PropTypes.object
}

module.exports = TogglableIcon;