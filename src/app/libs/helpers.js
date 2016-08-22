import {
	camelCase,
	capitalize,
	template,
	templateSettings,
	assign
} from 'lodash';

// In case we want to change the lodash lib is all in one place

const templateDelimiters = {
	begin: '<%=',
	end: '%>'
};

module.exports = {
	camelize: camelCase,
	capitalize,
	capimelize: str => capitalize(camelCase(str)),
	template: (templateStr, obj) => {
		console.log(templateSettings.interpolate);
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
	deepAssign: assign
};
