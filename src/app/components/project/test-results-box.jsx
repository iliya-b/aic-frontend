'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing } = mui.Styles;
var { Paper,
      Card,
      CardHeader,
      CardText,
      CardActions,
      Avatar,
      FontIcon } = mui;

// APP
var AvatarProgress = require('goby/components/shared/avatar-progress.jsx');
var AppUtils = require('goby/components/shared/app-utils.jsx');

var TestResultsBox = class extends React.Component{

  render() {

    console.log(this.props.results);


    var resultsRendered = this.props.results.map(function(item, index){
      var testCasesRendered = item.testCases.map(function(testCase, testCaseIndex){
        var status = testCase.failure ? 'failure' : 'pass';
        var failure = testCase.failure ? <div>
          <p>{testCase.failure.content}</p>
          <p>{testCase.failure.message}</p>
          <p>{testCase.failure.type}</p>
          </div> : null;
        return  <CardText key={testCaseIndex} expandable={true}>
                  <p>class: {testCase.className}</p>
                  <p>name: {testCase.name}</p>
                  <p>status: {status}</p>
                  {failure}
                </CardText>
      });

      var totalTests = item.testCases.length;
      var totalFailedTests = item.testCases.reduce(function(testCase, testCaseIndex, previous){
        return  testCase.failure ? 1 + previous : previous;  }, 0);
      var percentageFailedTests = Math.round(totalFailedTests/totalTests*100);
      var totalPassedTests = totalTests - totalFailedTests;

      var testProgress = <AvatarProgress
        icon={<FontIcon className="mdi mdi-android" />}
        style={{marginRight: Spacing.desktopGutter}}
        progress={percentageFailedTests}
        color={totalFailedTests ? this.context.muiTheme.palette.errorColor : this.context.muiTheme.palette.successColor }
        backgroundColor={this.context.muiTheme.palette.successColor}
        foregroundColor={this.context.muiTheme.palette.errorColor} /> ;

      var infoTests = <div> {totalTests} test {AppUtils.pluralize(totalTests,'case')}
          {totalPassedTests ? <span style={{color:this.context.muiTheme.palette.successColor}}> {totalPassedTests} {AppUtils.pluralize(totalPassedTests,'test')} passed </span> : null}
          {totalFailedTests ? <span style={{color:this.context.muiTheme.palette.errorColor}}> {totalFailedTests} {AppUtils.pluralize(totalFailedTests,'test')} failed </span> : null}
          {item.time} time
        </div>;

      return  <Card expandable={true} key={index}>
                <CardHeader
                  title={item.name}
                  subtitle={infoTests}
                  avatar={testProgress}
                  showExpandableButton={true}>
                </CardHeader>
                {testCasesRendered}
              </Card>;
    }, this);

    return  <div>

              <Paper>
                {resultsRendered}
              </Paper>

            </div>
  }

};

TestResultsBox.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = TestResultsBox;