ace.define("ace/mode/aicdsl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
	"use strict";

	var oop = acequire("../lib/oop");
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

	var AicdslHighlightRules = function() {
		var keywords = "End|Run|at";
		this.$rules = {
			"start": [
				{token: "comment", regex: "\\/\\/.*$"},
				{token: "comment", regex: "\\/\\*", next : "comment"},
				{token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},
				{token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},
				{token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},
				{token: "keyword", regex: "\\b(?:" + keywords + ")\\b"}
			],
			"comment": [
				{token: "comment", regex: ".*?\\*\\/", next : "start"},
				{token: "comment", regex: ".+"}
			]
		};
	};

	oop.inherits(AicdslHighlightRules, TextHighlightRules);

	exports.AicdslHighlightRules = AicdslHighlightRules;
});

ace.define("ace/mode/aicdsl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/aicdsl_highlight_rules"], function(acequire, exports, module) {
"use strict";

	var oop = acequire("../lib/oop");
	var TextMode = acequire("./text").Mode;
	var HighlightRules = acequire("./aicdsl_highlight_rules").AicdslHighlightRules;

	var Mode = function() {
	    this.HighlightRules = HighlightRules;
	};
	oop.inherits(Mode, TextMode);

	(function() {
		this.$id = "ace/mode/aicdsl";
	}).call(Mode.prototype);

	exports.Mode = Mode;
});

