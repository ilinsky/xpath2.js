/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNumericLiteral(oValue) {
	this.value	= oValue;
};

cNumericLiteral.prototype	= new cLiteral;

cNumericLiteral.RegExp	= /^[+\-]?(?:(?:(\d+)(?:\.(\d*))?)|(?:\.(\d+)))(?:[eE]([+-])?(\d+))?$/;

// Integer | Decimal | Double
function fNumericLiteral_parse (oLexer, oStaticContext) {
	var sValue	= oLexer.peek(),
		vValue	= fNumericLiteral_parseValue(sValue);
	if (vValue) {
		oLexer.next();
		return new cNumericLiteral(vValue);
	}
};

function fNumericLiteral_parseValue(sValue) {
	var aMatch	= sValue.match(cNumericLiteral.RegExp);
	if (aMatch) {
		var cType	= cXSInteger;
		if (typeof aMatch[5] != "undefined")
			cType	= cXSDouble;
		else
		if (typeof aMatch[2] != "undefined" || typeof aMatch[3] != "undefined")
			cType	= cXSDecimal;
		return new cType(+sValue);
	}
};