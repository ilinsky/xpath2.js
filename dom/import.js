/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oXPath2		= window.XPath2,
	oDocument	= window.document,
	cError		= window.Error,
	cHTMLDocument	= window.HTMLDocument;

var bOldMS	= !!oDocument.namespaces && !oDocument.createElementNS;	// Internet Explorer before 9
