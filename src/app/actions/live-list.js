'use strict';

// Reflux
const Reflux = require('reflux');

// // Vendors
// const debuggerGoby = require('debug')('AiC:LiveList:Actions');

// // APP
// const BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
const LiveListActions = Reflux.createActions({
  list: {children: ['completed', 'failure']},
});

// Listeners for asynchronous Backend API calls

// LiveListActions.list.listen(function () {
//   debuggerGoby('list called');
//   BackendAPI.liveList()
//   .then(res => {
//     debuggerGoby('back');
//     if (res.hasOwnProperty('avms')) {
//       this.completed(res.avms);
//     } else {
//       this.failure('It was not possible to list live sessions.');
//     }
//   });
// });

module.exports = LiveListActions;
