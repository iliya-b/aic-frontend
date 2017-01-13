'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';

const AppConfigActions = Reflux.createActions({
	load: {asyncResult: true}
});

AppConfigActions.load.listenAndPromise(Gateway.config.read);

module.exports = AppConfigActions;
