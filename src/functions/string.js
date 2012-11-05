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
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	var aValue	= [];
	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		aValue.push(cString.fromCharCode(new cXPath2Sequence(oSequence1.items[nIndex]).toNumber()));

	return new cXPath2Sequence(aValue.join(''));
};

// fn:string-to-codepoints($arg as xs:string?) as xs:integer*
cFunctionCall.functions["string-to-codepoints"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	var sValue	= oSequence1.toString();
	if (sValue == '')
		return oSequence;

	for (var nIndex = 0, nLength = sValue.length; nIndex < nLength; nIndex++)
		oSequence.add(sValue.charCodeAt(nIndex));

	return oSequence;
};

// 7.3 Equality and Comparison of Strings
// fn:compare($comparand1 as xs:string?, $comparand2 as xs:string?) as xs:integer?
// fn:compare($comparand1 as xs:string?, $comparand2 as xs:string?, $collation as xs:string) as xs:integer?
cFunctionCall.functions["compare"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	if (oSequence1.isEmpty() || oSequence2.isEmpty())
		return new cXPath2Sequence;

	var sValue1	= oSequence1.toString(),
		sValue2	= oSequence2.toString();

	// TODO: Implement proper comparison, as this is used in operators
	// TODO: Implement collation handling

	return new cXPath2Sequence(sValue1 == sValue2 ? 0 : sValue1 > sValue2 ? 1 :-1);
};

// fn:codepoint-equal($comparand1 as xs:string?, $comparand2  as xs:string?) as xs:boolean?
cFunctionCall.functions["codepoint-equal"]	= function(oSequence1, oSequence2) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	if (oSequence1.isEmpty() || oSequence2.isEmpty())
		return new cXPath2Sequence;

	var sValue1	= oSequence1.toString(),
		sValue2	= oSequence2.toString();

	// TODO: Check if JS uses 'Unicode code point collation' here

	return new cXPath2Sequence(sValue1 == sValue2);
};


// 7.4 Functions on String Values
// fn:concat($arg1 as xs:anyAtomicType?, $arg2 as xs:anyAtomicType?, ...) as xs:string
cFunctionCall.functions["concat"]	= function(oSequence1, oSequence2) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var aValue	= [];
	for (var nIndex = 0, nLength = arguments.length; nIndex < nLength; nIndex++)
		aValue[aValue.length]	= arguments[nIndex].toString();

	return new cXPath2Sequence(aValue.join(''));
};

// fn:string-join($arg1 as xs:string*, $arg2 as xs:string) as xs:string
cFunctionCall.functions["string-join"]	= function(oSequence1, oSequence2) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	return new cXPath2Sequence(oSequence1.items.join(oSequence2.toString()));
};

// fn:substring($sourceString as xs:string?, $startingLoc as xs:double) as xs:string
// fn:substring($sourceString as xs:string?, $startingLoc as xs:double, $length as xs:double) as xs:string
cFunctionCall.functions["substring"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sValue	= oSequence1.toString(),
		nStart	= cMath.round(oSequence2.toNumber()) - 1,
		nEnd	= oSequence3 ? nStart + cMath.round(oSequence3.toNumber()) : sValue.length;

	// TODO: start can be negative
	return new cXPath2Sequence(nEnd > nStart ? sValue.substring(nStart, nEnd) : '');
};

// fn:string-length() as xs:integer
// fn:string-length($arg as xs:string?) as xs:integer
cFunctionCall.functions["string-length"]	= function(oSequence1) {
	if (arguments.length < 1)
		oSequence1	= new cXPath2Sequence(this.context);

	return new cXPath2Sequence(oSequence1.isEmpty() ? 0 : oSequence1.toString().length);
};

// fn:normalize-space() as xs:string
// fn:normalize-space($arg as xs:string?) as xs:string
cFunctionCall.functions["normalize-space"]	= function(oSequence1) {
	if (arguments.length < 1)
		oSequence1	= new cXPath2Sequence(this.context);

	return new cXPath2Sequence(oSequence1.isEmpty() ? '' : oSequence1.toString().replace(/^\s+|\s+$/g, '').replace(/\s\s+/g, ' '));
};

// fn:normalize-unicode($arg as xs:string?) as xs:string
// fn:normalize-unicode($arg as xs:string?, $normalizationForm as xs:string) as xs:string
cFunctionCall.functions["normalize-unicode"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "normalize-unicode" + "' not implemented";
};

// fn:upper-case($arg as xs:string?) as xs:string
cFunctionCall.functions["upper-case"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	return new cXPath2Sequence(oSequence1.toString().toUpperCase());
};

// fn:lower-case($arg as xs:string?) as xs:string
cFunctionCall.functions["lower-case"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	return new cXPath2Sequence(oSequence1.toString().toLowerCase());
};

