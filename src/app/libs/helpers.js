import {
	camelCase,
	capitalize,
	upperFirst,
	template,
	templateSettings,
	merge,
	isEqual
} from 'lodash';
// In case we want to change the lodash lib is all in one place

import AppPalette from 'app/configs/app-palette';

const debug = require('debug')('AiC:Libs:Helpers');

const templateDelimiters = {
	begin: '<%=',
	end: '%>'
};

const moveCaretToEnd = el => {
	if (typeof el.selectionStart === 'number') {
		debug('selectionStart');
		el.selectionStart = el.selectionEnd = el.value.length;
	} else if (typeof el.createTextRange !== 'undefined') {
		debug('createTextRange');
		el.focus();
		const range = el.createTextRange();
		range.collapse(false);
		range.select();
	}
};

 // ret = obj
 //  method = methods[caseType]

 //  if _.isArray(obj)
 //    ret = []
 //    i = 0

 //    while i < obj.length
 //      ret.push normalize(obj[i], caseType)
 //      ++i
 //  else if _.isObject(obj)
 //    ret = {}
 //    for k of obj
 //      ret[method(k)] = normalize(obj[k], caseType)

 //  ret

const isObject = value => typeof value === 'object';
const isArray = value => Array.isArray(value);

const camelizeObj = obj => {
	let result = obj;
	if (isArray(obj)) {
		result = obj.map(camelizeObj);
	} else if (isObject(obj)) {
		result = {};
		const objKeys = Object.keys(obj);
		objKeys.forEach(k => {
			result[camelCase(k)] = camelizeObj(obj[k]);
		});
	}
	return result;
};

// TODO: implement status
const colorByStatus = {
	DISABLED: AppPalette.disabledColor,
	FIRE: AppPalette.errorColor,
	ERROR: AppPalette.errorColor,
	LOADING: AppPalette.primary1Color,
	SUCCESS: AppPalette.accent1Color,
	WARNING: AppPalette.warnColor,
	INFO: AppPalette.primary1Color,
	QUESTION: AppPalette.primary1Color,
	PLAY: AppPalette.primary1Color,
	QUEUED: AppPalette.disabledColor
};
const getColorByStatus = status => {
	debug('status', status, (status in colorByStatus), colorByStatus);
	return (status in colorByStatus) ? colorByStatus[status] : false;
};
// TODO: implement status !!!!!! SHOULD DISAPEAR
const vm2Status = {
	CREATING: 'LOADING',
	DELETING: 'LOADING',
	ERROR: 'ERROR',
	RUNNING: 'LOADING',
	READY: 'SUCCESS',
	QUEUED: 'QUEUED',
	WARNING: 'WARNING',
	INFO: 'INFO',
	FIRE: 'FIRE',
	QUESTION: 'QUESTION',
	PLAY: 'PLAY'
};
const getVmStatus = vmStatus => vm2Status[vmStatus];

const findLast = (arr, fn) => {
	for (let i = (arr.length - 1); i >= 0; i--) {
		if (fn(arr[i])) {
			return arr[i];
		}
	}
};

module.exports = {
	camelize: camelCase,
	capitalize,
	capimelize: str => upperFirst(camelCase(capitalize(str))),
	template: (templateStr, obj) => {
		const compiled = template(templateStr);
		return compiled(obj);
	},
	setTemplateDelimiters: (begin, end) => {
		if (begin) {
			templateDelimiters.begin = begin;
		}
		if (end) {
			templateDelimiters.end = end;
		}
		templateSettings.interpolate = new RegExp(`${templateDelimiters.begin}([\\s\\S]+?)${templateDelimiters.end}`, 'g');
	},
	deepAssign: merge,
	moveCaretToEnd,
	getColorByStatus,
	getVmStatus,
	isEqual,
	upperFirst,
	camelizeObj,
	isObject,
	findLast
};
