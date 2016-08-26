'use strict';

const debug = require('debug')('AiC:Libs:Parser');

// JS version of
// https://android.googlesource.com/platform/development/+/b8747bc7b1082c273360f84f7cd0b4770613955a/tools/ddms/libs/ddmlib/src/com/android/ddmlib/testrunner/InstrumentationResultParser.java

// Relevant test status keys.
const StatusKeys = {
	TEST: 'test',
	CLASS: 'class',
	STACK: 'stack',
	NUMTESTS: 'numtests',
	// Extra ones we selected (different from android)
	ID: 'id',
	CURRENT: 'current',
	ERROR: 'Error'
};

// Relevant result keys from INSTRUMENTATION_RESULT
const ResultKeys = ['shortMsg', 'longMsg'];

// Test result status codes.
const StatusCodes = {
	'-2': 'FAILURE',
	'1': 'START',
	'-1': 'ERROR',
	'0': 'OK',
	'null': null
};

// Prefixes used to identify output.
const Prefixes = {
	STATUS: 'INSTRUMENTATION_STATUS: ',
	STATUS_CODE: 'INSTRUMENTATION_STATUS_CODE: ',
	STATUS_FAILED: 'INSTRUMENTATION_FAILED: ',
	TIME_REPORT: 'Time: ',
	// Extra ones we selected (different from android)
	RESULT: 'INSTRUMENTATION_RESULT: ',
	CODE: 'INSTRUMENTATION_CODE: '
};

const uniqueClasses = resObj => {
	const classesPos = {};
	const resFiltered = [];
	resObj.forEach(t => {
		if (!(t.testClass in classesPos)) {
			classesPos[t.testClass] = {};
		}
		if (!(t.testName in classesPos[t.testClass])) {
			resFiltered.push(null);
			classesPos[t.testClass][t.testName] = resFiltered.length - 1;
		}
		resFiltered[classesPos[t.testClass][t.testName]] = t;
	});
	return resFiltered;
};

class AdbParser {
	constructor() {
		// Stores all the tests and codes
		this.testCases = [];

		// Stores the current index being handled by the parser
		this.mCurrentTestResultIndex = null;

		// Stores the current "key" portion of the status key-value being parsed.
		this.mCurrentKey = null;

		// Stores the current "value" portion of the status key-value being parsed.
		this.mCurrentValue = null;

		// The elapsed time of the test run, in milliseconds.
		this.mTestTime = null;

		// The status code for the overall instrumentation
		this.mCode = null;

		this.extraKeys = {};
	}

	getCurrentTestInfo() {
		if (this.mCurrentTestResultIndex === null) {
			this.testCases.push({});
			this.mCurrentTestResultIndex = this.testCases.length - 1;
		}
		return this.testCases[this.mCurrentTestResultIndex];
	}

	clearCurrentTestInfo() {
		this.mCurrentTestResultIndex = null;
	}

	submitCurrentKeyValue() {
		if (this.mCurrentKey !== null && this.mCurrentValue !== null) {
			const testInfo = this.getCurrentTestInfo();
			const statusValue = this.mCurrentValue.join();
			if (this.mCurrentKey === StatusKeys.CLASS) {
				testInfo.testClass = statusValue.trim();
			} else if (this.mCurrentKey === StatusKeys.TEST) {
				testInfo.testName = statusValue.trim();
			} else if (this.mCurrentKey === StatusKeys.NUMTESTS) {
				try {
					testInfo.numTests = parseInt(statusValue, 10);
				} catch (err) {
					throw new Error(`Unexpected integer number of tests, received ${statusValue}`);
				}
			} else if (this.mCurrentKey === StatusKeys.STACK) {
				testInfo.stackTrace = statusValue;
			} else if (this.mCurrentKey === StatusKeys.ID) {
				testInfo.id = statusValue;
			} else if (this.mCurrentKey === StatusKeys.CURRENT) {
				try {
					testInfo.current = parseInt(statusValue, 10);
				} catch (err) {
					throw new Error(`Unexpected integer number of current test, received ${statusValue}`);
				}
			} else if (this.mCurrentKey === StatusKeys.ERROR) {
				testInfo.error = statusValue;
			} // else {
			// 	testInfo[`mUnknowKey${this.mCurrentKey}`] = statusValue;
			// }
			this.mCurrentKey = null;
			this.mCurrentValue = null;
		}
	}