// fn:translate($arg as xs:string?, $mapString as xs:string, $transString as xs:string) as xs:string
cFunctionCall.functions["translate"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 3)
		throw new cXPath2Error("XPST0017");

	var aValue	= oSequence1.toString().split(''),
		aMap	= oSequence2.toString().split(''),
		aTranslate	= oSequence3.toString().split(''),
		nTranslateLength	= aTranslate.length,
		aReturn	= [];
	for (var nIndex = 0, nLength = aValue.length, nPosition; nIndex < nLength; nIndex++)
		if ((nPosition = aMap.indexOf(aValue[nIndex])) ==-1)
			aReturn[aReturn.length]	= aValue[nIndex];
		else
		if (nPosition < nTranslateLength)
			aReturn[aReturn.length]	= aTranslate[nPosition];

	return new cXPath2Sequence(aReturn.join(''));
};

// fn:encode-for-uri($uri-part as xs:string?) as xs:string
cFunctionCall.functions["encode-for-uri"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	return new cXPath2Sequence(window.encodeURIComponent(oSequence1.toString()));
};

// fn:iri-to-uri($iri as xs:string?) as xs:string
cFunctionCall.functions["iri-to-uri"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	throw "Function '" + "iri-to-uri" + "' not implemented";
};

// fn:escape-html-uri($uri as xs:string?) as xs:string
cFunctionCall.functions["escape-html-uri"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	throw "Function '" + "escape-html-uri" + "' not implemented";
};


// 7.5 Functions Based on Substring Matching
// fn:contains($arg1 as xs:string?, $arg2 as xs:string?) as xs:boolean
// fn:contains($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:boolean
cFunctionCall.functions["contains"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sValue	= oSequence1.toString(),
		sSearch	= oSequence2.toString();

	return new cXPath2Sequence(sValue.indexOf(sSearch) >= 0);
};

// fn:starts-with($arg1 as xs:string?, $arg2 as xs:string?) as xs:boolean
// fn:starts-with($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:boolean
cFunctionCall.functions["starts-with"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sValue	= oSequence1.toString(),
		sSearch	= oSequence2.toString();

	return new cXPath2Sequence(sValue.indexOf(sSearch) == 0);
};

// fn:ends-with($arg1 as xs:string?, $arg2 as xs:string?) as xs:boolean
// fn:ends-with($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:boolean
cFunctionCall.functions["ends-with"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sValue	= oSequence1.toString(),
		sSearch	= oSequence2.toString();

	return new cXPath2Sequence(sValue.indexOf(sSearch) == sValue.length - sSearch.length);
};

// fn:substring-before($arg1 as xs:string?, $arg2 as xs:string?) as xs:string
// fn:substring-before($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:string
cFunctionCall.functions["substring-before"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sValue	= oSequence1.toString(),
		sSearch	= oSequence2.toString(),
		nPosition;

	return new cXPath2Sequence((nPosition = sValue.indexOf(sSearch)) >= 0 ? sValue.substring(0, nPosition) : '');
};

// fn:substring-after($arg1 as xs:string?, $arg2 as xs:string?) as xs:string
// fn:substring-after($arg1 as xs:string?, $arg2 as xs:string?, $collation as xs:string) as xs:string
cFunctionCall.functions["substring-after"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sValue	= oSequence1.toString(),
		sSearch	= oSequence2.toString(),
		nPosition;

	return new cXPath2Sequence((nPosition = sValue.indexOf(sSearch)) >= 0 ? sValue.substring(nPosition + sSearch.length) : '');
};


// 7.6 String Functions that Use Pattern Matching
function fFunctionCall_string_createRegExp(sValue, sFlags) {
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

	return new cRegExp(sValue, sFlags);
};

// fn:matches($input as xs:string?, $pattern as xs:string) as xs:boolean
// fn:matches($input as xs:string?, $pattern as xs:string, $flags as xs:string) as xs:boolean
cFunctionCall.functions["matches"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sValue	= oSequence1.toString(),
		rRegExp	= fFunctionCall_string_createRegExp(oSequence2.toString(), arguments.length > 2 ? oSequence3.toString() : '');

	return new cXPath2Sequence(rRegExp.test(sValue));
};

// fn:replace($input as xs:string?, $pattern as xs:string, $replacement as xs:string) as xs:string
// fn:replace($input as xs:string?, $pattern as xs:string, $replacement as xs:string, $flags as xs:string) as xs:string
cFunctionCall.functions["replace"]	= function(oSequence1, oSequence2, oSequence3, oSequence4) {
	if (arguments.length < 3)
		throw new cXPath2Error("XPST0017");

	var sValue	= oSequence1.toString(),
		rRegExp	= fFunctionCall_string_createRegExp(oSequence2.toString(), arguments.length > 3 ? oSequence4.toString() : 'g'),
		sReplacement	= oSequence3.toString();

	return new cXPath2Sequence(sValue.replace(rRegExp, sReplacement));
};

// fn:tokenize($input as xs:string?, $pattern as xs:string) as xs:string*
// fn:tokenize($input as xs:string?, $pattern as xs:string, $flags as xs:string) as xs:string*
cFunctionCall.functions["tokenize"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var sValue	= oSequence1.toString(),
		rRegExp	= fFunctionCall_string_createRegExp(oSequence2.toString(), arguments.length > 2 ? oSequence3.toString() : '');

	var oSequence	= new cXPath2Sequence,
		aValue = sValue.split(rRegExp);
	for (var nIndex = 0, nLength = aValue.length; nIndex < nLength; nIndex++)
		oSequence.add(aValue[nIndex]);

	return oSequence;
};
