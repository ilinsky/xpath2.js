/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../../../classes/Exception');

var fParseKindTest = require('./../../path/tests/ParseKindTest');
var fParseAtomicType = require('./../../type/types/ParseAtomicType');

function cItemType(oTest) {
	this.test	= oTest;
};

cItemType.prototype.test	= null;

cItemType.parse = function(oLexer, oStaticContext) {
	if (oLexer.eof())
		return;

	var oExpr;
	if (oLexer.peek() == "item" && oLexer.peek(1) == '(') {
		oLexer.next(2);
		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in item type expression"
//<-Debug
			);
		oLexer.next();
		return new cItemType;
	}
	// Note! Following step should have been before previous as per spec
	if (oExpr = fParseKindTest(oLexer, oStaticContext))
		return new cItemType(oExpr);
	if (oExpr = fParseAtomicType(oLexer, oStaticContext))
		return new cItemType(oExpr);
};

//
module.exports = cItemType;
