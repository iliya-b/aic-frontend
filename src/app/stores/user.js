'use strict';

import Reflux from 'reflux';
import UserActions from 'app/actions/user';

const debug = require('debug')('AiC:Stores:User');

const UserStore = Reflux.createStore({

	// Base Store //

	listenables: UserActions,

	init() {
		this.state = {};
		this.state.user = {};
	},

	// Actions //

	onNotifyQuota(requestInfo, data) {
		debug('onNofityQuota', data);
		this.state.user.quota = data;
		this.updateState();
	},

	// Methods //

	updateState() {
		this.trigger(this.state);
	}
});

module.exports = UserStore;
