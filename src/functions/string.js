/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	7.2 Functions to Assemble and Disassemble Strings
		codepoints-to-string
		string-to-codepoints

	7.3 Equality and Comparison of Strings
		compare
		codepoint-equal

	7.4 Functions on String Values
		concat
		string-join
		substring
		string-length
		normalize-space
		normalize-unicode
		upper-case
		lower-case
		translate
		encode-for-uri
		iri-to-uri
		escape-html-uri

	7.5 Functions Based on Substring Matching
		contains
		starts-with
		ends-with
		substring-before
		substring-after

	7.6 String Functions that Use Pattern Matching
		matches
		replace
		tokenize
*/

// 7.2 Functions to Assemble and Disassemble Strings
// fn:codepoints-to-string($arg as xs:integer*) as xs:string
cFunctionCall.functions["codepoints-to-string"]	= function(oSequence1) {
	throw "Function '" + "codepoints-to-string" + "' not implemented";
};

// fn:string-to-codepoints($arg as xs:string?) as xs:integer*
cFunctionCall.functions["string-to-codepoints"]	= function(oSequence1) {
	throw "Function '" + "string-to-codepoints" + "' not implemented";
};

// 7.3 Equality and Comparison of Strings
// fn:compare($comparand1 as xs:string?, $comparand2 as xs:string?) as xs:integer?
// fn:compare($comparand1 as xs:string?, $comparand2 as xs:string?, $collation as xs:string) as xs:integer?
cFunctionCall.functions["compare"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "compare" + "' not implemented";
};

// fn:codepoint-equal($comparand1 as xs:string?, $comparand2  as xs:string?) as xs:boolean?
cFunctionCall.functions["codepoint-equal"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "codepoint-equal" + "' not implemented";
};


// 7.4 Functions on String Values
// fn:concat($arg1 as xs:anyAtomicType?, $arg2 as xs:anyAtomicType?, ...) as xs:string
cFunctionCall.functions["concat"]	= function(oSequence1, oSequence2) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");
	throw "Function '" + "concat" + "' not implemented";
};

// fn:string-join($arg1 as xs:string*, $arg2 as xs:string) as xs:string
cFunctionCall.functions["string-join"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "string-join" + "' not implemented";
};

// fn:substring($sourceString as xs:string?, $startingLoc as xs:double) as xs:string
// fn:substring($sourceString as xs:string?, $startingLoc as xs:double, $length as xs:double) as xs:string
cFunctionCall.functions["substring"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "substring" + "' not implemented";
};

// fn:string-length() as xs:integer
// fn:string-length($arg as xs:string?) as xs:integer
cFunctionCall.functions["string-length"]	= function(oSequence1) {
	throw "Function '" + "string-length" + "' not implemented";
};

// fn:normalize-space() as xs:string
// fn:normalize-space($arg as xs:string?) as xs:string
cFunctionCall.functions["normalize-space"]	= function(oSequence1) {
	throw "Function '" + "normalize-space" + "' not implemented";
};

// fn:normalize-unicode($arg as xs:string?) as xs:string
// fn:normalize-unicode($arg as xs:string?, $normalizationForm as xs:string) as xs:string
cFunctionCall.functions["normalize-unicode"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "normalize-unicode" + "' not implemented";
};

// fn:upper-case($arg as xs:string?) as xs:string
cFunctionCall.functions["upper-case"]	= function(oSequence1) {
	throw "Function '" + "upper-case" + "' not implemented";
};

// fn:lower-case($arg as xs:string?) as xs:string
cFunctionCall.functions["lower-case"]	= function(oSequence1) {
	throw "Function '" + "lower-case" + "' not implemented";
};

// fn:translate($arg as xs:string?, $mapString as xs:string, $transString as xs:string) as xs:string
cFunctionCall.functions["translate"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "translate" + "' not implemented";
};

// fn:encode-for-uri($uri-part as xs:string?) as xs:string
cFunctionCall.functions["encode-for-uri"]	= function(oSequence1) {
	throw "Function '" + "encode-for-uri" + "' not implemented";
};

// fn:iri-to-uri($iri as xs:string?) as xs:string
cFunctionCall.functions["iri-to-uri"]	= function(oSequence1) {
	throw "Function '" + "iri-to-uri" + "' not implemented";
};

// fn:escape-html-uri($uri as xs:string?) as xs:string
cFunctionCall.functions["escape-html-uri"]	= function(oSequence1) {
	throw "Function '" + "escape-html-uri" + "' not implemented";
};


// 7.5 Functions Based on Substring Matching
// fn:contains($arg1 as xs:string?, $arg2 as xs:string?) as xs:boolean
// fn:contains($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:boolean
cFunctionCall.functions["contains"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "contains" + "' not implemented";
};

// fn:starts-with($arg1 as xs:string?, $arg2 as xs:string?) as xs:boolean
// fn:starts-with($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:boolean
cFunctionCall.functions["starts-with"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "starts-with" + "' not implemented";
};

// fn:ends-with($arg1 as xs:string?, $arg2 as xs:string?) as xs:boolean
// fn:ends-with($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:boolean
cFunctionCall.functions["ends-with"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "ends-with" + "' not implemented";
};

// fn:substring-before($arg1 as xs:string?, $arg2 as xs:string?) as xs:string
// fn:substring-before($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:string
cFunctionCall.functions["substring-before"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "substring-before" + "' not implemented";
};

// fn:substring-after($arg1 as xs:string?, $arg2 as xs:string?) as xs:string
// fn:substring-after($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:string
cFunctionCall.functions["substring-after"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "substring-after" + "' not implemented";
};


// 7.6 String Functions that Use Pattern Matching
// fn:matches($input as xs:string?, $pattern as xs:string) as xs:boolean
// fn:matches($input as xs:string?, $pattern as xs:string, $flags as xs:string) as xs:boolean
cFunctionCall.functions["matches"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "matches" + "' not implemented";
};

// fn:replace($input as xs:string?, $pattern as xs:string, $replacement as xs:string) as xs:string
// fn:replace($input as xs:string?, $pattern as xs:string, $replacement as xs:string, $flags as xs:string) as xs:string
cFunctionCall.functions["replace"]	= function(oSequence1, oSequence2, oSequence3, oSequence4) {
	throw "Function '" + "replace" + "' not implemented";
};

// fn:tokenize($input as xs:string?, $pattern as xs:string) as xs:string*
// fn:tokenize($input as xs:string?, $pattern as xs:string, $flags as xs:string) as xs:string*
cFunctionCall.functions["tokenize"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "tokenize" + "' not implemented";
};
