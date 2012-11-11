/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cRangeExpr(oLeft, oRight) {
	this.left	= oLeft;
	this.right	= oRight;
};

cRangeExpr.prototype.left	= null;
cRangeExpr.prototype.right	= null;

// Static members
cRangeExpr.parse	= function (oLexer, oResolver) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = cAdditiveExpr.parse(oLexer, oResolver)))
		return;
	if (oLexer.peek() != "to")
		return oExpr;

	// Range expression
	oLexer.next();
	if (oLexer.eof() ||!(oRight = cAdditiveExpr.parse(oLexer, oResolver)))
		throw "RangeExpr.parse: expected right operand";
	return new cRangeExpr(oExpr, oRight);
};

// Public members
cRangeExpr.prototype.evaluate	= function (oContext) {
	var oLeft	= this.left.evaluate(oContext),
		oRight	= this.right.evaluate(oContext);

	if (oLeft.isEmpty() || oRight.isEmpty())
		return new cXPath2Sequence;

	if (typeof oLeft.items[0] == "number" && ~~oLeft.items[0] == oLeft.items[0] && typeof oRight.items[0] == "number" && ~~oRight.items[0] == oRight.items[0])
		return cFunctionCall.operators["to"](oLeft.items[0], oRight.items[0]);
	//
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Required item type of operands of 'to' is xs:integer"
//<-Debug
	);	//Required item type of second operand of 'to' is xs:integer; supplied value has item type {type2}
};