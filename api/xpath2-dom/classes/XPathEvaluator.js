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
var oXPathEvaluator_DOMAdapter	= new cLXDOMAdapter,
	oXPathEvaluator_HTMLContext	= new oXPath2.classes.StaticContext,
	oXPathEvaluator_XMLContext	= new oXPath2.classes.StaticContext;

// Initialize HTML context (this has default xhtml namespace)
oXPathEvaluator_HTMLContext.baseURI	= oDocument.location.href;
oXPathEvaluator_HTMLContext.defaultFunctionNamespace	= "http://www.w3.org/2005/xpath-functions";
oXPathEvaluator_HTMLContext.defaultElementNamespace		= "http://www.w3.org/1999/xhtml";
// Initialize XML context (this has default element null namespace)
oXPathEvaluator_XMLContext.baseURI	= oXPathEvaluator_HTMLContext.baseURI;
oXPathEvaluator_XMLContext.defaultFunctionNamespace		= oXPathEvaluator_HTMLContext.defaultFunctionNamespace;

//
cXPathEvaluator.prototype.createExpression	= function(sExpression, oResolver) {
	// validate API
//	fGuard(arguments, [
//		["expression",	cString],
//		["resolver",	cObject,	true,	true]
//	]);

	var oStaticContext	= this == oDocument ? oXPathEvaluator_HTMLContext : oXPathEvaluator_XMLContext;
	oStaticContext.namespaceResolver	= oResolver;

	// Invoke implementation
	return new cXPathExpression(sExpression, oStaticContext);
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
	return fXPathExpression_evaluate(cXPathEvaluator.prototype.createExpression.call(this, sExpression, oResolver), oNode, nType, oResult);
};
