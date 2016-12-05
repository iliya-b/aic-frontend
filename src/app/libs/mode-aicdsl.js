/* global ace */

ace.define(
	'ace/mode/aicdsl_highlight_rules',
	['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text_highlight_rules'],
	(acequire, exports /* , module*/) => {
		'use strict';

		const oop = acequire('../lib/oop');
		const TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules;

		const AicdslHighlightRules = function () {
			const keywords = 'End|Run|at';
			this.$rules = {
				start: [
					{token: 'comment', regex: '\\/\\/.*$'},
					{token: 'comment', regex: '\\/\\*', next: 'comment'},
					{token: 'string', regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
					{token: 'string', regex: '[\'](?:(?:\\\\.)|(?:[^\'\\\\]))*?[\']'},
					{token: 'constant.numeric', regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b'},
					{token: 'keyword', regex: '\\b(?:' + keywords + ')\\b'}
				],
				comment: [
					{token: 'comment', regex: '.*?\\*\\/', next: 'start'},
					{token: 'comment', regex: '.+'}
				]
			};

			this.normalizeRules();
		};

		AicdslHighlightRules.metaData = {
			fileTypes: ['aicdsl'],
			name: 'Aicdsl'
		};

		oop.inherits(AicdslHighlightRules, TextHighlightRules);

		exports.AicdslHighlightRules = AicdslHighlightRules;
	});

ace.define(
	'ace/mode/aicdsl',
	['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/aicdsl_highlight_rules'],
	(acequire, exports /* , module*/) => {
		'use strict';

		const oop = acequire('../lib/oop');
		const TextMode = acequire('./text').Mode;
		const AicdslHighlightRules = acequire('./aicdsl_highlight_rules').AicdslHighlightRules;

		const Mode = function () {
			this.HighlightRules = AicdslHighlightRules;
		};
		oop.inherits(Mode, TextMode);

		(function () {
			this.$id = 'ace/mode/aicdsl';
		}).call(Mode.prototype);

		exports.Mode = Mode;
	});
