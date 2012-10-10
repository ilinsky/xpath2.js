/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cStringLiteral(sValue) {
	this.value	= sValue;
};

cStringLiteral.RegExp	= /^'([^']*(?:''[^']*)*)'|"([^"]*(?:""[^"]*)*)"$/;

cStringLiteral.prototype	= new cLiteral;

cStringLiteral.parse	= function(oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cStringLiteral.RegExp);
	if (aMatch) {
		oLexer.next();
		return new cStringLiteral(aMatch[1] ? aMatch[1].replace("''", "'") : aMatch[2].replace('""', '"'));
	}
};