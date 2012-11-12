/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNumericLiteral(nValue) {
	this.value	= nValue;
};

cNumericLiteral.prototype	= new cLiteral;

// Integer | Decimal | Double
cNumericLiteral.parse	= function(oLexer, oStaticContext) {
	var nValue	= +oLexer.peek();
	if (!fIsNaN(nValue)) {
		oLexer.next();
		return new cNumericLiteral(nValue);
	}
};