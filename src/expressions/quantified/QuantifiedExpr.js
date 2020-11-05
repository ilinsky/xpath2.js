/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var fFunction_sequence_toEBV = require('../../functions/sequence').toEBV;

function cQuantifiedExpr(sQuantifier) {
	this.quantifier		= sQuantifier;
	this.bindings		= [];
	this.satisfiesExpr	= null;
};

cQuantifiedExpr.prototype.bindings		= null;
cQuantifiedExpr.prototype.quantifier	= null;
cQuantifiedExpr.prototype.satisfiesExpr	= null;

// Public members
cQuantifiedExpr.prototype.evaluate	= function (oContext) {
	// TODO: re-factor
	var bEvery	= this.quantifier == "every",
		bResult	= bEvery ? true : false;
	(function(oSelf, nBinding) {
		var oBinding	= oSelf.bindings[nBinding++],
			oSequence1	= oBinding.inExpr.evaluate(oContext),
			sUri	= (oBinding.namespaceURI ? '{' + oBinding.namespaceURI + '}' : '') + oBinding.localName;
		for (var nIndex = 0, nLength = oSequence1.length; (nIndex < nLength) && (bEvery ? bResult :!bResult); nIndex++) {
			oContext.pushVariable(sUri, oSequence1[nIndex]);
			if (nBinding < oSelf.bindings.length)
				arguments.callee(oSelf, nBinding);
			else
				bResult	= fFunction_sequence_toEBV(oSelf.satisfiesExpr.evaluate(oContext), oContext);
			oContext.popVariable(sUri);
		}
	})(this, 0);

	return [new cXSBoolean(bResult)];
};

//
module.exports = cQuantifiedExpr;
