'use strict';

const AppUtils = {

	text: {
		fieldIsRequired: 'This field is required'
	},

	fieldIsRequired(field) {
		const isInvalid = AppUtils.isEmpty(field.getValue());
		return isInvalid ? AppUtils.text.fieldIsRequired : '';
	},

	isEmpty(textField) {
		return (textField.trim() === '');
	},

	extend() {
		const newObj = {};
		for (let i = 0; i < arguments.length; i++) {
			const obj = arguments[i];
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					newObj[key] = obj[key];
				}
			}
		}
		return newObj;
	},

	capitalize(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	},

	pluralize(count, word) {
		return count === 1 ? word : `${word}s`;
	},

	getDate() {
		return new Date().toISOString()
			.replace(/T/, ' ')
			.replace(/Z/, '');
	}

};

module.exports = AppUtils;
