import {findLast} from 'app/libs/helpers';

// References:
// https://developer.android.com/about/dashboards/index.html
// https://developer.android.com/guide/practices/screens_support.html

const sizes = [
	'320x480', '480x800', '800x600', '1280x800' // Normal values
	// '320x480', '480x800', '800x600', '1280x800', '1920x1080', '3440x1440', '4096x2160' // Testing dpi
];

const dpis = [
	'160', '240', '320', '480'
];

const isValidWidthHeightDpi = (width, height, dpi) => {
	return 160 * (Math.min(width, height)) / dpi <= 600;
};

const getSize = resolution => {
	const res = resolution.split('x', 2);
	const width = parseInt(res[0], 10);
	const height = parseInt(res[1], 10);
	return {width, height};
};

const isValidResDpi = (resolution, dpi) => {
	const size = getSize(resolution);
	const dpiInt = parseInt(dpi, 10);
	return isValidWidthHeightDpi(size.width, size.height, dpiInt);
};

const calcMaxValidSizeByDpi = dpi => {
	return Math.floor(dpi * 600 / 160); // maxSize
};

const getArrMaxSize = maxSize => {
	return findLast(sizes, s => {
		const size = getSize(s);
		return maxSize >= Math.min(size.width, size.height);
	});
};

const calcMinValidDpiBySize = resolution => {
	const size = getSize(resolution);
	return Math.ceil(Math.min(size.width, size.height) / 600 * 160);
};

const getArrMinDpi = minDpi => {
	return dpis.find(d => d >= minDpi);
};

module.exports = {
	isValidResDpi,
	calcMaxValidSizeByDpi,
	calcMinValidDpiBySize,
	getArrMaxSize,
	getArrMinDpi,
	sizes,
	dpis,
	getSize
};
