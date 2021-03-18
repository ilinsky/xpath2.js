var cException = require('./../classes/Exception');

//
var cXSString = require('./../types/schema/simple/atomic/XSString');
var cXSQName = require('./../types/schema/simple/atomic/XSQName');
var cXSAnyURI = require('./../types/schema/simple/atomic/XSAnyURI');
var cXSNCName = require('./../types/schema/simple/atomic/string/XSNCName');

var rXSQName	= /^(?:(?![0-9-])(\w[\w.-]*):)?(?![0-9-])(\w[\w.-]*)$/;

/*
	11.1 Additional Constructor Functions for QNames
		resolve-QName
		QName

	11.2 Functions and Operators Related to QNames
		prefix-from-QName
		local-name-from-QName
		namespace-uri-from-QName
		namespace-uri-for-prefix
		in-scope-prefixes
*/

var exports = {};

// 11.1 Additional Constructor Functions for QNames
// fn:resolve-QName($qname as xs:string?, $element as element()) as xs:QName?
exports.resolveQName = function(oQName, oElement) {
	if (oQName == null)
		return null;

	var sQName	= oQName.valueOf(),
		aMatch	= sQName.match(rXSQName);
	if (!aMatch)
		throw new cException("FOCA0002"
//->Debug
				, "Invalid QName '" + sQName + "'"
//<-Debug
		);

	var sPrefix	= aMatch[1] || null,
		sLocalName	= aMatch[2],
		sNameSpaceURI = this.DOMAdapter.lookupNamespaceURI(oElement, sPrefix);
	//
	if (sPrefix != null &&!sNameSpaceURI)
		throw new cException("FONS0004"
//->Debug
				, "Namespace prefix '" + sPrefix + "' has not been declared"
//<-Debug
		);

	return new cXSQName(sPrefix, sLocalName, sNameSpaceURI || null);
};

// fn:QName($paramURI as xs:string?, $paramQName as xs:string) as xs:QName
exports.QName = function(oUri, oQName) {
	var sQName	= oQName.valueOf(),
		aMatch	= sQName.match(rXSQName);

	if (!aMatch)
		throw new cException("FOCA0002"
//->Debug
				, "Invalid QName '" + sQName + "'"
//<-Debug
		);

	return new cXSQName(aMatch[1] || null, aMatch[2] || null, oUri == null ? '' : oUri.valueOf());
};

// 11.2 Functions Related to QNames
exports.prefixFromQName = function(oQName) {
	if (oQName != null) {
		if (oQName.prefix)
			return new cXSNCName(oQName.prefix);
	}
	//
	return null;
};

// fn:local-name-from-QName($arg as xs:QName?) as xs:NCName?
exports.localNameFromQName = function(oQName) {
	if (oQName == null)
		return null;

	return new cXSNCName(oQName.localName);
};

// fn:namespace-uri-from-QName($arg as xs:QName?) as xs:anyURI?
exports.namespaceUriFromQName = function(oQName) {
	if (oQName == null)
		return null;

	return cXSAnyURI.cast(new cXSString(oQName.namespaceURI || ''));
};

// fn:namespace-uri-for-prefix($prefix as xs:string?, $element as element()) as xs:anyURI?
exports.namespaceUriForPrefix = function(oPrefix, oElement) {
	var sPrefix	= oPrefix == null ? '' : oPrefix.valueOf(),
		sNameSpaceURI	= this.DOMAdapter.lookupNamespaceURI(oElement, sPrefix || null);

	return sNameSpaceURI == null ? null : cXSAnyURI.cast(new cXSString(sNameSpaceURI));
};

// fn:in-scope-prefixes($element as element()) as xs:string*
exports.inScopePrefixes = function(oElement) {
	throw "Function '" + "in-scope-prefixes" + "' not implemented";
};

module.exports = exports;