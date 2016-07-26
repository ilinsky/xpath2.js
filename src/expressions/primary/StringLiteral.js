/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cStringLiteral(oValue) {
	this.value	= oValue;
};

cStringLiteral.prototype	= new cLiteral;

var rStringLiteral	= /^'([^']*(?:''[^']*)*)'|"([^"]*(?:""[^"]*)*)"$/;
function fStringLiteral_parse (oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rStringLiteral);
	if (aMatch) {
		oLexer.next();
		return new cStringLiteral(new cXSString(aMatch[1] ? aMatch[1].replace("''", "'") : aMatch[2] ? aMatch[2].replace('""', '"') : ''));
	}
};
