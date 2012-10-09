/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cVarRef(sPrefix, sLocalName) {
	this.prefix	= sPrefix;
	this.localName	= sLocalName;
};

cVarRef.QNAME	= /^\$(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;

cVarRef.prototype.prefix	= null;
cVarRef.prototype.localName	= null;

// Static members
cVarRef.parse	= function (oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cVarRef.QNAME);
	if (aMatch) {
		var oVarRef	= new cVarRef(aMatch[1] || null, aMatch[2]);
		oLexer.next();
		return oVarRef;
	}
};

// Public members
cVarRef.prototype.evaluate	= function (oContext) {
	if (oContext.scope.hasOwnProperty(this.localName))
		return new cXPathSequence(oContext.scope[this.localName]);
	else
		return new cXPathSequence;
};