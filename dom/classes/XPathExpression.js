/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPathExpression(sExpression, oResolver) {
	cXPathEvaluator.staticContext.namespaceResolver	= oResolver;
	this.expression	= cXPathEvaluator.evaluator.compile(sExpression, cXPathEvaluator.staticContext);
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
		oDOMAdapter	= null;
	// Determine which DOMAdapter to use based on browser and DOM type
	if (oNode && oNode.ownerDocument) {
		if (bOldMS)
			oDOMAdapter	= oNode.selectSingleNode ? oMSXMLDOMAdapter : oMSHTMLDOMAdapter;
		else
		if (bOldW3)
			oDOMAdapter	= oW3HTMLDOMAdapter;
	}
	//
	try {
		oSequence	= oExpression.expression.resolve(oNode, null, oDOMAdapter);
	}
	catch (e) {
		throw new cXPathException(cXPathException.TYPE_ERR);
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
			if (sType == "boolean")
				nType	= 3;	// XPathResult.BOOLEAN_TYPE
			else
			if (sType == "string" || !vItem.nodeType)
				nType	= 2;	// XPathResult.STRING_TYPE

		}
	}
	return fXPathResult_init(oResult ? fXPathResult_clear(oResult) : new cXPathResult, nType, oSequence);
};
