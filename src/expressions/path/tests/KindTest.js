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
};

cKindTest.prototype	= new cNodeTest;

cKindTest.names	= {};
cKindTest.names["document-node"]	= [];
cKindTest.names["element"]			= [];
cKindTest.names["attribute"]		= [];
cKindTest.names["processing-instruction"]	= [];
cKindTest.names["comment"]			= [];
cKindTest.names["text"]				= [];
cKindTest.names["node"]				= [];
//
cKindTest.names["schema-element"]	= [];
cKindTest.names["schema-attribute"]	= [];

// Static members
cKindTest.parse	= function (oLexer, oResolver) {
	var sName	= oLexer.peek();
	if (oLexer.peek(1) == '(') {
		//
		if (sName in cKindTest.names) {
			//
			oLexer.next();
			oLexer.next();
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
cKindTest.prototype.test	= function (oNode) {
	if (this.name == "node")
		return !!oNode.nodeType;
	else
	if (this.name == "document-node")
		return oNode.nodeType == 9;
	else
	if (this.name == "element")
		return oNode.nodeType == 1;
	else
	if (this.name == "attribute")
		return oNode.nodeType == 2;
	else
	if (this.name == "processing-instruction")
		return oNode.nodeType == 7;
	else
	if (this.name == "comment")
		return oNode.nodeType == 8;
	else
	if (this.name == "text")
		return oNode.nodeType == 3;
	else
	if (this.name == "schema-attribute")
		throw "KindTest 'schema-attribute' not implemented";
	else
	if (this.name == "schema-element")
		throw "KindTest 'schema-element' not implemented";
	else
		throw "KindTest internal error: this.name is unknown";
};