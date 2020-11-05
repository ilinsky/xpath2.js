/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cUnaryExpr = require('./../arithmetic/UnaryExpr');
var cSingleType = require('./types/SingleType');

var fFunction_sequence_atomize = require('./../../functions/sequence').atomize;

function cCastExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cCastExpr.prototype.expression	= null;
cCastExpr.prototype.type		= null;

cCastExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext);
	// Validate cardinality
// FIXME: re-enable
// 	fFunctionCall_assertSequenceCardinality(oContext, oSequence1, this.type.occurence
// //->Debug
// 			, "'cast as' expression operand"
// //<-Debug
// 	);
	//
	if (!oSequence1.length)
		return [];
	//
	return [this.type.itemType.cast(fFunction_sequence_atomize(oSequence1, oContext)[0], oContext)];
};

//
module.exports = cCastExpr;
