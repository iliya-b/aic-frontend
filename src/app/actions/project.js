'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';
import AppActions from 'app/actions/app';

const debug = require('debug')('AiC:Actions:Project');

const ProjectActions = Reflux.createActions({
	list: {asyncResult: true},
	create: {asyncResult: true},
	update: {asyncResult: true},
	delete: {asyncResult: true},
	load: {asyncResult: true}
});

ProjectActions.list.listenAndPromise(Gateway.projects.list);
ProjectActions.create.listenAndPromise(Gateway.projects.create);
ProjectActions.update.listenAndPromise(Gateway.projects.update);
ProjectActions.delete.listenAndPromise(Gateway.projects.delete);
ProjectActions.load.listenAndPromise(Gateway.projects.read);

// TODO: change to state ?
ProjectActions.getNameById = function (projectId) {
	return Gateway.projects.list()
	.then(result => {
		// TODO: Why the return does not work on this context?
		let found = false;
		if (result instanceof Array) {
			result.forEach(v => {
				if (v.id === projectId) {
					debug('found project');
					found = v.name;
				}
			});
		}
		if (found) {
			return found;
		}
		debug('not found project', projectId, result);
		AppActions.notFound();
	});
};

module.exports = ProjectActions;
