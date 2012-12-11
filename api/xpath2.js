/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oXPath2Evaluator	= new cEvaluator,
	oXPath2Classes		= oXPath2Evaluator.classes = {};

//
oXPath2Classes.Exception		= cException;
oXPath2Classes.Expression		= cExpression;
oXPath2Classes.DOMAdapter		= cDOMAdapter;
oXPath2Classes.StaticContext	= cStaticContext;
oXPath2Classes.DynamicContext	= cDynamicContext;
oXPath2Classes.StringCollator	= cStringCollator;

// Publish object
window.xpath2	= oXPath2Evaluator;