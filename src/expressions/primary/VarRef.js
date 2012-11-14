/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cVarRef(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
};

cVarRef.RegExp	= /^\$(?:(?![0-9-])([\w-]+)\:)?(?![0-9-])([\w-]+)$/;

cVarRef.prototype.prefix		= null;
cVarRef.prototype.localName		= null;
cVarRef.prototype.namespaceURI	= null;

// Static members
cVarRef.parse	= function (oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(cVarRef.RegExp);
	if (aMatch) {
		var oVarRef	= new cVarRef(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null);
		oLexer.next();
		return oVarRef;
	}
};

// Public members
cVarRef.prototype.evaluate	= function (oContext) {
	var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName;
	if (oContext.scope.hasOwnProperty(sUri))
		return new cXPath2Sequence(oContext.scope[sUri]);
	//
	throw new cXPath2Error("XPST0008"
//->Debug
			, "Variable $" + (this.prefix ? this.prefix + ':' : '') + this.localName + " has not been declared"
//<-Debug
	);
};