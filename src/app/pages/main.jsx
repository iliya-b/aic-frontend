var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var GobyPalette = require('../configs/goby-palette.jsx');
var { FullWidthSection } = require('../components/');
var Colors = mui.Styles.Colors;

var { RaisedButton } = mui;

var Main = React.createClass({

  _onThemeClick() {
    this.context.router.transitionTo('theme-test');
  },
  _onHomeClick() {
    this.context.router.transitionTo('home');
  },

  componentWillMount() {
    ThemeManager.setPalette(GobyPalette);
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getStyles() {
    var darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: '0 0 24px 0',
        color: Colors.lightWhite,
        maxWidth: '335px'
      },
      iconButton: {
        color: darkWhite
      }
    };
  },

  render: function() {
    var styles = this.getStyles();
    return (
      <div>
        <RouteHandler />
        <FullWidthSection useContent={true} style={styles.footer}>
          <p style={styles.p}>COPYRIGHT © AiC</p>
          <RaisedButton label="Test Theme" primary={true}  onClick={this._onThemeClick} />
        </FullWidthSection>
      </div>

    );
  }

});

Main.contextTypes = {
  router: React.PropTypes.func,
  muiTheme: React.PropTypes.object
};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Main;
