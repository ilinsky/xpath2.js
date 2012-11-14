/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXPath2		= window.XPath2,
	oDocument	= window.document;

var bOldMS	= !!oDocument.namespaces && !oDocument.createElementNS,	// Internet Explorer before 9
	bOldW3	= !oDocument.documentElement.namespaceURI;	// other pre-HTML5 browsers