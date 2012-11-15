/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSAnyURI(sScheme, sAuthority, sPath, sQuery, sFragment) {
	this.scheme		= sScheme;
	this.authority	= sAuthority;
	this.path		= sPath;
	this.query		= sQuery;
	this.fragment	= sFragment;
};

cXSAnyURI.RegExp	= /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;	// http://tools.ietf.org/html/rfc3986

cXSAnyURI.prototype	= new cXSAnyAtomicType;

cXSAnyURI.prototype.scheme		= null;
cXSAnyURI.prototype.authority	= null;
cXSAnyURI.prototype.path		= null;
cXSAnyURI.prototype.query		= null;
cXSAnyURI.prototype.fragment	= null;

cXSAnyURI.prototype.toString	= function() {
	return (this.scheme ? this.scheme + ':' : '')
			+ (this.authority ? '/' + '/' + this.authority : '')
			+ (this.path ? this.path : '')
			+ (this.query ? '?' + this.query : '')
			+ (this.fragment ? '#' + this.fragment : '');
};

cXSAnyURI.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSAnyURI:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch;
			if (aMatch = fString_trim.call(vValue).match(cXSAnyURI.RegExp))
				return new cXSAnyURI(aMatch[2], aMatch[4], aMatch[5], aMatch[7], aMatch[9]);
			throw new cXPath2Error("FORG0001");
	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:anyURI can never succeed"
//<-Debug
	);
};

//
fXPath2StaticContext_defineSystemDataType("anyURI",	cXSAnyURI);
