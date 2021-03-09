/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var fFunction_sequence_atomize = require('./../../functions/sequence').atomize;
var fFunction_sequence_assertSequenceCardinality = require('./../../functions/sequence').assertSequenceCardinality;

function cCastExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cCastExpr.prototype.expression	= null;
cCastExpr.prototype.type		= null;

cCastExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext);
	// Validate cardinality
 	fFunction_sequence_assertSequenceCardinality(oSequence1, oContext, this.type.occurence
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

//
module.exports = cCastExpr;
