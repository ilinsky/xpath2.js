/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
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
function fRangeExpr_parse (oLexer, oStaticContext) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = fAdditiveExpr_parse(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "to")
		return oExpr;

	// Range expression
	oLexer.next();
	if (oLexer.eof() ||!(oRight = fAdditiveExpr_parse(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in range expression"
//<-Debug
		);
	return new cRangeExpr(oExpr, oRight);
};

// Public members
cRangeExpr.prototype.evaluate	= function (oContext) {
	//
	var oLeft	= this.left.evaluate(oContext);
	if (!oLeft.length)
		return [];
	//
//->Debug
	var sSource	= "first operand of 'to'";
//<-Debug

	fFunctionCall_assertSequenceCardinality(oContext, oLeft, '?'
//->Debug
			, sSource
//<-Debug
	);
	fFunctionCall_assertSequenceItemType(oContext, oLeft, cXSInteger
//->Debug
			, sSource
//<-Debug
	);

	var oRight	= this.right.evaluate(oContext);
	if (!oRight.length)
		return [];

	//
	sSource	= "second operand of 'to'";
	fFunctionCall_assertSequenceCardinality(oContext, oRight, '?'
//->Debug
			, sSource
//<-Debug
	);
	fFunctionCall_assertSequenceItemType(oContext, oRight, cXSInteger
//->Debug
			, sSource
//<-Debug
	);

	return hStaticContext_operators["to"].call(oContext, oLeft[0], oRight[0]);
};