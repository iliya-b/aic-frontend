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

    var visibleLines = 3;
    var style = {
      root: {
        overflowY: 'auto',
      },
      rows:{
        fontSize: 12,
        lineHeight: 14,
        padding: 4,
      },
      svg: {
        display:'inline-block',
        height:24,
        width:24,
        WebkitUserSelect:'none',
        transition:'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        fill:'rgba(0, 0, 0, 0.87)',
      }
    };

    style.root.maxHeight = (style.rows.lineHeight+2*style.rows.padding)*visibleLines;

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
    var rowsCount = this.props.children ? this.props.children.length : 0;
    var logRows = this.props.children ? this.props.children.map( function(v,i){
        return React.cloneElement(v, { style: { backgroundColor: backgrounds[(1+i+(rowsCount%2))%2] } }) ;  // , time: { color: 'red' }
      } ) : null;

    // <svg style={style.svg} viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path></svg>
    return  <div>
            <Paper style={style.root}>
            {logRows}
            </Paper>
            </div>
  }

};

LogBox.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func
}

module.exports = LogBox;