	parseStatusCode(line) {
		const value = line.substring(Prefixes.STATUS_CODE.length).trim();
		const testInfo = this.getCurrentTestInfo();
		try {
			testInfo.statusCode = parseInt(value, 10);
			testInfo.statusText = StatusCodes[`${testInfo.statusCode}`];
		} catch (err) {
			throw new Error(`Expected integer status code, received: ${value}`);
		}

		// this means we're done with current test result bundle
		this.clearCurrentTestInfo();
	}

	parseValue(line, valueStartPos) {
		this.mCurrentValue = [];
		this.mCurrentValue.push(line.substring(valueStartPos));
	}

	parseKey(line, keyStartPos) {
		const endKeyPos = line.indexOf('=', keyStartPos);
		if (endKeyPos !== -1) {
			this.mCurrentKey = line.substring(keyStartPos, endKeyPos).trim();
			this.parseValue(line, endKeyPos + 1);
		}
	}

	parseTime(line, startPos) {
		const timeString = line.substring(startPos);
		try {
			const timeSeconds = parseFloat(timeString, 10);
			this.mTestTime = timeSeconds * 1000;
		} catch (err) {
			throw new Error(`Unexpected time format ${timeString}`);
		}
	}

	parseCode(line, startPos) {
		const codeString = line.substring(startPos);
		try {
			this.mCode = parseInt(codeString, 10);
		} catch (err) {
			throw new Error(`Unexpected code format ${codeString}`);
		}
	}

	parseResultKey(line, startPos) {
		const endKeyPos = line.indexOf('=', startPos);
		if (endKeyPos !== -1) {
			const key = line.substring(startPos, endKeyPos).trim();
			if (ResultKeys.indexOf(key) !== -1) {
				const value = line.substring(endKeyPos + 1).trim();
				this.extraKeys[key] = value;
			}
		}
	}

	parseLine(line) {
		if (line.startsWith(Prefixes.STATUS_CODE)) {
			// Previous status key-value has been collected. Store it.
			this.submitCurrentKeyValue();
			this.parseStatusCode(line);
		} else if (line.startsWith(Prefixes.STATUS)) {
			// Previous status key-value has been collected. Store it.
			this.submitCurrentKeyValue();
			this.parseKey(line, Prefixes.STATUS.length);
		} else if (line.startsWith(Prefixes.STATUS_FAILED)) {
			debug('test run failed', line);
		} else if (line.startsWith(Prefixes.TIME_REPORT)) {
			this.parseTime(line, Prefixes.TIME_REPORT.length);
		} else if (line.startsWith(Prefixes.RESULT)) {
			this.parseResultKey(line, Prefixes.RESULT.length);
		} else if (line.startsWith(Prefixes.CODE)) {
			this.parseCode(line, Prefixes.CODE.length);
		} else if (this.mCurrentValue !== null) { // eslint-disable-line no-negated-condition
			// this is a value that has wrapped to next line.
			this.mCurrentValue.push('\r\n');
			this.mCurrentValue.push(line);
		} else {
			debug('unrecognized line', line);
		}
	}

	parse(resultStr) {
		resultStr.split('\n').forEach(l => this.parseLine(l));
		return {
			testCases: uniqueClasses(this.testCases),
			timeMilliseconds: this.mTestTime,
			statusCode: this.mCode,
			statusText: StatusCodes[`${this.mCode}`],
			...this.extraKeys
		};
	}
}

const adbTestResultsParser = resultStr => {
	const r = new AdbParser();
	return r.parse(resultStr);
};

module.exports = adbTestResultsParser;
