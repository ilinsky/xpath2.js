/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNodeTest() {

};

// Static members
cNodeTest.parse	= function (oLexer) {
	// Try as KindTest
	var oExpr	= cKindTest.parse(oLexer);
	if (oExpr)
		return oExpr;

	// Try as NameTest
	oExpr	= cNameTest.parse(oLexer);
	if (oExpr)
		return oExpr;

	throw "Not a NodeTest";
};

// Public members
cNodeTest.prototype.test	= function (oNode) {

};