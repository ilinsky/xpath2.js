/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var fFunction_sequence_toEBV = require('../../functions/sequence').toEBV;
var fXSAnyAtomicType_isNumeric = require('./../../types/simple/XSAnyAtomicType').isNumeric;

function cStepExpr() {

};

cStepExpr.prototype.predicates	= null;

// Public members
cStepExpr.prototype.applyPredicates	= function(oSequence, oContext) {
	var vContextItem	= oContext.item,
		nContextPosition= oContext.position,
		nContextSize	= oContext.size;
	//
	for (var nPredicateIndex = 0, oSequence1, nPredicateLength = this.predicates.length; nPredicateIndex < nPredicateLength; nPredicateIndex++) {
		oSequence1	= oSequence;
		oSequence	= [];
		for (var nIndex = 0, oSequence2, nLength = oSequence1.length; nIndex < nLength; nIndex++) {
			// Set new context
			oContext.item		= oSequence1[nIndex];
			oContext.position	= nIndex + 1;
			oContext.size		= nLength;
			//
			oSequence2	= this.predicates[nPredicateIndex].evaluate(oContext);
			//
			if (oSequence2.length == 1 && fXSAnyAtomicType_isNumeric(oSequence2[0])) {
				if (oSequence2[0].valueOf() == nIndex + 1)
					oSequence.push(oSequence1[nIndex]);
			}
			else
			if (fFunction_sequence_toEBV(oSequence2, oContext))
				oSequence.push(oSequence1[nIndex]);
		}
	}
	// Restore context
	oContext.item		= vContextItem;
	oContext.position	= nContextPosition;
	oContext.size		= nContextSize;
	//
	return oSequence;
};

//
module.exports = cStepExpr;
