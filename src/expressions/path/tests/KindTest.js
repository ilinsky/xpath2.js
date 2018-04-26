/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStringLiteral = require('./../../primary/StringLiteral');

function cKindTest(sName) {
	this.name	= sName;
	this.args	= [];
};

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

// Public members
cKindTest.prototype.test	= function (oNode, oContext) {
	var fGetProperty	= oContext.DOMAdapter.getProperty,
		nType	= oContext.DOMAdapter.isNode(oNode) ? fGetProperty(oNode, "nodeType") : 0,
		sTarget;
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
	if (nType == 7) {
		sTarget = fGetProperty(oNode, "target");
		return this.args.length ? sTarget == this.args[0].value : sTarget != "xml";
	}

	return true;
};

//
module.exports = cKindTest;
