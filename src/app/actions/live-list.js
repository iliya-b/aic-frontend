'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';

const LiveListActions = Reflux.createActions({
	notifyList: {},
	listImages: {asyncResult: true}
});

LiveListActions.listImages.listenAndPromise(Gateway.live.listImages);

module.exports = LiveListActions;
