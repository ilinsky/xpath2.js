/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cVarRef(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
};

cVarRef.prototype.prefix		= null;
cVarRef.prototype.localName		= null;
cVarRef.prototype.namespaceURI	= null;

// Static members
function fVarRef_parse (oLexer, oStaticContext) {
	if (oLexer.peek().substr(0, 1) == '$') {
		var aMatch	= oLexer.peek().substr(1).match(rNameTest);
		if (aMatch) {
			if (aMatch[1] == '*' || aMatch[2] == '*')
				throw new cException("XPST0003"
	//->Debug
						, "Illegal use of wildcard in var expression variable name"
	//<-Debug
				);

			var oVarRef	= new cVarRef(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null);
			oLexer.next();
			return oVarRef;
		}
	}
};

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
