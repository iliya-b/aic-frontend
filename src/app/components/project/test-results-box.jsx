'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Paper,
      Card,
      CardHeader,
      CardText,
      CardActions,
      Avatar } = mui;

var TestResultsBox = class extends React.Component{

  render() {

    console.log(this.props.results);

    var resultsRendered = this.props.results.map(function(item){
      var testCasesRendered = item.testCases.map(function(testCase){
        var status = testCase.failure ? 'failure' : 'pass';
        var failure = testCase.failure ? <div>
          <p>{testCase.failure.content}</p>
          <p>{testCase.failure.message}</p>
          <p>{testCase.failure.type}</p>
          </div> : null;
        return  <CardText>
                  <p>class: {testCase.className}</p>
                  <p>name: {testCase.name}</p>
                  <p>status: {status}</p>
                  {failure}
                </CardText>
      });
      return  <Card expandable={true}>
                <CardHeader
                  title={item.name}
                  subtitle={item.testCases.length + " test cases, " + item.time + " time"}
                  showExpandableButton={true}>
                </CardHeader>
                {testCasesRendered}
              </Card>;
    });

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