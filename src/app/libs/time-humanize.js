'use strict';

// https://github.com/moment/moment/blob/develop/src/lib/duration/humanize.js

// const locale = ['ms', 's', 'm', 'h', 'd', 'M', 'y'];
const portions = [
	1000, // milliseconds to seconds
	60, // seconds to minute
	60, // minutes to hour
	24, // hours to day
	30, // days to month
	12 // months to year
];
const locale = ['millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year'];

const timeHumanize = timeMilliseconds => {
	let currentTime = timeMilliseconds;
	let portionIndex = 0;
	while (Math.round(currentTime / portions[portionIndex]) > 0) {
		currentTime = Math.round(currentTime / portions[portionIndex]);
		portionIndex++;
	}
	return `${currentTime} ${locale[portionIndex]}${currentTime > 1 ? 's' : ''}`;
};

module.exports = timeHumanize;
