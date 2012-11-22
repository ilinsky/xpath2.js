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

cNumericLiteral.RegExp	= /^-?(\d+)?(?:\.(\d*))?(?:[eE]([+-])?(\d+))?$/;

// Integer | Decimal | Double
function fNumericLiteral_parse (oLexer, oStaticContext) {
	var cType	= cXSInteger,
		sValue	= oLexer.peek(),
		aMatch	= sValue.match(cNumericLiteral.RegExp);
	if (aMatch) {
		oLexer.next();
		if (typeof aMatch[4] != "undefined")
			cType	= cXSDouble;
		else
		if (typeof aMatch[2] != "undefined")
			cType	= cXSDecimal;
		return new cNumericLiteral(new cType(+sValue));
	}
};