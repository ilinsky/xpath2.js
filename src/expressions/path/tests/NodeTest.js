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
	var oExpr	= cKindTest.parse(oLexer)
					|| cNameTest.parse(oLexer);

	if (oExpr)
		return oExpr;

	throw "NodeTest.parse: Expected NodeTest expression";
};

// Public members
cNodeTest.prototype.test	= function (oNode) {

};