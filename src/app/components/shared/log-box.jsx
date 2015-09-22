'use strict';

// React
var React = require('react');

// Material design
var mui = require('material-ui');
var { Spacing } = mui.Styles;
var {
  Paper,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn } = mui;

var LogBox = class extends React.Component{

  render() {
    var style = {
      root: {
      },
    };

    // var logRows = this.props.log.map(function(logMessage, logIndex){
    //   return  <TableRow key={logIndex} >
    //             <TableRowColumn>{logMessage.time}</TableRowColumn>
    //             <TableRowColumn>{logMessage.message}</TableRowColumn>
    //           </TableRow>;
    // });

    // var logTable =  <Table selectable={false}>
    //                   <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
    //                     <TableRow>
    //                       <TableHeaderColumn>Time</TableHeaderColumn>
    //                       <TableHeaderColumn>Message</TableHeaderColumn>
    //                     </TableRow>
    //                   </TableHeader>
    //                   <TableBody displayRowCheckbox={false}>
    //                   {logRows}
    //                   </TableBody>
    //                 </Table>;

    var backgrounds = ['#fff','#eee']; // ODD, EVEN
    var logRows = this.props.children ? this.props.children.map( function(v,i){ return React.cloneElement(v, { style: { backgroundColor: backgrounds[i%2], time: { color: 'red' } } }) ; } ) : null;

    return  <Paper style={style.root}>
            {logRows}
            </Paper>
  }

};

LogBox.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = LogBox;