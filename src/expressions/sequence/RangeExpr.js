/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../../classes/Exception');
var cStaticContext = require('./../../classes/StaticContext');

var cXSInteger = require('./../../types/schema/simple/atomic/integer/XSInteger');
//
var cXTSequence = require('./../../types/xpath/XTSequence');

var fFunction_sequence_assertSequenceCardinality = cXTSequence.assertSequenceCardinality;
var fFunction_sequence_assertSequenceItemType = cXTSequence.assertSequenceItemType;

function cRangeExpr(oLeft, oRight) {
	this.left	= oLeft;
	this.right	= oRight;
};

cRangeExpr.prototype.left	= null;
cRangeExpr.prototype.right	= null;

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

 	fFunction_sequence_assertSequenceCardinality(oLeft, oContext, '?'
 //->Debug
 			, sSource
 //<-Debug
 	);
 	fFunction_sequence_assertSequenceItemType(oLeft, oContext, cXSInteger
 //->Debug
 			, sSource
 //<-Debug
 	);

	var oRight	= this.right.evaluate(oContext);
	if (!oRight.length)
		return [];

//->Debug
	sSource	= "second operand of 'to'";
//<-Debug


 	fFunction_sequence_assertSequenceCardinality(oRight, oContext, '?'
//->Debug
 			, sSource
//<-Debug
 	);
 	fFunction_sequence_assertSequenceItemType(oRight, oContext, cXSInteger
//->Debug
 			, sSource
//<-Debug
 	);

	return cStaticContext.operators["to"].call(oContext, oLeft[0], oRight[0]);
};

//
module.exports = cRangeExpr;
