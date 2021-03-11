/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../../classes/Exception');

function cVarRef(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
};

cVarRef.prototype.prefix		= null;
cVarRef.prototype.localName		= null;
cVarRef.prototype.namespaceURI	= null;

// Public members
cVarRef.prototype.evaluate	= function (oContext) {
	var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName;
	if (oContext.scope.hasOwnProperty(sUri))
		return [oContext.scope[sUri]];
	//
	throw new cException("XPST0008"
//->Debug
			, "Variable $" + (this.prefix ? this.prefix + ':' : '') + this.localName + " has not been declared"
//<-Debug
	);
};

//
module.exports = cVarRef;
