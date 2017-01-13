import test from 'ava';
import {camelizeObj} from 'app/libs/helpers';

test(`Do nothing for no objects`, t => {
	const originalObj = 4;
	const expectedObj = 4;
	const resultObj = camelizeObj(originalObj);
	t.is(resultObj, expectedObj);
});

test(`Can camelize object`, t => {
	const originalObj = {test_test: 'should camelize', testSecond: 'should stay the same'}; // eslint-disable-line camelcase
	const expectedObj = {testTest: 'should camelize', testSecond: 'should stay the same'};
	const resultObj = camelizeObj(originalObj);
	t.deepEqual(resultObj, expectedObj);
});

test(`Can camelize object inside array`, t => {
	const originalObj = [{test_test: 'should camelize', testSecond: 'should stay the same'}]; // eslint-disable-line camelcase
	const expectedObj = [{testTest: 'should camelize', testSecond: 'should stay the same'}];
	const resultObj = camelizeObj(originalObj);
	t.deepEqual(resultObj, expectedObj);
});
