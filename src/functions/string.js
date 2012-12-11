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
fStaticContext_defineSystemFunction("codepoints-to-string",	[[cXSInteger, '*']],	function(oSequence1) {
	var aValue	= [];
	for (var nIndex = 0, nLength = oSequence1.length; nIndex < nLength; nIndex++)
		aValue.push(cString.fromCharCode(oSequence1[nIndex]));

	return new cXSString(aValue.join(''));
});

// fn:string-to-codepoints($arg as xs:string?) as xs:integer*
fStaticContext_defineSystemFunction("string-to-codepoints",	[[cXSString, '?']],	function(oValue) {
	if (oValue == null)
		return null;

	var sValue	= oValue.valueOf();
	if (sValue == '')
		return [];

	var oSequence	= [];
	for (var nIndex = 0, nLength = sValue.length; nIndex < nLength; nIndex++)
		oSequence.push(new cXSInteger(sValue.charCodeAt(nIndex)));

	return oSequence;
});

// 7.3 Equality and Comparison of Strings
// fn:compare($comparand1 as xs:string?, $comparand2 as xs:string?) as xs:integer?
// fn:compare($comparand1 as xs:string?, $comparand2 as xs:string?, $collation as xs:string) as xs:integer?
fStaticContext_defineSystemFunction("compare",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue1, oValue2, oCollation) {
	if (oValue1 == null || oValue2 == null)
		return null;

	var sCollation	= this.staticContext.defaultCollationName,
		vCollation;
	if (arguments.length > 2)
		sCollation	= oCollation.valueOf();

	vCollation	= sCollation == sNS_XPFUNC + "/collation/codepoint" ? oCodepointStringCollator : this.staticContext.getCollation(sCollation);
	if (!vCollation)
		throw new cException("FOCH0002"
//->Debug
				, "Unknown collation " + '{' + sCollation + '}'
//<-Debug
		);

	return new cXSInteger(vCollation.compare(oValue1.valueOf(), oValue2.valueOf()));
});

// fn:codepoint-equal($comparand1 as xs:string?, $comparand2  as xs:string?) as xs:boolean?
fStaticContext_defineSystemFunction("codepoint-equal",	[[cXSString, '?'], [cXSString, '?']],	function(oValue1, oValue2) {
	if (oValue1 == null || oValue2 == null)
		return null;

	// TODO: Check if JS uses 'Unicode code point collation' here

	return new cXSBoolean(oValue1.valueOf() == oValue2.valueOf());
});


// 7.4 Functions on String Values
// fn:concat($arg1 as xs:anyAtomicType?, $arg2 as xs:anyAtomicType?, ...) as xs:string
fStaticContext_defineSystemFunction("concat",	null,	function() {
	// check arguments length
	if (arguments.length < 2)
		throw new cException("XPST0017"
//->Debug
				, "Function concat() must have at least 2 arguments"
//<-Debug
		);

	var aValue	= [];
	for (var nIndex = 0, nLength = arguments.length, oSequence; nIndex < nLength; nIndex++) {
		oSequence	= arguments[nIndex];
		// Assert cardinality
		fFunctionCall_assertSequenceCardinality(this, oSequence, '?'
//->Debug
				, "each argument of concat()"
//<-Debug
		);
		//
		if (oSequence.length)
			aValue[aValue.length]	= cXSString.cast(fFunction_sequence_atomize(oSequence, this)[0]).valueOf();
	}

	return new cXSString(aValue.join(''));
});

// fn:string-join($arg1 as xs:string*, $arg2 as xs:string) as xs:string
fStaticContext_defineSystemFunction("string-join",	[[cXSString, '*'], [cXSString]],	function(oSequence1, oValue) {
	return new cXSString(oSequence1.join(oValue));
});

// fn:substring($sourceString as xs:string?, $startingLoc as xs:double) as xs:string
// fn:substring($sourceString as xs:string?, $startingLoc as xs:double, $length as xs:double) as xs:string
fStaticContext_defineSystemFunction("substring",	[[cXSString, '?'], [cXSDouble], [cXSDouble, '', true]],	function(oValue, oStart, oLength) {
	var sValue	= oValue == null ? '' : oValue.valueOf(),
		nStart	= cMath.round(oStart) - 1,
		nEnd	= arguments.length > 2 ? nStart + cMath.round(oLength) : sValue.length;

	// TODO: start can be negative
	return new cXSString(nEnd > nStart ? sValue.substring(nStart, nEnd) : '');
});

// fn:string-length() as xs:integer
// fn:string-length($arg as xs:string?) as xs:integer
fStaticContext_defineSystemFunction("string-length",	[[cXSString, '?', true]],	function(oValue) {
	if (!arguments.length) {
		if (!this.item)
			throw new cException("XPDY0002");
		oValue	= cXSString.cast(fFunction_sequence_atomize([this.item], this)[0]);
	}
	return new cXSInteger(oValue == null ? 0 : oValue.valueOf().length);
});

