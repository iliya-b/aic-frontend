/* global document */
'use strict';

const debug = require('debug')('AiC:Libs:Scale');

const scale2Fit = (originalWidth, originalHeight, targetWidth, targetHeight) => {
	// let isScallingUp = false;
	// if (originalWidth < targetWidth && originalHeight < targetHeight) {
	// 	isScallingUp = true;
	// }

	let width = targetWidth;
	let height = originalHeight * targetWidth / originalWidth;
	if (height > targetHeight) {
		height = targetHeight;
		width = originalWidth * targetHeight / originalHeight;
	}

	return {
		width,
		height
	};
};

const calcScreenScale = (width, height, rotation) => {
	let androidSize;
	if (rotation === '0' || rotation === '180') {
		androidSize = {
			width,
			height
		};
	} else {
		androidSize = {
			height: width,
			width: height
		};
	}
	const windowSize = document.querySelector('#liveBox').getBoundingClientRect();
	const androidFinalSize = scale2Fit(androidSize.width, androidSize.height, windowSize.width, windowSize.height);
	debug('calcScreenScale', androidSize, windowSize, androidFinalSize);
	return androidFinalSize.width / androidSize.width;
};

module.exports = {
	scale2Fit,
	calcScreenScale
};
