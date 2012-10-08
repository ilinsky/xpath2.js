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

cStringLiteral.parse	= function(oLexer) {
	if (oLexer.peek().match(cStringLiteral.RegExp)) {
		var aValue	= [];
		// Do..while cycle required to account for XPath quote escaping
		do {
			aValue.push(cRegExp.$1 || cRegExp.$2);
			oLexer.next();
		} while (!oLexer.eof()
			&& oLexer.peek().match(cStringLiteral.RegExp)
			&&(oLexer.peek(-1).substr(-1, 1) == oLexer.peek().substr(0, 1)));

		return new cStringLiteral(aValue.join(''));;
	}
	else {
		throw "Not StringLiteral";
	}
};