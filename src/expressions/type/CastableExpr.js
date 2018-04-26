/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var fParseCastExpr = require('./ParseCastExpr');

var fParseSingleType = require('./types/ParseSingleType');

function cCastableExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cCastableExpr.prototype.expression	= null;
cCastableExpr.prototype.type		= null;

cCastableExpr.parse = function(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = fParseCastExpr(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "castable" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = fParseSingleType(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in castable expression"
//<-Debug
		);

	return new cCastableExpr(oExpr, oType);
};

cCastableExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext),
		oItemType	= this.type.itemType,
		sOccurence	= this.type.occurence;

	if (oSequence1.length > 1)
		return [new cXSBoolean(false)];
	else
	if (!oSequence1.length)
		return [new cXSBoolean(sOccurence == '?')];

	// Try casting
	try {
		oItemType.cast(fFunction_sequence_atomize(oSequence1, oContext)[0]);
	}
	catch (e) {
		if (e.code == "XPST0051")
			throw e;
		if (e.code == "XPST0017")
			throw new cException("XPST0080"
//->Debug
					, "No value is castable to " + (oItemType.prefix ? oItemType.prefix + ':' : '') + oItemType.localName
//<-Debug
			);
		//
		return [new cXSBoolean(false)];
	}

	return [new cXSBoolean(true)];
};

//
module.exports = cCastableExpr;
