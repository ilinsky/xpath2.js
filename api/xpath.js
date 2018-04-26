/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../src/classes/Exception');
var cExpression = require('./../src/classes/Expression');
var cDOMAdapter = require('./../src/classes/DOMAdapter');
var cStaticContext = require('./../src/classes/StaticContext');
var cDynamicContext = require('./../src/classes/DynamicContext');
var cStringCollator = require('./../src/classes/StringCollator');

var cEvaluator = require('./classes/Evaluator');

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
module.exports = oXPathEvaluator;
