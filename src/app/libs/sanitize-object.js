'use strict';

// Vendors
const inspector = require('schema-inspector');
// const debug = require('debug')('AiC:libs:SanitizeObject');

// APP

const SanitizeObject = {

	sanitizeData(dataObj) {
		if (!('data' in dataObj) || !('schema' in dataObj)) {
			throw new Error('Data object badly formatted.');
		}

		const result = inspector.validate(dataObj.schema, dataObj.data);

		if (result.valid) {
			const sanitizedData = inspector.sanitize(dataObj.schema, dataObj.data);
			// debug('data valid', sanitizedData);
			return sanitizedData.data;
		}
		throw new Error(result.format());
	}

};

module.exports = SanitizeObject;
