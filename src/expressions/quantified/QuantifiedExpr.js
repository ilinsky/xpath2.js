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
			throw new cXPath2Error("XPST0003"
//->Debug
					, "Expected 'satisfies' token in quantified expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cExprSingle.parse(oLexer, oStaticContext)))
			throw new cXPath2Error("XPST0003"
//->Debug
					, "Expected satisfies statement operand in quantified expression"
//<-Debug
			);

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

cSimpleQuantifiedBinding.parse	= function(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().substr(1).match(cNameTest.RegExp);
	if (!aMatch)
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected binding in quantified expression"
//<-Debug
		);

	if (aMatch[1] == '*' || aMatch[2] == '*')
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Illegal use of wildcard in quantified expression binding variable name"
//<-Debug
		);

	oLexer.next();
	if (oLexer.peek() != "in")
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected 'in' token in quantified expression binding"
//<-Debug
		);

	oLexer.next();
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cExprSingle.parse(oLexer, oStaticContext)))
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected in statement operand in quantified expression binding"
//<-Debug
		);

	return new cSimpleQuantifiedBinding(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null, oExpr);
};