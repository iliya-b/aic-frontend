import {
	camelCase,
	capitalize,
	template,
	templateSettings,
	merge
} from 'lodash';
// In case we want to change the lodash lib is all in one place

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

module.exports = {
	camelize: camelCase,
	capitalize,
	capimelize: str => capitalize(camelCase(str)),
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
	moveCaretToEnd
};
