/* global document */
'use strict';
// https://www.sitepoint.com/use-html5-full-screen-api/

const fullscreenEnabled = () => {
	return document.fullscreenEnabled ||
		document.webkitFullscreenEnabled ||
		document.mozFullScreenEnabled ||
		document.msFullscreenEnabled;
};

const requestFullscreen = element => {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
};

const fullscreenElement = () => {
	return document.fullscreenElement ||
		document.webkitFullscreenElement ||
		document.mozFullScreenElement ||
		document.msFullscreenElement;
};

const exitFullscreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
};

const addFullscreenchange = FShandler => {
	document.addEventListener('fullscreenchange', FShandler);
	document.addEventListener('webkitfullscreenchange', FShandler);
	document.addEventListener('mozfullscreenchange', FShandler);
	document.addEventListener('MSFullscreenChange', FShandler);
};

const addFullscreenerror = FSerrorhandler => {
	document.addEventListener('fullscreenerror', FSerrorhandler);
	document.addEventListener('webkitfullscreenerror', FSerrorhandler);
	document.addEventListener('mozfullscreenerror', FSerrorhandler);
	document.addEventListener('MSFullscreenError', FSerrorhandler);
};

const removeFullscreenchange = FShandler => {
	document.addEventListener('fullscreenchange', FShandler);
	document.addEventListener('webkitfullscreenchange', FShandler);
	document.addEventListener('mozfullscreenchange', FShandler);
	document.addEventListener('MSFullscreenChange', FShandler);
};

const removeFullscreenerror = FSerrorhandler => {
	document.addEventListener('fullscreenerror', FSerrorhandler);
	document.addEventListener('webkitfullscreenerror', FSerrorhandler);
	document.addEventListener('mozfullscreenerror', FSerrorhandler);
	document.addEventListener('MSFullscreenError', FSerrorhandler);
};

module.exports = {
	fullscreenEnabled,
	requestFullscreen,
	fullscreenElement,
	exitFullscreen,
	addFullscreenchange,
	addFullscreenerror,
	removeFullscreenchange,
	removeFullscreenerror
};
