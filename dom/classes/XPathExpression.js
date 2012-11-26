/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPathExpression(sExpression, oStaticContext) {
	try {
		this.staticContext	= oStaticContext;
		this.expression	= oXPathEvaluator_evaluator.compile(sExpression, oStaticContext);
	}
	catch (e) {
		if (e instanceof oXPath2.classes.Exception)
			throw new cXPathException(cXPathException.INVALID_EXPRESSION_ERR
//->Debug
					, e.message
//<-Debug
			);
		else
			throw e;
	}
};

cXPathExpression.prototype.evaluate	= function(oNode, nType, oResult) {
	// validate API
//	fGuard(arguments, [
//		["context",		cNode],
//		["type",		cNumber,	true,	true],
//		["result",		cObject,	true,	true]
//	]);

	// Invoke implementation
	return fXPathExpression_evaluate(this, oNode, nType, oResult);
};

function fXPathExpression_evaluate(oExpression, oNode, nType, oResult) {
	var oSequence,
		oDOMAdapter	= oXPathEvaluator_DOMAdapter;
	// Determine which DOMAdapter to use based on browser and DOM type
	if (oNode && oNode.nodeType && bOldMS)
		oDOMAdapter	= "selectNodes" in oNode ? oMSXMLDOMAdapter : oMSHTMLDOMAdapter;

	// Evaluate expression
	try {
		oSequence	= oExpression.expression.resolve(new oXPath2.classes.DynamicContext(oExpression.staticContext, typeof oNode == "undefined" ? null : oNode, null, oDOMAdapter));
	}
	catch (e) {
		if (e instanceof oXPath2.classes.Exception)
			throw new cXPathException(cXPathException.TYPE_ERR
//->Debug
					, e.message
//<-Debug
			);
		else
			throw e;
	}
	// Determine type if not specified
	if (!nType) {
		nType	= 4;	// Default: XPathResult.UNORDERED_NODE_ITERATOR_TYPE
		if (oSequence.length) {
			var vItem	= oSequence[0],
				sType	= typeof vItem;
			if (sType == "number")
				nType	= 1;	// XPathResult.NUMBER_TYPE
			else
			if (sType == "string")
				nType	= 2;	// XPathResult.STRING_TYPE
			else
			if (sType == "boolean")
				nType	= 3;	// XPathResult.BOOLEAN_TYPE
		}
	}
	return fXPathResult_init(oResult ? fXPathResult_clear(oResult) : new cXPathResult, nType, oSequence);
};
