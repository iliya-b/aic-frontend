import test from 'ava';
import {scale2Fit} from 'app/libs/scale';

test(`Can scale up`, t => {
	const originalWidth = 4;
	const originalHeight = 3;
	const targetWidth = 40;
	const targetHeight = 100;
	const resultObj = scale2Fit(originalWidth, originalHeight, targetWidth, targetHeight);
	t.is(resultObj.width, 40);
	t.is(resultObj.height, 30);
});

test(`Can scale down`, t => {
	const originalWidth = 40;
	const originalHeight = 30;
	const targetWidth = 4;
	const targetHeight = 10;
	const resultObj = scale2Fit(originalWidth, originalHeight, targetWidth, targetHeight);
	t.is(resultObj.width, 4);
	t.is(resultObj.height, 3);
});

test(`Can decide not to scale`, t => {
	const originalWidth = 40;
	const originalHeight = 30;
	const targetWidth = 40;
	const targetHeight = 100;
	const resultObj = scale2Fit(originalWidth, originalHeight, targetWidth, targetHeight);
	t.is(resultObj.width, 40);
	t.is(resultObj.height, 30);
});

test(`Can scale up width < height`, t => {
	const originalWidth = 4;
	const originalHeight = 8;
	const targetWidth = 40;
	const targetHeight = 100;
	const resultObj = scale2Fit(originalWidth, originalHeight, targetWidth, targetHeight);
	t.is(resultObj.width, 40);
	t.is(resultObj.height, 80);
});
