/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cVarRef(sUri) {
	this.uri	= sUri;
};

cVarRef.RegExp	= /^\$(?:(?![0-9-])([\w-]+)\:)?(?![0-9-])([\w-]+)$/;

cVarRef.prototype.uri	= null;

// Static members
cVarRef.parse	= function (oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cVarRef.RegExp);
	if (aMatch) {
		var oVarRef	= new cVarRef((aMatch[1] ? oResolver(aMatch[1]) + '#' : '') + aMatch[2]);
		oLexer.next();
		return oVarRef;
	}
};

// Public members
cVarRef.prototype.evaluate	= function (oContext) {
	if (oContext.scope.hasOwnProperty(this.uri))
		return new cXPathSequence(oContext.scope[this.uri]);
	else
		return new cXPathSequence;
};