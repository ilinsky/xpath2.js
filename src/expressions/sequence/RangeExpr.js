/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cAdditiveExpr = require('./../arithmetic/AdditiveExpr');

var cStaticContext = require('./../../classes/StaticContext');

//
var hStaticContext_operators = cStaticContext.operators;

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

//->Debug
	sSource	= "second operand of 'to'";
//<-Debug

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

//
module.exports = cRangeExpr;
