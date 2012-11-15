/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
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

cKindTest.names	= {};
cKindTest.names["document-node"]	= {};
cKindTest.names["element"]			= {};
cKindTest.names["attribute"]		= {};
cKindTest.names["processing-instruction"]	= {};
cKindTest.names["comment"]			= {};
cKindTest.names["text"]				= {};
cKindTest.names["node"]				= {};
//
cKindTest.names["schema-element"]	= {};
cKindTest.names["schema-attribute"]	= {};

// Static members
cKindTest.parse	= function (oLexer, oStaticContext) {
	var sName	= oLexer.peek();
	if (oLexer.peek(1) == '(') {
		//
		if (sName in cKindTest.names) {
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
				if (sName == "schema-attribute") {
					throw "KindTest.parse: Expected AttributeDeclaration expression";
				}
				else
				if (sName == "schema-element") {
					throw "KindTest.parse: Expected ElementDeclaration expression";
				}
			}

			if (oLexer.peek() != ')')
				throw "KindTest.parse: Expected ')' token";

			oLexer.next();

			return oTest;
		}
		else
			throw "KindTest.parse: Unknown kind test";
	}
};

// Public members
cKindTest.prototype.test	= function (oNode, oContext) {
	var nType	= oContext.DOMAdapter.isNode(oNode) ? oContext.DOMAdapter.getProperty(oNode, "nodeType") : 0;
	switch (this.name) {
		// Node type test
		case "node":			return !!nType && (nType != 2 || (oContext.DOMAdapter.getProperty(oNode, "prefix") != "xmlns" && oContext.DOMAdapter.getProperty(oNode, "localName") != "xmlns"));
		case "document-node":	return nType == 9;
		case "element":			return nType == 1;
		case "attribute":		return nType == 2 && (oContext.DOMAdapter.getProperty(oNode, "prefix") != "xmlns" && oContext.DOMAdapter.getProperty(oNode, "localName") != "xmlns");
		case "processing-instruction":	return nType == 7;
		case "comment":			return nType == 8;
		case "text":			return nType == 3 || nType == 4;

		// Schema tests
		case "schema-attribute":
			throw "KindTest 'schema-attribute' not implemented";

		case "schema-element":
			throw "KindTest 'schema-element' not implemented";
	}

	throw "InternalError: KindTest.prototype.test called for inappropriate name";
};