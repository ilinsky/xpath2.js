/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cCastExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cCastExpr.prototype.expression	= null;
cCastExpr.prototype.type		= null;

function fCastExpr_parse (oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = fUnaryExpr_parse(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "cast" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = fSingleType_parse(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in cast expression"
//<-Debug
		);

	return new cCastExpr(oExpr, oType);
};

cCastExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext);
	// Validate cardinality
	fFunctionCall_assertSequenceCardinality(oContext, oSequence1, this.type.occurence
//->Debug
			, "'cast as' expression operand"
//<-Debug
	);
	//
	if (!oSequence1.length)
		return [];
	//
	return [this.type.itemType.cast(fFunction_sequence_atomize(oSequence1, oContext)[0], oContext)];
};
