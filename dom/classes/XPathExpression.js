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
	if (typeof oNode == "undefined")
		oNode	= null;

	var aSequence,
		oSequence	= [],
		oAdapter	= oXPathEvaluator_DOMAdapter;

	// Determine which DOMAdapter to use based on browser and DOM type
	if (oNode && oNode.nodeType && bOldMS)
		oAdapter	= "selectNodes" in oNode ? oMSXMLDOMAdapter : oMSHTMLDOMAdapter;

	// Evaluate expression
	try {
		aSequence	= oExpression.expression.evaluate(new oXPath2.classes.DynamicContext(oExpression.staticContext, oNode, null, oAdapter));
		for (var nIndex = 0, nLength = aSequence.length, oItem; nIndex < nLength; nIndex++)
			oSequence[oSequence.length]	= oAdapter.isNode(oItem = aSequence[nIndex]) ? oItem : oXPath2.classes.Evaluator.xsd2js(oItem);
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
			var sType	= typeof oSequence[0];
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