// fn:normalize-space() as xs:string
// fn:normalize-space($arg as xs:string?) as xs:string
fStaticContext_defineSystemFunction("normalize-space",	[[cXSString, '?', true]],	function(oValue) {
	if (!arguments.length) {
		if (!this.item)
			throw new cException("XPDY0002");
		oValue	= cXSString.cast(fFunction_sequence_atomize([this.item], this)[0]);
	}
	return new cXSString(oValue == null ? '' : fString_trim(oValue).replace(/\s\s+/g, ' '));
});

// fn:normalize-unicode($arg as xs:string?) as xs:string
// fn:normalize-unicode($arg as xs:string?, $normalizationForm as xs:string) as xs:string
fStaticContext_defineSystemFunction("normalize-unicode",	[[cXSString, '?'], [cXSString, '', true]],	function(oValue, oNormalization) {
	throw "Function '" + "normalize-unicode" + "' not implemented";
});

// fn:upper-case($arg as xs:string?) as xs:string
fStaticContext_defineSystemFunction("upper-case",	[[cXSString, '?']],	function(oValue) {
	return new cXSString(oValue == null ? '' : oValue.valueOf().toUpperCase());
});

// fn:lower-case($arg as xs:string?) as xs:string
fStaticContext_defineSystemFunction("lower-case",	[[cXSString, '?']],	function(oValue) {
	return new cXSString(oValue == null ? '' : oValue.valueOf().toLowerCase());
});

// fn:translate($arg as xs:string?, $mapString as xs:string, $transString as xs:string) as xs:string
fStaticContext_defineSystemFunction("translate",	[[cXSString, '?'], [cXSString], [cXSString]],	function(oValue, oMap, oTranslate) {
	if (oValue == null)
		return new cXSString('');

	var aValue	= oValue.valueOf().split(''),
		aMap	= oMap.valueOf().split(''),
		aTranslate	= oTranslate.valueOf().split(''),
		nTranslateLength	= aTranslate.length,
		aReturn	= [];
	for (var nIndex = 0, nLength = aValue.length, nPosition; nIndex < nLength; nIndex++)
		if ((nPosition = aMap.indexOf(aValue[nIndex])) ==-1)
			aReturn[aReturn.length]	= aValue[nIndex];
		else
		if (nPosition < nTranslateLength)
			aReturn[aReturn.length]	= aTranslate[nPosition];

	return new cXSString(aReturn.join(''));
});

// fn:encode-for-uri($uri-part as xs:string?) as xs:string
fStaticContext_defineSystemFunction("encode-for-uri",	[[cXSString, '?']],	function(oValue) {
	return new cXSString(oValue == null ? '' : window.encodeURIComponent(oValue));
});

// fn:iri-to-uri($iri as xs:string?) as xs:string
fStaticContext_defineSystemFunction("iri-to-uri",		[[cXSString, '?']],	function(oValue) {
	return new cXSString(oValue == null ? '' : window.encodeURI(window.decodeURI(oValue)));
});

// fn:escape-html-uri($uri as xs:string?) as xs:string
fStaticContext_defineSystemFunction("escape-html-uri",	[[cXSString, '?']],	function(oValue) {
	if (oValue == null || oValue.valueOf() == '')
		return new cXSString('');
	// Encode
	var aValue	= oValue.valueOf().split('');
	for (var nIndex = 0, nLength = aValue.length, nCode; nIndex < nLength; nIndex++)
		if ((nCode = aValue[nIndex].charCodeAt(0)) < 32 || nCode > 126)
			aValue[nIndex]	= window.encodeURIComponent(aValue[nIndex]);
	return new cXSString(aValue.join(''));
});


// 7.5 Functions Based on Substring Matching
// fn:contains($arg1 as xs:string?, $arg2 as xs:string?) as xs:boolean
// fn:contains($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:boolean
fStaticContext_defineSystemFunction("contains",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
	return new cXSBoolean((oValue == null ? '' : oValue.valueOf()).indexOf(oSearch == null ? '' : oSearch.valueOf()) >= 0);
});

// fn:starts-with($arg1 as xs:string?, $arg2 as xs:string?) as xs:boolean
// fn:starts-with($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:boolean
fStaticContext_defineSystemFunction("starts-with",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
	return new cXSBoolean((oValue == null ? '' : oValue.valueOf()).indexOf(oSearch == null ? '' : oSearch.valueOf()) == 0);
});

// fn:ends-with($arg1 as xs:string?, $arg2 as xs:string?) as xs:boolean
// fn:ends-with($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:boolean
fStaticContext_defineSystemFunction("ends-with",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
	var sValue	= oValue == null ? '' : oValue.valueOf(),
		sSearch	= oSearch == null ? '' : oSearch.valueOf();

	return new cXSBoolean(sValue.indexOf(sSearch) == sValue.length - sSearch.length);
});

// fn:substring-before($arg1 as xs:string?, $arg2 as xs:string?) as xs:string
// fn:substring-before($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:string
fStaticContext_defineSystemFunction("substring-before",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
	var sValue	= oValue == null ? '' : oValue.valueOf(),
		sSearch	= oSearch == null ? '' : oSearch.valueOf(),
		nPosition;

	return new cXSString((nPosition = sValue.indexOf(sSearch)) >= 0 ? sValue.substring(0, nPosition) : '');
});

