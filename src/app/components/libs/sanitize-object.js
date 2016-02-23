'use strict';

// Vendors
const inspector = require('schema-inspector');
// const debuggerGoby = require('debug')('AiC:libs:SanitizeObject');

// APP

const SanitizeObject = {

  sanitizeData(dataObj) {
    if (!dataObj.hasOwnProperty('data') || !dataObj.hasOwnProperty('schema')) {
      throw new Error('Data object badly formatted.');
    }

    const result = inspector.validate(dataObj.schema, dataObj.data);

    if (!result.valid) {
      throw new Error(result.format());
    } else {
      const sanitizedData = inspector.sanitize(dataObj.schema, dataObj.data);
      // debuggerGoby('data valid', sanitizedData);
      return sanitizedData.data;
    }
  },

};

module.exports = SanitizeObject;
