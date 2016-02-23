'use strict';

// Reflux
const Reflux = require('reflux');

// Vendors
const debuggerGoby = require('debug')('AiC:Polling:Actions');

// APP
const BackendAPI = require('goby/stores/backend-api.jsx');
// const AppUtils = require('goby/components/shared/app-utils.jsx');
const LiveListActions = require('./live-list');

// Actions
const PollingActions = Reflux.createActions({
  liveList: {},
  retry: {children: ['completed', 'failure']},
});

// Listeners for asynchronous Backend API calls

PollingActions.retry.listen(function (apiIndex, apiArgs, remainingTries) {
  debuggerGoby('retry called', arguments);
  BackendAPI[apiIndex].apply(BackendAPI, apiArgs)
  .then(res => {
    this.completed(res, apiIndex, apiArgs, remainingTries);
  })
  .catch(res => {
    this.failure(res, apiIndex, apiArgs, remainingTries);
  });

  switch (apiIndex) {
    case 'liveList':
      LiveListActions.list();
      break;
    default:
      debuggerGoby('apiIndex not found', arguments);
  }
});

module.exports = PollingActions;
