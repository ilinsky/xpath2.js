/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPathEvaluator() {

};

// Create new XPath2 evaluator
cXPathEvaluator.evaluator	= new cXPath2.classes.Evaluator;
cXPathEvaluator.staticContext	= new cXPath2.classes.StaticContext;
cXPathEvaluator.staticContext.defaultElementNamespace	= "http://www.w3.org/1999/xhtml";
cXPathEvaluator.staticContext.defaultFunctionNamespace	= "http://www.w3.org/2005/xpath-functions";
cXPathEvaluator.staticContext.baseURI	= oDocument.location.href;

cXPathEvaluator.prototype.createExpression	= function(sExpression, oResolver) {
	// validate API
//	fGuard(arguments, [
//		["expression",	cString],
//		["resolver",	cObject,	true,	true]
//	]);

	// Invoke implementation
	return new cXPathExpression(sExpression, oResolver);
};

cXPathEvaluator.prototype.createNSResolver	= function(oNode) {
	// validate API
//	fGuard(arguments, [
//		["node",	cNode]
//	]);

	// Invoke implementation
	return new cXPathNSResolver(oNode);
};

cXPathEvaluator.prototype.evaluate	= function(sExpression, oNode, oResolver, nType, oResult) {
	// validate API
//	fGuard(arguments, [
//		["expression",	cString],
//		["context",		cNode],
//		["resolver",	cObject,		true,	true],
//		["type",		cNumber,		true,	true],
//		["result",		cXPathResult,	true,	true]
//	]);

	// Invoke implementation
	return fXPathExpression_evaluate(new cXPathExpression(sExpression, oResolver), oNode, nType, oResult);
};
