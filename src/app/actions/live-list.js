'use strict';

// Reflux
const Reflux = require('reflux');

// // Vendors
// const debug = require('debug')('AiC:LiveList:Actions');

// // APP
// const BackendAPI = require('app/libs/backend-api.jsx');

// Actions
const LiveListActions = Reflux.createActions({
	list: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls

// LiveListActions.list.listen(function () {
//   debug('list called');
//   BackendAPI.liveList()
//   .then(res => {
//     debug('back');
//     if (res.hasOwnProperty('avms')) {
//       this.completed(res.avms);
//     } else {
//       this.failure('It was not possible to list live sessions.');
//     }
//   });
// });

module.exports = LiveListActions;
