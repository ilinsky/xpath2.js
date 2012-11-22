/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cLiteral() {

};

// Static members
function fLiteral_parse (oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fNumericLiteral_parse(oLexer, oStaticContext)
			|| fStringLiteral_parse(oLexer, oStaticContext);
};

// Public members
cLiteral.prototype.evaluate	= function (oContext) {
	return new cSequence(this.value);
};