/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

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
fXPath2StaticContext_defineSystemFunction("name",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "name() function called when the context item is not a node"
//<-Debug
			);
		oSequence1	= new cXPath2Sequence(this.item);
	}
	else
	if (oSequence1.isEmpty())
		return new cXSString('');
	//
	var vValue	= hXPath2StaticContext_functions["node-name"].call(this, oSequence1);
	return new cXSString(vValue === null ? '' : vValue.toString());
});

// fn:local-name() as xs:string
// fn:local-name($arg as node()?) as xs:string
fXPath2StaticContext_defineSystemFunction("local-name",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "local-name() function called when the context item is not a node"
//<-Debug
			);
		oSequence1	= new cXPath2Sequence(this.item);
	}
	else
	if (oSequence1.isEmpty())
		return new cXSString('');
	//
	return new cXSString(this.DOMAdapter.getProperty(oSequence1.items[0], "localName") || '');
});

// fn:namespace-uri() as xs:anyURI
// fn:namespace-uri($arg as node()?) as xs:anyURI
fXPath2StaticContext_defineSystemFunction("namespace-uri",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "namespace-uri() function called when the context item is not a node"
//<-Debug
			);
		oSequence1	= new cXPath2Sequence(this.item);
	}
	else
	if (oSequence1.isEmpty())
		return cXSAnyURI.cast(new cXSString(''));
	//
	return cXSAnyURI.cast(new cXSString(this.DOMAdapter.getProperty(oSequence1.items[0], "namespaceURI") || ''));
});

// fn:number() as xs:double
// fn:number($arg as xs:anyAtomicType?) as xs:double
fXPath2StaticContext_defineSystemFunction("number",	[[cXSAnyAtomicType, '?', true]],	function(/*[*/oSequence1/*]*/) {
	if (!arguments.length)
		oSequence1	= new cXPath2Sequence(cXPath2Sequence.atomizeItem(this.item, this));

	// If input item cannot be cast to xs:decimal, a NaN should be returned
	var vValue	= new cXSDouble(nNaN);
	if (!oSequence1.isEmpty()) {
		try {
			vValue	= cXSDouble.cast(oSequence1.items[0]);
		}
		catch (e) {

		}
	}
	return vValue;
});

// fn:lang($testlang as xs:string?) as xs:boolean
// fn:lang($testlang as xs:string?, $node as node()) as xs:boolean
fXPath2StaticContext_defineSystemFunction("lang",	[[cXSString, '?'], [cXTNode, '', true]],	function(oSequence1, oSequence2) {
	if (arguments.length < 2) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "lang() function called when the context item is not a node"
//<-Debug
			);
		oSequence2	= new cXPath2Sequence(this.item);
	}

	var oNode = oSequence2.items[0];
	if (this.DOMAdapter.getProperty(oNode, "nodeType") == 2)
		oNode	= this.DOMAdapter.getProperty(oNode, "ownerElement");

	// walk up the tree looking for xml:lang attribute
	for (var aAttributes; oNode; oNode = this.DOMAdapter.getProperty(oNode, "parentNode"))
		if (aAttributes = this.DOMAdapter.getProperty(oNode, "attributes"))
			for (var nIndex = 0, nLength = aAttributes.length; nIndex < nLength; nIndex++)
				if (this.DOMAdapter.getProperty(aAttributes[nIndex], "nodeName") == "xml:lang")
					return new cXSBoolean(this.DOMAdapter.getProperty(aAttributes[nIndex], "value").replace(/-.+/, '').toLowerCase() == oSequence1.items[0].value.replace(/-.+/, '').toLowerCase());
	//
	return new cXSBoolean(false);
});

// fn:root() as node()
// fn:root($arg as node()?) as node()?
fXPath2StaticContext_defineSystemFunction("root",	[[cXTNode, '?', true]],	function(oSequence1) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "root() function called when the context item is not a node"
//<-Debug
			);
		oSequence1	= new cXPath2Sequence(this.item);
	}
	else
	if (oSequence1.isEmpty())
		return null;

	var oParent	= oSequence1.items[0];

	// If context node is Attribute
	if (this.DOMAdapter.getProperty(oParent, "nodeType") == 2)
		oParent	= this.DOMAdapter.getProperty(oParent, "ownerElement");

	for (var oNode = oParent; oNode; oNode = this.DOMAdapter.getProperty(oParent, "parentNode"))
		oParent	= oNode;

	return oParent;
});
