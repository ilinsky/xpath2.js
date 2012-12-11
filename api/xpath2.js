/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oXPath2	= new cEvaluator;

//
oXPath2.classes	= {};
oXPath2.classes.Exception		= cException;
oXPath2.classes.Expression		= cExpression;
oXPath2.classes.DOMAdapter		= cDOMAdapter;
oXPath2.classes.StaticContext	= cStaticContext;
oXPath2.classes.DynamicContext	= cDynamicContext;
oXPath2.classes.StringCollator	= cStringCollator;