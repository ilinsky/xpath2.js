/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cForExpr() {
	this.bindings	= [];
	this.returnExpr	= null;
};

cForExpr.prototype.bindings		= null;
cForExpr.prototype.returnExpr	= null;

// Static members
cForExpr.parse	= function (oLexer, oResolver) {
	if (oLexer.peek() == "for" && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oForExpr	= new cForExpr;
		do {
			oForExpr.bindings.push(cSimpleForBinding.parse(oLexer, oResolver));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "return")
			throw "ForExpr.parse: Expected 'return' token";

		oLexer.next();
		oForExpr.returnExpr	= cExprSingle.parse(oLexer, oResolver);
		return oForExpr;
	}
};

// Public members
// for $x in X, $y in Y, $z in Z return $x + $y + $z
// for $x in X return for $y in Y return for $z in Z return $x + $y + $z
cForExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= new cXPathSequence;
	(function(oSelf, nBinding) {
		var oBinding	= oSelf.bindings[nBinding++],
			sVariable	= oBinding.localName,
			oInSequence	= oBinding.inExpr.evaluate(oContext);
		for (var nIndex = 0, nLength = oInSequence.items.length; nIndex < nLength; nIndex++) {
			oContext.pushVariable(sVariable, oInSequence.items[nIndex]);
			if (nBinding < oSelf.bindings.length)
				arguments.callee(oSelf, nBinding);
			else
				oSequence.add(oSelf.returnExpr.evaluate(oContext));
			oContext.popVariable(sVariable);
		}
	})(this, 0);

	return oSequence;
};

//
function cSimpleForBinding(sPrefix, sLocalName, oInExpr) {
	this.prefix		= sPrefix || null;
	this.localName	= sLocalName;
	this.inExpr		= oInExpr;
};

cSimpleForBinding.RegExp	= /^\$(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;

cSimpleForBinding.parse	= function(oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cSimpleForBinding.RegExp);
	if (aMatch && oLexer.peek(1) == "in") {
		var sPrefix		= aMatch[1],
			sLocalName	= aMatch[2];

		oLexer.next();
		oLexer.next();

		return new cSimpleForBinding(sPrefix, sLocalName, cExprSingle.parse(oLexer, oResolver));
	}
	else
		throw "Not SimpleForBinding expression";
};