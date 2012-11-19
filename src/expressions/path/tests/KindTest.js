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
				if (sName == "schema-attribute")
					throw new cXPath2Error("XPST0003"
//->Debug
							, "Expected attribute declaration in 'schema-attribute' kind test"
//<-Debug
					);
				else
				if (sName == "schema-element")
					throw new cXPath2Error("XPST0003"
//->Debug
							, "Expected element declaration in 'schema-element' kind test"
//<-Debug
					);
			}

			if (oLexer.peek() != ')')
				throw new cXPath2Error("XPST0003"
//->Debug
						, "Expected ')' token in kind test"
//<-Debug
				);

			oLexer.next();

			return oTest;
		}
		else
			throw new cXPath2Error("XPST0003"
//->Debug
					, "Unknown '" + sName + "' kind test"
//<-Debug
			);
	}
};

// Public members
cKindTest.prototype.test	= function (oNode, oContext) {
	var nType	= oContext.DOMAdapter.isNode(oNode) ? oContext.DOMAdapter.getProperty(oNode, "nodeType") : 0;
	switch (this.name) {
		// Node type test
		case "node":					if (!nType)		return false;	break;
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
		return oContext.DOMAdapter.getProperty(oNode, "prefix") != "xmlns" && oContext.DOMAdapter.getProperty(oNode, "localName") != "xmlns";
	if (nType == 7)
		return oContext.DOMAdapter.getProperty(oNode, "target") != "xml";

	return true;
};