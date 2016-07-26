/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNodeTest() {

};

// Static members
function fNodeTest_parse (oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fKindTest_parse(oLexer, oStaticContext)
			|| fNameTest_parse(oLexer, oStaticContext);
};
