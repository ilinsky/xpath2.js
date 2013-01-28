/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oXPathEvaluator	= new cEvaluator,
	oXPathClasses	= oXPathEvaluator.classes = {};

//
oXPathClasses.Exception		= cException;
oXPathClasses.Expression	= cExpression;
oXPathClasses.DOMAdapter	= cDOMAdapter;
oXPathClasses.StaticContext	= cStaticContext;
oXPathClasses.DynamicContext= cDynamicContext;
oXPathClasses.StringCollator= cStringCollator;

// Publish object
window.xpath	= oXPathEvaluator;