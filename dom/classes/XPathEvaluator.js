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

cXPathEvaluator.prototype.createExpression	= function(sExpression, oResolver) {
	// validate API
//	ample.guard(arguments, [
//		["expression",	cString],
//		["resolver",	cObject,	true,	true]
//	]);

	// Invoke implementation
	return new cXPathExpression(sExpression, oResolver);
};

cXPathEvaluator.prototype.createNSResolver	= function(oNode) {
	// validate API
//	ample.guard(arguments, [
//		["node",	cNode]
//	]);

	// Invoke implementation
	return new cXPathNSResolver(oNode);
};

cXPathEvaluator.prototype.evaluate	= function(sExpression, oNode, oResolver, nType, oResult) {
	// validate API
//	ample.guard(arguments, [
//		["expression",	cString],
//		["context",		cNode],
//		["resolver",	cObject,		true,	true],
//		["type",		cNumber,		true,	true],
//		["result",		cXPathResult,	true,	true]
//	]);

	// Invoke implementation
	return fXPathExpression_evaluate(new cXPathExpression(sExpression, oResolver), oNode, nType, oResult);
};
