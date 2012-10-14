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
cNodeTest.parse	= function (oLexer, oResolver) {
	return cKindTest.parse(oLexer, oResolver)
			|| cNameTest.parse(oLexer, oResolver);
};