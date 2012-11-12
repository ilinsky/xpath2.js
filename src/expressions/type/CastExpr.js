/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
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

cCastExpr.parse	= function(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = cUnaryExpr.parse(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "cast" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = cSingleType.parse(oLexer, oStaticContext)))
		throw "CastExpr.parse: Expected expression operand";

	return new cCastExpr(oExpr, oType);
};

cCastExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext);
	// Validate cardinality
	if (oSequence1.isEmpty()) {
		if (this.type.occurence != '?')
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "An empty sequence is not allowed as the value in 'cast as' expression"
//<-Debug
			);
		return new cXPath2Sequence;
	}
	if (!oSequence1.isSingleton())
		throw new cXPath2Error("XPTY0004"
//->Debug
				, "Required cardinality of value in 'cast as' expression is exactly one; supplied value has cardinality one or more"
//<-Debug
		);

	//
	return new cXPath2Sequence(this.type.itemType.cast(cXPath2Sequence.atomizeItem(oSequence1.items[0], oContext)));
};