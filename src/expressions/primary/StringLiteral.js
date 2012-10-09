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

cStringLiteral.RegExp	= /^'([^']+)'|"([^"]+)"$/;

cStringLiteral.prototype	= new cLiteral;

cStringLiteral.parse	= function(oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cStringLiteral.RegExp);
	if (aMatch) {
		var aValue	= [],
			sValue;
		// Do..while cycle required to account for XPath quote escaping
		do {
			aValue.push(aMatch[1] || aMatch[2]);
			sValue	= oLexer.peek().substr(-1, 1);
			oLexer.next();
		} while (!oLexer.eof()
			&&(aMatch = oLexer.peek().match(cStringLiteral.RegExp))
			&&(sValue == oLexer.peek().substr(0, 1)));

		return new cStringLiteral(aValue.join(sValue));
	}
};