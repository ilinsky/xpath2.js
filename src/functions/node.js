/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../classes/Exception');
var cSequence = require('./../classes/Sequence');
var cStaticContext = require('./../classes/StaticContext');

var cXSAnyAtomicType = require('./../types/schema/simple/XSAnyAtomicType');
var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');
var cXSString = require('./../types/schema/simple/atomic/XSString');
var cXSDouble = require('./../types/schema/simple/atomic/XSDouble');
var cXSAnyURI = require('./../types/schema/simple/atomic/XSAnyURI');
//
var cXTItem = require('./../types/xpath/XTItem');
var cXTNode = require('./../types/xpath/XTNode');

var fStaticContext_defineSystemFunction = require('./../classes/StaticContext').defineSystemFunction;

var nNaN = global.NaN;

/*
	14 Functions and Operators on Nodes
		name
		local-name
		namespace-uri
		number
		lang
		root

*/

// 14 Functions on Nodes
// fn:name() as xs:string
// fn:name($arg as node()?) as xs:string
fStaticContext_defineSystemFunction("name",	[[cXTNode, '?', true]],	function(oNode) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "name() function called when the context item is not a node"
//<-Debug
			);
		oNode	= this.item;
	}
	else
	if (oNode == null)
		return new cXSString('');
	//
	var vValue	= cStaticContext.functions["node-name"].call(this, oNode);
	return new cXSString(vValue == null ? '' : vValue.toString());
});

// fn:local-name() as xs:string
// fn:local-name($arg as node()?) as xs:string
fStaticContext_defineSystemFunction("local-name",	[[cXTNode, '?', true]],	function(oNode) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "local-name() function called when the context item is not a node"
//<-Debug
			);
		oNode	= this.item;
	}
	else
	if (oNode == null)
		return new cXSString('');
	//
	return new cXSString(this.DOMAdapter.getProperty(oNode, "localName") || '');
});

// fn:namespace-uri() as xs:anyURI
// fn:namespace-uri($arg as node()?) as xs:anyURI
fStaticContext_defineSystemFunction("namespace-uri",	[[cXTNode, '?', true]],	function(oNode) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "namespace-uri() function called when the context item is not a node"
//<-Debug
			);
		oNode	= this.item;
	}
	else
	if (oNode == null)
		return cXSAnyURI.cast(new cXSString(''));
	//
	return cXSAnyURI.cast(new cXSString(this.DOMAdapter.getProperty(oNode, "namespaceURI") || ''));
});

// fn:number() as xs:double
// fn:number($arg as xs:anyAtomicType?) as xs:double
fStaticContext_defineSystemFunction("number",	[[cXSAnyAtomicType, '?', true]],	function(/*[*/oItem/*]*/) {
	if (!arguments.length) {
		if (!this.item)
			throw new cException("XPDY0002");
		oItem	= cSequence.atomize([this.item], this)[0];
	}

	// If input item cannot be cast to xs:decimal, a NaN should be returned
	var vValue	= new cXSDouble(nNaN);
	if (oItem != null) {
		try {
			vValue	= cXSDouble.cast(oItem);
		}
		catch (e) {

		}
	}
	return vValue;
});

// fn:lang($testlang as xs:string?) as xs:boolean
// fn:lang($testlang as xs:string?, $node as node()) as xs:boolean
fStaticContext_defineSystemFunction("lang",	[[cXSString, '?'], [cXTNode, '', true]],	function(sLang, oNode) {
	if (arguments.length < 2) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "lang() function called when the context item is not a node"
//<-Debug
			);
		oNode	= this.item;
	}

	var fGetProperty	= this.DOMAdapter.getProperty;
	if (fGetProperty(oNode, "nodeType") == 2)
		oNode	= fGetProperty(oNode, "ownerElement");

	// walk up the tree looking for xml:lang attribute
	for (var aAttributes; oNode; oNode = fGetProperty(oNode, "parentNode"))
		if (aAttributes = fGetProperty(oNode, "attributes"))
			for (var nIndex = 0, nLength = aAttributes.length; nIndex < nLength; nIndex++)
				if (fGetProperty(aAttributes[nIndex], "nodeName") == "xml:lang")
					return new cXSBoolean(fGetProperty(aAttributes[nIndex], "nodeValue").replace(/-.+/, '').toLowerCase() == sLang.valueOf().replace(/-.+/, '').toLowerCase());
	//
	return new cXSBoolean(false);
});

// fn:root() as node()
// fn:root($arg as node()?) as node()?
fStaticContext_defineSystemFunction("root",	[[cXTNode, '?', true]],	function(oNode) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "root() function called when the context item is not a node"
//<-Debug
			);
		oNode	= this.item;
	}
	else
	if (oNode == null)
		return null;

	var fGetProperty	= this.DOMAdapter.getProperty;

	// If context node is Attribute
	if (fGetProperty(oNode, "nodeType") == 2)
		oNode	= fGetProperty(oNode, "ownerElement");

	for (var oParent = oNode; oParent; oParent = fGetProperty(oNode, "parentNode"))
		oNode	= oParent;

	return oNode;
});
