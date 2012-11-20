/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXPath2	= new cEvaluator;

//
cXPath2.classes	= {};
cXPath2.classes.Exception		= cException;
cXPath2.classes.Evaluator		= cEvaluator;
cXPath2.classes.Expression		= cExpression;
cXPath2.classes.DOMAdapter		= cDOMAdapter;
cXPath2.classes.StaticContext	= cStaticContext;
cXPath2.classes.DynamicContext	= cDynamicContext;
cXPath2.classes.StringCollator	= cStringCollator;