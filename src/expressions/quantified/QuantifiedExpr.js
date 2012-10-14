/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cQuantifiedExpr(sQuantifier) {
	this.quantifier		= sQuantifier;
	this.bindings		= [];
	this.satisfiesExpr	= null;
};

cQuantifiedExpr.prototype.bindings		= null;
cQuantifiedExpr.prototype.quantifier	= null;
cQuantifiedExpr.prototype.satisfiesExpr	= null;

// Static members
cQuantifiedExpr.parse	= function (oLexer, oResolver) {
	var sQuantifier	= oLexer.peek();
	if ((sQuantifier == "some" || sQuantifier == "every") && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oQuantifiedExpr	= new cQuantifiedExpr(sQuantifier);
		do {
			oQuantifiedExpr.bindings.push(cSimpleQuantifiedBinding.parse(oLexer, oResolver));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "satisfies")
			throw "QuantifiedExpr.parse: Expected 'satisfies' token";

		oLexer.next();
		var oExpr	= cExprSingle.parse(oLexer, oResolver);
		if (!oExpr)
			throw "QuantifiedExpr.parse: expected 'satisfies' statement operand";

		oQuantifiedExpr.satisfiesExpr	= oExpr;
		return oQuantifiedExpr;
	}
};

// Public members
cQuantifiedExpr.prototype.evaluate	= function (oContext) {
	// TODO: re-factor
	var bEvery	= this.quantifier == "every",
		bResult	= bEvery ? true : false;
	(function(oSelf, nBinding) {
		var oBinding	= oSelf.bindings[nBinding++],
			oInSequence	= oBinding.inExpr.evaluate(oContext);
		for (var nIndex = 0, nLength = oInSequence.items.length; (nIndex < nLength) && (bEvery ? bResult :!bResult); nIndex++) {
			oContext.pushVariable(oBinding.uri, oInSequence.items[nIndex]);
			if (nBinding < oSelf.bindings.length)
				arguments.callee(oSelf, nBinding);
			else
				bResult	= oSelf.satisfiesExpr.evaluate(oContext).toBoolean();
			oContext.popVariable(oBinding.uri);
		}
	})(this, 0);

	return new cXPath2Sequence(bResult);
};



//
function cSimpleQuantifiedBinding(sUri, oInExpr) {
	this.uri	= sUri;
	this.inExpr	= oInExpr;
};

cSimpleQuantifiedBinding.prototype.uri		= null;
cSimpleQuantifiedBinding.prototype.inExpr	= null;

cSimpleQuantifiedBinding.RegExp	= /^\$(?:(?![0-9-])([\w-]+)\:)?(?![0-9-])([\w-]+)$/;

cSimpleQuantifiedBinding.parse	= function(oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cSimpleQuantifiedBinding.RegExp);
	if (aMatch && oLexer.peek(1) == "in") {
		oLexer.next(2);
		return new cSimpleQuantifiedBinding((aMatch[1] ? oResolver(aMatch[1]) + '#' : '') +  aMatch[2], cExprSingle.parse(oLexer, oResolver));
	}
	else
		throw "Not SimpleQuantifiedBinding expression";
};