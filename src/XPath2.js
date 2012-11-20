/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXPath2	= new cXPath2Evaluator;

//
cXPath2.classes	= {};
cXPath2.classes.Error			= cXPath2Error;
cXPath2.classes.Evaluator		= cXPath2Evaluator;
cXPath2.classes.DOMAdapter		= cXPath2DOMAdapter;
cXPath2.classes.StaticContext	= cXPath2StaticContext;
cXPath2.classes.DynamicContext	= cXPath2DynamicContext;
cXPath2.classes.StringCollator	= cXPath2StringCollator;