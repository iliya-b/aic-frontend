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
      FontIcon,
      Table,
      TableHeader,
      TableHeaderColumn,
      TableBody,
      TableRow,
      TableRowColumn } = mui;

// APP
var AvatarProgress = require('goby/components/shared/avatar-progress.jsx');
var AppUtils = require('goby/components/shared/app-utils.jsx');
var CodeBox = require('goby/components/shared/code-box.jsx');

var TestResultsBox = class extends React.Component{

  render() {

    console.log(this.props.results);


    var resultsRendered = this.props.results.map(function(item, index){
      var testCasesRendered = item.testCases.map(function(testCase, testCaseIndex){
        var statusIcon = testCase.failure ? <FontIcon className='mdi mdi-close' style={{color:this.context.muiTheme.palette.errorColor}} /> :
                                            <FontIcon className='mdi mdi-check' style={{color:this.context.muiTheme.palette.successColor}} />;
        var failure = testCase.failure ? <TableRow key={testCaseIndex+'-failure'}>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn colSpan="2" style={{color:this.context.muiTheme.palette.errorColor}}>
              <p><strong>{testCase.failure.message}</strong></p>
              <p>{testCase.failure.type}</p>
              <CodeBox>{testCase.failure.content}</CodeBox>
            </TableRowColumn>
          </TableRow> : null;
        var rowInfo = <TableRow key={testCaseIndex} style={failure ? {borderBottomWidth:0} : {}} >
                                <TableRowColumn style={{width:'50px'}}>{statusIcon}</TableRowColumn>
                                <TableRowColumn>{testCase.className}</TableRowColumn>
                                <TableRowColumn>{testCase.name}</TableRowColumn>
                              </TableRow>;
        return failure ? [rowInfo,failure] : [rowInfo] ;
      }, this);

      var totalTests = item.testCases.length;
      var totalFailedTests = item.testCases.reduce(function(previous, testCase){
        return  testCase.failure ? 1 + previous : previous;  }, 0);
      var percentageFailedTests = Math.round(totalFailedTests/totalTests*100);
      var totalPassedTests = totalTests - totalFailedTests;

      var testProgress = <AvatarProgress
        icon={<FontIcon className="mdi mdi-android" />}
        style={{marginRight: Spacing.desktopGutter}}
        progress={percentageFailedTests}
        color='rgba(0, 0, 0, 0.54)'
        // color={totalFailedTests ? this.context.muiTheme.palette.errorColor : this.context.muiTheme.palette.successColor }
        backgroundColor={this.context.muiTheme.palette.successColor}
        foregroundColor={this.context.muiTheme.palette.errorColor} /> ;

      var infoTests = <div> {totalTests} test {AppUtils.pluralize(totalTests,'case')}
          {totalPassedTests ? <span style={{color:this.context.muiTheme.palette.successColor}}> {totalPassedTests} {AppUtils.pluralize(totalPassedTests,'test')} passed </span> : null}
          {totalFailedTests ? <span style={{color:this.context.muiTheme.palette.errorColor}}> {totalFailedTests} {AppUtils.pluralize(totalFailedTests,'test')} failed </span> : null}
          {item.time} time
        </div>;

      var tableTests = <Table selectable={false}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                    <TableRow>
                      <TableHeaderColumn style={{width:'50px'}}>Status</TableHeaderColumn>
                      <TableHeaderColumn>Class</TableHeaderColumn>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                  {testCasesRendered}
                  </TableBody>
                </Table>;

      return  <Card expandable={true} key={index}>
                <CardHeader
                  title={item.name}
                  subtitle={infoTests}
                  avatar={testProgress}
                  showExpandableButton={true}>
                </CardHeader>
                <CardText expandable={true}>
                {tableTests}
                </CardText>
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