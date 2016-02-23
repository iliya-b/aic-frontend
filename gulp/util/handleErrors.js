const notify = require('gulp-notify');

module.exports = function () {
	// TODO: revise prefer-reflect (when node implements Reflect)
	const args = Array.prototype.slice.call(arguments); // eslint-disable-line prefer-reflect

	// Send error to notification center with gulp-notify
	notify.onError({ // eslint-disable-line prefer-reflect
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);

	// Keep gulp from hanging on this task
	this.emit('end');
};
