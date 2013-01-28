/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cKindTest(sName) {
	this.name	= sName;
	this.args	= [];
};

cKindTest.prototype	= new cNodeTest;

cKindTest.prototype.name	= null;
cKindTest.prototype.args	= null;

var hKindTest_names	= {};
//
hKindTest_names["document-node"]	= {};
hKindTest_names["element"]			= {};
hKindTest_names["attribute"]		= {};
hKindTest_names["processing-instruction"]	= {};
hKindTest_names["comment"]			= {};
hKindTest_names["text"]				= {};
hKindTest_names["node"]				= {};
//
hKindTest_names["schema-element"]	= {};
hKindTest_names["schema-attribute"]	= {};

// Static members
function fKindTest_parse (oLexer, oStaticContext) {
	var sName	= oLexer.peek();
	if (oLexer.peek(1) == '(') {
		//
		if (!(sName in hKindTest_names))
			throw new cException("XPST0003"
//->Debug
					, "Unknown '" + sName + "' kind test"
//<-Debug
			);

		//
		oLexer.next(2);
		//
		var oTest	= new cKindTest(sName);
		if (oLexer.peek() != ')') {
			if (sName == "document-node") {
				// TODO: parse test further
			}
			else
			if (sName == "element") {
				// TODO: parse test further
			}
			else
			if (sName == "attribute") {
				// TODO: parse test further
			}
			else
			if (sName == "processing-instruction") {
				// TODO: parse test further
			}
			else
			if (sName == "schema-attribute") {
				// TODO: parse test further
			}
			else
			if (sName == "schema-element") {
				// TODO: parse test further
			}
		}
		else {
			if (sName == "schema-attribute")
				throw new cException("XPST0003"
//->Debug
						, "Expected attribute declaration in 'schema-attribute' kind test"
//<-Debug
				);
			else
			if (sName == "schema-element")
				throw new cException("XPST0003"
//->Debug
						, "Expected element declaration in 'schema-element' kind test"
//<-Debug
				);
		}

		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in kind test"
//<-Debug
			);
		oLexer.next();

		return oTest;
	}
};

// Public members
cKindTest.prototype.test	= function (oNode, oContext) {
	var fGetProperty	= oContext.DOMAdapter.getProperty,
		nType	= oContext.DOMAdapter.isNode(oNode) ? fGetProperty(oNode, "nodeType") : 0;
	switch (this.name) {
		// Node type test
		case "node":			return !!nType;
		case "attribute":				if (nType != 2)	return false;	break;
		case "document-node":	return nType == 9;
		case "element":			return nType == 1;
		case "processing-instruction":	if (nType != 7)	return false;	break;
		case "comment":			return nType == 8;
		case "text":			return nType == 3 || nType == 4;

		// Schema tests
		case "schema-attribute":
			throw "KindTest '" + "schema-attribute" + "' not implemented";

		case "schema-element":
			throw "KindTest '" + "schema-element" + "' not implemented";
	}

	// Additional tests
	if (nType == 2)
		return fGetProperty(oNode, "prefix") != "xmlns" && fGetProperty(oNode, "localName") != "xmlns";
	if (nType == 7)
		return fGetProperty(oNode, "target") != "xml";

	return true;
};