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
cQuantifiedExpr.parse	= function (oLexer, oStaticContext) {
	var sQuantifier	= oLexer.peek();
	if ((sQuantifier == "some" || sQuantifier == "every") && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oQuantifiedExpr	= new cQuantifiedExpr(sQuantifier),
			oExpr;
		do {
			oQuantifiedExpr.bindings.push(cSimpleQuantifiedBinding.parse(oLexer, oStaticContext));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "satisfies")
			throw "QuantifiedExpr.parse: Expected 'satisfies' token";

		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cExprSingle.parse(oLexer, oStaticContext)))
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
			oSequence1	= oBinding.inExpr.evaluate(oContext),
			sUri	= (oBinding.namespaceURI ? '{' + oBinding.namespaceURI + '}' : '') + oBinding.localName;
		for (var nIndex = 0, nLength = oSequence1.items.length; (nIndex < nLength) && (bEvery ? bResult :!bResult); nIndex++) {
			oContext.pushVariable(sUri, oSequence1.items[nIndex]);
			if (nBinding < oSelf.bindings.length)
				arguments.callee(oSelf, nBinding);
			else
				bResult	= oSelf.satisfiesExpr.evaluate(oContext).toBoolean(oContext);
			oContext.popVariable(sUri);
		}
	})(this, 0);

	return new cXPath2Sequence(new cXSBoolean(bResult));
};



//
function cSimpleQuantifiedBinding(sPrefix, sLocalName, sNameSpaceURI, oInExpr) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
	this.inExpr		= oInExpr;
};

cSimpleQuantifiedBinding.prototype.prefix		= null;
cSimpleQuantifiedBinding.prototype.localName	= null;
cSimpleQuantifiedBinding.prototype.namespaceURI	= null;
cSimpleQuantifiedBinding.prototype.inExpr	= null;

cSimpleQuantifiedBinding.RegExp	= /^\$(?:(?![0-9-])([\w-]+)\:)?(?![0-9-])([\w-]+)$/;

cSimpleQuantifiedBinding.parse	= function(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(cSimpleQuantifiedBinding.RegExp);
	if (aMatch && oLexer.peek(1) == "in") {
		oLexer.next(2);
		return new cSimpleQuantifiedBinding(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null, cExprSingle.parse(oLexer, oStaticContext));
	}
	else
		throw "Not SimpleQuantifiedBinding expression";
};