// fn:substring-after($arg1 as xs:string?, $arg2 as xs:string?) as xs:string
// fn:substring-after($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:string
fStaticContext_defineSystemFunction("substring-after",	[[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]],	function(oValue, oSearch, oCollation) {
	var sValue	= oValue == null ? '' : oValue.valueOf(),
		sSearch	= oSearch == null ? '' : oSearch.valueOf(),
		nPosition;

	return new cXSString((nPosition = sValue.indexOf(sSearch)) >= 0 ? sValue.substring(nPosition + sSearch.length) : '');
});


// 7.6 String Functions that Use Pattern Matching
function fFunction_string_createRegExp(sValue, sFlags) {
	var d1	= '\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF',
		d2	= '\u0370-\u037D\u037F-\u1FFF\u200C-\u200D',
		d3	= '\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD',
		c	= 'A-Z_a-z\\-.0-9\u00B7' + d1 + '\u0300-\u036F' + d2 + '\u203F-\u2040' + d3,
		i	= 'A-Z_a-z' + d1 + d2 + d3;

	sValue	= sValue
				.replace(/\[\\i-\[:\]\]/g, '[' + i + ']')
				.replace(/\[\\c-\[:\]\]/g, '[' + c + ']')
				.replace(/\\i/g, '[:' + i + ']')
				.replace(/\\I/g, '[^:' + i + ']')
				.replace(/\\c/g, '[:' + c + ']')
				.replace(/\\C/g, '[^:' + c + ']');

	// Check if all flags are legal
	if (sFlags && !sFlags.match(/^[smix]+$/))
		throw new cException("FORX0001");	// Invalid character '{%0}' in regular expression flags

	var bFlagS	= sFlags.indexOf('s') >= 0,
		bFlagX	= sFlags.indexOf('x') >= 0;
	if (bFlagS || bFlagX) {
		// Strip 's' and 'x' from flags
		sFlags	= sFlags.replace(/[sx]/g, '');
		var aValue	= [],
			rValue	= /\s/;
		for (var nIndex = 0, nLength = sValue.length, bValue = false, sCharCurr, sCharPrev = ''; nIndex < nLength; nIndex++) {
			sCharCurr	= sValue.charAt(nIndex);
			if (sCharPrev != '\\') {
				if (sCharCurr == '[')
					bValue	= true;
				else
				if (sCharCurr == ']')
					bValue	= false;
			}
			// Replace '\s' for flag 'x' if not in []
			if (bValue || !(bFlagX && rValue.test(sCharCurr))) {
				// Replace '.' for flag 's' if not in []
				if (!bValue && (bFlagS && sCharCurr == '.' && sCharPrev != '\\'))
					aValue[aValue.length]	= '(?:.|\\s)';
				else
					aValue[aValue.length]	= sCharCurr;
			}
			sCharPrev	= sCharCurr;
		}
		sValue	= aValue.join('');
	}

	return new cRegExp(sValue, sFlags + 'g');
};

// fn:matches($input as xs:string?, $pattern as xs:string) as xs:boolean
// fn:matches($input as xs:string?, $pattern as xs:string, $flags as xs:string) as xs:boolean
fStaticContext_defineSystemFunction("matches",	[[cXSString, '?'], [cXSString], [cXSString, '', true]],	function(oValue, oPattern, oFlags) {
	var sValue	= oValue == null ? '' : oValue.valueOf(),
		rRegExp	= fFunction_string_createRegExp(oPattern.valueOf(), arguments.length > 2 ? oFlags.valueOf() : '');

	return new cXSBoolean(rRegExp.test(sValue));
});

// fn:replace($input as xs:string?, $pattern as xs:string, $replacement as xs:string) as xs:string
// fn:replace($input as xs:string?, $pattern as xs:string, $replacement as xs:string, $flags as xs:string) as xs:string
fStaticContext_defineSystemFunction("replace",	[[cXSString, '?'], [cXSString],  [cXSString], [cXSString, '', true]],	function(oValue, oPattern, oReplacement, oFlags) {
	var sValue	= oValue == null ? '' : oValue.valueOf(),
		rRegExp	= fFunction_string_createRegExp(oPattern.valueOf(), arguments.length > 3 ? oFlags.valueOf() : '');

	return new cXSBoolean(sValue.replace(rRegExp, oReplacement.valueOf()));
});

// fn:tokenize($input as xs:string?, $pattern as xs:string) as xs:string*
// fn:tokenize($input as xs:string?, $pattern as xs:string, $flags as xs:string) as xs:string*
fStaticContext_defineSystemFunction("tokenize",	[[cXSString, '?'], [cXSString], [cXSString, '', true]],	function(oValue, oPattern, oFlags) {
	var sValue	= oValue == null ? '' : oValue.valueOf(),
		rRegExp	= fFunction_string_createRegExp(oPattern.valueOf(), arguments.length > 2 ? oFlags.valueOf() : '');

	var oSequence	= [];
	for (var nIndex = 0, aValue = sValue.split(rRegExp), nLength = aValue.length; nIndex < nLength; nIndex++)
		oSequence.push(new cXSString(aValue[nIndex]));

	return oSequence;
});
